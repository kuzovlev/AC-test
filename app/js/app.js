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
    });
});
