// Список призов и секторов (Агро-партнеры РСХБ)
const PRIZES = [
  {
    id: 1,
    title: "Скидка 20% на сыры и фермерские продукты",
    partner: "Своё Родное",
    desc: "Скидка 20% на первый заказ от 1500 ₽ на маркетплейсе фермерской еды",
    code: "RODNOE-20-AGRO",
    url: "https://svoe-rodnoe.ru",
    exp: "до 30.11.2026",
    color: "#2E7D32", // Forest Green
    textColor: "#ffffff",
    label: "Своё Родное -20%"
  },
  {
    id: 2,
    title: "Скидка 15% на мерч и аксессуары Ростсельмаш",
    partner: "Ростсельмаш Shop",
    desc: "Скидка на брендированную одежду и аксессуары для агро-энтузиастов",
    code: "RSM-STUDENT-15",
    url: "https://shop.rostselmash.com",
    exp: "до 31.12.2026",
    color: "#C62828", // Red
    textColor: "#ffffff",
    label: "Ростсельмаш -15%"
  },
  {
    id: 3,
    title: "Бесплатная подписка на Агро-Книги и курсы",
    partner: "Я в Агро Лекторий",
    desc: "1 месяц полного доступа к библиотеке вебинаров и курсов по современному АПК",
    code: "AGRO-BOOKS-FREE",
    url: "https://svoe-agro.ru",
    exp: "до 15.12.2026",
    color: "#1565C0", // Blue
    textColor: "#ffffff",
    label: "Курсы бесплатно"
  },
  {
    id: 4,
    title: "Скидка 25% на агротуризм и туры",
    partner: "Своё за городом",
    desc: "Скидка на бронирование эко-ферм, конных прогулок и экскурсий на пасеки",
    code: "ZAGOROD-TRAVEL-25",
    url: "https://svoe-zagorodom.ru",
    exp: "до 30.11.2026",
    color: "#E65100", // Orange
    textColor: "#ffffff",
    label: "Эко-Туры -25%"
  },
  {
    id: 5,
    title: "Кофе в подарок при покупке в кафе-партнерах",
    partner: "Coffee & Agro Hub",
    desc: "Бесплатный капучино или американо в кампусах вузов-партнеров РСХБ",
    code: "COFFEE-AGRO-CAMPUS",
    url: "https://rshbdigital.ru",
    exp: "до 30.10.2026",
    color: "#6A1B9A", // Purple
    textColor: "#ffffff",
    label: "Кофе в подарок"
  },
  {
    id: 6,
    title: "Сертификат на 500 ₽ на фермерские наборы",
    partner: "Своё Родное",
    desc: "Подарочный сертификат 500 ₽ при заказе подарочных фермерских корзин",
    code: "FARM-BOX-500",
    url: "https://svoe-rodnoe.ru",
    exp: "до 31.12.2026",
    color: "#00838F", // Teal
    textColor: "#ffffff",
    label: "Сертификат 500 ₽"
  }
];

// State
let currentAngle = 0;
let isSpinning = false;
let currentPrize = null;
let spinsCount = 1;

// DOM Elements
const screenStart = document.getElementById("screen-start");
const screenGame = document.getElementById("screen-game");
const screenReward = document.getElementById("screen-reward");

const btnToGame = document.getElementById("btn-to-game");
const btnSpin = document.getElementById("btn-spin");
const spinBtnText = document.getElementById("spin-btn-text");
const btnPlayAgain = document.getElementById("btn-play-again");
const btnCopyCode = document.getElementById("btn-copy-code");
const copyText = document.getElementById("copy-text");
const copyToast = document.getElementById("copy-toast");
const promoCodeInput = document.getElementById("promo-code-input");

const rewardTitle = document.getElementById("reward-title");
const rewardDesc = document.getElementById("reward-desc");
const rewardPartner = document.getElementById("reward-partner");
const rewardExp = document.getElementById("reward-exp");
const partnerLinkBtn = document.getElementById("partner-link-btn");
const canvas = document.getElementById("wheel-canvas");
const ctx = canvas.getContext("2d");

// Navigation
function showScreen(screen) {
  [screenStart, screenGame, screenReward].forEach(s => s.classList.remove("active"));
  screen.classList.add("active");
}

btnToGame.addEventListener("click", () => {
  showScreen(screenGame);
  drawWheel(currentAngle);
});

btnPlayAgain.addEventListener("click", () => {
  showScreen(screenGame);
  isSpinning = false;
  btnSpin.disabled = false;
  spinBtnText.textContent = "Крутить колесо! 🎯";
});

// Canvas Drawing
function drawWheel(angle) {
  const numSlices = PRIZES.length;
  const sliceAngle = (2 * Math.PI) / numSlices;
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = canvas.width / 2 - 10;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numSlices; i++) {
    const startA = angle + i * sliceAngle;
    const endA = startA + sliceAngle;

    // Slice
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startA, endA);
    ctx.fillStyle = PRIZES[i].color;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#1E293B";
    ctx.stroke();

    // Slice Border Highlight
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startA + sliceAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = PRIZES[i].textColor;
    ctx.font = "bold 13px 'Montserrat', sans-serif";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 4;
    ctx.fillText(PRIZES[i].label, radius - 20, 5);
    ctx.restore();
  }

  // Outer ring border
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#F5A623";
  ctx.stroke();
}

// Spin Animation
function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;
  btnSpin.disabled = true;
  spinBtnText.textContent = "Колесо крутится... 🌾";

  // Pick random prize index
  const prizeIndex = Math.floor(Math.random() * PRIZES.length);
  currentPrize = PRIZES[prizeIndex];

  const numSlices = PRIZES.length;
  const sliceAngle = (2 * Math.PI) / numSlices;

  // The pointer is at the TOP: 3 * Math.PI / 2 (or -Math.PI / 2)
  // Target angle so that sector `prizeIndex` center lands under pointer
  const targetPointerAngle = (3 * Math.PI) / 2;
  const sectorCenterRel = prizeIndex * sliceAngle + sliceAngle / 2;
  
  // Extra spins for drama (5 to 8 full revolutions)
  const fullRevolutions = (5 + Math.floor(Math.random() * 3)) * (2 * Math.PI);
  
  // Calculate final target angle
  const currentNormalized = currentAngle % (2 * Math.PI);
  let delta = targetPointerAngle - (currentNormalized + sectorCenterRel);
  while (delta < 0) delta += 2 * Math.PI;

  const targetAngle = currentAngle + fullRevolutions + delta;
  const startAngle = currentAngle;
  const duration = 4000; // 4 seconds spin
  const startTime = performance.now();

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = easeOutCubic(progress);

    currentAngle = startAngle + (targetAngle - startAngle) * easeProgress;
    drawWheel(currentAngle);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // Completed spin
      setTimeout(() => {
        onSpinComplete();
      }, 500);
    }
  }

  requestAnimationFrame(animate);
}

btnSpin.addEventListener("click", spinWheel);

function onSpinComplete() {
  // Trigger Confetti
  if (window.confetti) {
    window.confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // Populate Reward Screen
  rewardTitle.textContent = currentPrize.title;
  rewardDesc.textContent = currentPrize.desc;
  rewardPartner.textContent = `Партнёр: ${currentPrize.partner}`;
  rewardExp.textContent = `Срок: ${currentPrize.exp}`;
  promoCodeInput.value = currentPrize.code;
  partnerLinkBtn.href = currentPrize.url;

  // Reset copy button state
  copyToast.classList.remove("visible");
  copyText.textContent = "Скопировать";

  showScreen(screenReward);
}

// Copy Code Handler
btnCopyCode.addEventListener("click", () => {
  promoCodeInput.select();
  promoCodeInput.setSelectionRange(0, 99999); // Mobile
  navigator.clipboard.writeText(promoCodeInput.value).then(() => {
    copyToast.classList.add("visible");
    copyText.textContent = "Скопировано!";
    setTimeout(() => {
      copyToast.classList.remove("visible");
      copyText.textContent = "Скопировать";
    }, 2500);
  }).catch(() => {
    // Fallback execCommand
    document.execCommand("copy");
    copyToast.classList.add("visible");
  });
});

// Initial draw
drawWheel(currentAngle);
