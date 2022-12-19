export const state = {
  invoices: [],
  results: [],
  page: 1,
};

export const getInvoicesPerPage = function (page = state.page, perPage) {
  state.totalPages = Math.ceil(state.invoices.length / +perPage);
  state.page = page;
  const start = (page - 1) * perPage;
  const end = page * perPage;
  return state.invoices.slice(start, end);
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

const searchField = document.querySelector(".search-field");

export const searchName = function () {
  const query = searchField.value.toLowerCase();
  state.results = state.invoices.filter((product) =>
    product.productName.toLowerCase().includes(query)
  );
};
export const searchCategory = function () {
  const query = searchField.value.toLowerCase();
  state.results = state.invoices.filter((product) =>
    product.productCategory.toLowerCase().includes(query)
  );
};
