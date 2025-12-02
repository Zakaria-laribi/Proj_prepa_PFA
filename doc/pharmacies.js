document.addEventListener("DOMContentLoaded", async () => {
  const ville = document.getElementById("ville");
  const garde = document.getElementById("garde");
  const list = document.getElementById("list");
  const btn = document.getElementById("searchBtn");
  let data = [];

  async function load() {
    try {
      const res = await fetch("./assets/data/pharmacies.json");
      data = await res.json();
      render(data);
    } catch { list.innerHTML = "<p>Erreur de chargement.</p>"; }
  }

  function render(items) {
    list.innerHTML = items.map(p => `
      <article class="card">
        <h3>${p.nom}</h3>
        <p>${p.ville}</p>
        ${p.garde ? '<span class="badge">De garde</span>' : ''}
      </article>`).join("") || "<p>Aucun résultat.</p>";
  }

  function search() {
    const v = ville.value.toLowerCase().trim();
    const g = garde.checked;
    const f = data.filter(p => (!v || p.ville.toLowerCase().includes(v)) && (!g || p.garde));
    render(f);
  }

  btn.addEventListener("click", search);
  await load();
});