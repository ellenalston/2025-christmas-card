// Smooth scroll for the hero button (and any other in-page anchors)
document.addEventListener("DOMContentLoaded", () => {
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
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15
        }
      );
  
      sections.forEach((section) => observer.observe(section));
    } else {
      // Fallback: just show all sections if IntersectionObserver isn't supported
      sections.forEach((section) => section.classList.add("in-view"));
    }
  });

  function checkPassword() {
    const input = document.getElementById("password").value;
    const correctPassword = "pickles"; // CHANGE THIS
  
    if (input === correctPassword) {
      const gate = document.getElementById("password-gate");
      gate.remove();   // remove from DOM entirely
      localStorage.setItem("authenticated", "true");
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
  
  
  