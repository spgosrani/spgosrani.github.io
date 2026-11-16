// 1. Put the current year in the footer so you never have to update it.
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Highlight the nav link for the section currently on screen.
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".site-header nav a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" } // counts a section as "current" near the middle of the screen
);

sections.forEach((section) => observer.observe(section));
