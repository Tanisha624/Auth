const form = document.getElementById("signup-form");
const messageEl = document.getElementById("message");
const submitBtn = document.getElementById("submit-btn");

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  submitBtn.disabled = true;
  submitBtn.textContent = "Creating…";

  try {
    const data = await Auth.register(username, email, password);
    localStorage.setItem("token", data.token);
    showMessage(`Account created. Welcome, ${data.user.username}.`, "success");
    setTimeout(() => (window.location.href = "dashboard.html"), 600);
  } catch (err) {
    showMessage(err.message, "error");
    submitBtn.disabled = false;
    submitBtn.textContent = "Sign up";
  }
});