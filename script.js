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

const levelBackgrounds = [
  "#4a7c2b",           // Nivel 1 - Verde pasto
  "#2b5a7c",           // Nivel 2 - Bosque oscuro
  "#7c3f2b"            // Nivel 3 - Bosque otoñal
];
let currentLevel = 0;
gameArea.style.backgroundColor = levelBackgrounds[currentLevel];
function showQuestion() {
  const question = questions[currentLevel];
  document.getElementById("question").textContent = `Nivel ${currentLevel + 1}: ${question.text}`;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  for (let key in question.options) {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.innerText = `${key}) ${question.options[key]}`;
    btn.onclick = () => checkAnswer(key);
    answersDiv.appendChild(btn);
    answersDiv.appendChild(document.createElement("br"));
  }

  document.getElementById("result").textContent = "";
}

function checkAnswer(selectedOption) {
  const correctOption = questions[currentLevel].correct;
  const resultDiv = document.getElementById("result");

  if (selectedOption === correctOption) {
    resultDiv.textContent = "✅ ¡Correcto! Avanzando al siguiente nivel...";
    resultDiv.style.color = "lightgreen";

    // Coordenadas simuladas del bosque
    const levelPositions = [
      { x: 50, y: 50 },   // Nivel 1
      { x: 300, y: 100 }, // Nivel 2
      { x: 500, y: 300 }, // Nivel 3
    ];

    // Esperamos 0.5s, luego movemos al personaje
    setTimeout(() => {
      const newPos = levelPositions[currentLevel];
      movePlayerTo(newPos.x, gameArea.clientHeight - newPos.y);
    }, 500);

    // Esperamos 2s para mostrar la siguiente pregunta
    setTimeout(() => {
      currentLevel++;
      if (currentLevel < questions.length) {
        showQuestion();
      } else {
        document.getElementById("question").textContent = "🎉 ¡Felicidades! Has completado todos los niveles.";
        document.getElementById("answers").innerHTML = "";
        resultDiv.textContent = "👏 Puedes recargar la página para volver a jugar.";
      }
    }, 2000);
  } else {
    resultDiv.textContent = "❌ Esa no es la correcta. Intenta de nuevo.";
    resultDiv.style.color = "#ff6666";
  }
}


// Iniciar la primera pregunta al cargar
showQuestion();
