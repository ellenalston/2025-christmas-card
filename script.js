document.addEventListener("DOMContentLoaded", () => {

  // Smooth scroll button
  const scrollButton = document.querySelector("[data-scroll-target]");
  if (scrollButton) {
    scrollButton.addEventListener("click", () => {
      const targetEl = document.querySelector(scrollButton.dataset.scrollTarget);
      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
    });
  }

  // SAFELY APPLY FADE-IN
  try {
    const sections = document.querySelectorAll(".fade-section");

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            if (entry.target && observer) observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      sections.forEach(section => observer.observe(section));
    } else {
      sections.forEach(section => section.classList.add("in-view"));
    }

  } catch (err) {
    console.warn("Mobile animation disabled:", err);
    document.querySelectorAll(".fade-section").forEach(s => s.classList.add("in-view"));
  }

});


// PASSWORD GATE
function checkPassword() {
  const input = document.getElementById("password").value;
  const correctPassword = "pickles";

  if (input === correctPassword) {
    const gate = document.getElementById("password-gate");
    if (gate) gate.remove();
    localStorage.setItem("authenticated", "true");
    window.scrollTo({ top: 0, behavior: "instant" });
  } else {
    document.getElementById("gate-error").style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("authenticated") === "true") {
    const gate = document.getElementById("password-gate");
    if (gate) gate.remove();
  }
});
