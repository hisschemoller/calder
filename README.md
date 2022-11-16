# Struck

Percussive action with 3D physics.

## PWA

https://web.dev/learn/pwa/

https://www.freecodecamp.org/news/build-a-pwa-from-scratch-with-html-css-and-javascript/

https://www.npmjs.com/package/vite-plugin-pwa<br>
https://github.com/antfu/vite-plugin-pwa<br>
https://vite-plugin-pwa.netlify.app/guide/<br>

https://firt.dev/pwa-design-tips/#notch-and-iphone-x-support

Blue: #3778AF

## Web Audio API drum synthesis

* Synthesising Sounds with Web Audio API
  * http://localhost:3000/jouw-gegevens/emailadmin/wouterwouter@hischemoller.eu/forward/edit
* Browser beats I: synthesizing a kick drum
  * https://www.kabisa.nl/tech/browser-beats-i-synthesizing-a-kick-drum/
* Synthesizing Hi-Hats with Web Audio
  * http://joesul.li/van/synthesizing-hi-hats/
* Introduction to Percussion Synthesis Using Web Audio
  * https://github.com/irritant/WAC-2016-Tutorial

## Fix

In `node_modules/@enable3d/ammo-physics/dist/physics.js` on line 18

```
import { createHACDShapes, createHullShape, createTriMeshShape, createVHACDShapes, iterateGeometries } from './three-to-ammo';
```

## Shoot objects in a direction

https://github.com/mrdoob/three.js/blob/master/examples/physics_ammo_volume.html

## Inspect localhost on iPhone

1. Start project with `yarn vite -host` instead of just `yarn vite`.
2. Connect iPhone to Macbook with cable.
3. System Preferences > Network > IP Address, 10.0.1.3 for example.
4. iPhone Safari, go to URL with port, http://10.0.1.3:5173
5. Macbook Safari, Develop > [Phone name] > [IP number]
