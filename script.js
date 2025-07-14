// Game variables
let words = [];
let usedWords = new Set();
let correctWord, timer;
let score = 0;
let usedHint = false;
let prizesAchieved = {
    100: false,
    500: false,
    1000: false
};

// DOM Elements
const wordText = document.querySelector(".word");
const hintBtn = document.querySelector(".hint-btn");
const hintText = document.querySelector(".hint-text");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const tutorialBtn = document.querySelector(".tutorial-btn");
const scoreDisplay = document.querySelector(".score-value");
const progressBar = document.getElementById("progress");
const prize100 = document.getElementById("prize-100");
const prize500 = document.getElementById("prize-500");
const prize1000 = document.getElementById("prize-1000");
const celebration = document.getElementById("celebration");
const tutorialModal = document.getElementById("tutorial-modal");
const closeModal = document.querySelector(".close-modal");
const gotItBtn = document.querySelector(".got-it-btn");

// Enhanced difficulty configuration
const DIFFICULTY_LEVELS = {
    EASY: {
        scoreRange: [0, 300],
        description: "Very common short words",
        filters: [
            { minLength: 3, maxLength: 4, common: true },
            { minLength: 5, maxLength: 5, common: true }
        ]
    },
    MEDIUM: {
        scoreRange: [301, 600],
        description: "Common longer words",
        filters: [
            { minLength: 5, maxLength: 6, common: true },
            { minLength: 7, maxLength: 8, common: true }
        ]
    },
    HARD: {
        scoreRange: [601, 800],
        description: "Less common words",
        filters: [
            { minLength: 6, maxLength: 8, common: false },
            { minLength: 9, maxLength: 10, common: true }
        ]
    },
    EXPERT: {
        scoreRange: [801, 1000],
        description: "Technical/obscure words",
        filters: [
            { minLength: 9, maxLength: 12, common: false },
            { minLength: 13, maxLength: 20, common: false }
        ]
    }
};

// Common words list (for difficulty filtering)
const COMMON_WORDS = new Set([
    "apple", "music", "house", "water", "happy", "garden", "bicycle", 
    "sunset", "coffee", "friend", "number", "store", "field", "pocket",
    "needle", "queen", "tomato", "orange", "banana", "window", "door",
    "table", "chair", "light", "phone", "paper", "pen", "book", "food",
    "drink", "sleep", "dream", "smile", "laugh", "child", "adult", "parent",
    "pizza", "rocket", "dinosaur", "basketball", "sunflower", "computer",
    "internet", "school", "teacher", "doctor", "hospital", "restaurant"
]);

// Load and categorize words
async function loadWords() {
    try {
        const response = await fetch('words.json');
        if (!response.ok) throw new Error('Failed to load words');
        
        words = await response.json();
        
        // Add some better common words
        words.push(
            { word: "pizza", hint: "Italian dish with toppings" },
            { word: "rocket", hint: "Space vehicle" },
            { word: "dinosaur", hint: "Prehistoric creature" },
            { word: "basketball", hint: "Sport with hoop and ball" },
            { word: "sunflower", hint: "Tall yellow flower" },
            { word: "computer", hint: "Electronic device for processing data" },
            { word: "internet", hint: "Global network of computers" }
        );
        
        updateTutorial();
        initGame();
    } catch (error) {
        console.error('Error loading words:', error);
        loadFallbackWords();
    }
}

function loadFallbackWords() {
    words = [
        { word: "apple", hint: "Common fruit" },
        { word: "music", hint: "Auditory art form" },
        { word: "garden", hint: "Space for plants" },
        { word: "bicycle", hint: "Two-wheeled vehicle" },
        { word: "pizza", hint: "Italian dish with toppings" },
        { word: "rocket", hint: "Space vehicle" },
        { word: "dinosaur", hint: "Prehistoric creature" }
    ];
    updateTutorial();
    initGame();
}

function updateTutorial() {
    const tutorialContainer = document.querySelector('.tutorial-content');
    
    // Clear any existing tutorial steps we added
    const existingSteps = document.querySelectorAll('.tutorial-step');
    existingSteps.forEach(step => {
        if (step.textContent.includes('Difficulty Levels') || step.textContent.includes('Word Formats')) {
            tutorialContainer.removeChild(step);
        }
    });

    const difficultyStep = document.createElement('div');
    difficultyStep.className = 'tutorial-step';
    difficultyStep.innerHTML = `
        <h4><i class="fas fa-random"></i> Difficulty Levels</h4>
        <ul>
            <li><strong>0-300 points:</strong> ${DIFFICULTY_LEVELS.EASY.description}</li>
            <li><strong>301-600 points:</strong> ${DIFFICULTY_LEVELS.MEDIUM.description}</li>
            <li><strong>601-800 points:</strong> ${DIFFICULTY_LEVELS.HARD.description}</li>
            <li><strong>801-1000 points:</strong> ${DIFFICULTY_LEVELS.EXPERT.description}</li>
        </ul>
    `;
    tutorialContainer.appendChild(difficultyStep);

    const formatStep = document.createElement('div');
    formatStep.className = 'tutorial-step';
    formatStep.innerHTML = `
        <h4><i class="fas fa-font"></i> Word Formats</h4>
        <ul>
            <li>Answers are <strong>not case sensitive</strong></li>
            <li>Compound words appear as one (e.g. "machinelearning")</li>
            <li>Words won't repeat until all are used</li>
            <li>Timeouts deduct points equal to word length</li>
        </ul>
    `;
    tutorialContainer.appendChild(formatStep);
}

function getWordByDifficulty() {
    const currentLevel = getCurrentDifficultyLevel();
    let wordPool = filterWordsForDifficulty(currentLevel);
    
    // First 100 points use only the simplest words
    if (score < 100) {
        wordPool = wordPool.filter(word => 
            word.word.length <= 4 && COMMON_WORDS.has(word.word.toLowerCase())
        );
    }
    
    const availableWords = wordPool.filter(word => !usedWords.has(word.word.toLowerCase()));
    
    if (availableWords.length === 0) {
        usedWords.clear();
        return getWordByDifficulty();
    }
    
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    usedWords.add(randomWord.word.toLowerCase());
    return randomWord;
}

function getCurrentDifficultyLevel() {
    if (score <= DIFFICULTY_LEVELS.EASY.scoreRange[1]) return DIFFICULTY_LEVELS.EASY;
    if (score <= DIFFICULTY_LEVELS.MEDIUM.scoreRange[1]) return DIFFICULTY_LEVELS.MEDIUM;
    if (score <= DIFFICULTY_LEVELS.HARD.scoreRange[1]) return DIFFICULTY_LEVELS.HARD;
    return DIFFICULTY_LEVELS.EXPERT;
}

function filterWordsForDifficulty(level) {
    return words.filter(word => {
        return level.filters.some(filter => {
            const lengthMatch = word.word.length >= filter.minLength && 
                               word.word.length <= filter.maxLength;
            const commonMatch = filter.common ? 
                               COMMON_WORDS.has(word.word.toLowerCase()) : 
                               !COMMON_WORDS.has(word.word.toLowerCase());
            return lengthMatch && commonMatch;
        });
    });
}

function gameAlert(message) {
    return new Promise(resolve => {
        const alertBox = document.createElement('div');
        alertBox.className = 'game-alert';
        alertBox.innerHTML = `
            <div class="game-alert-content">
                <h3>Word Scramble</h3>
                <p>${message}</p>
                <button class="game-alert-btn">OK</button>
            </div>
        `;
        document.body.appendChild(alertBox);
        
        const okBtn = alertBox.querySelector('.game-alert-btn');
        okBtn.focus();
        
        okBtn.addEventListener('click', () => {
            document.body.removeChild(alertBox);
            resolve();
        });
    });
}

async function gameConfirm(message) {
    return new Promise(resolve => {
        const confirmBox = document.createElement('div');
        confirmBox.className = 'game-confirm';
        confirmBox.innerHTML = `
            <div class="game-confirm-content">
                <h3>Word Scramble</h3>
                <p>${message}</p>
                <div class="confirm-buttons">
                    <button class="confirm-yes">Yes</button>
                    <button class="confirm-no">No</button>
                </div>
            </div>
        `;
        document.body.appendChild(confirmBox);
        
        const yesBtn = confirmBox.querySelector('.confirm-yes');
        const noBtn = confirmBox.querySelector('.confirm-no');
        yesBtn.focus();
        
        yesBtn.addEventListener('click', () => {
            document.body.removeChild(confirmBox);
            resolve(true);
        });
        
        noBtn.addEventListener('click', () => {
            document.body.removeChild(confirmBox);
            resolve(false);
        });
    });
}

// Show tutorial modal on first visit
const firstVisit = localStorage.getItem('firstVisit');
if (!firstVisit) {
    setTimeout(() => {
        tutorialModal.classList.add('show');
        localStorage.setItem('firstVisit', 'true');
    }, 500);
}

function initTimer(maxTime) {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            timeText.innerText = maxTime;
            if (maxTime <= 10) {
                timeText.parentElement.style.color = "#ff4757";
            }
        } else {
            clearInterval(timer);
            const pointsLost = correctWord.length;
            score = Math.max(0, score - pointsLost);
            scoreDisplay.innerText = score;
            
            const progressPercentage = Math.min((score / 1000) * 100, 100);
            progressBar.style.width = `${progressPercentage}%`;
            
            gameAlert(`⏰ Time's up! You lost ${pointsLost} points!\nThe correct word was: ${formatDisplayWord(correctWord)}`)
                .then(initGame);
        }
    }, 1000);
}

function formatDisplayWord(word) {
    // Try to find a two-word combination that makes sense
    for (let i = 1; i < word.length; i++) {
        const part1 = word.substring(0, i);
        const part2 = word.substring(i);
        if (isValidWord(part1) && isValidWord(part2)) {
            return `${part1.toUpperCase()} ${part2.toUpperCase()}`;
        }
    }
    return word.toUpperCase();
}

function isValidWord(word) {
    return words.some(w => w.word.toLowerCase() === word.toLowerCase());
}

function initGame() {
    if (words.length === 0) return;
    
    initTimer(30);
    timeText.parentElement.style.color = "#333";
    usedHint = false;
    hintText.classList.remove("show");
    hintBtn.classList.remove("used");
    
    const randomObj = getWordByDifficulty();
    let wordArray = randomObj.word.split("");
    
    // Shuffle the word
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    
    // Display each letter in its own box
    wordText.innerHTML = wordArray.map(letter => 
        `<span class="word-letter">${letter.toUpperCase()}</span>`
    ).join("");
    
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    inputField.focus();
}

function updateScore(points) {
    score += points;
    scoreDisplay.innerText = score;
    
    const progressPercentage = Math.min((score / 1000) * 100, 100);
    progressBar.style.width = `${progressPercentage}%`;
    
    checkPrizes();
}

function checkPrizes() {
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
}

async function celebrate(message, color) {
    await gameAlert(`🎉 ${message} 🎉`);
    
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
}

async function checkWord() {
    let userWord = inputField.value.toLowerCase().trim();
    
    if (!userWord) {
        await gameAlert("Please enter a word to check!");
        return;
    }
    
    if (userWord !== correctWord) {
        await gameAlert(`Oops! "${userWord}" is not correct. Try again!`);
        return;
    }
    
    clearInterval(timer);
    
    let points = correctWord.length;
    
    if (usedHint) {
        points = Math.floor(points * 0.5);
    }
    
    wordText.classList.add("correct-animation");
    setTimeout(() => {
        wordText.classList.remove("correct-animation");
    }, 500);
    
    await gameAlert(`🎯 Correct! "${formatDisplayWord(correctWord)}" earned you ${points} points! (${correctWord.length} letters${usedHint ? " -50% for using hint" : ""})`);
    updateScore(points);
    initGame();
}

async function showHint() {
    if (!hintText.classList.contains("show")) {
        const useHint = await gameConfirm("Using a hint will reduce your points for this word by 50%. Do you want to continue?");
        if (useHint) {
            hintText.classList.add("show");
            hintBtn.classList.add("used");
            usedHint = true;
        }
    }
}

// Event listeners
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
hintBtn.addEventListener("click", showHint);

inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkWord();
    }
});

tutorialBtn.addEventListener("click", () => {
    tutorialModal.classList.add("show");
});

closeModal.addEventListener("click", () => {
    tutorialModal.classList.remove("show");
});

gotItBtn.addEventListener("click", () => {
    tutorialModal.classList.remove("show");
});

window.addEventListener("click", (e) => {
    if (e.target === tutorialModal) {
        tutorialModal.classList.remove("show");
    }
});

// Initialize the game when words are loaded
loadWords();