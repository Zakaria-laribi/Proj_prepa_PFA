document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const vueParam = params.get("vue"); // 'patient' ou 'medecin'
  const role = localStorage.getItem("role");
  const vue = vueParam || (role === "medecin" ? "medecin" : "patient");
  const to = params.get("to"); // id médecin (optionnel)
  const roleBadge = document.getElementById("roleBadge");
  const chatBody = document.getElementById("chatBody");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("message");
  const imageInput = document.getElementById("image");

  // Garde: afficher vue correspondant au rôle réel
  if (role === "medecin" && vue !== "medecin") location.replace("chat.html?vue=medecin"+(to?`&to=${to}`:""));
  if (role === "patient" && vue !== "patient") location.replace("chat.html?vue=patient"+(to?`&to=${to}`:""));

  roleBadge.textContent = vue === "medecin" ? "Vue Médecin" : "Vue Patient";

  const historyKey = `chat_history_${vue}${to?`_${to}`:""}`;
  const history = JSON.parse(localStorage.getItem(historyKey) || "[]");

  function render() {
    chatBody.innerHTML = history.map(h => `
      <div class="msg ${h.me ? "me" : "other"}">
        <div>${h.text}</div>
        ${h.img ? `<img src="${h.img}" alt="Image envoyée">` : ""}
        <div class="meta">${h.time}</div>
      </div>
    `).join("");
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  render();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text && !imageInput.files.length) return;

    let imgDataUrl = null;
    if (imageInput.files.length) {
      const file = imageInput.files[0];
      imgDataUrl = await toDataURL(file);
    }

    const msg = { text, img: imgDataUrl, me: true, time: new Date().toLocaleTimeString() };
    history.push(msg);
    localStorage.setItem(historyKey, JSON.stringify(history));
    input.value = ""; imageInput.value = "";
    render();

    // Notification de réponse simulée
    setTimeout(() => {
      history.push({ text: "Merci, je vous réponds sous peu.", me: false, time: new Date().toLocaleTimeString() });
      localStorage.setItem(historyKey, JSON.stringify(history));
      render();
      // Incrémenter badge notifications
      const count = Number(localStorage.getItem("notifCount") || 0) + 1;
      localStorage.setItem("notifCount", String(count));
    }, 1200);
  });

  function toDataURL(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }
});