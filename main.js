
const screens = document.querySelectorAll(".screen");

// Change these settings for your sister
const BIRTHDAY_PASSWORDS = [
  "1110",
  "11oct",
  "11october",
  "11october2026",
  "11/10"
];

function goTo(screenId) {
  const target = document.getElementById(screenId);

  if (!target) return;

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  target.classList.add("active");

  document.getElementById("passError").textContent = "";

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Birthday password
function checkPassword() {
  const input = document.getElementById("pass");
  const error = document.getElementById("passError");

  // Accept formats like 1110, 11 Oct, or 11 October
  const entered = input.value
    .toLowerCase()
    .replace(/[\s.,/-]/g, "");

  const correct = BIRTHDAY_PASSWORDS.some(password =>
    password.replace(/[\s.,/-]/g, "") === entered
  );

  if (correct) {
    input.value = "";
    goTo("menu");
    launchConfetti();
  } else {
    error.textContent =
      "Oops! Wrong birthday 😂 Try 11 October!";
    input.value = "";
    input.focus();
  }
}

// Allow Enter key to unlock
document.getElementById("pass").addEventListener("keydown", event => {
  if (event.key === "Enter") {
    checkPassword();
  }
});

// Floating hearts
const heartContainer = document.getElementById("hearts");
const heartEmojis = ["💗", "💕", "💖", "♡", "🌸", "✨"];

function createHeart() {
  const heart = document.createElement("span");

  heart.className = "heart";
  heart.textContent =
    heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (14 + Math.random() * 18) + "px";
  heart.style.animationDuration = (6 + Math.random() * 5) + "s";

  heartContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 12000);
}

setInterval(createHeart, 650);

// Confetti
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let particles = [];
let animationId;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;

  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function launchConfetti() {
  cancelAnimationFrame(animationId);
  particles = [];

  const colors = [
    "#f36da8",
    "#ffd166",
    "#bb9af7",
    "#8ddbe7",
    "#ff9c85",
    "#ffffff"
  ];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: -Math.random() * window.innerHeight,
      size: 4 + Math.random() * 6,
      speed: 2 + Math.random() * 4,
      drift: (Math.random() - 0.5) * 3,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach(p => {
    ctx.save();

    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation * Math.PI / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

    ctx.restore();

    p.x += p.drift;
    p.y += p.speed;
    p.rotation += 4;
  });

  particles = particles.filter(
    p => p.y < window.innerHeight + 20
  );

  if (particles.length > 0) {
    animationId = requestAnimationFrame(animateConfetti);
  } else {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

function celebrate() {
  launchConfetti();
}
