// VaniilaJS 에서 가장 먼저 할 것 === to grab the DOMelements
const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard']; // hard coding now

let selectedWord = words[Math.floor(Math.random() * words.length)];

// console.log(selectedWord);

// ! dynamically applying goes here
const correctLetters = []; // 동적으로 추가되는 부분
const wrongLetters = []; // 동적으로 추가

// Show hidden word 
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
        <span class="letter"> ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `).join('')}
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, ''); // ? replace (x, y): replace x into y; using regex for the new line character; 'g' means globally
    // console.log(wordEl.innerText, innerWord); // you can find at the console showing the correctLetters that selected in innerWord is in-line 

    if (innerWord === selectedWord) {
        finalMessage.innerText = "Congratulations! You Won! 😃";
        popup.style.display = 'flex'; // ? 
    }
}

displayWord(); // after every guess