var cardList = null;
var flippedCard = false;
var cardOne = null;
var cardTwo = null;
var cardMatch = 0;
var boardDisabled = false;
var lifepoints = 100;
var life = null;
var gamesWon = 0;
var gamesLost = 0;
var gamesPlayed = 0;
var attempts = 0;
var accuracy = 100;
var possibleMatches = 9;

window.onload = function(){
    display_stats();
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
        cardOne.removeEventListener('click', flipCard);
        return;
    }
    cardTwo = this;
    flippedCard = false;
    cardOne.addEventListener('click', flipCard);
    setTimeout(checkForMatch, 500);
}

function checkForMatch(){

    if(cardOne.dataset.card===cardTwo.dataset.card){
        lifepoints += 5;
        life.value = lifepoints;
        attempts++;
        cardMatch++;
        checkForEnd();
        disableCards();
        calculate();
        display_stats();
        return;
    } else
        { lifepoints -= 10;
            life.value = lifepoints;
            attempts++;
            checkForEnd();
            calculate();
            display_stats();
        }
    unflip();
}

    function checkForEnd() {
        if (lifepoints > 0 && cardMatch === 9) {
            return victory();
    }  else if (lifepoints === 0) {
            return gameOver();
    }
}

    function unflip() {
        boardDisabled = true;
            setTimeout(() => {
                cardOne.classList.remove('flip');
                cardTwo.classList.remove('flip');
                boardDisabled = false;
        }, 1000);
    }

    function disableCards() {
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
    }

    function randomShuff() {
        cardList.forEach(card => {
            var randomNum = Math.floor(Math.random() * cardList.length);
            card.style.order = randomNum;
        });
    }

    function victory() {
    if (lifepoints > 0 && cardMatch === 9);
        stopAudio();
        gamesWon++;
        gameTotal();
        display_stats();
        alert("Victory !");
    }

    function gameOver() {
    if (lifepoints === 0);
        gamesLost++;
        gameTotal();
        display_stats();
        alert('K.O. !');
    }

    function clearBoard() {
        $('.flip').removeClass('flip');
    }

    function resetGame() {
        gamesPlayed++;
        clearBoard();
        setTimeout(loadCards, 300);
        resetStats();
        display_stats();
        $("#life").val(100);

}
function resetStats() {
    attempts = 0;
    accuracy = 100;
    lifepoints = 100;
    cardMatch = 0;
}

    function display_stats() {
        $('.games-played .value').text(gamesPlayed);
        $('.attempts .value').text(attempts);
        $('.accuracy .value').text(accuracy + '%');
    }

    function calculate() {
        var possibleMatches = 9;
        accuracy = Math.floor((possibleMatches / attempts) * 10);
    }

    function gameTotal() {
        gamesPlayed = gamesWon + gamesLost;
        return gamesPlayed;
    }

function toggleMute(){
    $("#audio_player").prop("muted",!$("#audio_player").prop("muted"));
}