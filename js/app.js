/*
 * Create a list that holds all of your cards
 */

 const cards = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
 
 let openCards = [];
 let matchCount = 0;
 let moveCount = 0;
 let timeCount = 0;
 let downloadTimer;
 let secCount;
 let flag = false;
 let secCounter;
 let moveCounter;
 let starCounter;
 let starPoints;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// loop through each card and create its HTML

const makeGrid = () => {

    shuffle(cards.concat(cards)).forEach(function(card){
        $(".deck").append(
            `<li class="card">
                <i class="fa ${card}"></i>
            </li>`
        )
    });

}

// loop through each stars and append in HTML

const initMoves = () => {

    for(let i=0; i<3; i++){
        $(".stars").append(
            `<li><i class="fa fa-star"></i></li>`
        )
    }

}

// Reset Function - Reset HTML

const reset = () => {
    $(".deck").html("");
    $(".stars").html("");
    $(".moves").html(`<span class="moves" id="points">0</span>`);
    $(".star-points").html(`<span>3</span>`);
    $(".time-seconds").html(`<span class="time-seconds" id="timeSec">0</span>`);
    openCards = [];
    matchCount = 0;
    moveCount = 0;
    clearInterval(downloadTimer);
    flag = false;
    init();
}


//  Function to calculate Time in seconds

const calculateSeconds = () => {
    let timeStart = 0;
    downloadTimer = setInterval(() => {
    secCount = document.getElementById("timeSec").value = 0 + ++timeStart;
     if(timeStart >= 0)
       $(".time-seconds").html(secCount);
   },1000);
 }

//  Stop timer when game ends or reset function is called

const stopTimer = () => {
    clearInterval(downloadTimer);
}


const init = () => {
     
    makeGrid();
    initMoves();

    $(".card").on("click", function(){
        if(flag == false){
            flag = true;
            calculateSeconds();
        }
        
        if($(this).attr("class").search("show") !== -1 || $(this).attr("class").search("match") !== -1){
            return;
        }
        
        if(openCards.length < 2){
            $(this).toggleClass("show");

            openCards.push($(this));
        }

        if(openCards.length == 2){
            if(openCards[0][0].firstElementChild.className == openCards[1][0].firstElementChild.className){
                matchCount++;

                openCards.forEach(function(card){
                    card.toggleClass("animated jello");
                    setTimeout(function(){
                        card.toggleClass("show match animated jello");
                    },600)
                });

            }else{
                openCards.forEach(function(card){
                    card.toggleClass("redEffect animated swing");
                    setTimeout(function(){
                        card.toggleClass("redEffect show animated swing");
                    }, 600);
                });
            }
            openCards = [];
            calculateMove();
        }
        if(matchCount == 8){
            setTimeout(() =>{
                congrats();
            }, 500);
        }

        //  Calculate Move Function

        function calculateMove(){
            moveCount+=1;
            let movePoints = document.getElementById("points");
            movePoints.innerHTML = moveCount;
                if(moveCount === 16 || moveCount === 20){
                    reducePoints();
                }
        }

        //  If all card matches, call Congrats function

        function congrats(){
            let val = $(".fa-star").length;
            secCounter = document.getElementById("score-card-sec");
            $("#score-card-sec").html(secCount);
            moveCounter = document.getElementById("score-card-moves");
            $("#score-card-moves").html(moveCount);
            starCounter = document.getElementById("score-card-star");
            $("#score-card-star").html(val);
            $('#winModal').modal('toggle');
            stopTimer();
        }

        // Reduce points if moves are greater than 16 | 20

        function reducePoints(){
            //starPoints = document.getElementById("starPoints");
            let stars = $(".fa-star");
            $(stars[stars.length-1]).toggleClass("fa-star fa-star-o");
            //starPoints.innerHTML = $(".fa-star").length;
        }
    });

}


//  On Load function

$(function(){
    init();
});




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
