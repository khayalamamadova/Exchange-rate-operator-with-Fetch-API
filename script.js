const currencyOne = document.querySelector('#currency-one'),
    amountOne = document.querySelector('#amount-one'),
    currencyTwo = document.querySelector('#currency-two'),
    amountTwo = document.querySelector('#amount-two'),
    switchBtn = document.querySelector('button'),
    rate = document.querySelector('#rate');

function calculate() {

    const curOneValue = currencyOne.value,
        curTwoValue = currencyTwo.value;

    fetch('https://open.exchangerate-api.com/v6/latest5')
        .then(res => res.json())
        .then(data => {

            function calculateRate(data){
                return data.rates[curOneValue] / data.rates[curTwoValue]
            };

            rate.textContent = `1${curOneValue} = ${(calculateRate(data)).toFixed(4)} ${curTwoValue}`;
            console.log(data);
            amountTwo.value = ((amountOne.value * calculateRate(data))).toFixed(2);
        })
        .catch(data=>{
            if(data.status !== 200){
                rate.textContent = 'some'
            }
        })
};

// Events

currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);


// switch
switchBtn.addEventListener('click', () => {
    const swap = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = swap;
    calculate();
});

calculate();