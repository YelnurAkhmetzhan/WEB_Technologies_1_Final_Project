(() => {
  "use strict";
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordRe = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  const read = (key) => { try { return JSON.parse(localStorage.getItem(key) || "null"); } catch (error) { return null; } };
  const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const show = (id, message) => { const box = document.getElementById(id); if (box) box.textContent = message; };

  const signup = document.getElementById("signup-form");
  if (signup) signup.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim().toLowerCase();
    const password = document.getElementById("signup-password").value;
    show("signup-name-error", name.length >= 2 ? "" : "Enter your name.");
    show("signup-email-error", emailRe.test(email) ? "" : "Enter a valid email.");
    show("signup-password-error", passwordRe.test(password) ? "" : "Use 8+ characters with letters and numbers.");
    if (name.length < 2 || !emailRe.test(email) || !passwordRe.test(password)) return;
    save("gg-user", { name, email, password });
    save("gg-current-user", { name, email });
    show("signup-status", "Account created. Opening your profile…");
    setTimeout(() => { window.location.href = "profile.html"; }, 400);
  });

  const login = document.getElementById("login-form");
  if (login) login.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;
    const user = read("gg-user");
    show("login-email-error", emailRe.test(email) ? "" : "Enter a valid email.");
    show("login-password-error", password ? "" : "Enter your password.");
    if (!emailRe.test(email) || !password) return;
    if (!user || user.email !== email || user.password !== password) { show("login-status", "Email or password is incorrect."); return; }
    save("gg-current-user", { name: user.name, email: user.email });
    window.location.href = "profile.html";
  });

  const profileName = document.getElementById("profile-name");
  if (profileName) {
    const user = read("gg-current-user");
    if (!user) { window.location.href = "auth.html"; return; }
    profileName.textContent = user.name;
    document.getElementById("profile-email").textContent = user.email;
    document.getElementById("logout-btn").addEventListener("click", () => { localStorage.removeItem("gg-current-user"); window.location.href = "auth.html"; });
  }
})();
