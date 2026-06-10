# Video assets

Place optimized MP4 files in this folder using the filenames referenced in `src/data/effects.js`.

Recommended export settings:

- H.264 MP4, muted/no audio track where possible
- 720-1080px on the longest edge for thumbnails
- Keep each grid preview under 3-5 MB
- Use a short seamless loop
- Preserve the existing filenames or update the data array

The site uses poster images and `preload="none"` for grid videos so a large portfolio does not eagerly download every clip.
