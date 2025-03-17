"use strict";
const questions = [
  {
    question: `What will the following JavaScript code output?\nconsole.log(typeof null);`,
    options: ["null", "object", "undefined", "string"],
    answer: "object",
  },
  {
    question: "Which JavaScript method is used to stop event bubbling?",
    options: [
      "stopPropagation()",
      "preventDefault()",
      "clearInterval()",
      "stopEvent()",
    ],
    answer: "stopPropagation()",
  },
  {
    question: "What does CORS (Cross-Origin Resource Sharing) allow?",
    options: [
      "Secure backend authentication",
      "Running JavaScript outside the browser",
      "Requesting resources from different domains",
      "Speeding up CSS rendering",
    ],
    answer: "Requesting resources from different domains",
  },
  {
    question: "Which of the following is NOT a valid HTTP request method?",
    options: ["GET", "POST", "PUT", "FETCH"],
    answer: "FETCH",
  },
  {
    question: "In Node.js, which module is commonly used to create a server?",
    options: ["fs", "http", "os", "path"],
    answer: "http",
  },
];

// Grabbing essential elements.

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");

let score = 0; // At the initial phase score will be 0
let currentQuestionIndex = 0; // As we are storing the question in array the question will start fron 0th index

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  nextButton.innerHTML = `Next`; // When the quiz will end will use the same button to show 'Play Again'
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  //   console.log(currentQuestion);
  let currentQuestionNo = currentQuestionIndex + 1;
  //   console.log(currentQuestionNo);
  questionElement.innerHTML =
    currentQuestionNo + "." + currentQuestion.question;
  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerHTML = option;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    button.addEventListener("click", () =>
      selectAnswer(button, currentQuestion.answer)
    );
    nextButton.style.display = "none";
  });
}

function selectAnswer(selectedBtn, correctAnswer) {
  const isCorrect = selectedBtn.innerText === correctAnswer;
  console.log(isCorrect);
  if (isCorrect) {
    score++;
    console.log(score);
    selectedBtn.style.backgroundColor = "green";
  } else {
    selectedBtn.style.backgroundColor = "red";
  }
  Array.from(answerButtons.children).forEach(
    (button) => (button.disabled = true)
  );
  nextButton.style.display = "block";
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "PLAY AGAIN";
  nextButton.style.display = "block";
  nextButton.addEventListener("click", startQuiz, { once: true });
}

startQuiz();
