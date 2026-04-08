// Applica la preferenza tema dark da localStorage
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
} else {
  document.body.classList.remove("dark-mode");
}

// Popola il profilo utente
document.addEventListener("DOMContentLoaded", function () {
  let raw = localStorage.getItem("userData");
  let userData = null;
  try {
    userData = JSON.parse(raw) || null;
  } catch (e) {
    console.error("[PROFILE] Errore parsing userData:", e);
  }
  if (!userData) {
    const content = document.getElementById("profileContent");
    if (content) {
      content.innerHTML =
        '<p style="color:red;">Dati utente non trovati. Effettua il login prima di accedere al profilo.</p>';
    }
    return;
  }
  // Avatar
  const avatarDiv = document.getElementById("profileAvatar");
  if (avatarDiv) {
    avatarDiv.innerHTML = "";
    const img = document.createElement("img");
    img.src = userData.picture?.large || userData.picture?.medium || "";
    img.alt = userData.name?.first || "Avatar";
    avatarDiv.appendChild(img);
  }
  // Nome
  const nameEl = document.getElementById("profileName");
  if (nameEl) {
    nameEl.textContent = `${userData.name?.first || ""} ${userData.name?.last || ""}`;
  }
  // Email
  const emailEl = document.getElementById("profileEmail");
  if (emailEl) {
    emailEl.textContent = `Email: ${userData.email || ""}`;
  }
  // Data di nascita
  const dobEl = document.getElementById("profileDob");
  if (dobEl) {
    let dob = userData.dob?.date
      ? new Date(userData.dob.date).toLocaleDateString("it-IT")
      : "";
    dobEl.textContent = `Data di nascita: ${dob}`;
  }
  // Indirizzo
  const addressEl = document.getElementById("profileAddress");
  if (addressEl) {
    let addr = userData.location
      ? `${userData.location.street?.name || ""} ${userData.location.street?.number || ""}, ${userData.location.city || ""} (${userData.location.state || ""}), ${userData.location.country || ""}`
      : "";
    addressEl.textContent = `Indirizzo: ${addr}`;
  }
  // Telefono
  const phoneEl = document.getElementById("profilePhone");
  if (phoneEl) {
    phoneEl.textContent = `Telefono: ${userData.phone || ""}`;
  }
});
