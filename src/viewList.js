import view from "./view.js";

class ViewList extends view {
  _parentElement = document.querySelector(".data-table");

  addHandlerModal(handler) {
    const modal = document.querySelector(".confirm-message");
    modal.addEventListener("click", function (e) {
      if (e.target.classList.contains("close-hide")) {
        modal.classList.add("hidden");
      }
      if (e.target.classList.contains("btn-modal-ok")) {
        handler();
        modal.classList.add("hidden");
      } else {
        return;
      }
    });
  }

  addHandlerClearBtn(handler) {
    const newParentElement = document.querySelector(".data-list");
    newParentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".clear-container");
      if (!btn) return;
      handler();
      document.querySelector(".clear-container").classList.add("hidden");
      document.querySelector(".search-field").value = "";
    });
  }

  addHandlerSearch(handlerName, handelrCaregory) {
    const searchParent = document.querySelector(".search");
    searchParent.addEventListener("click", function (e) {
      if (e.target.classList.contains("by-title")) {
        handlerName();
        document.querySelector(".clear-container").classList.remove("hidden");
      }
      if (e.target.classList.contains("by-category")) {
        handelrCaregory();
        document.querySelector(".clear-container").classList.remove("hidden");
      } else {
        return;
      }
    });
  }

  addHandlerEditRecord(handler, type) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(`.item-${type}`);
      if (!btn) return;
      const currentRecord = btn.dataset.currentRecord;
      handler(currentRecord);
    });
  }

  addHandlerDeleteAll() {
    const newParentElement = document.querySelector(".data-list");
    const modal = document.querySelector(".confirm-message");
    newParentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn-delete-all");
      if (!btn) return;
      modal.classList.remove("hidden");
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
        <td><button class="item-update" data-current-record=${this._data.sn}>Edit</button></td>
        <td><button class="item-copy" data-current-record=${this._data.sn}>Copy</button></td>
        <td><button class="item-delete" data-current-record=${this._data.sn}>Delete</button></td>
      </tr>
    `;
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
        <th>Edit</th>
        <th>Copy</th>
        <th>Delete</th>
      </tr>
    `;
  }
}

export default new ViewList();
