const API_BASE = "http://localhost:3000/api/auth";

const TokenStore = {
  get() { return localStorage.getItem("token"); },
  set(token) { localStorage.setItem("token", token); },
  clear() { localStorage.removeItem("token"); },
};

async function apiRequest(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = TokenStore.get();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try { data = await res.json(); } catch {}

  if (!res.ok) {
    throw new Error((data && data.message) || `Request failed (${res.status})`);
  }
  return data;
}

const Auth = {
  register: (username, email, password) =>
    apiRequest("/register", { method: "POST", body: { username, email, password } }),

  login: (identifier, password) =>
    apiRequest("/login", { method: "POST", body: { username: identifier, email: identifier, password } }),

  logout: () => apiRequest("/logout", { method: "POST", auth: true }),

  getMe: () => apiRequest("/get-me", { auth: true }),

  isLoggedIn: () => !!TokenStore.get(),
};