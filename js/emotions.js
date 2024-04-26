let quizData = [
  
  {
    question: "Which one of these is happy?",
    image: "happy.jpg",
    options: ["행복해", "화났어", "슬퍼해", "피곤해"],
    correct: "행복해",
  },
  {
    question: "Which one of these is sad?",
    image: "sad.jpg",
    options: ["행복해", "화났어", "슬퍼해", "피곤해"],
    correct: "슬퍼해",
  },
  {
    question: "Which one of these is angry?",
    image: "angry.jpg",
    options: ["행복해", "화났어", "슬퍼해", "피곤해"],
    correct: "화났어",
  },
  {
    question: "Which one of these is tired?",
    image: "tired.jpg",
    options: ["행복해", "화났어", "슬퍼해", "피곤해"],
    correct: "피곤해",
  },
];

const quizContainer = document.querySelector(".quiz-container");
const question = document.querySelector(".quiz-container .question");
const image = document.querySelector(".quiz-container #imgSource");
const options = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const startBtnContainer = document.querySelector(".start-btn-container");
const startBtn = document.querySelector(".start-btn-container .start-btn");

let questionNumber = 0;
let score = 0;
const MAX_QUESTIONS = 4;

const shuffleArray = (array) => {
  return array.slice().sort(() => Math.random() - 0.5);
};

quizData = shuffleArray(quizData);

const resetLocalStorage = () => {
  for (i = 0; i < MAX_QUESTIONS; i++) {
    localStorage.removeItem(`userAnswer_${i}`);
  }
};

resetLocalStorage();

const checkAnswer = (e) => {
  let userAnswer = e.target.textContent;
  if (userAnswer === quizData[questionNumber].correct) {
    score++;
    e.target.classList.add("correct");
  } else {
    e.target.classList.add("incorrect");
  }

  localStorage.setItem(`userAnswer_${questionNumber}`, userAnswer);

  let allOptions = document.querySelectorAll(".quiz-container .option");
  allOptions.forEach((o) => {
    o.classList.add("disabled");
  });
};

const createQuestion = () => {

  options.innerHTML = "";
  image.src = '../assets/' + quizData[questionNumber].image;
  question.innerHTML = `<span class='question-number'>${
    questionNumber + 1
  }/${MAX_QUESTIONS}</span>${quizData[questionNumber].question}`;

  const shuffledOptions = shuffleArray(quizData[questionNumber].options);

  shuffledOptions.forEach((o) => {
    const option = document.createElement("button");
    option.classList.add("option");
    option.innerHTML = o;
    option.addEventListener("click", (e) => {
      checkAnswer(e);
    });
    options.appendChild(option);
  });
};

const retakeQuiz = () => {
  questionNumber = 0;
  score = 0;
  quizData = shuffleArray(quizData);
  resetLocalStorage();

  createQuestion();
  quizResult.style.display = "none";
  quizContainer.style.display = "block";
};

const displayQuizResult = () => {
  quizResult.style.display = "flex";
  quizContainer.style.display = "none";
  quizResult.innerHTML = "";

  const resultHeading = document.createElement("h2");
  resultHeading.innerHTML = `You have scored ${score} out of ${MAX_QUESTIONS}.`;
  quizResult.appendChild(resultHeading);

  for (let i = 0; i < MAX_QUESTIONS; i++) {
    const resultItem = document.createElement("div");
    resultItem.classList.add("question-container");

    const userAnswer = localStorage.getItem(`userAnswer_${i}`);
    const correctAnswer = quizData[i].correct;

    let answeredCorrectly = userAnswer === correctAnswer;

    if (!answeredCorrectly) {
      resultItem.classList.add("incorrect");
    }

    resultItem.innerHTML = `<div class="question">Question ${i + 1}: ${
      quizData[i].question
    }</div>
    <div class="user-answer">Your answer: ${userAnswer || "Not Answered"}</div>
    <div class="correct-answer">Correct answer: ${correctAnswer}</div>`;

    quizResult.appendChild(resultItem);
  }

  // const retakeBtn = document.createElement("button");
  // retakeBtn.classList.add("retake-btn");
  // retakeBtn.innerHTML = "Retake Quiz";
  // retakeBtn.addEventListener("click", retakeQuiz);
  // quizResult.appendChild(retakeBtn);



  const retakeBtn = document.createElement("button");
  retakeBtn.classList.add("retake-btn");
  retakeBtn.innerHTML = "Retake Quiz";
  retakeBtn.addEventListener("click", () => {
      resetLocalStorage();
      quizResult.style.display = "none";
      startBtnContainer.style.display = "flex";
  });
  quizResult.appendChild(retakeBtn);
};

const displayNextQuestion = () => {
  if (questionNumber >= MAX_QUESTIONS - 1) {
    displayQuizResult();
    return;
  }

  questionNumber++;
  createQuestion();
};

nextBtn.addEventListener("click", displayNextQuestion);

startBtn.addEventListener("click", () => {
  startBtnContainer.style.display = "none";
  quizContainer.style.display = "block";
  retakeQuiz();
});