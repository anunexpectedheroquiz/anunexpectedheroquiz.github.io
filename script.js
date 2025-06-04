const quizData = [
  {
    question: "What was the name of the grumpy army veteran?",
    options: ["Cedric", "Pete", "Frank", "Cody Newman"],
    answer: "Frank"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Jupiter", "Saturn", "Mars", "Earth"],
    answer: "Jupiter"
  }
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");

let currentQuestion = 0;
const userAnswers = [];
let totalScore = 0;
let questionStartTime = 0;

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

  // Start timing
  questionStartTime = Date.now();
}

submitButton.addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) {
    alert("Please select an option before continuing.");
    return;
  }

  const timeTakenSeconds = (Date.now() - questionStartTime) / 1000;
  const score = calculateScore(timeTakenSeconds, selectedOption.value === quizData[currentQuestion].answer);
  totalScore += score;

  userAnswers.push({
    question: quizData[currentQuestion].question,
    selectedAnswer: selectedOption.value,
    correctAnswer: quizData[currentQuestion].answer,
    score: score
  });

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function calculateScore(timeTaken, isCorrect) {
  if (!isCorrect) return 0;
  const maxTime = 30; // seconds
  return Math.max(0, Math.floor(1000 * ((maxTime - timeTaken) / maxTime)));
}

function showResult() {
  let resultHTML = `<h1>Quiz Completed!</h1><h2>Total Score: ${totalScore}</h2><ul>`;
  userAnswers.forEach(({ question, selectedAnswer, correctAnswer, score }) => {
    resultHTML += `<li><strong>${question}</strong><br>Your Answer: ${selectedAnswer}<br>Correct Answer: ${correctAnswer}<br>Score: ${score}</li>`;
  });
  resultHTML += "</ul>";

  document.getElementById("quiz").innerHTML = resultHTML;
}

showQuestion();
