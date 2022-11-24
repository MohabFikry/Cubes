export const state = {
  invoices: [],
};

export const getData = function (data) {
  state.invoices.push(data);
  setStorage();
};

const setStorage = function () {
  localStorage.setItem("invoices", JSON.stringify(state.invoices));
  state.invoices.forEach((product, i) => (product.sn = i + 1));
};

export const getStorage = function () {
  const data = JSON.parse(localStorage.getItem("invoices"));
  if (!data) return;
  state.invoices.push(...data);
  state.invoices.forEach((product, i) => (product.sn = i + 1));
};

export const deleteAll = function () {
  localStorage.clear();
  state.invoices = [];
};

export const deleteInvoice = function (invoice) {
  const deleteArr = state.invoices.filter(
    (product) => product.productInvoice !== invoice
  );
  state.invoices = deleteArr;
  setStorage();
};

export const deleteCurrentRecord = function (currentRecord) {
  const newRecords = state.invoices.filter(
    (invoice) => invoice.sn !== +currentRecord
  );
  state.invoices = newRecords;
  setStorage();
};

export const updateRecord = function (currentRecord) {};
