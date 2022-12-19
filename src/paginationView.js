import view from "./view.js";

class PaginationView extends view {
  _parentElement = document.querySelector(".list-pagination");

  addHandlerMove(handler, curPage) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.classList.contains("right")) {
        e.target.dataset.go = +curPage + 1;
        const goTo = e.target.dataset.go;
        const limit = +document.querySelector(".total-pages").textContent;
        if (goTo > limit) return;
        curPage++;
        document.querySelector(".current-page").textContent = goTo;
        const per = +document.querySelector(".number-per-page").value;
        handler(goTo, per);
      }
      if (e.target.classList.contains("left")) {
        e.target.dataset.go = curPage - 1;
        const goTo = e.target.dataset.go;
        if (goTo < 1) return;
        curPage--;
        document.querySelector(".current-page").textContent = goTo;
        const per = +document.querySelector(".number-per-page").value;
        handler(goTo, per);
      } else return;
    });
  }

  addHandlerChangePageCount(handler, handler2) {
    const search = document.querySelector(".search");
    search.addEventListener("change", function (e) {
      const select = e.target.closest(".number-per-page");
      if (!select) return;
      const per = select.value;
      handler(per);
      const last = document.querySelector(".total-pages").textContent;
      const current = document.querySelector(".current-page").textContent;
      if (+current > +last) {
        handler2(+last, +per);
        const final = document.querySelector(".total-pages").textContent;
        document.querySelector(".current-page").textContent = final;
      }
    });
  }
}

export default new PaginationView();
