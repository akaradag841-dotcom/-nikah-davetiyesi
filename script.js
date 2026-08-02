const envelope = document.getElementById("envelope");
const button = document.getElementById("openBtn");

button.addEventListener("click", () => {
    envelope.classList.add("opened");
    button.style.display = "none";
});
