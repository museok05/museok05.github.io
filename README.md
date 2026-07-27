# Museok Seo Portfolio

A static portfolio for Museok Seo, an Electrical Engineering student at UBC and a
member of UBC Solar.

## Preview

The interactive 3D viewer uses browser modules and WebAssembly, so preview the site
through a local web server instead of opening `index.html` directly. GitHub Pages
already serves it correctly over HTTPS.

## Personalize the hero

The hero uses two stable asset filenames:

- Landscape background: `assets/hero-background.jpg`
- Circular headshot: `assets/headshot.jpg`

Replace either file with your own image while keeping the same filename. Use a wide
landscape image for the background and a square portrait for the headshot.

The site shows the initials `MS` automatically when `assets/headshot.jpg` is absent.

## Add the resume

Save the resume as:

`assets/museok-seo-resume.pdf`

After the website is published, the resume link enables itself when that file is
available.

## Edit projects

Project content is stored in `site-data.js`. Each project has:

- Title, category, and year
- Image and accessible image description
- Summary and technology tags
- Challenge, approach, and outcome
- Optional live-project and GitHub URLs

Project images use `assets/project-01.jpg`, `assets/project-02.jpg`, and
`assets/project-03.jpg`. Replace the generated placeholders while keeping the same
filenames, or update the image paths in `site-data.js`.

The project carousel supports:

- Previous and next arrow buttons
- Left and right keyboard arrows
- Mouse dragging and touch swiping
- Tap or click a side project to rotate it into focus
- Infinite wraparound

## Edit skills

The looping skills section is also configured in `site-data.js`. Each entry needs a
name, category, and local logo path:

```js
{
  name: "Altium Designer",
  category: "PCB design",
  icon: "assets/skills/altium-designer.svg",
},
```

Add new logo files to `assets/skills/`, then add matching entries to the `skills`
array. The visible loop duplicates entries automatically, so each skill only needs
to appear once in the data. Visitors can pause the animation with the control next
to the section heading.

## Add interactive STEP models

1. Export the PCB from Altium as a `.step` or `.stp` file.
2. Upload the model to `assets/models/`.
3. Open `site-data.js`.
4. Set that project's `stepFile` path:

```js
stepFile: "assets/models/solar-control-board.step",
```

When both model fields are empty, the viewer displays a lightweight demo PCB.
Permanent models must be committed to the GitHub repository and configured in
`site-data.js`; visitors cannot replace the displayed model through the website.

STEP parsing runs entirely in the browser with `occt-import-js`. The resulting mesh
is displayed with Three.js and supports orbit, zoom, and pan controls. Keep models
as small as practical because large assemblies take longer to download and
triangulate.

### Publishing the included E-PAS model

The original `E_PAS_DRD_2.0.step` is about 38.4 MiB. It worked in the viewer, but
required roughly one minute to download and triangulate its 1,117 meshes during a
fresh desktop test.

The published project therefore uses `assets/models/E_PAS_DRD_2.0.glb`, an
optimized 14.0 MiB copy of the same assembly. It fits GitHub's 25 MiB browser
upload limit and opens directly without STEP conversion. The source STEP remains
outside this portfolio folder.

For other large models, use a web-optimized GLB in the optional `modelFile` field:

```js
modelFile: "assets/models/my-board.glb",
stepFile: "",
```

If you choose to publish a raw STEP between 25 and 100 MiB, commit it through Git
or GitHub Desktop. Do not use Git LFS because GitHub Pages does not serve LFS
objects.

## Add LinkedIn and email

Open `index.html` and find the `contact-list` section near the bottom. Replace the
LinkedIn and Email placeholder `span` elements with links:

```html
<a href="https://www.linkedin.com/in/YOUR_PROFILE">...</a>
<a href="mailto:YOUR_EMAIL">...</a>
```

Keep the existing inner labels and icons for consistent styling.

## Publish a blog post

1. Copy `posts/post-template.html`.
2. Rename it, for example `posts/my-first-project.html`.
3. Replace the template title and article text.
4. Add a link to the new post inside the `post-list` section in `blog.html`.

## GitHub Pages

Upload the complete contents of this folder to the root of the
`museok05.github.io` repository.

1. Open `https://github.com/museok05/museok05.github.io`.
2. Select **Add file**, then **Upload files**.
3. Upload all files and folders from this project.
4. Commit the changes to `main`.
5. Open **Settings**, then **Pages**.
6. Select **Deploy from a branch**, `main`, and `/(root)`.

The site will publish at `https://museok05.github.io`.

## Main files

- Homepage structure: `index.html`
- Project and skills content: `site-data.js`
- Layout and colors: `styles.css`
- Project carousel, modal, and navigation: `script.js`
- Interactive STEP viewer: `step-viewer.js`
- Blog listing: `blog.html`
- Reusable post: `posts/post-template.html`
