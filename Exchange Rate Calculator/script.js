/* fetch api tutorial
function calculate() {
    // fetch('items.json', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type: application/json'
    //     }
    // })
    fetch('items.json') // running asynchronously, return a promise => catch with .then
        // .then(res => console.log(res)) // 우리가 원하는 json data 없음
        .then(res => res.json()) // json()으로 객체화하고, 
        .then(data => console.log(data)); promise를 한번 더 풀어줘야 함
    // .then(data => (document.body.innerHTML = data[0].text))
}
calculate();
*/ 


const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//* Fetch exchange rates and upates the DOM
function calculate() {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    
    fetch(`https://v6.exchangerate-api.com/v6/d0e97b4531f7863506fcd4e0/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
        // console.log(data)
            const rate = data.conversion_rates[currency_two];
            console.log(rate)
            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`

            amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    })
}

//* Evnet Listners
currencyEl_one.addEventListener('change', calculate)
amountEl_one.addEventListener('input', calculate)
currencyEl_two.addEventListener('change', calculate)
amountEl_two.addEventListener('input', calculate)

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp;
    calculate();
})

calculate()