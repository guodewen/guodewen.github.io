const videos = [
  { id: "LtEOF6TqryU", year: "SIGGRAPH 2026", title: "JGS2-GQ: Training-free 2nd Jacobi with Gaussian Quadrature" },
  { id: "eu6gAxC29zc", year: "SIGGRAPH 2026", title: "Heterogeneous Subspace Corrections for GPU Deformable Multibody Dynamics" },
  { id: "bf9rdtxclIE", year: "SIGGRAPH Asia 2025", title: "Progressive Outfit Assembly and Instantaneous Pose Transfer" },
  { id: "xVJFsQDVp-s", year: "SIGGRAPH 2025", title: "Fast Physics-Based Modeling of Knots and Ties using Templates" },
  { id: "X9-5njuhMvE", year: "SIGGRAPH Asia 2024", title: "Barrier-Augmented Lagrangian for GPU-based Elastodynamic Contact" },
];

// To add a paper thumbnail: put the image in assets/images/publications/ and
// set thumbnail to its path, e.g. "assets/images/publications/jgs2-gq.jpg".
const publications = [
  {
    year: "2026", short: "###", thumbnail: "",
    title: "##########################",
    authors: "Dewen Guo et al.",
    venue: "ACM TOG (SIGGRAPH Asia 2026) · Kuala Lumpur, Malaysia",
    links: []
  },
  {
    year: "2026", short: "###", thumbnail: "",
    title: "##########################",
    authors: "###, Dewen Guo et al.",
    venue: "ACM SIGGRAPH Asia 2026 · Kuala Lumpur, Malaysia",
    links: []
  },
  {
    year: "2026", short: "DPGAI", thumbnail: "assets/images/publications/dpgai.jpg",
    title: "Differentiable Physics for Graphics and AI",
    authors: "Minchen Li, Chenfanfu Jiang, Yin Yang, Tuur Stuyck, Ming Lin, Daniele Panozzo, Miles Macklin, Guying Lin, Yunuo Chen, Kemeng Huang, Dewen Guo, Ying Jiang, Yifei Li",
    venue: "ACM TOG (SIGGRAPH 2026) · Los Angeles, USA",
    links: [{ label: "Page", url: "https://dpgai.github.io/SIGGRAPH2026/" }, { label: "ACM DL", url: "https://dl.acm.org/doi/10.1145/3799828.3811422" }]
  },
  {
    year: "2026", short: "JGS2-GQ", thumbnail: "assets/images/publications/jgs2-gq.jpg",
    title: "JGS2-GQ: Training-free 2nd Jacobi with Gaussian Quadrature",
    authors: "Dewen Guo, Zixuan Lu, Zhiyong He, Yuqi Meng, Bohan Wang, Lei Lan, Weiwei Xu, Chenfanfu Jiang, Yin Yang",
    venue: "ACM TOG (SIGGRAPH 2026) · Los Angeles, USA",
    links: [{ label: "Video", url: "https://www.youtube.com/watch?v=LtEOF6TqryU" }]
  },
  {
    year: "2026", short: "HSC", thumbnail: "assets/images/publications/hsc.jpg",
    title: "Heterogeneous Subspace Corrections for GPU Deformable Multibody Dynamics",
    authors: "Dewen Guo, Zhendong Wang, Minchen Li, Sheng Li, Guoping Wang, Huamin Wang, Chenfanfu Jiang, Yin Yang",
    venue: "ACM TOG (SIGGRAPH 2026) · Los Angeles, USA",
    links: [{ label: "Project page", url: "https://sites.google.com/view/multibody" }, { label: "Video", url: "https://www.youtube.com/watch?v=eu6gAxC29zc" }]
  },
  {
    year: "2026", short: "M-ABD", thumbnail: "assets/images/publications/mabd.png",
    title: "M-ABD: Scalable, Efficient, and Robust Multi-Affine-Body Dynamics",
    authors: "Zhiyong He, Dewen Guo, Minghao Guo, Yili Zhao, Wojciech Matusik, Hao Su, Chenfanfu Jiang, Peter Yichen Chen, Yin Yang",
    venue: "ACM TOG (SIGGRAPH 2026) · Los Angeles, USA",
    links: []
  },
  {
    year: "2026", short: "KNIT", thumbnail: "assets/images/publications/yarn.png",
    title: "Interactive Yarn-level Knitwear with Nested Douglas-Rachford Splitting",
    authors: "Chun Yuan, Zixuan Lu, Haoyang Shi, Dewen Guo, Huamin Wang, Chenfanfu Jiang, Zherong Pan, Kui Wu, Yin Yang",
    venue: "ACM TOG (SIGGRAPH 2026) · Los Angeles, USA",
    links: []
  },
  {
    year: "2025", short: "POA", thumbnail: "assets/images/publications/poa.png",
    title: "Progressive Outfit Assembly and Instantaneous Pose Transfer",
    authors: "Dewen Guo, Zhendong Wang, Zegao Liu, Sheng Li, Guoping Wang, Yin Yang, Huamin Wang",
    venue: "ACM SIGGRAPH Asia 2025 · Hong Kong, China",
    links: [
      { label: "Paper", url: "https://drive.google.com/file/d/161Y4QR9rsO2V9nqBtTowi45Fkzes2Esb/view?usp=drive_link" },
      { label: "Video", url: "https://drive.google.com/file/d/1wSNbiuqFrqZT2ov067P8TMaw-_dN8Dbv/view?usp=drive_link" },
      { label: "BibTeX", url: "https://sites.google.com/view/guo2025poa/home" },
      { label: "App", url: "https://www.style3d.com/products/mixmatch" }
    ]
  },
  {
    year: "2025", short: "KNOT", thumbnail: "assets/images/publications/knot.webp",
    title: "Fast Physics-Based Modeling of Knots and Ties Using Templates",
    authors: "Dewen Guo, Zhendong Wang, Zegao Liu, Sheng Li, Guoping Wang, Yin Yang, Huamin Wang",
    venue: "ACM SIGGRAPH 2025 · Vancouver, Canada",
    links: [
      { label: "Paper", url: "https://drive.google.com/file/d/16gtNzoIEG-Ys_40-5ZkxtBvuaonABg8C/view?usp=drive_link" },
      { label: "Video", url: "https://drive.google.com/file/d/1Pm0Rvc_YA6jkSaW1FIoTLlBZZodVl_fV/view?usp=sharing" },
      { label: "2 Minute Papers", url: "https://www.youtube.com/watch?v=vYZbwJJk_hc" },
      { label: "BibTeX", url: "https://sites.google.com/view/guo2025fpb/home" },
      { label: "App", url: "https://help.style3d.com/studio/en/c2c8/5869/2bdc/c181" }
    ]
  },
  {
    year: "2025", short: "DHP", thumbnail: "assets/images/publications/dhp.png",
    title: "Diagonal Hessian Proxy for Efficient Elastic Simulation using Peridynamics",
    authors: "Dewen Guo, Ran Tian, Sinuo Liu, Guoping Wang, Sheng Li",
    venue: "IEEE TVCG 2025",
    links: [
      { label: "Paper", url: "https://drive.google.com/file/d/1onYLLIpjFltZd2cOY4deh1dSQWCg-tRq/view?usp=sharing" },
      { label: "Supplement", url: "https://drive.google.com/file/d/1X0rK5kG07_3LAx7Tc0k5EC7qCG2OP_xv/view?usp=sharing" },
      { label: "Video", url: "https://drive.google.com/file/d/12QUcuTYwEsUvR8YH9xaaNUpoAS20LnYG/view?usp=sharing" },
      { label: "BibTeX", url: "https://sites.google.com/view/guo2025dhp/home" }
    ]
  },
  {
    year: "2025", short: "N-P", thumbnail: "assets/images/publications/neural-painting.png",
    title: "Neural-Polyptych: Content Controllable Painting Recreation for Diverse Genres",
    authors: "Yiming Zhao*, Dewen Guo*, Zhouhui Lian, Yue Gao, Jianhong Han, Jie Feng, Guoping Wang, Bingfeng Zhou, Sheng Li",
    venue: "Tsinghua / IEEE CVM Journal 2025 · *Equal contributions",
    links: [{ label: "Paper", url: "https://drive.google.com/file/d/1FcTh5JM6VWmIeYEgWsqOeGjqi0MvuxO3/view?usp=sharing" }]
  },
  {
    year: "2024", short: "BAL", thumbnail: "assets/images/publications/bal.png",
    title: "Barrier-Augmented Lagrangian for GPU-based Elastodynamic Contact",
    authors: "Dewen Guo, Minchen Li, Yin Yang, Sheng Li, Guoping Wang",
    venue: "ACM TOG (SIGGRAPH Asia 2024) · Tokyo, Japan",
    links: [
      { label: "Paper", url: "https://drive.google.com/file/d/19rJocTxXLsSuvUqth8LjwLfgD4FqneZ0/view?usp=drive_link" },
      { label: "Supplement", url: "https://drive.google.com/file/d/1CYaWDP59OHTyCYQ_TbwjZK8uimxDbmty/view?usp=drive_link" },
      { label: "Video", url: "https://drive.google.com/file/d/1rl4d4P9sxuR30gKkZUrewnTuF8UYcuaC/view?usp=sharing" },
      { label: "BibTeX", url: "https://sites.google.com/view/guo2024bal/home" }
    ]
  },
  {
    year: "2020", short: "VGG", thumbnail: "assets/images/publications/crowd.png",
    title: "VGG-Embedded Adaptive Layer-Normalized Crowd Counting Net with Scale-Shuffling Modules",
    authors: "Dewen Guo, Jie Feng, Bingfeng Zhou",
    venue: "IEEE ICPR 2020 · Milan, Italy",
    links: [{ label: "Paper", url: "https://drive.google.com/file/d/1Ev97BaC42OEv6SS3HfqBUbJjrRf_6iX1/view?usp=sharing" }]
  },
  {
    year: "2019", short: "SAIE", thumbnail: "assets/images/publications/img-exp.jpg",
    title: "Structure-aware Image Expansion with Global Attention",
    authors: "Dewen Guo, Jie Feng, Bingfeng Zhou",
    venue: "ACM SIGGRAPH Asia 2019 Technical Briefs · Brisbane, Australia",
    links: [
      { label: "Paper", url: "https://drive.google.com/file/d/1uhwy__0kgKzzuIdulmxLHgjJ4xeQd2GY/view?usp=sharing" },
      { label: "Supplement", url: "https://drive.google.com/file/d/1pFZSpAvSJIBjBqOh597uS6LFhYftfOEm/view?usp=sharing" }
    ]
  }
];

const emphasizeName = (authors) => authors.replaceAll("Dewen Guo", "<strong>Dewen Guo</strong>");

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
        ${(paper.links ?? []).length ? `<div class="publication-links">${paper.links.map((link) => `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label} ↗</a>`).join("")}</div>` : ""}
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

renderVideos();
renderPublications();
observeReveals();

document.querySelector("#year-filter").addEventListener("change", (event) => renderPublications(event.target.value));
document.querySelector("#current-year").textContent = new Date().getFullYear();
