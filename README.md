# Dewen Guo — Personal Website

A responsive, dependency-free academic homepage ready for GitHub Pages.

## Publish on GitHub Pages

1. Create a GitHub repository. For a user homepage, name it `YOUR-USERNAME.github.io`.
2. Push this folder to the repository's `main` branch.
3. In **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.
4. The included workflow will publish the site automatically after every push.

## Add paper thumbnails

1. Create `assets/images/publications/` and put your images there.
2. Open `script.js` and find the matching publication.
3. Change its empty `thumbnail` field to the image path, for example:

```js
thumbnail: "assets/images/publications/jgs2-gq.jpg"
```

Recommended image ratio: **16:10** (at least 800 × 500 px). JPG, PNG, AVIF, and WebP all work.

## Edit content

- Profile and page structure: `index.html`
- Publications and videos: `script.js`
- Colors and layout: `styles.css`

The site uses only HTML, CSS, and JavaScript, so no build command or package installation is required.
