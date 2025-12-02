document.addEventListener("DOMContentLoaded", () => {
  const itemsEl = document.getElementById("items");
  const totalEl = document.getElementById("total");
  const info = document.getElementById("info");
  const checkoutBtn = document.getElementById("checkoutBtn");

  let cart = JSON.parse(localStorage.getItem("cart") || "[]");

  function render() {
    itemsEl.innerHTML = cart.map(c => `
      <div class="item">
        <div><strong>${c.nom}</strong><div>${c.prix} MAD</div></div>
        <div class="controls">
          <button onclick="dec(${c.id})">-</button>
          <span>${c.qty}</span>
          <button onclick="inc(${c.id})">+</button>
          <button onclick="removeItem(${c.id})">Supprimer</button>
        </div>
      </div>`).join("") || "<p>Panier vide.</p>";
    totalEl.textContent = cart.reduce((sum, c) => sum + c.prix * c.qty, 0).toFixed(2);
  }

  window.inc = (id) => { const it = cart.find(c => c.id === id); it.qty += 1; save(); };
  window.dec = (id) => { const it = cart.find(c => c.id === id); it.qty = Math.max(1, it.qty - 1); save(); };
  window.removeItem = (id) => { cart = cart.filter(c => c.id !== id); save(); };

  function save() { localStorage.setItem("cart", JSON.stringify(cart)); render(); }

  checkoutBtn.addEventListener("click", () => {
    if (!cart.length) return alert("Votre panier est vide.");
    const orderId = "CMD-" + Math.random().toString(36).slice(2,8).toUpperCase();
    localStorage.setItem("lastOrder", JSON.stringify({ id: orderId, items: cart, total: Number(totalEl.textContent) }));
    cart = []; save();
    info.textContent = `Commande passée: ${orderId}. Suivi disponible dans la boutique.`;
  });

  render();
});