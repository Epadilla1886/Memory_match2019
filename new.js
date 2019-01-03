

var cardList = null;
var flippedCard = false
var cardOne = null;
var cardTwo= null;
var boardDisabled = false;
var lifepoints = 100;
var life = null;



window.onload = function(){
    loadCards();
}
var loadCards = function loadingCards(){
    cardList = document.querySelectorAll('.card');
    cardList.forEach(iter => iter.addEventListener('click', flipCard));
    randomShuff();
    life = document.getElementById("life")
}

function flipCard(){

    if(boardDisabled) return;
    this.classList.add('flip');

    if(!flippedCard){
        flippedCard = true;
        cardOne = this;
        return;
    }
    cardTwo = this;
    flippedCard = false;
    checkForMatch();
}

function checkForMatch(){

    if(cardOne.dataset.card===cardTwo.dataset.card){
        lifepoints += 5;
        life.value = lifepoints;
        disableCards();
        return;
    } else
        { lifepoints -= 10;
            life.value = lifepoints;}
    unflip();
}

function unflip(){
    boardDisabled = true;
    setTimeout(()=> {
        cardOne.classList.remove('flip');
        cardTwo.classList.remove('flip');
        boardDisabled = false;
    } ,1500);
}

function disableCards(){
    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);
}

function randomShuff(){
    cardList.forEach(card =>{
        var randomNum = Math.floor(Math.random() * cardList.length)
        card.style.order = randomNum;
            });
}

function victory(){

}


function gameOver(){
    if(life.value = 0){
        alert("K.O.!");
    }
}
