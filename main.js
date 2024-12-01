let id = (id) => document.getElementById(id);
let classes = (classes) => document.getElementsByClassName(classes);

let username = id("username"),
  email = id("email"),
  password = id("password"),
  confirmPassword = id("confirm-password"),
  form = id("form"),
  errorMsg = classes("error");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  // Проверяем каждый инпут
  valid = engine(username, 0, "Username cannot be blank") && valid;
  valid = engine(email, 1, "Email cannot be blank") && valid;
  valid = validatePassword(password, 2) && valid;
  valid = confirmPasswords(password, confirmPassword, 3) && valid;

  if (valid) {
    saveToStorage();
    window.location.href = "success.html"; // Переход на другую страницу
  }
});

function engine(id, serial, message) {
  if (id.value.trim() === "") {
    errorMsg[serial].innerHTML = message;
    id.style.border = "2px solid red";
    return false;
  } else {
    errorMsg[serial].innerHTML = "";
    id.style.border = "2px solid green";
    return true;
  }
}

function validatePassword(id, serial) {
  const passwordValue = id.value.trim();
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!regex.test(passwordValue)) {
    errorMsg[serial].innerHTML =
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    id.style.border = "2px solid red";
    return false;
  } else {
    errorMsg[serial].innerHTML = "";
    id.style.border = "2px solid green";
    return true;
  }
}

function confirmPasswords(password, confirmPassword, serial) {
  if (password.value.trim() !== confirmPassword.value.trim()) {
    errorMsg[serial].innerHTML = "Passwords do not match.";
    confirmPassword.style.border = "2px solid red";
    return false;
  } else {
    errorMsg[serial].innerHTML = "";
    confirmPassword.style.border = "2px solid green";
    return true;
  }
}

function saveToStorage() {
  const userData = {
    username: username.value,
    email: email.value,
    password: password.value,
  };

  localStorage.setItem("userData", JSON.stringify(userData));
}