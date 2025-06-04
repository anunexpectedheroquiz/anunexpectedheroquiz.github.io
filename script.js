const quizData = [
    {
      question: "What was the name of the grumpy army vereran?",
      options: ["A", "B", "C", "D"],
      answer: "A"
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Jupiter", "Saturn", "Mars", "Earth"],
      answer: "Jupiter"
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

showQuestion();
