document.addEventListener("DOMContentLoaded", async () => {
  const search = document.getElementById("search");
  const list = document.getElementById("list");
  let meds = [];

  async function load() {
    try {
      const res = await fetch("./assets/data/medicaments.json");
      meds = await res.json();
      render(meds);
    } catch { list.innerHTML = "<p>Erreur de chargement.</p>"; }
  }

  function render(items) {
    list.innerHTML = items.map(m => `
      <article class="card">
        <h3>${m.nom}</h3>
        <p class="price">${m.prix} MAD</p>
        <p>Stock: ${m.stock}</p>
        <div class="actions">
          <button onclick="addToCart(${m.id})" class="primary">Ajouter</button>
          <button onclick="addToCart(${m.id})">+ Panier</button>
        </div>
      </article>`).join("") || "<p>Aucun résultat.</p>";
  }

  window.addToCart = (id) => {
    const item = meds.find(x => x.id === id);
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const exist = cart.find(c => c.id === id);
    if (exist) exist.qty += 1; else cart.push({ id, nom: item.nom, prix: item.prix, qty: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Ajouté au panier.");
  };

  search.addEventListener("input", () => {
    const q = search.value.toLowerCase();
    render(meds.filter(m => m.nom.toLowerCase().includes(q)));
  });

  await load();
});