let words = [

    {
    word: "spaghetti",
    hint: "The Noodles.. in Italy"
    },

    {
    word: "procrastination",
    hint: "The action of delaying/postponing something."
    },


    {
        word: "addition",
        hint: "The process of adding numbers"
    },


    {
        word: "meeting",
        hint: "Event in which people come together"
    },


    {
        word: "friend",
        hint: "Very important person in life"
    },


    {
        word: "number",
        hint: "Math symbol used for counting"
    },


    {
        word: "exchange",
        hint: "The act of trading"
    },


    {
        word: "canvas",
        hint: "Piece of fabric for oil painting"
    },


    {
        word: "garden",
        hint: "Space for planting flower and plant"
    },


    {
        word: "position",
        hint: "Location of someone or something"
    },


    {
        word: "feather",
        hint: "Hair like outer covering of bird"
    },


    {
        word: "comfort",
        hint: "A pleasant feeling of relaxation"
    },
    {
        word: "tongue",
        hint: "The muscular organ of mouth"
    },
    {
        word: "expansion",
        hint: "The process of increase or grow"
    },
    {
        word: "country",
        hint: "A politically identified region"
    },
    {
        word: "group",
        hint: "A number of objects or persons"
    },


    {
        word: "taste",
        hint: "Ability of tongue to detect flavour"
    },


    {
        word: "store",
        hint: "Large shop where goods are traded"
    },


    {
        word: "field",
        hint: "Area of land for farming activities"
    },


    {
        word: "tomatoes",
        hint: "Good for salad.. or pizza sauce!"
    },
    {
        word: "pocket",
        hint: "A bag for carrying small items"
    },

    {
        word: "needle",
        hint: "A thin and sharp metal pin"
    },

     
    {
        word: "bitcoin",
        hint: "It's the King of Cripto"
    },


    {
        word: "expert",
        hint: "Person with extensive knowledge"
    },

    {
        word: "statement",
        hint: "A declaration of something"
    },
    {
        word: "albany",
        hint: "The capital city of the state of New York"
    },

    {
        word: "library",
        hint: "Place containing collection of books"
    },


    {
        word: "queen",
        hint: "Best band in the history"
    },

    {
        word: "music",
        hint: "Without it..life would be boring"
    },
 

    {
        word: "expensive",
        hint: "Not cheap"
    },


    {
        word: "sunshine",
        hint: "The light and warmth from the sun"
    },
    
    {
        word: "umbrella",
        hint: "A device used to protect from rain or sun"
    },
    
    {
        word: "adventure",
        hint: "An exciting and unusual experience or journey"
    },
    
    {
        word: "chocolate",
        hint: "A sweet, usually brown, treat made from cacao beans"
    },
    
    {
        word: "mountain",
        hint: "A large landform that rises steeply above its surroundings"
    },
    
    {
        word: "oxygen",
        hint: "A chemical element essential for life on Earth"
    },
    
    {
        word: "wonderful",
        hint: "Something that is extremely good or pleasing"
    },
    
    {
        word: "happiness",
        hint: "The state of being happy, content, or joyful"
    },
    
    {
        word: "telephone",
        hint: "A device for transmitting voice or communication over a distance"
    },
    
    {
        word: "butterfly",
        hint: "A colorful insect with large, often brightly colored wings"
    },


    {
        word: "mysterious",
        hint: "Something that is difficult to understand or explain"
    },
    
    {
        word: "waterfall",
        hint: "A natural cascade of water flowing from a height"
    },
    
    {
        word: "bicycle",
        hint: "A two-wheeled vehicle powered by pedaling"
    },
    
    {
        word: "whisper",
        hint: "Speaking softly or quietly to avoid being heard"
    },
    
    {
        word: "journey",
        hint: "A long trip or expedition, typically for adventure"
    },
    
    {
        word: "laughter",
        hint: "The sound of amusement or joy"
    },
    
    {
        word: "festival",
        hint: "A celebration or occasion of a particular type"
    },
    
    {
        word: "fireworks",
        hint: "Explosive pyrotechnic devices used for entertainment"
    },
    
    {
        word: "architecture",
        hint: "The art and science of designing and constructing buildings"
    },
    
    {
        word: "galaxy",
        hint: "A vast system of stars, gas, dust, and dark matter"
    },
    
    {
        word: "jungle",
        hint: "A dense, tropical forest with lush vegetation"
    },
    
    {
        word: "independence",
        hint: "Freedom from outside control or support"
    },
    
    {
        word: "adrenaline",
        hint: "A hormone that prepares the body for intense physical activity"
    },
    
    {
        word: "volcano",
        hint: "A mountain that erupts with molten lava, ash, and gases"
    },
    
    {
        word: "symphony",
        hint: "A long musical composition for an orchestra"
    },
    
    {
        word: "fragrance",
        hint: "A pleasant, sweet smell or aroma"
    },
    
    {
        word: "horizon",
        hint: "The line at which the Earth's surface and the sky appear to meet"
    },
    
    {
        word: "celestial",
        hint: "Relating to the sky, stars, or the heavens"
    },
    
    {
        word: "paradise",
        hint: "An ideal or perfect place or state of happiness"
    },
    
    {
        word: "discovery",
        hint: "The act of finding or learning something new"
    }
    
    
 
    
]


const scoreDisplay = document.querySelector(".score-button span b");
let score = 0; // Initialize the score to 0

const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");
let correctWord, timer;
const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000);
}
const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}
initGame();
const checkWord = () => {

    const scoreDisplay = document.querySelector(".score span");
    let score = 0; // Initialize the score to 0


    let userWord = inputField.value.toLowerCase();
    if(!userWord) return alert("Please enter the word to check!");
    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`);
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);

 
  


    initGame();



}


const handleEnterKeyPress = (event) => {
    if (event.keyCode === 13) { // 13 is the key code for Enter
      checkWord();
    }
  };



refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
inputField.addEventListener("keydown", handleEnterKeyPress);





