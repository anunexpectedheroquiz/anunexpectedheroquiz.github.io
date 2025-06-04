document.addEventListener("DOMContentLoaded", () => {
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
      correctAnswer: quizData
