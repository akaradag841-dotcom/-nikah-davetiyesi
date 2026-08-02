document.addEventListener("DOMContentLoaded", function () {
  const envelope = document.getElementById("envelope");
  const openBtn = document.getElementById("openBtn");

  if (!envelope || !openBtn) {
    console.error("Zarf veya buton bulunamadı.");
    return;
  }

  openBtn.addEventListener("click", function () {
    envelope.classList.toggle("open");

    if (envelope.classList.contains("open")) {
      openBtn.textContent = "Zarfı Kapat";
    } else {
      openBtn.textContent = "Zarfı Aç";
    }
  });
});
