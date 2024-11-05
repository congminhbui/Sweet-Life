document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".nav-bar");

  if (hamburger && navbar) {
    // Check that both elements exist
    hamburger.onclick = function () {
      navbar.classList.toggle("active");
    };
  } else {
    console.error("One or more elements (hamburger, navbar) not found.");
  }
});
