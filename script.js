// ----------------- MOVIMIENTO DEL PERSONAJE -----------------

const player = document.getElementById('player');
const gameArea = document.getElementById('game-area');

function movePlayerTo(x, y) {
  const maxX = gameArea.clientWidth - player.clientWidth;
  const maxY = gameArea.clientHeight - player.clientHeight;

  let newX = x - player.clientWidth / 2;
  let newY = y - player.clientHeight / 2;

  newX = Math.max(0, Math.min(newX, maxX));
  newY = Math.max(0, Math.min(newY, maxY));

  const bottomValue = maxY - newY;
  player.style.left = `${newX}px`;
  player.style.bottom = `${bottomValue}px`;
}

function onGameAreaClick(e) {
  e.preventDefault();
  let clickX, clickY;

  const rect = gameArea.getBoundingClientRect();

  if (e.type === 'touchstart') {
    clickX = e.touches[0].clientX - rect.left;
    clickY = e.touches[0].clientY - rect.top;
  } else {
    clickX = e.clientX - rect.left;
    clickY = e.clientY - rect.top;
  }

  movePlayerTo(clickX, clickY);
}

gameArea.addEventListener('click', onGameAreaClick);
gameArea.addEventListener('touchstart', onGameAreaClick);


// ----------------- PREGUNTAS Y NIVELES -----------------

const questions = [
  {
    text: "¿Qué operación representa 2 montones de semillas (2 y 3) multiplicados por 2?",
    options: {
      a: "(2 + 3) × 2",
      b: "2 + 3 × 2",
      c: "2 × (3 + 2)",
      d: "(2 × 3) + 2"
    },
    correct: "a"
  },
  {
    text: "Si tienes (4 + 1) × 3 árboles, ¿cuántos árboles son?",
    options: {
      a: "4 + (1 × 3)",
      b: "(4 + 1) × 3",
      c: "4 × 1 + 3",
      d: "4 + 1 + 3"
    },
    correct: "b"
  },
  {
    text: "Ves 2 grupos de (6 + 2) frutas. ¿Qué operación lo representa?",
    options: {
      a: "2 + 6 + 2",
      b: "6 + (2 × 2)",
      c: "2 × (6 + 2)",
      d: "(6 + 2) ÷ 2"
    },
    correct: "c"
  }
];

let currentLevel = 0;

function showQuestion() {
  const question = questions[currentLevel];
  document.getElementById("question").textContent = `Nivel ${currentLevel + 1}: ${question.text}`;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  for (let key in question.options) {
