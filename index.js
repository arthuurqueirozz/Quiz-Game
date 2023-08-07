// Import stylesheets
import './style.css';

let startButton = document.getElementById('start-btn');
let nextButton = document.getElementById('next-btn');
let questionContainerElement = document.getElementById('question-container');
let questionElement = document.getElementById('question');
let answerButtonsElement = document.getElementById('answer-buttons');

let shuffleQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffleQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.questionText;
  question.answers.forEach((answer) => {
    let button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(event) {
  let selectButton = event.target;
  let correct = selectButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffleQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    questionText: 'Wich city is Ponte Preta from?',
    answers: [
      { text: 'JoinVille', correct: false },
      { text: 'Sergipe', correct: false },
      { text: 'Campinas', correct: true },
      { text: 'São Paulo', correct: false },
    ],
  },
  {
    questionText: 'Where is "Real Madrid" from?',
    answers: [
      { text: 'Madrid', correct: true },
      { text: 'JoinVille', correct: false },
      { text: 'Sergipe', correct: false },
      { text: 'São Paulo', correct: false },
    ],
  },
];
