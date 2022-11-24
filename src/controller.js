import * as model from "./model.js";
import viewNight from "./viewNight.js";
import view from "./view.js";
import viewList from "./viewList.js";
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
};

const controlDeleteAll = function () {
  model.deleteAll();
  viewList.renderReset();
  controlCount();
};

const controlDeleteInvoice = function (invoice) {
  model.deleteInvoice(invoice);
  viewList.renderReset();
  viewList.renderRows(model.state.invoices);
  document.querySelector(".delete-invoice").value = "";
  controlCount();
};

const controlDeleteRecord = function (currentRecord) {
  model.deleteCurrentRecord(currentRecord);
  controlCount();
  viewList.renderReset();
  viewList.renderRows(model.state.invoices);
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
};

const controlCopyRecord = function (currentRecord) {
  const current = model.state.invoices.find(
    (curr) => curr.sn === +currentRecord
  );
  fillForm(current);
};

const init = function () {
  view.addHandlerGetData(controlSubmission);
  view.addHandlerCalculateTotal(controlTotal);
  view.addHandlerGetDataStorage(controlStorage);
  viewList.addHandlerDeleteAll(controlDeleteAll);
  viewList.addHandlerDeleteInvoice(controlDeleteInvoice);
  viewList.addHandlerEditRecord(controlDeleteRecord, "delete");
  viewList.addHandlerEditRecord(controlUpdateRecord, "update");
  viewList.addHandlerEditRecord(controlCopyRecord, "copy");
  viewNight.addHandlerSwitchMode();
};

init();
