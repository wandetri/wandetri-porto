// Generated from content/blog. Do not edit directly.
export const blogArticles = [
  {
    "slug": "building-a-living-ar-energy-network",
    "title": "Building a Living AR Energy Network",
    "date": "2026-06-21",
    "updated": "2026-06-21",
    "description": "A practical breakdown of designing a lightweight particle and plexus system that feels like a living AR tracking network.",
    "cover": "/blog/images/flowing-ar-energy-network.png",
    "coverAlt": "Flowing cyan and violet AR tracking nodes connected across a dark visual field",
    "tags": [
      "AR",
      "VFX",
      "Canvas",
      "Creative Technology"
    ],
    "author": "Wande Tricada",
    "featured": true,
    "readingTime": "2 min read",
    "html": "<p>Interactive visuals feel more convincing when movement appears to travel through a system instead of happening everywhere at once. For the hero background on this portfolio, the goal was to suggest <strong>AR tracking points, VFX nodes, and energy flow</strong> without turning the page into a distracting technical demo.</p>\n<figure><img src=\"/blog/images/flowing-ar-energy-network.png\" alt=\"A flowing network of AR tracking nodes\" title=\"Flowing AR energy network\" loading=\"lazy\" decoding=\"async\"></figure>\n<h2 id=\"start-with-a-visual-hierarchy\">Start with a visual hierarchy<a class=\"heading-anchor\" href=\"#start-with-a-visual-hierarchy\" aria-label=\"Link to Start with a visual hierarchy\">#</a></h2>\n<p>A useful network has more than one kind of information. I separated the visual system into four layers:</p>\n<ul><li>A dark atmospheric field that establishes depth.</li><li>Slow tracking points with different depth values.</li><li>Connections that appear only when points are close enough.</li><li>Occasional pulses that travel along selected connections.</li></ul>\n<blockquote>The animation should support the creator name, not compete with it.</blockquote>\n<h2 id=\"keep-particle-motion-restrained\">Keep particle motion restrained<a class=\"heading-anchor\" href=\"#keep-particle-motion-restrained\" aria-label=\"Link to Keep particle motion restrained\">#</a></h2>\n<p>Each point stores position, velocity, depth, radius, and a phase offset. Depth affects speed and size, creating parallax without a 3D library.</p>\n<div class=\"code-block\"><span>js</span><pre><code class=\"language-js\">const point = {\n  x: Math.random() * width,\n  y: Math.random() * height,\n  vx: (Math.random() - 0.5) * 0.1,\n  vy: (Math.random() - 0.5) * 0.08,\n  depth: 0.35 + Math.random() * 0.65,\n  phase: Math.random() * Math.PI * 2,\n}</code></pre></div>\n<p>The important part is not the amount of motion. It is the relationship between motion, depth, and time. A small phase variation prevents the network from moving like one rigid layer.</p>\n<h2 id=\"let-energy-travel-through-connections\">Let energy travel through connections<a class=\"heading-anchor\" href=\"#let-energy-travel-through-connections\" aria-label=\"Link to Let energy travel through connections\">#</a></h2>\n<p>The base lines remain quiet. A pulse selects one valid connection, interpolates between its endpoints, and draws only a short glowing tail.</p>\n<div class=\"code-block\"><span>js</span><pre><code class=\"language-js\">const progress = (time - pulse.startedAt) / pulse.duration\nconst eased = progress * progress * (3 - 2 * progress)\n\nconst x = from.x + (to.x - from.x) * eased\nconst y = from.y + (to.y - from.y) * eased</code></pre></div>\n<p>This gives the impression that information is moving through the network. Limiting the number of simultaneous pulses keeps the system cinematic rather than chaotic.</p>\n<h2 id=\"performance-rules\">Performance rules<a class=\"heading-anchor\" href=\"#performance-rules\" aria-label=\"Link to Performance rules\">#</a></h2>\n<ol><li>Scale point count from the canvas area and cap it on mobile.</li><li>Limit device pixel ratio instead of rendering at an unnecessarily large resolution.</li><li>Pause the animation when the canvas leaves the viewport.</li><li>Render a static frame when <code>prefers-reduced-motion</code> is enabled.</li></ol>\n<p>The final effect is still a lightweight Canvas 2D animation. The premium feeling comes from timing, hierarchy, and restraint, not from a heavy rendering dependency.</p>"
  }
]
