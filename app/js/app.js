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
      sectionIdSelector + ".accordion button"
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

});