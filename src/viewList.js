class ViewList {
  _parentElement = document.querySelector(".data-table");
  _data;

  addHandlerEditRecord(handler, type) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(`.item-${type}`);
      if (!btn) return;
      const currentRecord = btn.dataset.currentRecord;
      handler(currentRecord);
    });
  }

  addHandlerDeleteAll(handler) {
    const newParentElement = document.querySelector(".data-list");
    newParentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-delete-all");
      if (!btn) return;
      handler();
    });
  }

  addHandlerDeleteInvoice(handler) {
    const newParentElement = document.querySelector(".data-list");
    newParentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-delete-invoice");
      if (!btn) return;
      const invoice = document.querySelector(".delete-invoice").value;
      handler(invoice);
    });
  }

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

  _generateMarkup() {
    return `
      <tr>
        <td>${this._data.sn}</td>
        <td>${this._data.productInvoice}</td>
        <td>${this._data.productName}</td>
        <td>${this._data.productCategory}</td>
        <td>${this._data.productQuantity}</td>
        <td>${this._data.productPrice}</td>
        <td>${this._data.productTaxes}%</td>
        <td>${this._data.productDiscount}</td>
        <td>${this._data.productDis}%</td>
        <td>${this._data.productTotal}</td>
        <td>${this._data.productStatus}</td>
        <td><button class="item-update" data-current-record=${this._data.sn}>Update</button></td>
        <td><button class="item-copy" data-current-record=${this._data.sn}>Copy</button></td>
        <td><button class="item-delete" data-current-record=${this._data.sn}>Delete</button></td>
      </tr>
    `;
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  renderRows(arr) {
    arr.forEach((product) => {
      this.render(product);
    });
  }

  _generateMarkupHeaders() {
    return `
      <tr>
        <th>#</th>
        <th>Invoice</th>
        <th>Name</th>
        <th>Category</th>
        <th>Qty.</th>
        <th>Price</th>
        <th>Taxes</th>
        <th>Discount</th>
        <th>%</th>
        <th>Total</th>
        <th>Status</th>
        <th>Update</th>
        <th>Copy</th>
        <th>Delete</th>
      </tr>
    `;
  }

  renderReset() {
    const markup = this._generateMarkupHeaders();
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new ViewList();
