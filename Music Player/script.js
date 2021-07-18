const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song tiltes
const songs = ['BTS - Permission to Dance', 'BTS - 잠시 (live)', 'BTS - 여기봐 (live)', 'BTS - 좋아요 (live)', 'JK - At my worst', 'JK - 10,000 hours', 'JK - Still With You'];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

// Play Song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play(); // ? built-in 
}

function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause(); // ? built-in
}


// Event Listeners
playBtn.addEventListener('click', () => {
    // check if it's playing or not
    const isPlaying = musicContainer.classList.contains('play'); // true or false

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});