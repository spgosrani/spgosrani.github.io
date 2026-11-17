// 1. Put the current year in the footer so you never have to update it.
document.getElementById("year").textContent = new Date().getFullYear();

const main = document.querySelector("main");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// 2. Fill the line down the left side as you scroll.
let waiting = false;

function updateLine() {
  waiting = false;
  if (prefersReducedMotion) {
    main.style.setProperty("--progress", "100%");
    return;
  }
  const box = main.getBoundingClientRect();
  const reach = window.innerHeight * 0.6;               // the line fills down to 60% of the screen height
  const share = Math.min(1, Math.max(0, (reach - box.top) / box.height));
  main.style.setProperty("--progress", (share * 100).toFixed(1) + "%");
}

window.addEventListener("scroll", () => {
  if (!waiting) {
    waiting = true;
    requestAnimationFrame(updateLine);
  }
}, { passive: true });
window.addEventListener("resize", updateLine);
updateLine();

// 3. Fill in each dot once you scroll to it.
const dotObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("reached");
    });
  },
  { rootMargin: "0px 0px -35% 0px" }
);

document.querySelectorAll("main > section, .timeline li").forEach((el) => dotObserver.observe(el));

// 4. Highlight the nav link for the section currently on screen.
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".site-header nav a");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((section) => navObserver.observe(section));
