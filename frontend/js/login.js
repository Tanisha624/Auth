const form = document.getElementById("login-form");
const messageEl = document.getElementById("message");
const submitBtn = document.getElementById("submit-btn");

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const identifier = document.getElementById("identifier").value.trim();
  const password = document.getElementById("password").value;

  submitBtn.disabled = true;
  submitBtn.textContent = "Logging in…";

  try {
    const data = await Auth.login(identifier, password);
    localStorage.setItem("token", data.token);
    showMessage(`Welcome back, ${data.user.username}.`, "success");
    setTimeout(() => (window.location.href = "dashboard.html"), 600);
  } catch (err) {
    showMessage(err.message, "error");
    submitBtn.disabled = false;
    submitBtn.textContent = "Log in";
  }
});