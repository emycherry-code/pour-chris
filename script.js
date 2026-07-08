// ---------- A personnaliser facilement ----------
const HUSBAND_NAME = "Chris";
const SECRET_CODE = "1709";

const LOVE_MESSAGE = `Mon Chris,

Si tu es en train de lire ces mots, c'est que tu as trouvé le bon code (bravo, mon amour) !
Je voulais juste te rappeler, comme ça, un jour sans occasion particulière,
à quel point je t'aime et à quel point tu comptes pour moi.

Merci d'être toi. Merci pour ton sourire, ta patience, et tous ces petits
moments du quotidien qui, avec toi, deviennent précieux.

Je t'aime.`;

const REASONS = [
  "Parce que ton sourire illumine mes journées.",
  "Parce que tu me fais rire même quand j'ai décidé de bouder.",
  "Parce que tu prends soin de moi sans jamais rien attendre en retour.",
  "Parce qu'avec toi, même les jours gris deviennent supportables.",
  "Parce que tu es mon meilleur ami autant que mon amoureux.",
  "Parce que ta présence me rassure, toujours.",
  "Parce que tu crois en moi, même quand j'en doute.",
  "Parce que je ne me lasse jamais de nos petites habitudes.",
  "Parce que tu es exactement l'homme qu'il me fallait.",
  "Parce que t'aimer est la chose la plus facile du monde."
];

// ---------- Ecran digicode ----------

let enteredCode = "";
const codeDisplay = document.getElementById("code-display");
const dots = document.querySelectorAll(".code-dot");
const lockScreen = document.getElementById("lock-screen");
const lovePage = document.getElementById("love-page");

document.querySelectorAll(".key[data-digit]").forEach((key) => {
  key.addEventListener("click", () => {
    if (enteredCode.length >= 4) return;
    enteredCode += key.dataset.digit;
    updateDots();
    if (enteredCode.length === 4) {
      setTimeout(checkCode, 200);
    }
  });
});

document.getElementById("key-clear").addEventListener("click", () => {
  enteredCode = "";
  updateDots();
});

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("filled", i < enteredCode.length);
  });
}

function checkCode() {
  if (enteredCode === SECRET_CODE) {
    unlockLovePage();
  } else {
    codeDisplay.classList.add("shake");
    setTimeout(() => {
      codeDisplay.classList.remove("shake");
      enteredCode = "";
      updateDots();
    }, 400);
  }
}

function unlockLovePage() {
  lockScreen.style.display = "none";
  lovePage.classList.add("visible");
  document.getElementById("message").textContent = LOVE_MESSAGE;
  document.getElementById("page-title").textContent = `Pour toi, ${HUSBAND_NAME} ❤️`;
  startHearts();
  launchConfetti();
}

// ---------- Raisons ----------

document.getElementById("reason-btn").addEventListener("click", () => {
  const reason = REASONS[Math.floor(Math.random() * REASONS.length)];
  document.getElementById("reason-text").textContent = reason;
});

// ---------- Galerie photo ----------
// Dépose tes photos dans le dossier "photos" et nomme-les photo1.jpg, photo2.jpg, etc.
// Les images manquantes sont automatiquement ignorées.

const gallery = document.getElementById("gallery");
const PHOTO_COUNT = 12;

for (let i = 1; i <= PHOTO_COUNT; i++) {
  const img = document.createElement("img");
  img.src = `photos/photo${i}.jpg`;
  img.alt = "Souvenir";
  img.onerror = () => img.remove();
  gallery.appendChild(img);
}

// ---------- Coeurs flottants ----------

function startHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = ["❤️", "💕", "💖", "💘"][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 4 + Math.random() * 3 + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  }, 600);
}

// ---------- Confettis ----------

function launchConfetti() {
  const colors = ["#ff6b81", "#ffd1dc", "#ff9aa2", "#b5305a", "#ffb3c6"];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const piece = document.createElement("div");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = 2.5 + Math.random() * 2 + "s";
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 5000);
    }, i * 30);
  }
}
