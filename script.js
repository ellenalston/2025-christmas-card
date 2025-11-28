// Smooth scroll, fade-in sections, and password gate

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for hero button
  const scrollButton = document.querySelector("[data-scroll-target]");
  if (scrollButton) {
    scrollButton.addEventListener("click", () => {
      const targetSelector = scrollButton.getAttribute("data-scroll-target");
      const targetEl = document.querySelector(targetSelector);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  // Fade-in sections on scroll
  const sections = document.querySelectorAll(".fade-section");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach(section => observer.observe(section));
  } else {
    // Fallback: reveal all sections
    sections.forEach(section => section.classList.add("in-view"));
  }

  // Auto-remove gate if already authenticated
  if (localStorage.getItem("authenticated") === "true") {
    const gate = document.getElementById("password-gate");
    if (gate) gate.remove();
  }
});

function checkPassword() {
  const input = document.getElementById("password").value.trim();
  const correctPassword = "pickles"; // change if you want

  if (input === correctPassword) {
    const gate = document.getElementById("password-gate");
    if (gate) gate.remove();
    localStorage.setItem("authenticated", "true");
    window.scrollTo({ top: 0, behavior: "auto" });
  } else {
    const error = document.getElementById("gate-error");
    if (error) error.style.display = "block";
  }
}
