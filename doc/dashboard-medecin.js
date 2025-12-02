document.addEventListener("DOMContentLoaded", async () => {
  const role = localStorage.getItem("role");
  const warn = document.getElementById("roleWarn");
  if (role === "patient") {
    warn.hidden = false;
    setTimeout(() => window.location.href = "page-patient.html", 1200);
    document.querySelector(".grid").style.display = "none";
    return;
  }

  const profilEl = document.getElementById("profil");
  const planningEl = document.getElementById("planning");
  const historyEl = document.getElementById("history");
  const avisListEl = document.getElementById("avisList");
  const addSlotBtn = document.getElementById("addSlot");

  const profil = JSON.parse(localStorage.getItem("medProfile") || "{}");
  profilEl.textContent = profil.nom ? `${profil.nom} — ${profil.specialite || "Spécialité"} — ${profil.prix || 0} MAD` : "Profil incomplet.";

  let planning = JSON.parse(localStorage.getItem("planning") || "[]");
  function renderPlanning() {
    planningEl.innerHTML = planning.map(p => `<li>${p}</li>`).join("") || "<li>Aucun créneau.</li>";
  }
  addSlotBtn.addEventListener("click", () => {
    const slot = prompt("Ajouter créneau (ex: 2025-12-03 14:00)");
    if (slot) { planning.push(slot); localStorage.setItem("planning", JSON.stringify(planning)); renderPlanning(); }
  });
  renderPlanning();

  // Historique (mock à partir du localStorage chat)
  const keys = Object.keys(localStorage).filter(k => k.startsWith("chat_history_medecin"));
  historyEl.innerHTML = keys.map(k => `<li>${k.replace("chat_history_medecin_","Conversation avec #")}</li>`).join("") || "<li>Aucune conversation.</li>";

  // Avis (mock depuis JSON)
  try {
    const res = await fetch("./assets/data/avis.json");
    const avis = await res.json();
    avisListEl.innerHTML = avis.map(a => `<li>⭐ ${a.note} — ${a.patient}: ${a.commentaire}</li>`).join("") || "<li>Aucun avis.</li>";
  } catch {
    avisListEl.innerHTML = "<li>Erreur de chargement des avis.</li>";
  }
});