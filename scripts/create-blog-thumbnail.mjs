import { writeFile } from 'node:fs/promises'
import { deflateSync } from 'node:zlib'

const width = 1200
const height = 630
const pixels = Buffer.alloc(width * height * 4)

const blend = (x, y, red, green, blue, alpha) => {
  if (x < 0 || x >= width || y < 0 || y >= height) return
  const offset = (Math.floor(y) * width + Math.floor(x)) * 4
  const inverse = 1 - alpha
  pixels[offset] = pixels[offset] * inverse + red * alpha
  pixels[offset + 1] = pixels[offset + 1] * inverse + green * alpha
  pixels[offset + 2] = pixels[offset + 2] * inverse + blue * alpha
  pixels[offset + 3] = 255
}

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const offset = (y * width + x) * 4
    const cyanDistance = Math.hypot((x - 850) / 650, (y - 210) / 470)
    const violetDistance = Math.hypot((x - 470) / 580, (y - 540) / 360)
    const cyan = Math.max(0, 1 - cyanDistance) * 0.24
    const violet = Math.max(0, 1 - violetDistance) * 0.13
    pixels[offset] = 7 + 32 * violet + 8 * cyan
    pixels[offset + 1] = 9 + 48 * cyan + 18 * violet
    pixels[offset + 2] = 14 + 65 * cyan + 55 * violet
    pixels[offset + 3] = 255
  }
}

const circle = (cx, cy, radius, color, alpha) => {
  const minX = Math.floor(cx - radius)
  const maxX = Math.ceil(cx + radius)
  const minY = Math.floor(cy - radius)
  const maxY = Math.ceil(cy + radius)
  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      const distance = Math.hypot(x - cx, y - cy)
      if (distance <= radius) blend(x, y, ...color, alpha * (1 - distance / radius))
    }
  }
}

const line = (from, to, color, alpha, thickness = 1) => {
  const length = Math.hypot(to[0] - from[0], to[1] - from[1])
  const steps = Math.max(1, Math.ceil(length))
  for (let step = 0; step <= steps; step += 1) {
    const progress = step / steps
    const x = from[0] + (to[0] - from[0]) * progress
    const y = from[1] + (to[1] - from[1]) * progress
    circle(x, y, thickness, color, alpha)
  }
}

const points = [
  [90, 130], [245, 85], [380, 180], [540, 115], [690, 225], [850, 120],
  [1025, 205], [1120, 350], [930, 390], [760, 335], [610, 470], [420, 390],
  [250, 500], [105, 410], [830, 540], [1065, 520],
]

const edges = [[0,1],[1,2],[2,3],[2,5],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,0],[4,9],[8,14],[14,15],[15,7],[10,14],[2,11]]
edges.forEach(([from, to], index) => line(points[from], points[to], index % 3 ? [96, 188, 215] : [145, 125, 214], 0.3, 1.1))

points.forEach(([x, y], index) => {
  if (index % 5 === 0) circle(x, y, 18, [74, 179, 211], 0.08)
  circle(x, y, index % 5 === 0 ? 5 : 3.2, [205, 241, 247], 0.85)
})

line(points[4], points[9], [116, 224, 240], 0.42, 8)
line([650, 255], points[9], [226, 251, 255], 0.88, 2)

const crcTable = Array.from({ length: 256 }, (_, number) => {
  let value = number
  for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1
  return value >>> 0
})

const crc32 = (buffer) => {
  let crc = 0xffffffff
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

const chunk = (type, data) => {
  const name = Buffer.from(type)
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const checksum = Buffer.alloc(4)
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])))
  return Buffer.concat([length, name, data, checksum])
}

const header = Buffer.alloc(13)
header.writeUInt32BE(width, 0)
header.writeUInt32BE(height, 4)
header[8] = 8
header[9] = 6

const scanlines = Buffer.alloc((width * 4 + 1) * height)
for (let y = 0; y < height; y += 1) {
  const target = y * (width * 4 + 1)
  scanlines[target] = 0
  pixels.copy(scanlines, target + 1, y * width * 4, (y + 1) * width * 4)
}

const png = Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk('IHDR', header),
  chunk('IDAT', deflateSync(scanlines, { level: 9 })),
  chunk('IEND', Buffer.alloc(0)),
])

await writeFile('public/blog/images/flowing-ar-energy-network.png', png)
console.log(`Created ${width}x${height} social thumbnail (${png.length} bytes).`)
