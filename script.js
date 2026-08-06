const videos = [
  { id: "LtEOF6TqryU", year: "SIGGRAPH 2026", title: "JGS2-GQ: Training-free 2nd Jacobi with Gaussian Quadrature" },
  { id: "eu6gAxC29zc", year: "SIGGRAPH 2026", title: "Heterogeneous Subspace Corrections for GPU Deformable Multibody Dynamics" },
  { id: "bf9rdtxclIE", year: "SIGGRAPH Asia 2025", title: "Progressive Outfit Assembly and Instantaneous Pose Transfer" },
  { id: "xVJFsQDVp-s", year: "SIGGRAPH 2025", title: "Fast Physics-Based Modeling of Knots and Ties using Templates" },
  { id: "X9-5njuhMvE", year: "SIGGRAPH Asia 2024", title: "Barrier-Augmented Lagrangian for GPU-based Elastodynamic Contact" },
];

// Each paper lives in its own file under publications/ (one JSON file per
// paper, with all fields needed to render it). To add a paper, drop a new
// .json file in that folder — no other file needs to change. Order on the
// page is controlled by each file's "order" field (lower = higher up).
const PUBLICATIONS_REPO = "guodewen/guodewen.github.io";
const PUBLICATIONS_DIR = "publications";

let publications = [];

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
  return papers.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

const emphasizeName = (authors) => authors.replaceAll("Dewen Guo", "<strong>Dewen Guo</strong>");

const escapeHtml = (str) => str.replace(/[&<>]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[ch]));

const renderLink = (link) => link.bibtex
  ? `<div class="bibtex-entry">
      <button type="button" class="bibtex-toggle" aria-expanded="false">${link.label} ↓</button>
      <div class="bibtex-dropdown" hidden>
        <pre><code>${escapeHtml(link.bibtex)}</code></pre>
        <button type="button" class="bibtex-copy">Copy</button>
      </div>
    </div>`
  : `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label} ↗</a>`;

function renderVideos() {
  document.querySelector("#video-grid").innerHTML = videos.map((video) => `
    <a class="video-card reveal" href="https://www.youtube.com/watch?v=${video.id}" target="_blank" rel="noreferrer" aria-label="Watch ${video.title} on YouTube">
      <img src="https://i.ytimg.com/vi/${video.id}/hqdefault.jpg" alt="" loading="lazy" />
      <span class="video-play" aria-hidden="true">▶</span>
      <div class="video-meta"><span>${video.year}</span><h3>${video.title}</h3></div>
    </a>
  `).join("");
}

function renderPublications(year = "all") {
  const filtered = year === "all" ? publications : publications.filter((paper) => paper.year === year);
  const list = document.querySelector("#publication-list");
  if (!filtered.length) {
    list.innerHTML = '<p class="empty-state">No publications found for this year.</p>';
    return;
  }
  list.innerHTML = filtered.map((paper) => `
    <article class="publication reveal">
      <div class="publication-year">${paper.year}</div>
      <div class="paper-thumb">
        ${paper.thumbnail
          ? `<img src="${paper.thumbnail}" alt="Thumbnail for ${paper.title}" loading="lazy" />`
          : `<div class="paper-placeholder" aria-label="Reserved paper thumbnail position"><strong>${paper.short}</strong><span>Paper thumbnail</span></div>`}
      </div>
      <div class="publication-content">
        <h3>${paper.title}</h3>
        <p class="publication-authors">${emphasizeName(paper.authors)}</p>
        <p class="publication-venue">${paper.venue}</p>
        ${paper.highlight ? `<p class="publication-highlight"><span aria-hidden="true">★</span>${paper.highlight}</p>` : ""}
        ${(paper.links ?? []).length ? `<div class="publication-links">${paper.links.map(renderLink).join("")}</div>` : ""}
      </div>
    </article>
  `).join("");
  observeReveals();
}

function observeReveals() {
  const items = document.querySelectorAll(".reveal:not(.is-observed)");
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  items.forEach((item) => {
    item.classList.add("is-observed");
    observer.observe(item);
  });
}

async function init() {
  renderVideos();
  observeReveals();

  try {
    publications = await fetchPublications();
    renderPublications();
  } catch (err) {
    console.error("Failed to load publications", err);
    document.querySelector("#publication-list").innerHTML =
      '<p class="empty-state">Couldn\'t load publications right now — please try again later.</p>';
  }
}

init();

document.querySelector("#year-filter").addEventListener("change", (event) => renderPublications(event.target.value));
document.querySelector("#current-year").textContent = new Date().getFullYear();

function closeBibtexDropdowns() {
  document.querySelectorAll(".bibtex-dropdown").forEach((el) => { el.hidden = true; });
  document.querySelectorAll(".bibtex-toggle").forEach((el) => el.setAttribute("aria-expanded", "false"));
}

document.addEventListener("click", (event) => {
  const toggle = event.target.closest(".bibtex-toggle");
  if (toggle) {
    const dropdown = toggle.nextElementSibling;
    const isOpen = !dropdown.hidden;
    closeBibtexDropdowns();
    if (!isOpen) {
      dropdown.hidden = false;
      toggle.setAttribute("aria-expanded", "true");
    }
    return;
  }

  const copyBtn = event.target.closest(".bibtex-copy");
  if (copyBtn) {
    const code = copyBtn.previousElementSibling.textContent;
    navigator.clipboard.writeText(code).then(() => {
      const original = copyBtn.textContent;
      copyBtn.textContent = "Copied!";
      setTimeout(() => { copyBtn.textContent = original; }, 1500);
    });
    return;
  }

  if (!event.target.closest(".bibtex-entry")) closeBibtexDropdowns();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeBibtexDropdowns();
});
