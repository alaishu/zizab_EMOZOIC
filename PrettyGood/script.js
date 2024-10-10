document.addEventListener("DOMContentLoaded", function () {
  // Navigation menu functionality
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  function toggleMenu() {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
    menuToggle.innerHTML = menuToggle.classList.contains("active")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  }

  menuToggle.addEventListener("click", toggleMenu);

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      toggleMenu();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Smooth scrolling for navigation links and "Let's Learn" button
  navLinks.forEach((link) => {
    link.addEventListener("click", smoothScroll);
  });

  document.querySelector(".lets-learn").addEventListener("click", (e) => {
    e.preventDefault();
    const emotionsSection = document.querySelector("#emotions");
    smoothScroll.call({ getAttribute: () => "#emotions" }, e);
  });

  function smoothScroll(e) {
    e.preventDefault();
    toggleMenu(); // Close menu on link click for mobile
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const emotionCards = document.querySelectorAll(".emotion-card");
  const emotionPopup = document.getElementById("emotion-popup");
  const emotionTitle = document.getElementById("emotion-title");
  const emotionDescription = document.getElementById("emotion-description");
  const closePopupButton = document.querySelector(".close-popup");

  const emotionInfo = {
    happy: {
      title: "Happiness",
      description:
        "Happiness is when you feel good and smile a lot. It's like sunshine in your heart!",
      color: "#FFD700", // Gold
    },
    sad: {
      title: "Sadness",
      description:
        "Sadness is when you feel down or blue. It's okay to cry sometimes when you're sad.",
      color: "#4682B4", // Steel Blue
    },
    angry: {
      title: "Anger",
      description:
        "Anger is when you feel upset or mad. It's like a storm inside you, but it's important to calm down.",
      color: "#FF4500", // Orange Red
    },
    fear: {
      title: "Fear",
      description:
        "Fear is when you feel scared or worried. It's like butterflies in your tummy, but being brave helps!",
      color: "#800080", // Purple
    },
  };

  emotionCards.forEach((card) => {
    card.addEventListener("click", function () {
      const emotion = this.getAttribute("data-emotion");
      const info = emotionInfo[emotion];
      emotionTitle.textContent = info.title;
      emotionDescription.textContent = info.description;
      emotionPopup.style.display = "flex";
      emotionPopup.style.backgroundColor = `${info.color}88`; // Add transparency
    });
  });

  // Add event listener for closing the popup
  closePopupButton.addEventListener("click", function () {
    emotionPopup.style.display = "none";
  });

  // Close popup when clicking outside the content
  emotionPopup.addEventListener("click", function (event) {
    if (event.target === emotionPopup) {
      emotionPopup.style.display = "none";
    }
  });

  // Emotion Matching Game
  const gameGrid = document.querySelector(".game-grid");
  const timerDisplay = document.getElementById("timer");
  const resultDisplay = document.getElementById("game-result");
  const startButton = document.getElementById("start-game");
  const resetButton = document.getElementById("reset-game");

  const emotions = ["😊", "😢", "😠", "😨"];
  let cards = [...emotions, ...emotions];
  let timeLeft = 60;
  let timerInterval;
  let flippedCards = [];
  let matchedPairs = 0;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function createCard(emoji) {
    const card = document.createElement("div");
    card.classList.add("game-card");
    card.dataset.emoji = emoji;
    card.addEventListener("click", flipCard);
    return card;
  }

  function startGame() {
    gameGrid.innerHTML = "";
    cards = shuffleArray(cards);
    cards.forEach((emoji) => {
      gameGrid.appendChild(createCard(emoji));
    });
    timeLeft = 60;
    matchedPairs = 0;
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
    resultDisplay.textContent = "";
    startButton.disabled = true;
    resetButton.disabled = false;
  }

  function resetGame() {
    clearInterval(timerInterval);
    startGame();
  }

  function updateTimer() {
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame(false);
    }
    timeLeft--;
  }

  function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
      this.textContent = this.dataset.emoji;
      this.classList.add("flipped");
      flippedCards.push(this);

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
      }
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.emoji === card2.dataset.emoji) {
      matchedPairs++;
      if (matchedPairs === emotions.length) {
        endGame(true);
      }
    } else {
      card1.textContent = "";
      card2.textContent = "";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
    }
    flippedCards = [];
  }

  function endGame(isWin) {
    clearInterval(timerInterval);
    if (isWin) {
      resultDisplay.textContent =
        "Congratulations! You've matched all the emotions!";
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      resultDisplay.textContent = "Time's up! Try again!";
    }
    startButton.disabled = false;
  }

  startButton.addEventListener("click", startGame);
  resetButton.addEventListener("click", resetGame);
});

// Ensure smooth scrolling works for the "Let's Learn" button
document.querySelector(".lets-learn").addEventListener("click", function (e) {
  e.preventDefault();
  const emotionsSection = document.querySelector("#emotions");
  emotionsSection.scrollIntoView({ behavior: "smooth", block: "start" });
});
