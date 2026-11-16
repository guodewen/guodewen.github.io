// "start" (optional) is the start offset in seconds.
const videos = [
  { id: "pBUi2JYn7fI", start: 63, venue: "SIGGRAPH Asia 2026", title: "Multi-level Quadrature for Projective Dynamics" },
  { id: "LtEOF6TqryU", venue: "SIGGRAPH 2026", title: "JGS2-GQ: Training-free 2nd Jacobi with Gaussian Quadrature" },
  { id: "eu6gAxC29zc", venue: "SIGGRAPH 2026", title: "Heterogeneous Subspace Corrections for GPU Deformable Multibody Dynamics" },
  { id: "bf9rdtxclIE", venue: "SIGGRAPH Asia 2025", title: "Progressive Outfit Assembly and Instantaneous Pose Transfer" },
  { id: "xVJFsQDVp-s", venue: "SIGGRAPH 2025", title: "Fast Physics-Based Modeling of Knots and Ties using Templates" },
  { id: "X9-5njuhMvE", venue: "SIGGRAPH Asia 2024", title: "Barrier-Augmented Lagrangian for GPU-based Elastodynamic Contact" },
];

// Each paper lives in its own file under publications/ (one JSON file per
// paper, with all fields needed to render it). To add a paper, drop a new
// .json file in that folder — no other file needs to change. Papers are
// grouped by "year" (newest first) and ordered within a year by "order"
// (larger first).
const PUBLICATIONS_REPO = "guodewen/guodewen.github.io";
const PUBLICATIONS_DIR = "publications";

const isLocalHost = ["localhost", "127.0.0.1"].includes(location.hostname);

// Local static servers (e.g. `python -m http.server`) auto-generate a
// directory listing page for a bare folder URL. We scrape the .json
// filenames out of it so publications/ can be previewed before pushing.
async function listLocalPublicationUrls() {
  const res = await fetch(`${PUBLICATIONS_DIR}/`);
  if (!res.ok) throw new Error(`Local directory listing failed: ${res.status}`);
  const html = await res.text();
  const names = new Set([...html.matchAll(/href="([^"?#]+\.json)"/g)].map((match) => decodeURIComponent(match[1])));
  return [...names].map((name) => `${PUBLICATIONS_DIR}/${name}`);
}

async function listRemotePublicationUrls() {
  const listUrl = `https://api.github.com/repos/${PUBLICATIONS_REPO}/contents/${PUBLICATIONS_DIR}`;
  const listRes = await fetch(listUrl, { headers: { Accept: "application/vnd.github+json" } });
  if (!listRes.ok) throw new Error(`GitHub API error: ${listRes.status}`);
  const entries = await listRes.json();
  return entries.filter((entry) => entry.type === "file" && entry.name.endsWith(".json")).map((entry) => entry.download_url);
}

async function fetchPublications() {
  const fileUrls = isLocalHost ? await listLocalPublicationUrls() : await listRemotePublicationUrls();
  const papers = await Promise.all(fileUrls.map((url) => fetch(url).then((res) => res.json())));
  papers.sort((a, b) => Number(b.year) - Number(a.year) || (b.order ?? 0) - (a.order ?? 0));
  papers.forEach((paper, i) => { paper.id = i; });
  return papers;
}

const esc = (str) => String(str).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

const emphasizeName = (authors) => esc(authors).replaceAll("Dewen Guo", "<strong>Dewen Guo</strong>");

const renderLink = (link, bibId) => link.bibtex
  ? `<button type="button" class="link-btn bib-toggle" aria-expanded="false" aria-controls="${bibId}">${esc(link.label)}</button>`
  : `<a class="link-btn" href="${esc(link.url)}" target="_blank" rel="noreferrer">${esc(link.label)}</a>`;

function renderPublication(paper) {
  const links = paper.links ?? [];
  const bib = links.find((link) => link.bibtex);
  const bibId = `bib-${paper.id}`;
  return `
    <article class="pub">
      <div class="thumb">
        ${paper.thumbnail
          ? `<img src="${esc(paper.thumbnail)}" alt="" loading="lazy" />`
          : `<div class="thumb-empty">${esc(paper.short ?? "")}</div>`}
      </div>
      <div>
        <h4 class="pub-title">${esc(paper.title)}</h4>
        <p class="pub-authors">${emphasizeName(paper.authors)}</p>
        <p class="pub-venue">${esc(paper.venue)}${paper.highlight ? ` <span class="tag">${esc(paper.highlight)}</span>` : ""}</p>
        ${links.length ? `<p class="pub-links">${links.map((link) => renderLink(link, bibId)).join("")}</p>` : ""}
        ${bib ? `<div class="bibtex" id="${bibId}" hidden><pre>${esc(bib.bibtex)}</pre><button type="button" class="link-btn bib-copy">Copy</button></div>` : ""}
      </div>
    </article>`;
}

function renderPublications(papers) {
  const years = [...new Set(papers.map((paper) => paper.year))];
  document.querySelector("#publication-list").innerHTML = years.map((year) => `
    <section class="year-group" data-year="${esc(year)}">
      <h3 class="year">${esc(year)}</h3>
      ${papers.filter((paper) => paper.year === year).map(renderPublication).join("")}
    </section>`).join("");
  document.querySelector("#year-filter").innerHTML = ["all", ...years].map((year) =>
    `<button type="button" class="year-btn" data-year="${esc(year)}" aria-pressed="${year === "all"}">${year === "all" ? "All" : esc(year)}</button>`).join("");
}

function selectYear(year) {
  document.querySelectorAll(".year-group").forEach((group) => {
    group.hidden = year !== "all" && group.dataset.year !== year;
  });
  document.querySelectorAll(".year-btn").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.year === year));
  });
}

function renderVideos() {
  document.querySelector("#video-grid").innerHTML = videos.map((video) => `
    <a class="video" href="https://www.youtube.com/watch?v=${video.id}${video.start ? `&t=${video.start}s` : ""}" target="_blank" rel="noreferrer">
      <span class="video-thumb">
        <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="" width="480" height="270" loading="lazy" />
        <span class="play" aria-hidden="true"></span>
      </span>
      <span class="video-venue">${esc(video.venue)}</span>
      <span class="video-title">${esc(video.title)}</span>
    </a>`).join("");
}

async function init() {
  renderVideos();
  try {
    renderPublications(await fetchPublications());
  } catch (err) {
    console.error("Failed to load publications", err);
    document.querySelector("#publication-list").innerHTML =
      '<p class="note">Couldn\'t load the publication list right now. Please try again later.</p>';
  }
}

init();

document.querySelector("#current-year").textContent = new Date().getFullYear();

// Match the browser UI colour (mobile address bar) to the active theme.
document.querySelector('meta[name="theme-color"]').content = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();

document.addEventListener("click", (event) => {
  const yearButton = event.target.closest(".year-btn");
  if (yearButton) {
    selectYear(yearButton.dataset.year);
    return;
  }

  const toggle = event.target.closest(".bib-toggle");
  if (toggle) {
    const panel = document.getElementById(toggle.getAttribute("aria-controls"));
    panel.hidden = !panel.hidden;
    toggle.setAttribute("aria-expanded", String(!panel.hidden));
    return;
  }

  const copyButton = event.target.closest(".bib-copy");
  if (copyButton) {
    const original = copyButton.textContent;
    const flash = (text) => {
      copyButton.textContent = text;
      setTimeout(() => { copyButton.textContent = original; }, 1500);
    };
    navigator.clipboard.writeText(copyButton.previousElementSibling.textContent).then(() => flash("Copied"), () => flash("Copy failed"));
  }
});
