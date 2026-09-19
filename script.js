'use strict';

// All personal content is in index.html. This file adds optional enhancements.
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');

function closeMenu() {
  navigation.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuToggle.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});

window.matchMedia('(min-width: 601px)').addEventListener('change', closeMenu);

const filters = document.querySelectorAll('[data-filter]');
const publications = document.querySelectorAll('[data-topic]');
filters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    publications.forEach((publication) => {
      publication.hidden = selected !== 'all' && publication.dataset.topic !== selected;
      if (!publication.hidden) visible++;
    });
    document.querySelector('#filter-status').textContent = `Showing ${visible} ${selected === 'all' ? '' : button.textContent.toLowerCase() + ' '}publication${visible === 1 ? '' : 's'}.`;
  });
});

const copyButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');
let copyTimeout;
copyButton.addEventListener('click', async () => {
  clearTimeout(copyTimeout);
  try {
    await navigator.clipboard.writeText('shammo.biswas@bracu.ac.bd');
    copyStatus.textContent = 'Email address copied.';
  } catch {
    // The address remains selectable when clipboard access is unavailable.
    const address = document.querySelector('.email-link');
    const range = document.createRange();
    range.selectNodeContents(address);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    copyStatus.textContent = 'Select and copy the email address above.';
  }
  copyTimeout = setTimeout(() => { copyStatus.textContent = ''; }, 5000);
});

document.querySelector('#current-year').textContent = new Date().getFullYear();

// A lightweight, deterministic SVG point cloud: no image assets or WebGL required.
const svgNS = 'http://www.w3.org/2000/svg';
const grid = document.querySelector('#visual-grid');
const points = document.querySelector('#visual-points');
function project(x, y, z) {
  return [200 + x * .88 - z * .65, 174 + x * .30 + z * .41 - y];
}
function line(start, end, attributes = {}) {
  const node = document.createElementNS(svgNS, 'line');
  const [x1, y1] = project(...start);
  const [x2, y2] = project(...end);
  Object.entries({ x1, y1, x2, y2, ...attributes }).forEach(([key, value]) => node.setAttribute(key, value));
  grid.append(node);
}
for (let i = -100; i <= 100; i += 25) {
  line([i, -100, -100], [i, -100, 100]);
  line([-100, -100, i], [100, -100, i]);
}
line([0, -100, 0], [0, 150, 0], { stroke: '#b4beab', 'stroke-dasharray': '3 5' });
line([-105, -100, 0], [165, -100, 0], { stroke: '#a5b299' });
line([0, -100, -110], [0, -100, 175], { stroke: '#a5b299' });
const cloud = [];
const goldenAngle = Math.PI * (3 - Math.sqrt(5));
for (let i = 0; i < 1350; i++) {
  const y = 1 - (i / 1349) * 2;
  const ring = Math.sqrt(1 - y * y);
  const angle = goldenAngle * i;
  const distortion = 1 + .065 * Math.sin(angle * 3 + y * 8);
  const x = Math.cos(angle) * ring * 107 * distortion;
  const z = Math.sin(angle) * ring * 107 * distortion;
  const vertical = y * 112;
  const depth = x * .4 + z * .8;
  cloud.push({ position: project(x, vertical, z), depth, index: i });
}
cloud.sort((a, b) => a.depth - b.depth);
const fragment = document.createDocumentFragment();
cloud.forEach(({ position, depth, index }) => {
  const dot = document.createElementNS(svgNS, 'circle');
  dot.setAttribute('cx', position[0].toFixed(2));
  dot.setAttribute('cy', position[1].toFixed(2));
  dot.setAttribute('r', (depth > 0 ? 1.12 : .8).toString());
  dot.setAttribute('fill', index % 13 === 0 ? '#a0ac70' : '#41674c');
  dot.setAttribute('opacity', (.28 + (depth + 115) / 230 * .64).toFixed(2));
  fragment.append(dot);
});
points.append(fragment);

// Highlight the section currently being read, including near the end of the page.
const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const sections = navLinks.map((link) => document.querySelector(link.getAttribute('href')));
let scrollScheduled = false;
function updateNavigation() {
  const readingLine = window.innerHeight * .35;
  let current = null;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= readingLine) current = section.id;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) current = 'contact';
  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollScheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scrollScheduled) {
    scrollScheduled = true;
    requestAnimationFrame(updateNavigation);
  }
}, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
