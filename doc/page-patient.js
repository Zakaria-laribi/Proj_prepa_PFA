document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");
  const warn = document.getElementById("roleWarn");
  const form = document.getElementById("patientForm");

  // Garde: si médecin connecté, ne pas afficher (rediriger)
  if (role === "medecin") {
    warn.hidden = false;
    setTimeout(() => window.location.href = "dashboard-medecin.html", 1200);
    form.style.display = "none";
    return;
  }

  const name = localStorage.getItem("userName") || "";
  const email = localStorage.getItem("userEmail") || "";

  document.getElementById("nom").value = name;
  document.getElementById("email").value = email;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      nom: document.getElementById("nom").value,
      email: document.getElementById("email").value,
      tel: document.getElementById("tel").value,
      ville: document.getElementById("ville").value,
      adresse: document.getElementById("adresse").value
    };
    localStorage.setItem("patientProfile", JSON.stringify(data));
    alert("Profil patient mis à jour.");
  });
});