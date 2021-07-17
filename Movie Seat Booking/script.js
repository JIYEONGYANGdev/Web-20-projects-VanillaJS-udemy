const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI(); // * Populate UI with saved data

// const ticketPrice = movieSelect.value;
let ticketPrice = +movieSelect.value; // ! console.log(typeof ticketPrice); number 

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex); // no need to JSON.stringify cuz it's just a string, and were gonna store the data as string
    localStorage.setItem('selectedMoviePrice', moviePrice);
} // * 여기까지 하면, DevTool "Application" tab 상에서 localStorage에 저장된 것을 확인 가능, => 웹페이지 새로고침 시에 화면 상에는 원하는 대로 아직 반영X,
// ! => UI 상에서도 localStorage 저장 상태 확인 가능하도록 만들기(Populate UI with saved data)

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // console.log(selectedSeats); // NodeList [클릭된 좌석 누적되고 해제하면 빠지고~]

// * localStorage
// ! to keep the movie and the seats selected and total price evenif it's reloaded

// how to save seats ? cuz selectedSeats is a NodeList (cant save it=> make it to an array)
    // 1. Copy selected seats into arr
    // 2. map through array => return a new array indexes
    
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
    // console.log(seatsIndex);

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); // ! because "seatsIndex" data is an >> Array << type
    // * localStorage <= web built-in 
    // * setItem(key, value)

    const selectedSeatsCount = selectedSeats.length;

    setMovieData(movieSelect.selectedIndex, movieSelect.value); // ? 선택된 영화 저장됨 => UI 상에서도 저장 확인  

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice
}

//* Get data from localstorage and populate UI
function populateUI() {
    // pull out the seats from localStorage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); // ! array로 다시 가져와야하니까 stringify 했던 거 parsing
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) { // == is there
                seat.classList.add('selected');
            }
        })
    }
    console.log(selectedSeats);
    // 선택한 좌석 수, total price 도 populateUI
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        // ? 새로고침 시 여전히 0$로 back => pageload되는 updateSelectedCount 함수가 해줘야하는 일.. => 맨 마지막에 updateSelectedCount() 실행
    }
}

// * Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    console.log(e.target.selectedIndex, e.target.value)
    updateSelectedCount();
})

// * Seats click event 자리 선택하기
// seats.forEach(addEventListener) <= 이런 식으로 할 수도 있지만~
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // console.log((e.target))
        e.target.classList.toggle('selected'); // .add / .remove 도 있지만, 선택했다 다시 클릭 시 좌석 선택을 해제해야 하니까 toggle
        
        updateSelectedCount();
    }
})

// ? Initial count and total set
updateSelectedCount();