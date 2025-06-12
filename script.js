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
