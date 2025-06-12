<script>
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
  answersDiv.innerHTML = ""; // Limpiar antes
  for (let key in question.options) {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.innerText = `${key}) ${question.options[key]}`;
    btn.onclick = () => checkAnswer(key);
    answersDiv.appendChild(btn);
    answersDiv.appendChild(document.createElement("br"));
  }

  // Limpiar resultado anterior
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
    }, 1500); // esperar un momento antes de cambiar
  } else {
    resultDiv.textContent = "❌ Esa no es la correcta. Intenta de nuevo.";
    resultDiv.style.color = "#ff6666";
  }
}

// Iniciar el juego
showQuestion();
</script>
