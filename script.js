const data = window.PORTFOLIO_DATA || { projects: [] };
const projects = data.projects || [];
const skills = data.skills || [];

const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
const mobileLinks = document.querySelectorAll(".mobile-nav a");
const sections = document.querySelectorAll("main section[id]");
const desktopLinks = document.querySelectorAll(".desktop-nav a");
const headshot = document.querySelector(".headshot");
const headshotImage = document.querySelector(".headshot-image");
const resumeLink = document.querySelector("#resume-link");

function menuIcon(name) {
  const paths =
    name === "close"
      ? '<path d="M18 6 6 18M6 6l12 12"></path>'
      : '<path d="M4 6h16M4 12h16M4 18h16"></path>';

  return `
    <svg class="icon menu-icon" aria-hidden="true" viewBox="0 0 24 24">
      ${paths}
    </svg>
  `;
}

function closeMenu() {
  mobileNav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  menuButton.innerHTML = menuIcon("menu");
}

menuButton.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuButton.innerHTML = menuIcon(isOpen ? "close" : "menu");
});

mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileNav.classList.contains("is-open")) {
    closeMenu();
  }
});

headshotImage.addEventListener("load", () =>
  headshot.classList.remove("image-unavailable"),
);
headshotImage.addEventListener("error", () =>
  headshot.classList.add("image-unavailable"),
);
if (headshotImage.complete && headshotImage.naturalWidth === 0) {
  headshot.classList.add("image-unavailable");
}

resumeLink.addEventListener("click", (event) => {
  if (resumeLink.getAttribute("aria-disabled") === "true") {
    event.preventDefault();
  }
});

if (window.location.protocol.startsWith("http")) {
  fetch(resumeLink.dataset.resumePath, { method: "HEAD" })
    .then((response) => {
      if (!response.ok) return;
      resumeLink.removeAttribute("aria-disabled");
      resumeLink.querySelector("span").textContent = "Download resume";
      resumeLink.setAttribute("download", "");
      resumeLink.classList.remove("text-link-muted");
    })
    .catch(() => {});
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      desktopLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" },
);

sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("load", () => {
  if (!window.location.hash) return;
  const target = document.querySelector(window.location.hash);
  if (target) target.scrollIntoView();
});

const stage = document.querySelector("#project-stage");
const orbit = document.querySelector("#project-orbit");
const counter = document.querySelector("#project-counter");
const activeCategory = document.querySelector("#active-project-category");
const activeTitle = document.querySelector("#active-project-title");
const previousButton = document.querySelector("#project-previous");
const nextButton = document.querySelector("#project-next");
const openActiveButton = document.querySelector("#open-active-project");
let projectCards = [];
let activeIndex = 0;
let dragPosition = 0;
let pointerStartX = 0;
let pointerCaptureTarget;
let movedDuringDrag = false;
let isDragging = false;
let lastCopyIndex = -1;

const modulo = (value, divisor) => ((value % divisor) + divisor) % divisor;
const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

function wrappedOffset(index) {
  let offset = index - activeIndex;
  const half = projects.length / 2;
  if (offset > half) offset -= projects.length;
  if (offset < -half) offset += projects.length;
  return offset;
}

function projectCard(project, index) {
  const button = document.createElement("button");
  button.className = "project-card";
  button.type = "button";
  button.dataset.index = String(index);
  button.setAttribute("aria-label", `Open ${project.title}`);
  button.innerHTML = `
    <img src="${project.image}" alt="" draggable="false" />
    <span class="project-card-label">
      <span>${project.category}</span>
      <strong>${project.title}</strong>
    </span>
  `;
  button.addEventListener("click", () => {
    if (movedDuringDrag) return;
    if (index === activeIndex) {
      openProject(project);
      return;
    }
    selectProject(index);
  });
  return button;
}

function updateActiveCopy() {
  const project = projects[activeIndex];
  if (!project || lastCopyIndex === activeIndex) return;
  lastCopyIndex = activeIndex;
  counter.textContent =
    `${String(activeIndex + 1).padStart(2, "0")} / ` +
    String(projects.length).padStart(2, "0");
  activeCategory.textContent = `${project.category} | ${project.year}`;
  activeTitle.textContent = project.title;
  const copy = activeTitle.closest(".project-active-copy");
  copy.classList.remove("is-updating");
  requestAnimationFrame(() => copy.classList.add("is-updating"));
}

function renderCarousel() {
  if (!projects.length) return;
  const width = stage.clientWidth;
  const spacing = Math.min(width * 0.34, 430);

  projectCards.forEach((card, index) => {
    const position = wrappedOffset(index) + dragPosition;
    const distance = Math.abs(position);
    const x = position * spacing;
    const y = Math.min(distance, 1.5) * 18;
    const scale = Math.max(0.56, 1 - distance * 0.25);
    const opacity = distance > 1.75 ? 0 : Math.max(0.36, 1 - distance * 0.4);

    card.style.transform =
      `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
    card.style.opacity = String(opacity);
    card.style.zIndex = String(20 - Math.round(distance * 5));
    card.style.pointerEvents = distance > 1.75 ? "none" : "auto";
    card.classList.toggle(
      "is-active",
      index === activeIndex && Math.abs(dragPosition) < 0.12,
    );
    card.setAttribute("aria-current", index === activeIndex ? "true" : "false");
    card.setAttribute("aria-hidden", distance > 1.75 ? "true" : "false");
  });

  updateActiveCopy();
}

function selectProject(index) {
  activeIndex = modulo(index, projects.length);
  dragPosition = 0;
  renderCarousel();
}

function startDrag(event) {
  if (event.button !== undefined && event.button !== 0) return;
  if (event.target.closest(".carousel-arrow")) return;
  isDragging = true;
  movedDuringDrag = false;
  pointerStartX = event.clientX;
  pointerCaptureTarget = event.target.closest(".project-card") || stage;
  stage.classList.add("is-dragging");
  pointerCaptureTarget.setPointerCapture(event.pointerId);
}

function moveDrag(event) {
  if (!isDragging) return;
  const delta = event.clientX - pointerStartX;
  if (Math.abs(delta) > 5) movedDuringDrag = true;
  const spacing = Math.min(stage.clientWidth * 0.34, 430);
  dragPosition = clamp(delta / Math.max(spacing, 1), -1.2, 1.2);
  renderCarousel();
}

function endDrag(event) {
  if (!isDragging) return;
  isDragging = false;
  stage.classList.remove("is-dragging");
  if (pointerCaptureTarget?.hasPointerCapture(event.pointerId)) {
    pointerCaptureTarget.releasePointerCapture(event.pointerId);
  }
  pointerCaptureTarget = undefined;

  const shift = Math.abs(dragPosition) >= 0.2 ? Math.round(-dragPosition) : 0;
  activeIndex = modulo(activeIndex + shift, projects.length);
  dragPosition = 0;
  renderCarousel();
  window.setTimeout(() => {
    movedDuringDrag = false;
  }, 0);
}

if (projects.length) {
  projectCards = projects.map((project, index) => projectCard(project, index));
  projectCards.forEach((card) => orbit.appendChild(card));
  renderCarousel();

  previousButton.addEventListener("click", () => selectProject(activeIndex - 1));
  nextButton.addEventListener("click", () => selectProject(activeIndex + 1));
  openActiveButton.addEventListener("click", () => openProject(projects[activeIndex]));
  stage.addEventListener("pointerdown", startDrag);
  stage.addEventListener("pointermove", moveDrag);
  stage.addEventListener("pointerup", endDrag);
  stage.addEventListener("pointercancel", endDrag);
  stage.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectProject(activeIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectProject(activeIndex + 1);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      openProject(projects[activeIndex]);
    }
  });
  window.addEventListener("resize", renderCarousel);
}

const skillsSection = document.querySelector("#skills");
const skillsTrack = document.querySelector("#skills-track");
const skillsList = document.querySelector("#skills-accessible-list");
const skillsMotionToggle = document.querySelector("#skills-motion-toggle");

function skillItem(skill) {
  const item = document.createElement("div");
  item.className = "skill-item";

  const logo = document.createElement("span");
  logo.className = "skill-logo";
  const image = document.createElement("img");
  image.src = skill.icon;
  image.alt = "";
  image.decoding = "async";
  logo.appendChild(image);

  const copy = document.createElement("span");
  copy.className = "skill-copy";
  const name = document.createElement("strong");
  name.textContent = skill.name;
  const category = document.createElement("span");
  category.textContent = skill.category;
  copy.append(name, category);

  item.append(logo, copy);
  return item;
}

function skillsSequence() {
  const sequence = document.createElement("div");
  sequence.className = "skills-sequence";
  for (let repeat = 0; repeat < 6; repeat += 1) {
    skills.forEach((skill) => sequence.appendChild(skillItem(skill)));
  }
  return sequence;
}

function skillsMotionIcon(isPaused) {
  const path = isPaused
    ? '<path d="m8 5 11 7-11 7z"></path>'
    : '<path d="M9 5v14M15 5v14"></path>';
  return `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24">${path}</svg>`;
}

function setSkillsPaused(isPaused) {
  skillsSection.classList.toggle("is-paused", isPaused);
  skillsMotionToggle.setAttribute("aria-pressed", String(isPaused));
  const label = isPaused ? "Play skills carousel" : "Pause skills carousel";
  skillsMotionToggle.setAttribute("aria-label", label);
  skillsMotionToggle.title = label;
  skillsMotionToggle.innerHTML = skillsMotionIcon(isPaused);
}

if (skills.length) {
  skillsTrack.replaceChildren(skillsSequence(), skillsSequence());
  skillsList.replaceChildren(
    ...skills.map((skill) => {
      const item = document.createElement("li");
      item.textContent = `${skill.name}: ${skill.category}`;
      return item;
    }),
  );
  skillsMotionToggle.addEventListener("click", () => {
    setSkillsPaused(!skillsSection.classList.contains("is-paused"));
  });
} else {
  skillsSection.hidden = true;
}

const dialog = document.querySelector("#project-dialog");
const dialogClose = document.querySelector("#dialog-close");
const dialogImage = document.querySelector("#dialog-image");
const dialogCategory = document.querySelector("#dialog-category");
const dialogTitle = document.querySelector("#dialog-title");
const dialogSummary = document.querySelector("#dialog-summary");
const dialogTags = document.querySelector("#dialog-tags");
const dialogChallenge = document.querySelector("#dialog-challenge");
const dialogApproach = document.querySelector("#dialog-approach");
const dialogOutcome = document.querySelector("#dialog-outcome");
const dialogProjectLink = document.querySelector("#dialog-project-link");
const dialogGithubLink = document.querySelector("#dialog-github-link");

function configureDialogLink(link, url) {
  link.hidden = !url;
  if (url) link.href = url;
}

function openProject(project) {
  dialogImage.src = project.image;
  dialogImage.alt = project.alt;
  dialogCategory.textContent = `${project.category} | ${project.year}`;
  dialogTitle.textContent = project.title;
  dialogSummary.textContent = project.summary;
  dialogChallenge.textContent = project.challenge;
  dialogApproach.textContent = project.approach;
  dialogOutcome.textContent = project.outcome;
  dialogTags.replaceChildren(
    ...project.tags.map((tag) => {
      const item = document.createElement("li");
      item.textContent = tag;
      return item;
    }),
  );
  configureDialogLink(dialogProjectLink, project.projectUrl);
  configureDialogLink(dialogGithubLink, project.githubUrl);
  dialog.classList.remove("is-closing");
  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add("dialog-open");
  requestAnimationFrame(() => {
    window.dispatchEvent(
      new CustomEvent("portfolio:project-open", { detail: project }),
    );
  });
}

function closeProject() {
  if (!dialog.open || dialog.classList.contains("is-closing")) return;
  dialog.classList.add("is-closing");
  window.dispatchEvent(new CustomEvent("portfolio:project-close"));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.setTimeout(
    () => {
      dialog.close();
      dialog.classList.remove("is-closing");
      document.body.classList.remove("dialog-open");
    },
    reduceMotion ? 0 : 280,
  );
}

dialogClose.addEventListener("click", closeProject);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeProject();
});
dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeProject();
});
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));

document.querySelector("#current-year").textContent = new Date().getFullYear();

if (window.location.hash) {
  document.querySelector(window.location.hash)?.scrollIntoView();
}

const requestedProjectId = new URLSearchParams(window.location.search).get("project");
const requestedProjectIndex = projects.findIndex(
  (project) => project.id === requestedProjectId,
);
if (requestedProjectIndex >= 0) {
  window.addEventListener("load", () => {
    selectProject(requestedProjectIndex);
    openProject(projects[requestedProjectIndex]);
  });
}
