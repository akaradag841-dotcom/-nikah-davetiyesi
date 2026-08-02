const scene = document.getElementById("invitationScene");
const button = document.getElementById("openButton");
const envelope = document.querySelector(".envelope");

function openInvitation() {
    scene.classList.add("opened");

    // Tekrar açılmasını engelle
    button.disabled = true;
    envelope.style.pointerEvents = "none";
}

button.addEventListener("click", openInvitation);
envelope.addEventListener("click", openInvitation);

// Sayfa açılırken yumuşak görünme efekti
window.addEventListener("load", () => {
    document.body.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 800,
            fill: "forwards"
        }
    );
});
