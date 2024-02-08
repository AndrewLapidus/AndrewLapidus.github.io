let money=0;
let whaleClickAmnt = 1;
const money_coins = document.getElementById('money-coins');
let whaleClickCount=0;

// clicking whale boost amount of money
function clickWhale(){
    money += whaleClickAmnt;
    money_coins.innerText = money;
    whaleClickCount +=1;
}

//this is for updating different aspects i guess???
