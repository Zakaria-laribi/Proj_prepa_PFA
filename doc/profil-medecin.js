document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id"));
  const role = localStorage.getItem("role");
  const profile = document.getElementById("profile");
  const avisList = document.getElementById("avisList");
  const chatBtn = document.getElementById("chatBtn");

  try {
    const [mRes, aRes] = await Promise.all([
      fetch("./assets/data/medecins.json"),
      fetch("./assets/data/avis.json")
    ]);
    const medecins = await mRes.json();
    const avis = await aRes.json();
    const m = medecins.find(x => x.id === id) || medecins[0];
    profile.innerHTML = `
      <h1>${m.nom}</h1>
      <p class="meta">${m.specialite} • ${m.ville} • ${m.prix} MAD • ⭐ ${m.avis}</p>
      <p>${m.description || "Consultations en ligne et au cabinet."}</p>
    `;
    avisList.innerHTML = avis.filter(a => a.medecinId === m.id).map(a => `
      <div class="card"><strong>${a.patient}</strong> — ⭐ ${a.note}<p>${a.commentaire}</p></div>
    `).join("") || "<p>Aucun avis pour l'instant.</p>";

    chatBtn.addEventListener("click", () => {
      const vue = role === "medecin" ? "medecin" : "patient";
      window.location.href = `./chat.html?vue=${vue}&to=${m.id}`;
    });
  } catch {
    profile.innerHTML = "<p>Erreur de chargement.</p>";
  }
});