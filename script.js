// DOM Elements
const wordText = document.querySelector(".word"),
      hintBtn = document.querySelector(".hint-btn"),
      hintText = document.querySelector(".hint-text"),
      timeText = document.querySelector(".time b"),
      inputField = document.querySelector("input"),
      refreshBtn = document.querySelector(".refresh-word"),
      checkBtn = document.querySelector(".check-word"),
      tutorialBtn = document.querySelector(".tutorial-btn"),
      scoreDisplay = document.querySelector(".score-value"),
      progressBar = document.getElementById("progress"),
      prize100 = document.getElementById("prize-100"),
      prize500 = document.getElementById("prize-500"),
      prize1000 = document.getElementById("prize-1000"),
      celebration = document.getElementById("celebration"),
      tutorialModal = document.getElementById("tutorial-modal"),
      closeModal = document.querySelector(".close-modal"),
      gotItBtn = document.querySelector(".got-it-btn"),
      alertModal = document.getElementById("alert-modal"),
      alertTitle = document.getElementById("alert-title"),
      alertMessage = document.getElementById("alert-message"),
      alertConfirm = document.getElementById("alert-confirm"),
      alertCancel = document.getElementById("alert-cancel"),
      hintModal = document.getElementById("hint-modal"),
      hintConfirm = document.getElementById("hint-confirm"),
      hintCancel = document.getElementById("hint-cancel"),
      correctSound = document.getElementById("correctSound"),
      wrongSound = document.getElementById("wrongSound"),
      celebrationSound = document.getElementById("celebrationSound");

// Game variables
let words = [];
let wordDifficultyGroups = {};
let correctWord, timer;
let score = 0;
let usedHint = false;
let prizesAchieved = {
    100: false,
    500: false,
    1000: false
};
let currentTime = 30;
let isTimerPaused = false;

// Word difficulty categories (based on length and complexity)
const difficultyCategories = [
    { minScore: 0, maxScore: 200, maxLength: 6, description: "Very Easy" }, // 0-200 points
    { minScore: 201, maxScore: 400, maxLength: 8, description: "Easy" }, // 201-400 points
    { minScore: 401, maxScore: 600, maxLength: 10, description: "Medium" }, // 401-600 points
    { minScore: 601, maxScore: 800, maxLength: 12, description: "Hard" }, // 601-800 points
    { minScore: 801, maxScore: 1000, maxLength: 20, description: "Very Hard" } // 801-1000 points
];

// Common words that should appear more often in lower difficulty levels
const commonWords = [
    "friend", "number", "music", "queen", "store", "field", "taste", "group", 
    "garden", "tongue", "feather", "comfort", "position", "canvas", "exchange", 
    "meeting", "addition", "friend", "tomatoes", "pocket", "needle", "library", 
    "expensive", "sunshine", "umbrella", "chocolate", "bicycle", "whisper", 
    "laughter", "noodles", "keyboard", "internet", "browser", "function", 
    "variable", "notebook", "rainbow", "sunflower", "violin", "yesterday", 
    "jacket", "lemonade", "waffle", "island", "ketchup", "yogurt"
];

// Fetch words from JSON file and categorize them by difficulty
fetch('words.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        words = data;
        categorizeWordsByDifficulty();
        initGame();
    })
    .catch(error => {
        console.error('Error loading words:', error);
        // Fallback words if JSON fails to load
        words = [
            { word: "default", hint: "Fallback word" },
            { word: "example", hint: "Sample word" },
            { word: "javascript", hint: "Programming language of the web" },
            { word: "developer", hint: "Person who writes computer programs" }
        ];
        categorizeWordsByDifficulty();
        initGame();
    });

// Categorize words by difficulty based on length and commonality
const categorizeWordsByDifficulty = () => {
    wordDifficultyGroups = {
        veryEasy: [],
        easy: [],
        medium: [],
        hard: [],
        veryHard: []
    };

    words.forEach(wordObj => {
        const word = wordObj.word.toLowerCase();
        const length = word.length;
        const isCommon = commonWords.includes(word);

        if (length <= 6 || isCommon) {
            wordDifficultyGroups.veryEasy.push(wordObj);
        } 
        else if (length <= 8) {
            wordDifficultyGroups.easy.push(wordObj);
        }
        else if (length <= 10) {
            wordDifficultyGroups.medium.push(wordObj);
        }
        else if (length <= 12) {
            wordDifficultyGroups.hard.push(wordObj);
        }
        else {
            wordDifficultyGroups.veryHard.push(wordObj);
        }
    });
};

// Get words based on current score
const getWordsForCurrentScore = () => {
    let eligibleWords = [];
    
    if (score <= 200) {
        // Mostly very easy words, some easy
        eligibleWords = [...wordDifficultyGroups.veryEasy];
        if (Math.random() > 0.7) { // 30% chance to include an easy word
            eligibleWords = eligibleWords.concat(wordDifficultyGroups.easy);
        }
    } 
    else if (score <= 400) {
        // Mostly easy words, some very easy and medium
        eligibleWords = [...wordDifficultyGroups.easy];
        if (Math.random() > 0.8) { // 20% chance for very easy
            eligibleWords = eligibleWords.concat(wordDifficultyGroups.veryEasy);
        }
        if (Math.random() > 0.7) { // 30% chance for medium
            eligibleWords = eligibleWords.concat(wordDifficultyGroups.medium);
        }
    }
    else if (score <= 600) {
        // Mostly medium words, some easy and hard
        eligibleWords = [...wordDifficultyGroups.medium];
        if (Math.random() > 0.8) { // 20% chance for easy
            eligibleWords = eligibleWords.concat(wordDifficultyGroups.easy);
        }
        if (Math.random() > 0.7) { // 30% chance for hard
            eligibleWords = eligibleWords.concat(wordDifficultyGroups.hard);
        }
    }
    else if (score <= 800) {
        // Mostly hard words, some medium and very hard
        eligibleWords = [...wordDifficultyGroups.hard];
        if (Math.random() > 0.8) { // 20% chance for medium
            eligibleWords = eligibleWords.concat(wordDifficultyGroups.medium);
        }
        if (Math.random() > 0.7) { // 30% chance for very hard
            eligibleWords = eligibleWords.concat(wordDifficultyGroups.veryHard);
        }
    }
    else {
        // Mostly very hard words, some hard
        eligibleWords = [...wordDifficultyGroups.veryHard];
        if (Math.random() > 0.8) { // 20% chance for hard
            eligibleWords = eligibleWords.concat(wordDifficultyGroups.hard);
        }
    }

    // If for some reason no words are eligible (shouldn't happen), return all words
    if (eligibleWords.length === 0) {
        return words;
    }

    return eligibleWords;
};

// Show tutorial modal on first visit
const firstVisit = localStorage.getItem('firstVisit');
if (!firstVisit) {
    setTimeout(() => {
        tutorialModal.classList.add('show');
        isTimerPaused = true;
        localStorage.setItem('firstVisit', 'true');
    }, 500);
}

// Custom alert function
const showAlert = (title, message, confirmCallback = null, cancelCallback = null) => {
    alertTitle.textContent = title;
    alertMessage.textContent = message;
    
    alertConfirm.onclick = () => {
        alertModal.classList.remove("show");
        if (confirmCallback) confirmCallback();
    };
    
    if (cancelCallback) {
        alertCancel.style.display = "inline-block";
        alertCancel.onclick = () => {
            alertModal.classList.remove("show");
            cancelCallback();
        };
    } else {
        alertCancel.style.display = "none";
    }
    
    alertModal.classList.add("show");
};

// Initialize timer
const initTimer = maxTime => {
    currentTime = maxTime;
    clearInterval(timer);
    timer = setInterval(() => {
        if (!isTimerPaused) {
            if (currentTime > 0) {
                currentTime--;
                timeText.innerText = currentTime;
                if (currentTime <= 10) {
                    timeText.parentElement.style.color = "#ff4757";
                    timeText.parentElement.style.fontWeight = "700";
                }
            } else {
                clearInterval(timer);
                const pointsLost = correctWord.length;
                showAlert(
                    "Time's Up!",
                    `The correct word was: ${correctWord.toUpperCase()}\nYou lost ${pointsLost} points!`,
                    initGame
                );
                wrongSound.play();
                updateScore(-pointsLost);
            }
        }
    }, 1000);
};

// Initialize game
const initGame = () => {
    if (words.length === 0) return; // Don't initialize if words aren't loaded yet
    
    initTimer(30);
    timeText.parentElement.style.color = "#333";
    timeText.parentElement.style.fontWeight = "400";
    usedHint = false;
    hintText.classList.remove("show");
    hintBtn.classList.remove("used");
    
    // Get words appropriate for current score
    const eligibleWords = getWordsForCurrentScore();
    let randomObj = eligibleWords[Math.floor(Math.random() * eligibleWords.length)];
    let wordArray = randomObj.word.split("");
    
    // Shuffle the word
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    
    wordText.innerText = wordArray.join("");
    hintText.innerHTML = `<strong>Hint:</strong> ${randomObj.hint}`;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    inputField.focus();
};

// Update score display
const updateScore = (points) => {
    score += points;
    score = Math.max(0, score);
    scoreDisplay.innerText = score;
    
    const progressPercentage = Math.min((score / 1000) * 100, 100);
    progressBar.style.width = `${progressPercentage}%`;
    
    checkPrizes();
};

// Check for prize achievements
const checkPrizes = () => {
    if (score >= 100 && !prizesAchieved[100]) {
        prizesAchieved[100] = true;
        prize100.classList.add("active");
        celebrate("Bronze Prize Unlocked!", "#cd7f32");
    }
    
    if (score >= 500 && !prizesAchieved[500]) {
        prizesAchieved[500] = true;
        prize500.classList.add("active");
        celebrate("Silver Prize Unlocked!", "#c0c0c0");
    }
    
    if (score >= 1000 && !prizesAchieved[1000]) {
        prizesAchieved[1000] = true;
        prize1000.classList.add("active");
        celebrate("Gold Prize Unlocked! Game Completed!", "#ffd700");
    }
};

// Celebration effect
const celebrate = (message, color) => {
    celebrationSound.play();
    showAlert("Congratulations!", message);
    
    celebration.style.opacity = "1";
    celebration.innerHTML = "";
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = color;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        celebration.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.opacity = "1";
            confetti.style.transform = `translate(${(Math.random() - 0.5) * 200}px, ${Math.random() * 500}px) rotate(${Math.random() * 360}deg)`;
            confetti.style.transition = `all ${Math.random() * 3 + 2}s ease-out`;
        }, 0);
    }
    
    setTimeout(() => {
        celebration.style.opacity = "0";
    }, 3000);
};

// Check word function
const checkWord = () => {
    let userWord = inputField.value.toLowerCase().trim();
    
    if (!userWord) {
        showAlert("Empty Field", "Please enter a word to check!");
        return;
    }
    
    if (userWord !== correctWord) {
        const pointsLost = correctWord.length;
        wrongSound.play();
        showAlert(
            "Incorrect!", 
            `"${userWord}" is not correct.\nYou lost ${pointsLost} points!`, 
            initGame
        );
        updateScore(-pointsLost);
        return;
    }
    
    clearInterval(timer);
    correctSound.play();
    
    let points = correctWord.length;
    
    if (usedHint) {
        points = Math.floor(points * 0.5);
    }
    
    wordText.classList.add("correct-animation");
    setTimeout(() => {
        wordText.classList.remove("correct-animation");
    }, 500);
    
    showAlert(
        "Correct!", 
        `"${correctWord.toUpperCase()}" earned you ${points} points! (${correctWord.length} letters${usedHint ? " -50% for using hint" : ""})`,
        initGame
    );
    updateScore(points);
};

// Show hint
const showHint = () => {
    if (!hintText.classList.contains("show")) {
        hintModal.classList.add("show");
    }
};

// Event listeners
refreshBtn.addEventListener("click", () => {
    const pointsLost = correctWord.length;
    showAlert(
        "Word Changed", 
        `You changed the word before solving it!\nYou lost ${pointsLost} points.`, 
        initGame
    );
    updateScore(-pointsLost);
});

checkBtn.addEventListener("click", checkWord);
hintBtn.addEventListener("click", showHint);

inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkWord();
    }
});

tutorialBtn.addEventListener("click", () => {
    isTimerPaused = true;
    tutorialModal.classList.add("show");
});

closeModal.addEventListener("click", () => {
    isTimerPaused = false;
    tutorialModal.classList.remove("show");
});

gotItBtn.addEventListener("click", () => {
    isTimerPaused = false;
    tutorialModal.classList.remove("show");
});

window.addEventListener("click", (e) => {
    if (e.target === tutorialModal || e.target === alertModal || e.target === hintModal) {
        if (e.target === tutorialModal) {
            isTimerPaused = false;
        }
        tutorialModal.classList.remove("show");
        alertModal.classList.remove("show");
        hintModal.classList.remove("show");
    }
});

hintConfirm.addEventListener("click", () => {
    hintText.classList.add("show");
    hintBtn.classList.add("used");
    usedHint = true;
    hintModal.classList.remove("show");
});

hintCancel.addEventListener("click", () => {
    hintModal.classList.remove("show");
});

// Update tutorial content to include compound words information
document.addEventListener('DOMContentLoaded', () => {
    const tutorialContent = document.querySelector('.tutorial-content');
    const compoundWordsInfo = document.createElement('div');
    compoundWordsInfo.className = 'tutorial-step';
    compoundWordsInfo.innerHTML = `
        <h4><i class="fas fa-puzzle-piece"></i> Word Format</h4>
        <p>Some words may be compound words (usually written as two separate words) but will appear as one combined word in the game.</p>
        <p>Example: "MachineLearning" (Machine + Learning), "AugmentedReality" (Augmented + Reality)</p>
    `;
    tutorialContent.insertBefore(compoundWordsInfo, tutorialContent.children[1]);
});