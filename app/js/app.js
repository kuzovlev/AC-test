document.addEventListener("DOMContentLoaded", function () {
  // dropdown menu
  const dropDownMenu = document.querySelectorAll(".menu__dropdown");
  dropDownMenu.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("expanded");
    });
  });
  // MENU
  const menu = document.querySelector(".menu__wrapper");
  const menuButtonToggler = document.querySelector(".menu__mobile");

  menuButtonToggler.addEventListener("click", () => {
    menu.classList.toggle("menu__mobile_shown");
    dropDownMenu.forEach((item) => {
      item.classList.remove("expanded");
    });
  });

  function calcEntryBlockHeight() {
    const entryImageHeight =
      document.querySelector(".visual-entry__img").clientHeight;
    const visualEntryUsp = document.querySelectorAll(".visual-entry__usp-item");
    visualEntryUsp.forEach((item) => {
      item.style.setProperty("--elemHeight", entryImageHeight / 4 + "px");
    });
  }

  calcEntryBlockHeight();

  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 768) calcEntryBlockHeight();
    },
    true
  );

  function accordionSection(sectionIdSelector) {
    const items = document.querySelectorAll(
      sectionIdSelector + ".accordion .accordion__button"
    );

    function toggleAccordion() {
      const itemToggle = this.getAttribute("aria-expanded");

      for (i = 0; i < items.length; i++) {
        items[i].setAttribute("aria-expanded", "false");
      }

      if (itemToggle == "false") {
        this.setAttribute("aria-expanded", "true");
      }
    }

    items.forEach((item) => item.addEventListener("click", toggleAccordion));
  }

  accordionSection("#faq");
  accordionSection("#media");

  // CAROUSEL
  makeSlider('#slider1');
  makeSlider('#slider2');
  makeSlider('#slider3');

  function makeSlider(sliderId) {
    const carousel = document.querySelector(sliderId);
    const carouselDots = carousel.querySelectorAll("[js-data-dots]");
    console.log(carouselDots);
    let slideIndex = 0;

    function activateSlide(slides) {
      slides.forEach((slide) => {
        slide.removeAttribute("data-active-slide");
      });
      slides[slideIndex].setAttribute("data-active-slide", true);
    }
    function activateDots(dots) {
      dots.forEach((dot) => {
        dot.removeAttribute("data-active-dot");
      });
      dots[slideIndex].setAttribute("data-active-dot", true);
    }

    function showslides(carouselWrapper, dots) {
      const slides = carouselWrapper.querySelectorAll("[js-carousel-item]");
      activateSlide(slides);
      activateDots(dots);
    }

    function currentSlide(n) {
      slideIndex = n - 1;
      showslides(carousel, carouselDots);
    }

    function handleDotsClickEvent(dots) {
      dots.forEach((dot) => {
        dot.addEventListener("click", () => {
          currentSlide(parseInt(dot.dataset.dotsIndex));
        });
      });
    }

    function handleClickEvents() {
      handleDotsClickEvent(carouselDots);
      showslides(carousel, carouselDots);
    }
    handleClickEvents();
  }
});
