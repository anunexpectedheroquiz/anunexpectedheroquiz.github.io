const quizData = [
  {
    question: "What was the name of the grumpy army veteran?",
    options: ["Frank", "George", "Hank", "Walter"],
    answer: "Frank"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Mars", "Earth"],
    answer: "Jupiter"
  }
];

const startButton = document.getElementById("startQuiz");
const playerNameInput = document.getElementById("playerName");
const quizContainer = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const timerElement = document.getElementById("timer");
const submitButton = document.getElementById("submit");

let currentQuestion = 0;
let totalScore = 0;
let userAnswers = [];
let questionStartTime = 0;
let countdownInterval;
const maxTime = 30;
let playerName = "";

startButton.addEventListener("click", () => {
  playerName = playerNameInput.value.trim();
  if (!playerName) {
    alert("Please enter your name.");
    return;
  }
  document.getElementById("start").style.display = "none";
  quizContainer.style.display = "block";
  showQuestion();
});

function showQuestion() {
  const question = quizData[currentQuestion];
  questionElement.innerText = question.question;
  optionsElement.innerHTML = "";

  question.options.forEach(option => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "option";
    radio.value = option;

    label.appendChild(radio);
    label.appendChild(document.createTextNode(option));
    optionsElement.appendChild(label);
    optionsElement.appendChild(document.createElement("br"));
  });

  questionStartTime = Date.now();
  startTimer();
}

submitButton.addEventListener("click", handleSubmit);

function handleSubmit() {
  clearInterval(countdownInterval);

  const selectedOption = document.querySelector('input[name="option"]:checked');
  const timeTakenSeconds = (Date.now() - questionStartTime) / 1000;

  const score = calculateScore(timeTakenSeconds, selectedOption?.value === quizData[currentQuestion].answer);
  totalScore += score;

  userAnswers.push({
    question: quizData[currentQuestion].question,
    selectedAnswer: selectedOption ? selectedOption.value : "No answer",
    correctAnswer: quizData[currentQuestion].answer,
    score: score
  });

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    saveResult();
    showResult();
  }
}

function calculateScore(timeTaken, isCorrect) {
  if (!isCorrect) return 0;
  return Math.max(0, Math.floor(1000 * ((maxTime - timeTaken) / maxTime)));
}

function startTimer() {
  let timeLeft = maxTime;
  timerElement.innerHTML = `<strong>Time Left:</strong> ${timeLeft}s`;

  countdownInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerHTML = `<strong>Time Left:</strong> ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      handleSubmit();
    }
  }, 1000);
}

function saveResult() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  leaderboard.push({ name: playerName, score: totalScore });
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function showResult() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  leaderboard.sort((a, b) => b.score - a.score);

  let resultHTML = `<h1>Quiz Completed!</h1><h2>Your Score: ${totalScore}</h2>`;
  resultHTML += `<h2>Leaderboard</h2><ol>`;
  leaderboard.forEach(player => {
    resultHTML += `<li>${player.name}: ${player.score}</li>`;
  });
  resultHTML += `</ol>`;

  document.getElementById("quiz").innerHTML = resultHTML;
}
