let currentRound = 0;
let countdownValue = 5;
let roundTimerValue = 0;
let countdownInterval;
let roundTimerInterval;
let clues = [];

const rounds = [
  {
    roundHeading: 'Round 1',
    question: 'What is the capital of France?',
    answer: 'Paris',
    image: null,
  },
  {
    roundHeading: 'Round 2',
    question: 'Which planet is known as the Red Planet?',
    answer: 'Mars',
    image: 'mars.jpg',
  },
  // Add more rounds as needed
];

document.addEventListener('DOMContentLoaded', () => {
  showPopup();
});

function showPopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'block';
  startCountdown();
}

function showTimer(){
  const timerCard = document.getElementById('timer-card');
  timerCard.style.display = 'block';
}

function hideTimer(){
  const timerCard = document.getElementById('timer-card');
  timerCard.style.animation = 'slideOut 0.5s ease-in-out';
  setTimeout(() => {
    timerCard.style.display = 'none';
    timerCard.style.animation = '';
  }, 500);
}
function startTimer() {
  let startTime = new Date().getTime();
  setInterval(() => {
    const currentTime = new Date().getTime();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000);
    updateTimer(elapsedTime);
  }, 1000);
}

function endTimer() {
  const timerCard = document.getElementById('timer-card');
  const timerText = document.getElementById('timerText');
  const timerValue = timerText.innerText;
  hideTimer();
  return timerValue;
}

function updateTimer(seconds) {
  const timerText = document.getElementById('timerText');
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timerText.innerText = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function startCountdown() {
  const countdownElement = document.getElementById('countdown');
  countdownInterval = setInterval(() => {
    countdownValue--;
    countdownElement.innerText = countdownValue;

    if (countdownValue === 0) {
      clearInterval(countdownInterval);
      hidePopup();
    }
  }, 1000);
}

function hidePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
  showRound();
}

function showRound() {
  const roundCard = document.getElementById('roundCard');
  const roundHeading = document.getElementById('roundHeading');
  const question = document.getElementById('question');
  const questionImage = document.getElementById('questionImage');
  const answerInput = document.getElementById('answer');
  const clueList = document.getElementById('clueList');
  const roundTimer = document.getElementById('roundTimer');

  roundCard.style.display = 'block';
  roundHeading.innerText = rounds[currentRound].roundHeading;
  question.innerText = rounds[currentRound].question;
  questionImage.src = rounds[currentRound].image || '';
  answerInput.value = '';
  clueList.innerHTML = '';
  roundTimer.innerText = '0:00';
  showtimer();
  startRoundTimer();
}

function hideRound() {
    const roundCard = document.getElementById('roundCard');
    revealClue();
  }

function startRoundTimer() {
  roundTimerValue = 0;
  roundTimerInterval = setInterval(() => {
    roundTimerValue++;
    const minutes = Math.floor(roundTimerValue / 60);
    const seconds = roundTimerValue % 60;
    document.getElementById('roundTimer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
}

function checkAnswer() {
  const answerInput = document.getElementById('answer');
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = rounds[currentRound].answer.toLowerCase();

  if (userAnswer === correctAnswer) {
    clearInterval(roundTimerInterval);
    revealClue();
  } else {
    alert('Incorrect answer. Try again!');
  }
}

function revealClue() {
  const clueList = document.getElementById('clueCard');
  const currentClue = rounds[currentRound].clue;

  clues.push(currentClue);

  for (let i = 0; i <= currentRound; i++) {
    const clueItem = document.createElement('li');
    clueItem.innerText = clues[i];
    clueList.appendChild(clueItem);
  }

  currentRound++;
  if (currentRound < rounds.length) {
    showRound();
  } else {
    roundCard.style.display ="none";
    showClueCard();
  }
}

function showClueCard() {
  const clueCard = document.getElementById('clueCard');
  const allClues = document.getElementById('allClues');
  const clueAnswerInput = document.getElementById('clueAnswer');

  clueCard.style.display = 'block';
  allClues.innerHTML = clues.join('<br>');

  document.getElementById('styled-button').addEventListener('click', function() {
    const inputAnswer = clueAnswerInput.value.trim();
    if (inputAnswer === '1234') {
      hideClueCard();
    } else {
      clueAnswerInput.value = '';
      clueAnswerInput.classList.add('shake-animation');
      setTimeout(() => {
        clueAnswerInput.classList.remove('shake-animation');
      }, 500);
    }
  });
}

function hideClueCard() {
  const clueCard = document.getElementById('clueCard');
  clueCard.style.display = 'none';
  hidetimer();
  showCongratulations();
}

function showCongratulations() {
  const congratulationsCard = document.getElementById('congratulations');
  const elapsedTime = formatTime(roundTimerValue);
  const timeTakenElement = document.getElementById('time-taken');
  timeTakenElement.innerText = `Total Time Taken: ${elapsedTime}`;

  congratulationsCard.style.display = 'block';
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function checkClueAnswer() {
    const clueAnswerInput = document.getElementById('clueAnswer');
    const inputAnswer = clueAnswerInput.value.trim();
  
    if (inputAnswer === '1234') {
      hideClueCard();
    } else {
      clueAnswerInput.value = '';
      clueAnswerInput.classList.add('shake-animation');
      setTimeout(() => {
        clueAnswerInput.classList.remove('shake-animation');
      }, 500);
    }
  }
  