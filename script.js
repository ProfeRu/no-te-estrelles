// Lista de preguntas
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

  // Mostrar las opciones
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

    setTimeout(() => {
      currentLevel++;
      if (currentLevel < questions.length) {
        showQuestion();
      } else {
        document.getElementById("question").textContent = "🎉 ¡Felicidades! Has completado todos los niveles.";
        document.getElementById("answers").innerHTML = "";
        resultDiv.textContent = "👏 Puedes reiniciar para volver a jugar.";
      }
    }, 1500);
  } else {
    resultDiv.textContent = "❌ Esa no es la correcta. Intenta de nuevo.";
    resultDiv.style.color = "#ff6666";
  }
}

// Mover el personaje con clic o touch
const player = document.getElementById('player');
const gameArea = document.getElementById('game-area');

function movePlayerTo(x, y) {
  const maxX = gameArea.clientWidth - player.clientWidth;
  const maxY = gameArea.clientHeight - player.clientHeight;

  let newX = x - player.clientWidth / 2;
  let newY = y - player.clientHeight / 2;

  if (newX < 0) newX = 0;
  if (newX > maxX) newX = maxX;
  if (newY < 0) newY = 0;
  if (newY > maxY) newY = maxY;

  const bottomValue = maxY - newY;

  player.style.left = newX + 'px';
  player.style.bottom = bottomValue + 'px';
}

function onGameAreaClick(e) {
  e.preventDefault();
  let clickX, clickY;

  if (e.type === 'touchstart') {
    clickX = e.touches[0].clientX - gameArea.getBoundingClientRect().left;
    clickY = e.touches[0].clientY - gameArea.getBoundingClientRect().top;
  } else {
    clickX = e.clientX - gameArea.getBoundingClientRect().left;
    clickY = e.clientY - gameArea.getBoundingClientRect().top;
  }

  movePlayerTo(clickX, clickY);
}

gameArea.addEventListener('click', onGameAreaClick);
gameArea.addEventListener('touchstart', onGameAreaClick);

// Iniciar el juego
showQuestion();
