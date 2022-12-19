export default class View {
  _data;
  _fullData;

  recordsMessage(invoices) {
    const message = document.querySelector(".records-message");
    const pagination = document.querySelector(".list-pagination");
    if (invoices.length > 0) {
      message.style.display = "none";
      pagination.style.display = "flex";
    } else {
      message.style.display = "flex";
      pagination.style.display = "none";
    }
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderRows(arr) {
    this._fullData = arr;
    arr.forEach((product) => {
      this.render(product);
    });
  }

  renderReset() {
    const markup = this._generateMarkupHeaders();
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
