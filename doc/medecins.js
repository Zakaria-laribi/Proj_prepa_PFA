document.addEventListener("DOMContentLoaded", async () => {
  const role = localStorage.getItem("role");
  // Accessible à tous, mais certaines actions (chat, RDV) peuvent demander connexion
  const results = document.getElementById("results");
  const spec = document.getElementById("spec");
  const ville = document.getElementById("ville");
  const prix = document.getElementById("prix");
  const searchBtn = document.getElementById("searchBtn");
  const avisList = document.getElementById("avisList");

  let medecins = [];
  let avis = [];

  async function loadData() {
    try {
      const [mRes, aRes] = await Promise.all([
        fetch("./assets/data/medecins.json"),
        fetch("./assets/data/avis.json")
      ]);
      medecins = await mRes.json();
      avis = await aRes.json();
      render(medecins);
      renderAvis(avis.slice(0,6));
    } catch {
      results.innerHTML = "<p>Erreur de chargement des données.</p>";
    }
  }

  function render(list) {
    results.innerHTML = list.map(m => `
      <article class="card">
        <h3>${m.nom}</h3>
        <p class="meta">${m.specialite} • ${m.ville} • ${m.prix} MAD • ⭐ ${m.avis}</p>
        <p>${m.description || "Médecin certifié au Maroc."}</p>
        <div class="actions">
          <a class="primary" href="./profil-medecin.html?id=${m.id}">Profil</a>
          <a href="./chat.html?vue=${role==='medecin'?'medecin':'patient'}&to=${m.id}">Chat</a>
        </div>
      </article>`).join("") || "<p>Aucun résultat.</p>";
  }

  function renderAvis(list) {
    avisList.innerHTML = list.map(a => `
      <div class="avis-card">
        <strong>${a.patient}</strong> — ⭐ ${a.note}
        <p>${a.commentaire}</p>
      </div>`).join("");
  }

  function filter() {
    const s = spec.value; const v = ville.value.toLowerCase().trim(); const p = Number(prix.value||0);
    const filtered = medecins.filter(m =>
      (!s || m.specialite === s) &&
      (!v || m.ville.toLowerCase().includes(v)) &&
      (!p || m.prix <= p)
    );
    render(filtered);
  }

  searchBtn.addEventListener("click", filter);
  await loadData();
});