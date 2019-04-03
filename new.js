var cardList = null;
var cardOne = null;
var cardTwo = null;
var flippedCard = false;
var boardDisabled = false;
var gamesPlayed = 0;
var attempts = 0;
var accuracy = 0;
var matchCount = 0;
var possibleMatches = 9;
var lifepoints = 100;
var life = null;
// var imageContainer= ["Image/"]

$(document).ready(initGame);

function initGame(){
    loadCards();
    cleanSlate();
    }

// function randomBgImage(){
//     var randoImage = Math.floor(Math.random() * imageContainer.length);
// }
//
//display stats from zero
function cleanSlate(){
    $('.games-played .value').text(gamesPlayed);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy+ '%');
}

//load cards onto board
function loadCards (){
    cardList = document.querySelectorAll('.card');
    cardList.forEach(iter => iter.addEventListener('click', flipCard));
    randomShuff();
    life = document.getElementById("life")
}

//randomly display cards on board
function randomShuff() {
    cardList.forEach(card => {
        var randomNum = Math.floor(Math.random() * cardList.length);
        card.style.order = randomNum;
    });
}

//flipping of cards
function flipCard(){
    if(boardDisabled) return;
    this.classList.add('flip');
    if(!flippedCard){
        flippedCard = true;
        cardOne = this;
        cardOne.removeEventListener('click', flipCard);
        return;
    }
    cardTwo = this;
    flippedCard = false;
    cardOne.addEventListener('click', flipCard);
    setTimeout(checkForMatch, 500); //refactor order of functions rather than setTimeout
}

//confirming card match
function checkForMatch(){
    if(cardOne.dataset.card===cardTwo.dataset.card){
        lifepoints += 5;
        life.value = lifepoints;
        matchCount++;
        attempts++;
        disableCards();
        checkForEnd();
        calculate();
        attemptMatch();
        return;
    }else{
        lifepoints -= 10;
        life.value = lifepoints;
        attempts++;
        checkForEnd();
        calculate();
        attemptMatch();
    }
    unFlip();
}

//unflip cards if no confirmed match
function unFlip() {
    boardDisabled = true;
        setTimeout(() => {
            cardOne.classList.remove('flip');
            cardTwo.classList.remove('flip');
            boardDisabled = false;
    }, 1000);
}

//disable card if match is confirmed
function disableCards() {
    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);
}

//check for game ending conditions
function checkForEnd(){
    if(lifepoints > 0 && matchCount === possibleMatches){
        $('body').append('<div class=win>').click(resetGame);

        // finishGame();

    }else if(lifepoints === 0) {
        $('body').append('<div class=gameover>');

        // finishGame();
    }
}

//reset game board and stats while counting as a game played
function resetGame() {
    gamesPlayed ++;
    attempts = 0;
    lifepoints = 100;
    matchCount = 0;
    $("#life").val(100);
    $('.games-played .value').text(gamesPlayed);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy+ '%');
    nextGame();
}

//unflip and shuffle of cards when resetting
function nextGame(){
    $('.flip').removeClass('flip');
    setTimeout(() => {
        randomShuff();
    }, 500);
}

function finishGame(){
    gamesPlayed ++;
    matchCount = 0;
    attempts = 0;
    lifepoints = 100;
    accuracy = 0;
}

//track games played
function gameCount(){
    $('.games-played .value').text(gamesPlayed);
}

//track match attempts
function attemptMatch(){
    $('.attempts .value').text(attempts);
}

//calculate accuracy
function calculate() {
    var matchPercentage = (matchCount / attempts) * 100;
    $('.accuracy .value').text(matchPercentage.toFixed(0) + '%');
    if (isNaN(matchPercentage) === true) {
        $('.accuracy .value').text(' ');
    }
}


function toggleMute() {
    $("#audio_player").prop("muted", !$("#audio_player").prop("muted"));
}
