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

// Update the wrong letters
function updateWrongLettersEl() {
    console.log('Update Wrong')
}

// Show Notification
function showNotification() {
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}


// Event when hit the letter
// Keydown letter press
window.addEventListener('keydown', e => {
    // console.log(e.keyCode); // ? each key has keycode
    if (e.keyCode >= 65 && e.keyCode <= 90) { // A-z
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter); // ! update

                displayWord(); // ! show letter
            } else {
                showNotification(); // notify that doesnt include the letter
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl(); // ! updates showing wrong letters
            }
        }
    }
});

displayWord(); // after every guess