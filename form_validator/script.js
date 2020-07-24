const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#password-confirm");

function showError(input, msg) {
  const formControl = input.parentElement;
  formControl.classList.add("error");
  const errorEl = formControl.querySelector("small");
  errorEl.innerText = msg;
}

function showSuccess(input) {
  input.parentElement.classList.add("success");
}

function getFieldName(inputField) {
  return inputField.id.charAt(0).toUpperCase() + inputField.id.slice(1);
}

function validateInput(inputArray) {
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    }
    showSuccess(input);
  });
}

function validateLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} needs to be at least ${min} characters long`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} can't be longer than ${max} characters long`
    );
    showSuccess(input);
  }
}

function matchPassword(input1, input2) {
  if (input1.value != input2.value)
    showError(input2, "Password must match confirmation");
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email.value)) {
    showError(email, "Email is not valid");
  }
  showSuccess(email);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  validateInput([username, email, password, passwordConfirm]);
  validateLength(username, 3, 15);
  validateLength(password, 6, 25);
  validateEmail(email);
  matchPassword(password, passwordConfirm);
});
