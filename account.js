const accountForm = document.getElementById("accountForm");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const nameField = document.getElementById("nameField");
const fullName = document.getElementById("fullName");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submitBtn");
const formTitle = document.getElementById("formTitle");
const formDescription = document.getElementById("formDescription");
const formMessage = document.getElementById("formMessage");

let currentMode = "login";

function setMode(mode) {
  currentMode = mode;

  const isSignup = mode === "signup";

  nameField.hidden = !isSignup;
  fullName.required = isSignup;

  password.autocomplete = isSignup
    ? "new-password"
    : "current-password";

  formTitle.textContent = isSignup
    ? "Create your account"
    : "Welcome back";

  formDescription.textContent = isSignup
    ? "Join the Market-HuB community."
    : "Sign in to continue to your account.";

  submitBtn.textContent = isSignup
    ? "Create account"
    : "Login";

  loginTab.classList.toggle("active", !isSignup);
  signupTab.classList.toggle("active", isSignup);

  formMessage.textContent = "";
}

loginTab.addEventListener("click", () => {
  setMode("login");
});

signupTab.addEventListener("click", () => {
  setMode("signup");
});

accountForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formMessage.textContent = "";

  if (currentMode === "signup") {
    if (fullName.value.trim().length < 2) {
      formMessage.textContent = "Please enter your full name.";
      return;
    }
  }

  if (password.value.length < 8) {
    formMessage.textContent =
      "Password must contain at least 8 characters.";
    return;
  }

  formMessage.textContent =
    "Account interface ready. Secure account services will be connected next.";
});
