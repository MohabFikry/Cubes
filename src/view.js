class View {
  _parentElemnt = document.querySelector(".product-data");
  _data;

  addHandlerCalculateTotal(handler) {
    ["change", "keyup", "focusout"].forEach((ev) => {
      this._parentElemnt.addEventListener(ev, function () {
        handler();
      });
    });
  }

  addHandlerGetData(handler) {
    this._parentElemnt.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
      document.querySelectorAll(".clear").forEach((el) => (el.value = ""));
      const scroll = document.querySelector(".table-container .container");
      scroll.scrollTo({
        left: 0,
        top: scroll.scrollHeight,
        behavior: "smooth",
      });
    });
  }

  addHandlerGetDataStorage(handler) {
    window.addEventListener("load", function () {
      handler();
    });
  }
}

export default new View();
