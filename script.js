let currentRound = 0;
let startTime;
let timerValue = 0;
let countdownInterval;
let clues = [];
let countdownCard;
let countdownTimerValue;
let countdownTimerInterval;

const rounds = [
  {
    question: 'What is the capital of France?',
    answer: 'Paris',
    clue: 'Clue 1 for Round 1',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answer: 'Mars',
    clue: 'Clue 2 for Round 2',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answer: 'Mars',
    clue: 'Clue 2 for Round 2',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answer: 'Mars',
    clue: 'Clue 2 for Round 2',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answer: 'Mars',
    clue: 'Clue 2 for Round 2',
  },
  
];

document.addEventListener('DOMContentLoaded', () => {
  hideRound();
  hideCongratulations();
  showPopup();
});

function showPopup() {
  startTime = Date.now();
  const popup = document.getElementById('popup');
  showCardView(popup);
  startCountdown();
}

function startCountdown() {
  timerValue = 5;
  updateCountdown();
  countdownInterval = setInterval(() => {
    timerValue--;
    updateCountdown();

    if (timerValue === 0) {
      clearInterval(countdownInterval);
      hidePopup();
    }
  }, 1000);
}

function updateCountdown() {
  const countdownElement = document.getElementById('timer');
  const minutes = Math.floor(timerValue / 60);
  const remainingSeconds = timerValue % 60;
  countdownElement.innerText = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function hidePopup() {
  const popup = document.getElementById('popup');
  hideCardView(popup);

  popup.addEventListener('transitionend', () => {
    popup.removeEventListener('transitionend', hidePopup);
    showRound();
  });
}

function showRound() {
  countdownCard = document.getElementById('countdownCard');
  showCardView(countdownCard);
  if (currentRound < rounds.length) {
    const roundCard = document.getElementById('roundCard');
    const roundHeading = document.getElementById('roundHeading');
    const question = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const clueList = document.getElementById('clueList');

    roundHeading.innerText = `Round ${currentRound + 1}`;
    question.innerText = rounds[currentRound].question;
    answerInput.value = '';
    clueList.innerHTML = '';

    showCardView(roundCard);

    for (let i = 0; i <= currentRound; i++) {
      const clueItem = document.createElement('li');
      clueItem.innerText = rounds[i].clue;
      clueList.appendChild(clueItem);
    }

    startRoundCountdown();
  } else {
    showCongratulations();
  }
}

function startRoundCountdown() {
  countdownTimerValue = 30;
  const countdownElement = document.getElementById('countdownTimer');
  const submitAnswerBtn = document.getElementById('submitAnswerBtn');

  submitAnswerBtn.disabled = false;
  countdownInterval = setInterval(() => {
    countdownTimerValue--;

    const minutes = Math.floor(timerValue / 60);
    const remainingSeconds = timerValue % 60;

    countdownElement.innerText = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

    if (countdownTimerValue === 0) {
      clearInterval(countdownTimerInterval);
      answerInput.value = '';
      checkAnswer();
    }
  }, 1000);
}

function hideRound() {
  const roundCard = document.getElementById('roundCard');
  hideCardView(roundCard);

  roundCard.addEventListener('transitionend', () => {
    roundCard.removeEventListener('transitionend', hideRound);
    currentRound++;
    showRound();
  });
}
function hideCongratulations() {
  const congratulationsCard = document.getElementById('congratulations');
  hideCardView(congratulationsCard);

  congratulationsCard.addEventListener('transitionend', () => {
    congratulationsCard.removeEventListener('transitionend', hideCongratulations);
    showRound();
  });
}

function showCongratulations() {
  const congratulationsCard = document.getElementById('congratulations');
  const elapsedTime = getElapsedTime();
  const timeTakenElement = document.getElementById('time-taken');
  timeTakenElement.innerText = `Total Time Taken: ${elapsedTime}`;

  showCardView(congratulationsCard);
  endGame();
}

function endGame() {
  clearInterval(countdownInterval);
  const elapsedTime = getElapsedTime();
  const timeTakenElement = document.getElementById('time-taken');
  timeTakenElement.innerText = `Total Time Taken: ${elapsedTime}`;
}

function getElapsedTime() {
  const currentTime = Date.now();
  const elapsedMilliseconds = currentTime - startTime;
  const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function hideCardView(element) {
  element.style.opacity = 0;
  element.style.transform = 'translateY(20px)';
  setTimeout(() => {
    element.style.display = 'none';
  }, 500);
}

function showCardView(element) {
  element.style.display = 'block';
  element.offsetHeight;
  element.style.transition = 'opacity 0.5s, transform 0.5s';
  element.style.opacity = 1;
  element.style.transform = 'translateY(0)';
}

function checkAnswer() {
  const answerInput = document.getElementById('answer');
  const userAnswer = answerInput.value.toLowerCase(); // Convert to lowercase for case-insensitive comparison
  const correctAnswer = rounds[currentRound].answer.toLowerCase();

  clearInterval(countdownTimerInterval); // Stop the countdown timer

  if (userAnswer === correctAnswer) {
    // Correct answer, move to the next round
    hideRound();
  } else {
    // Incorrect answer, clear the input field for reentry
    answerInput.value = '';
    // You can add logic here to notify the user that the answer is incorrect (e.g., display a message)
  }
}
