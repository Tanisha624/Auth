const messageEl = document.getElementById("message");
const loadingText = document.getElementById("loading-text");
const userMeta = document.getElementById("user-meta");

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
}

async function loadDashboard() {
  if (!Auth.isLoggedIn()) {
    window.location.href = "login.html";
    return;
  }

  try {
    const { user } = await Auth.getMe();
    loadingText.style.display = "none";
    document.getElementById("meta-username").textContent = user.username;
    document.getElementById("meta-email").textContent = user.email;
    document.getElementById("meta-id").textContent = user.id;
    userMeta.style.display = "block";
  } catch (err) {
    showMessage("Session expired. Redirecting to login…", "error");
    localStorage.removeItem("token");
    setTimeout(() => (window.location.href = "login.html"), 1200);
  }
}

document.getElementById("logout-btn").addEventListener("click", async () => {
  try {
    await Auth.logout();
  } catch {}
  localStorage.removeItem("token");
  window.location.href = "login.html";
});

loadDashboard();