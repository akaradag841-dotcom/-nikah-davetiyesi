document.addEventListener("DOMContentLoaded", function () {
  const envelope = document.getElementById("envelope");
  const openBtn = document.getElementById("openBtn");
  const details = document.getElementById("details");
  const calendarBtn = document.getElementById("calendarBtn");
  const confettiContainer =
    document.getElementById("confettiContainer");

  let isOpen = false;
  let confettiPlayed = false;

  if (!envelope || !openBtn || !details) {
    console.error("Gerekli sayfa elemanları bulunamadı.");
    return;
  }

  openBtn.addEventListener("click", function () {
    isOpen = !isOpen;

    envelope.classList.toggle("open", isOpen);

    openBtn.textContent =
      isOpen ? "Zarfı Kapat" : "Zarfı Aç";

    details.classList.toggle("visible", isOpen);
    details.setAttribute(
      "aria-hidden",
      isOpen ? "false" : "true"
    );

    if (isOpen) {
      if (!confettiPlayed) {
        createConfetti();
        confettiPlayed = true;
      }

      setTimeout(function () {
        details.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 1050);
    }
  });

  function updateCountdown() {
    const weddingDate =
      new Date("2026-09-04T15:30:00+03:00").getTime();

    const now = Date.now();
    const difference = weddingDate - now;

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (
      !daysElement ||
      !hoursElement ||
      !minutesElement ||
      !secondsElement
    ) {
      return;
    }

    if (difference <= 0) {
      daysElement.textContent = "00";
      hoursElement.textContent = "00";
      minutesElement.textContent = "00";
      secondsElement.textContent = "00";
      return;
    }

    const days =
      Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours =
      Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

    const minutes =
      Math.floor(
        (difference / (1000 * 60)) % 60
      );

    const seconds =
      Math.floor(
        (difference / 1000) % 60
      );

    daysElement.textContent =
      String(days).padStart(2, "0");

    hoursElement.textContent =
      String(hours).padStart(2, "0");

    minutesElement.textContent =
      String(minutes).padStart(2, "0");

    secondsElement.textContent =
      String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  function createConfetti() {
    if (!confettiContainer) {
      return;
    }

    const colors = [
      "#c59b47",
      "#ead5a5",
      "#5e704f",
      "#ffffff",
      "#d8b86a"
    ];

    for (let i = 0; i < 55; i += 1) {
      const piece = document.createElement("span");

      piece.className = "confetti";

      piece.style.left =
        Math.random() * 100 + "%";

      piece.style.backgroundColor =
        colors[
          Math.floor(Math.random() * colors.length)
        ];

      piece.style.animationDelay =
        Math.random() * 1.2 + "s";

      piece.style.animationDuration =
        2.8 + Math.random() * 2 + "s";

      piece.style.transform =
        "rotate(" + Math.random() * 360 + "deg)";

      confettiContainer.appendChild(piece);

      setTimeout(function () {
        piece.remove();
      }, 5500);
    }
  }

  if (calendarBtn) {
    calendarBtn.addEventListener("click", function () {
      const calendarContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Zeynep ve Ahmet//Nikah Davetiyesi//TR",
        "BEGIN:VEVENT",
        "UID:zeynep-ahmet-04092026",
        "DTSTAMP:20260803T000000Z",
        "DTSTART:20260904T123000Z",
        "DTEND:20260904T143000Z",
        "SUMMARY:Zeynep ve Ahmet Nikah Töreni",
        "LOCATION:Bornova Nikah Salonu",
        "DESCRIPTION:Zeynep ve Ahmet'in nikah töreni.",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const calendarBlob = new Blob(
        [calendarContent],
        {
          type: "text/calendar;charset=utf-8"
        }
      );

      const downloadUrl =
        URL.createObjectURL(calendarBlob);

      const downloadLink =
        document.createElement("a");

      downloadLink.href = downloadUrl;
      downloadLink.download =
        "zeynep-ahmet-nikah.ics";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();

      URL.revokeObjectURL(downloadUrl);
    });
  }
});
