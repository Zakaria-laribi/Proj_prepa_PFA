document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role");
  const warn = document.getElementById("roleWarn");
  const form = document.getElementById("medForm");

  // Garde: si patient connecté, ne pas afficher (rediriger)
  if (role === "patient") {
    warn.hidden = false;
    setTimeout(() => window.location.href = "page-patient.html", 1200);
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
      specialite: document.getElementById("spec").value,
      prix: Number(document.getElementById("prix").value || 0),
      description: document.getElementById("desc").value,
      dispo: document.getElementById("dispo").value
    };
    localStorage.setItem("medProfile", JSON.stringify(data));
    alert("Profil médecin mis à jour.");
  });
});