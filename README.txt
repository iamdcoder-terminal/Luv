EROSPHERE · THE COURT OF LOVE
=============================
Open index.html in Chrome / Safari / Edge. That's it.

1) PUT YOUR SONG HERE
   Copy your song into the "audio" folder and name it:  our-song.mp3
   (Different name? Change "songPath" in config.js.)
   No file handy? A folder button appears so you can pick a song from your device.

2) MAKE IT HERS — open config.js and edit:
   herName     -> her name
   startDate   -> the day you got together (YYYY-MM-DD)
   chapters    -> your four monthly memories
   letter      -> your love letter
   vows        -> the little promises
   photos      -> swap files inside the "images" folder

Sound starts when she taps "Enter the Realm" (browsers need a tap before playing audio).
Tip: keep the whole folder together — index.html, style.css, script.js, config.js, images, audio, fonts.

DEPLOYING ON RENDER
-------------------
Render needs the files in a Git repo (GitHub / GitLab / Bitbucket).
1. Put your song in audio/our-song.mp3
2. Make a PRIVATE repo and upload everything from this folder (index.html must be at the top level)
3. Render > New > Blueprint (uses render.yaml)  -- or New > Static Site, build command empty, publish directory "."
