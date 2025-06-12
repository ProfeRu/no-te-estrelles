function checkAnswer() {
  const answer = parseInt(document.getElementById("answer").value);
  const correct = (2 + 3) * 2; // Esto luego será aleatorio

  if (answer === correct) {
    document.getElementById("result").textContent = "✅ ¡Correcto!";
  } else {
    document.getElementById("result").textContent = "❌ ¡Te estrellaste!";
  }
}
