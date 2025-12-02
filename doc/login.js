document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const role = document.getElementById("role").value;
    const email = document.getElementById("email").value.trim();
    const name = email.split("@")[0] || "Utilisateur";
    localStorage.setItem("role", role);
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    // Redirection selon rôle
    window.location.href = role === "medecin" ? "dashboard-medecin.html" : "index.html";
  });
});