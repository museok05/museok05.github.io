# STEP Models

Place project CAD models in this folder. Both `.step` and `.stp` extensions are
supported.

After adding a model, set the matching project's `stepFile` value in
`site-data.js`, for example:

```js
stepFile: "assets/models/solar-control-board.step",
```

Keep individual models reasonably small for a faster browser download and
triangulation step.

`E_PAS_DRD_2.0.glb` is a 14.0 MiB web-optimized conversion of the original
38.4 MiB STEP assembly. The project loads the GLB directly while the viewer's
**Open STEP** control remains available for local STEP previews.
