const balanceEl = document.querySelector("#balance");
const incomeEl = document.querySelector("#money-plus");
const expenseEl = document.querySelector("#money-minus");
const list = document.querySelector("#list");
const form = document.querySelector("#form");
const text = document.querySelector("#text");
const amount = document.querySelector("#amount");
const reset = document.querySelector("#reset-btn");

let transactions = JSON.parse(localStorage.getItem("transactions"))
  ? JSON.parse(localStorage.getItem("transactions"))
  : [];

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransactionToDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)} rsd</span>
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">X</button>
  `;
  list.appendChild(item);
}
function removeTransaction(id) {
  transactions = transactions.filter(item => id !== item.id);

  updateLocalStorage();
  init();
}

function resetTracker() {
  transactions = [];
  localStorage.setItem("transactions", []);
  updateLocalStorage();
  init();
}

function updateValues() {
  const amounts = transactions.map(item => item.amount);
  const balance = amounts.reduce((acc, val) => acc + val, 0);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, val) => (acc += val), 0);
  const expense = amounts
    .filter(item => item < 0)
    .reduce((acc, val) => (acc += val), 0);
  balanceEl.classList.add(`${balance < 0 ? "minus" : "plus"}`);
  balanceEl.innerText = `${balance} rsd`;
  incomeEl.innerText = `${income} rsd`;
  expenseEl.innerText = `${Math.abs(expense)} rsd`;
}

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Morate ispuniti oba polja");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionToDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
}

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionToDOM);
  updateValues();
}
init();

form.addEventListener("submit", addTransaction);
reset.addEventListener("click", resetTracker);
