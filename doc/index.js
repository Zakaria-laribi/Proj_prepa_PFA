// Rôle: 'patient' ou 'medecin' dans localStorage
document.addEventListener("DOMContentLoaded", () => {
  const role = localStorage.getItem("role"); 
  const menuItemsPatient = document.querySelectorAll(".role-patient");
  const menuItemsMedecin = document.querySelectorAll(".role-medecin");
  const loginBtn = document.getElementById("loginBtn");
  const userMenuBtn = document.getElementById("userMenuBtn");
  const userMenu = document.getElementById("userMenu");
  const logoutBtn = document.getElementById("logoutBtn");
  const burgerBtn = document.getElementById("burgerBtn");
  const mainMenu = document.getElementById("mainMenu");
  const notifBtn = document.getElementById("notifBtn");

  if (role === "patient") {
    menuItemsMedecin.forEach(el => el.style.display = "none");
    menuItemsPatient.forEach(el => el.style.display = "block");
    loginBtn.hidden = true; userMenuBtn.hidden = false; notifBtn.hidden = false;
  } else if (role === "medecin") {
    menuItemsPatient.forEach(el => el.style.display = "none");
    menuItemsMedecin.forEach(el => el.style.display = "block");
    loginBtn.hidden = true; userMenuBtn.hidden = false; notifBtn.hidden = false;
  } else {
    menuItemsPatient.forEach(el => el.style.display = "none");
    menuItemsMedecin.forEach(el => el.style.display = "none");
    loginBtn.hidden = false; userMenuBtn.hidden = true; notifBtn.hidden = true;
  }

  burgerBtn?.addEventListener("click", () => mainMenu.classList.toggle("active"));
  userMenuBtn?.addEventListener("click", () => userMenu.hidden = !userMenu.hidden);
  logoutBtn?.addEventListener("click", () => { localStorage.removeItem("role"); window.location.href = "./index.html"; });

  // Recherche rapide (mock)
  const quickForm = document.getElementById("quickSearchForm");
  const prixRange = document.getElementById("prixRange");
  const prixValue = document.getElementById("prixValue");
  const quickResults = document.getElementById("quickResults");

  prixRange?.addEventListener("input", () => { prixValue.textContent = `${prixRange.value} MAD`; });

  quickForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const specialite = document.getElementById("specSelect").value;
    const ville = document.getElementById("villeInput").value.toLowerCase().trim();
    const prixMax = Number(prixRange.value);

    try {
      const res = await fetch("./assets/data/medecins.json");
      const medecins = await res.json();
      const filtered = medecins.filter(m => 
        (!specialite || m.specialite === specialite) &&
        (!ville || m.ville.toLowerCase().includes(ville)) &&
        (!prixMax || m.prix <= prixMax)
      );
      quickResults.innerHTML = filtered.slice(0,6).map(m => `
        <div class="card">
          <h4>${m.nom} (${m.specialite})</h4>
          <p>Ville: ${m.ville}</p>
          <p>Prix: ${m.prix} MAD</p>
          <a class="btn btn-outline" href="./profil-medecin.html?id=${m.id}">Voir profil</a>
        </div>`).join("") || "<p>Aucun résultat.</p>";
    } catch {
      quickResults.innerHTML = "<p>Erreur de chargement. Réessayez.</p>";
    }
  });
});