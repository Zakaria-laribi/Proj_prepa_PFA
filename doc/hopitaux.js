document.addEventListener("DOMContentLoaded", () => {
  const ville = document.getElementById("ville");
  const list = document.getElementById("list");
  const btn = document.getElementById("searchBtn");

  const hopitaux = [
    { nom: "CHU Fès", ville: "Fès" },
    { nom: "CHU Ibn Rochd", ville: "Casablanca" },
    { nom: "Hôpital Militaire Rabat", ville: "Rabat" }
  ];

  function render(items) {
    list.innerHTML = items.map(h => `
      <article class="card">
        <h3>${h.nom}</h3>
        <p>${h.ville}</p>
      </article>`).join("") || "<p>Aucun résultat.</p>";
  }

  function search() {
    const v = ville.value.toLowerCase().trim();
    const f = hopitaux.filter(h => (!v || h.ville.toLowerCase().includes(v)));
    render(f);
  }

  btn.addEventListener("click", search);
  render(hopitaux);
});