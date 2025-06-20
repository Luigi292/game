let words = [
    { word: "spaghetti", hint: "The Noodles.. in Italy" },
    { word: "procrastination", hint: "The action of delaying/postponing something" },
    { word: "addition", hint: "The process of adding numbers" },
    { word: "meeting", hint: "Event in which people come together" },
    { word: "friend", hint: "Very important person in life" },
    { word: "number", hint: "Math symbol used for counting" },
    { word: "exchange", hint: "The act of trading" },
    { word: "canvas", hint: "Piece of fabric for oil painting" },
    { word: "garden", hint: "Space for planting flower and plant" },
    { word: "position", hint: "Location of someone or something" },
    { word: "feather", hint: "Hair like outer covering of bird" },
    { word: "comfort", hint: "A pleasant feeling of relaxation" },
    { word: "tongue", hint: "The muscular organ of mouth" },
    { word: "expansion", hint: "The process of increase or grow" },
    { word: "country", hint: "A politically identified region" },
    { word: "group", hint: "A number of objects or persons" },
    { word: "taste", hint: "Ability of tongue to detect flavour" },
    { word: "store", hint: "Large shop where goods are traded" },
    { word: "field", hint: "Area of land for farming activities" },
    { word: "tomatoes", hint: "Good for salad.. or pizza sauce!" },
    { word: "pocket", hint: "A bag for carrying small items" },
    { word: "needle", hint: "A thin and sharp metal pin" },
    { word: "bitcoin", hint: "It's the King of Crypto" },
    { word: "expert", hint: "Person with extensive knowledge" },
    { word: "statement", hint: "A declaration of something" },
    { word: "albany", hint: "The capital city of the state of New York" },
    { word: "library", hint: "Place containing collection of books" },
    { word: "queen", hint: "Best band in the history" },
    { word: "music", hint: "Without it..life would be boring" },
    { word: "expensive", hint: "Not cheap" },
    { word: "sunshine", hint: "The light and warmth from the sun" },
    { word: "umbrella", hint: "A device used to protect from rain or sun" },
    { word: "adventure", hint: "An exciting and unusual experience or journey" },
    { word: "chocolate", hint: "A sweet, usually brown, treat made from cacao beans" },
    { word: "mountain", hint: "A large landform that rises steeply above its surroundings" },
    { word: "oxygen", hint: "A chemical element essential for life on Earth" },
    { word: "wonderful", hint: "Something that is extremely good or pleasing" },
    { word: "happiness", hint: "The state of being happy, content, or joyful" },
    { word: "telephone", hint: "A device for transmitting voice or communication over a distance" },
    { word: "butterfly", hint: "A colorful insect with large, often brightly colored wings" },
    { word: "mysterious", hint: "Something that is difficult to understand or explain" },
    { word: "waterfall", hint: "A natural cascade of water flowing from a height" },
    { word: "bicycle", hint: "A two-wheeled vehicle powered by pedaling" },
    { word: "whisper", hint: "Speaking softly or quietly to avoid being heard" },
    { word: "journey", hint: "A long trip or expedition, typically for adventure" },
    { word: "laughter", hint: "The sound of amusement or joy" },
    { word: "festival", hint: "A celebration or occasion of a particular type" },
    { word: "fireworks", hint: "Explosive pyrotechnic devices used for entertainment" },
    { word: "architecture", hint: "The art and science of designing and constructing buildings" },
    { word: "galaxy", hint: "A vast system of stars, gas, dust, and dark matter" },
    { word: "jungle", hint: "A dense, tropical forest with lush vegetation" },
    { word: "independence", hint: "Freedom from outside control or support" },
    { word: "adrenaline", hint: "A hormone that prepares the body for intense physical activity" },
    { word: "volcano", hint: "A mountain that erupts with molten lava, ash, and gases" },
    { word: "symphony", hint: "A long musical composition for an orchestra" },
    { word: "fragrance", hint: "A pleasant, sweet smell or aroma" },
    { word: "horizon", hint: "The line at which the Earth's surface and the sky appear to meet" },
    { word: "celestial", hint: "Relating to the sky, stars, or the heavens" },
    { word: "paradise", hint: "An ideal or perfect place or state of happiness" },
    { word: "discovery", hint: "The act of finding or learning something new" },
    { word: "keyboard", hint: "Input device for computers with keys" },
    { word: "javascript", hint: "Programming language of the web" },
    { word: "developer", hint: "Person who writes computer programs" },
    { word: "internet", hint: "Global network connecting computers" },
    { word: "browser", hint: "Software used to access the World Wide Web" },
    { word: "algorithm", hint: "Step-by-step procedure for calculations" },
    { word: "database", hint: "Organized collection of structured information" },
    { word: "function", hint: "Self-contained module of code" },
    { word: "variable", hint: "Container for storing data values" },
    { word: "syntax", hint: "Set of rules that define code structure" },
    { word: "framework", hint: "Platform for developing software applications" },
    { word: "responsive", hint: "Design that works on any device size" },
    { word: "debugging", hint: "Process of finding and fixing errors in code" },
    { word: "iteration", hint: "Repetition of a process in programming" },
    { word: "recursion", hint: "Function that calls itself" },
    { word: "asynchronous", hint: "Operations not occurring at the same time" },
    { word: "encryption", hint: "Process of encoding information" },
    { word: "authentication", hint: "Verification of identity" },
    { word: "repository", hint: "Storage location for software packages" },
    { word: "deployment", hint: "Process of making software available for use" },
    { word: "scalability", hint: "Ability of a system to handle growing amounts of work" },
    { word: "virtualization", hint: "Creating virtual rather than actual versions" },
    { word: "artificial", hint: "Made or produced by human beings rather than occurring naturally" },
    { word: "blockchain", hint: "Decentralized digital ledger technology" },
    { word: "cybersecurity", hint: "Protection of internet-connected systems" },
    { word: "machinelearning", hint: "AI that allows systems to learn from data" },
    { word: "neuralnetwork", hint: "Computer system modeled on the human brain" },
    { word: "quantumcomputing", hint: "Computing using quantum-mechanical phenomena" },
    { word: "augmentedreality", hint: "Interactive experience of real-world environment" },
    { word: "virtualreality", hint: "Computer-generated simulation of 3D environment" },
    { word: "internetofthings", hint: "Network of physical objects with embedded technology" },
    { word: "extraterrestrial", hint: "Originating or existing outside the earth" },
    { word: "photosynthesis", hint: "Process by which green plants make food" },
    { word: "renaissance", hint: "Period of European cultural, artistic, and political rebirth" },
    { word: "kaleidoscope", hint: "Optical instrument with mirrors reflecting colored glass" },
    { word: "xylophone", hint: "Musical instrument with wooden bars struck by mallets" },
    { word: "quintessential", hint: "Representing the most perfect or typical example" },
    { word: "magnificent", hint: "Extremely beautiful and impressive" },
    { word: "phenomenon", hint: "A fact or situation observed to exist" },
    { word: "zephyr", hint: "A gentle, mild breeze" },
    { word: "quasar", hint: "Massive and extremely remote celestial object" },
    { word: "jubilee", hint: "Special anniversary of an event" },
    { word: "equilibrium", hint: "A state of physical balance" },
    { word: "kaleidoscopic", hint: "Having complex patterns of colors" },
    { word: "labyrinth", hint: "A complicated irregular network of passages" }
];

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
      gotItBtn = document.querySelector(".got-it-btn");

// Game variables
let correctWord, timer;
let score = 0;
let usedHint = false;
let prizesAchieved = {
    100: false,
    500: false,
    1000: false
};

// Show tutorial modal on first visit
const firstVisit = localStorage.getItem('firstVisit');
if (!firstVisit) {
    setTimeout(() => {
        tutorialModal.classList.add('show');
        localStorage.setItem('firstVisit', 'true');
    }, 500);
}

// Initialize timer
const initTimer = maxTime => {
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
            alert(`Time's up! The correct word was: ${correctWord.toUpperCase()}`);
            initGame();
        }
    }, 1000);
};

// Initialize game
const initGame = () => {
    initTimer(30);
    timeText.parentElement.style.color = "#333";
    usedHint = false;
    hintText.classList.remove("show");
    hintBtn.classList.remove("used");
    
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    inputField.focus();
};

// Update score display
const updateScore = (points) => {
    score += points;
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
    alert(`🎉 ${message} 🎉`);
    
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
        alert("Please enter a word to check!");
        return;
    }
    
    if (userWord !== correctWord) {
        alert(`Oops! "${userWord}" is not correct. Try again!`);
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
    
    alert(`🎯 Correct! "${correctWord.toUpperCase()}" earned you ${points} points! (${correctWord.length} letters${usedHint ? " -50% for using hint" : ""})`);
    updateScore(points);
    initGame();
};

// Show hint
const showHint = () => {
    if (!hintText.classList.contains("show")) {
        const confirmHint = confirm("Using a hint will reduce your points for this word by 50%. Do you want to continue?");
        if (confirmHint) {
            hintText.classList.add("show");
            hintBtn.classList.add("used");
            usedHint = true;
        }
    }
};

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

initGame();