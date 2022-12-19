class ViewNight {
  _parentElement = document.querySelector("footer");

  addHandlerSwitchMode() {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-toggle-mode");
      const circle = document.querySelector(".dark-animation");
      if (!btn) return;

      circle.classList.toggle("dark-hide");
      circle.classList.toggle("dark-view");
      document.body.classList.toggle("dark-theme");
      if (circle.classList.contains("dark-hide")) {
        btn.src = "./src/img/night-mode.png";
      }
      if (circle.classList.contains("dark-view")) {
        btn.src = "./src/img/light-mode.png";
      }
    });
  }
}

export default new ViewNight();
