// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio Loaded ✅");

  /* ---------- Smooth Scroll ---------- */
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault(); // Stop instant jump
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 60, // offset for navbar
          behavior: "smooth"
        });
      }
    });
  });

  /* ---------- Dark Mode Toggle ---------- */
  const toggleBtn = document.createElement("button");
  toggleBtn.innerText = "🌙 Dark Mode";
  toggleBtn.className = "toggle-btn";
  document.querySelector("header").appendChild(toggleBtn);

  let darkMode = false;
  toggleBtn.addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.classList.toggle("dark-theme");

    toggleBtn.innerText = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
  });

  /* ---------- Back to Top Button ---------- */
  const backToTop = document.createElement("button");
  backToTop.innerText = "⬆ Top";
  backToTop.className = "back-to-top";
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});
