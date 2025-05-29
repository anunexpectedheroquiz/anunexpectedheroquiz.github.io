const quizData = [
  {
    question: "Question 1: Do you have any hobbies other than stargazing?",
    type: "text",
  },
  {
    question: "Question 2: Do you ever miss your old friends? If so, how much on a scale from 1-10.",
    type: "text",
  },
  {
    question: "Question 3: Who do you look up to as an idol? It could be a famous figure, relative, eccetera.",
    type: "text",
  },
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");

let currentQuestion = 0;
const userAnswers = [];

function showQuestion() {
  const question = quizData[currentQuestion];
  questionElement.innerText = question.question;

  optionsElement.innerHTML = "";

  if (question.type === "text") {
    const input = document.createElement("input");
    input.type = "text";
    input.id = "userInput";
    optionsElement.appendChild(input);
  }
}

submitButton.addEventListener("click", () => {
  const input = document.getElementById("userInput");

  if (input) {
    userAnswers.push({
      question: quizData[currentQuestion].question,
      answer: input.value.trim()
    });
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  let resultHTML = "<h1>Form Completed!</h1><h2>Your Answers:</h2><ul>";
  userAnswers.forEach(({ question, answer }) => {
    resultHTML += `<li><strong>${question}</strong><br>${answer}</li>`;
  });
  resultHTML += "</ul>";

  document.getElementById("quiz").innerHTML = resultHTML;
}

// Initialize first question
showQuestion();
