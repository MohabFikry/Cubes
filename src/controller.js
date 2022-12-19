import * as model from "./model.js";
import viewNight from "./viewNight.js";
import viewList from "./viewList.js";
import paginationView from "./paginationView.js";
import viewSubmission from "./viewSubmission.js";

//Form fileds declaration
const invoice = document.querySelector(".product-invoice");
const name = document.querySelector(".product-title");
const category = document.querySelector(".product-category");
const price = document.querySelector(".product-price");
const taxes = document.querySelector(".product-taxes");
const quantity = document.querySelector(".product-quantity");
const discount = document.querySelector(".product-discount");
const dis = document.querySelector(".product-dis");
const status = document.querySelector(".product-status");
const total = document.querySelector(".product-total");
//span total count of products
const count = document.querySelector(".btn-count");
//recalculate invoice list
const controlCount = function () {
  count.textContent = model.state.invoices.length;
  viewList.recordsMessage(model.state.invoices);
};

const controlSubmission = function (data) {
  model.getData(data);
  viewList.render(data);
  controlCount();
  controlTotalPages();
  controlMove(model.state.totalPages);
  paginationView.addHandlerMove(controlMove, model.state.totalPages);
  document.querySelector(".current-page").textContent = model.state.totalPages;
};

const controlTotal = function () {
  const totalBeforeDis =
    (+price.value + (+taxes.value / 100) * +price.value) * +quantity.value;
  total.value = +(totalBeforeDis - +discount.value).toFixed(2);

  dis.value = (
    (+discount.value / (totalBeforeDis <= 0 ? 0.000000001 : totalBeforeDis)) *
    100
  ).toFixed(2);
};

const controlStorage = function () {
  model.getStorage();
  viewList.renderRows(model.state.invoices);
  controlCount();
  controlTotalPages();
};

const controlDeleteAll = function () {
  model.deleteAll();
  viewList.renderReset();
  controlCount();
  controlTotalPages();
};

const controlDeleteInvoice = function (invoice) {
  model.deleteInvoice(invoice);
  viewList.renderReset();
  viewList.renderRows(model.state.invoices);
  document.querySelector(".delete-invoice").value = "";
  controlCount();
  controlTotalPages();
  controlMove();
};

const controlDeleteRecord = function (currentRecord) {
  model.deleteCurrentRecord(currentRecord);
  controlCount();
  viewList.renderReset();
  viewList.renderRows(model.state.invoices);
  controlTotalPages();
};

const fillForm = function (current) {
  invoice.value = current.productInvoice;
  name.value = current.productName;
  category.value = current.productCategory;
  price.value = current.productPrice;
  taxes.value = current.productTaxes;
  quantity.value = current.productQuantity;
  discount.value = current.productDiscount;
  dis.value = current.productDis;
  status.value = current.productStatus;
  total.value = current.productTotal;
};

const controlUpdateRecord = function (currentRecord) {
  const current = model.state.invoices.find(
    (curr) => curr.sn === +currentRecord
  );
  fillForm(current);
  controlDeleteRecord(currentRecord);
  controlCount();
  controlTotalPages();
  controlMove();
};

const controlCopyRecord = function (currentRecord) {
  const current = model.state.invoices.find(
    (curr) => curr.sn === +currentRecord
  );
  fillForm(current);
};

const controlSearchName = function () {
  model.searchName();
  viewList.renderReset();
  viewList.renderRows(model.state.results);
};

const controlSearchCategory = function () {
  model.searchCategory();
  viewList.renderReset();
  viewList.renderRows(model.state.results);
};

const controlClearBtn = function () {
  viewList.renderReset();
  viewList.renderRows(model.state.invoices);
};

const totalPages = document.querySelector(".total-pages");

const perPage = +document.querySelector(".number-per-page").value;

const controlTotalPages = function (per = +perPage) {
  viewList.renderReset();
  viewList.renderRows(model.getInvoicesPerPage(model.state.page, +per));
  totalPages.textContent = Math.ceil(model.state.invoices.length / +per);
};

const controlMove = function (goTo, per = +perPage) {
  viewList.renderReset();
  viewList.renderRows(model.getInvoicesPerPage(goTo, per));
};

const init = function () {
  viewSubmission.addHandlerGetData(controlSubmission);
  viewSubmission.addHandlerCalculateTotal(controlTotal);
  viewSubmission.addHandlerGetDataStorage(controlStorage);
  viewList.addHandlerDeleteAll();
  viewList.addHandlerDeleteInvoice(controlDeleteInvoice);
  viewList.addHandlerEditRecord(controlDeleteRecord, "delete");
  viewList.addHandlerEditRecord(controlUpdateRecord, "update");
  viewList.addHandlerEditRecord(controlCopyRecord, "copy");
  viewNight.addHandlerSwitchMode();
  viewList.addHandlerSearch(controlSearchName, controlSearchCategory);
  viewList.addHandlerClearBtn(controlClearBtn);
  viewList.addHandlerModal(controlDeleteAll);
  paginationView.addHandlerMove(controlMove, model.state.page);
  paginationView.addHandlerChangePageCount(controlTotalPages, controlMove);
};

init();
