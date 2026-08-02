document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("envelope");
  const openBtn = document.getElementById("openBtn");
  const details = document.getElementById("details");
  const calendarBtn = document.getElementById("calendarBtn");
  const confettiLayer = document.getElementById("confettiLayer");

  let open = false;
  let confettiPlayed = false;

  openBtn.addEventListener("click", () => {
    open = !open;

    envelope.classList.toggle("open", open);
    details.classList.toggle("visible", open);
    details.setAttribute("aria-hidden", open ? "false" : "true");

    openBtn.textContent = open ? "Zarfı Kapat" : "Zarfı Aç";

    if (open) {
      if (!confettiPlayed) {
        createConfetti();
        confettiPlayed = true;
      }

      setTimeout(() => {
        details.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 1000);
    }
  });

  function updateCountdown() {
    const weddingDate = new Date("2026-09-04T15:30:00+03:00").getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      document.getElementById("days").textContent = "00";
      document.getElementById("hours").textContent = "00";
      document.getElementById("minutes").textContent = "00";
      document.getElementById("seconds").textContent = "00";
      return;
    }

    document.getElementById("days").textContent =
      String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0");

    document.getElementById("hours").textContent =
      String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, "0");

    document.getElementById("minutes").textContent =
      String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, "0");

    document.getElementById("seconds").textContent =
      String(Math.floor((distance / 1000) % 60)).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  function createConfetti() {
    const colors = [
      "#c69b45",
      "#ead5a4",
      "#5d704f",
      "#ffffff",
      "#d8b86a"
    ];

    for (let i = 0; i < 50; i++) {
      const piece = document.createElement("div");

      piece.className = "confetti";

      piece.style.left = Math.random() * 100 + "%";
      piece.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      piece.style.animationDuration =
        3 + Math.random() * 2 + "s";

      confettiLayer.appendChild(piece);

      setTimeout(() => {
        piece.remove();
      }, 5000);
    }
  }

  if (calendarBtn) {
    calendarBtn.addEventListener("click", () => {

      const ics = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Zeynep ve Ahmet Nikah Töreni
DTSTART:20260904T123000Z
DTEND:20260904T143000Z
LOCATION:Bornova Nikah Salonu
DESCRIPTION:Zeynep ve Ahmet'in nikah töreni
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([ics], {
        type: "text/calendar;charset=utf-8"
      });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "zeynep-ahmet-nikah.ics";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    });
  }

});
