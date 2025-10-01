'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

const typewriterElement = document.getElementById('typewriter');
const titles = ["Data Analyst","Business Scientist"];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentTitle = titles[titleIndex];
  
  // Adjust text content based on typing or deleting mode
  typewriterElement.textContent = currentTitle.substring(0, charIndex);
  
  if (!isDeleting) {
    // Typing effect
    if (charIndex < currentTitle.length) {
      charIndex++;
      setTimeout(type, 100); // Typing speed
    } else {
      // Pause at the end of the title
      isDeleting = true;
      setTimeout(type, 1000); // Delay before deletion starts
    }
  } else {
    // Deleting effect
    if (charIndex > 0) {
      charIndex--;
      setTimeout(type, 50); // Deleting speed
    } else {
      // Move to the next title and start typing again
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      setTimeout(type, 500); // Delay before starting the next title
    }
  }
}

// Start the typewriter animation
document.addEventListener('DOMContentLoaded', type);


document.addEventListener('DOMContentLoaded', type);

// Add this to your existing JavaScript file
document.addEventListener("DOMContentLoaded", () => {
  const marquee = document.querySelector(".logo-marquee")
  const marqueeContent = document.querySelector(".logo-marquee-content")

  // Clone the content if it's not already cloned
  if (marquee.children.length === 1) {
    marquee.appendChild(marqueeContent.cloneNode(true))
  }

  // Reset animation when it ends
  marquee.addEventListener("animationiteration", () => {
    marquee.style.animation = "none"
    marquee.offsetHeight // Trigger reflow
    marquee.style.animation = null
  })
})


document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const mainContent = document.getElementById("main-content");
  const closeBtn = document.getElementById("closePopup");
  let confettiInterval;

  function startConfetti() {
    confettiInterval = setInterval(() => {
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        disableForReducedMotion: true
      });
    }, 500);
  }

  function stopConfetti() {
    // Clear the interval first
    clearInterval(confettiInterval);
    
    // Force stop all confetti animations
    confetti.reset();
    
    // Additional cleanup - remove any remaining canvas elements
    const canvases = document.querySelectorAll('.confetti-canvas');
    canvases.forEach(canvas => canvas.remove());
  }

  popup.style.display = "flex";
  startConfetti();

  closeBtn.addEventListener("click", () => {
    stopConfetti();
    popup.style.display = "none";
    mainContent.style.display = "block";
  });
});