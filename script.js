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

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");

let currentQuestion = 0;
const userAnswers = [];

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
}

submitButton.addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');

  if (!selectedOption) {
    alert("Please select an option before continuing.");
    return;
  }

  userAnswers.push({
    question: quizData[currentQuestion].question,
    answer: selectedOption.value
  });

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  let resultHTML = "<h1>Quiz Completed!</h1><h2>Your Answers:</h2><ul>";
  userAnswers.forEach(({ question, answer }) => {
    resultHTML += `<li><strong>${question}</strong><br>Answer: ${answer}</li>`;
  });
  resultHTML += "</ul>";

  document.getElementById("quiz").innerHTML = resultHTML;
}

showQuestion();
