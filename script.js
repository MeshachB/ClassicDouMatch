
let allCards = [];

dousCards.forEach(duo => { 
    allCards.push(duo.match);
    allCards.push(duo.made);
    
});


const gameMusic = new Audio("https://archive.org/download/tvtunes_31262/The%20Price%20is%20Right%20-%20Main.mp3")
gameMusic.loop = true; 
gameMusic.volume = 0.1;

const clapSound = new Audio("https://assets.mixkit.co/sfx/download/mixkit-end-of-show-crowd-applause-487.mp3")
clapSound.volume = 0.2;

function shuffle(allCards) {
  for (let i = allCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]]; 
  }
}

 


function isMatching(icon1, icon2) {
  return dousCards.some(pair =>{
    return(
      (pair.match === icon1 && pair.made === icon2) || 
      (pair.match === icon2 && pair.made === icon1)

    );
  });

} 


let flippedCards = [];
let matchCards = 0; 
let timeLeft= 180;
let timerId; 
let gameOver = false;

function resetGame(){
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML= "";

  flippedCards = [];
  matchCards = 0;
  gameOver = false;

  updateScoreboard(); 
  shuffle(allCards); 
  renderCards(allCards); 
 
}

document.getElementById("Run-it-back").addEventListener("click", () => {
  document.getElementById("Run-it-back").style.display = "none";
  timeLeft = 180;
  resetGame();
  startTimer();
});

function updateScoreboard(){
const scoreboard = document.getElementById("scoreboard");
  scoreboard.textContent = `Score: ${matchCards}`;
}
function startTimer() {
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;
  gameMusic.play();
 
  timerId = setInterval(() => {
    timeLeft--; 
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if(timeLeft <= 0) {
      clearInterval(timerId);
      gameOver = true;
      gameMusic.pause();
      gameMusic.currentTime = 0;
      showMessage("Time is up Game Over.");
      document.getElementById("Run-it-back").style.display = "inline"
    }
  }
  ,1000);
}

function renderCards(allCards) {
allCards.forEach((cardText)=> {
  const gameBoard = document.getElementById("game-board");
  const card = document.createElement("div")
  card.textContent = "?";
  card.setAttribute("data-value",cardText);
  card.classList.add("card"); 

  card.addEventListener("click",() =>{
   if (gameOver || flippedCards.length === 2 || flippedCards.includes(card)){
    return;
   }
  
   card.textContent = card.getAttribute("data-value");
      flippedCards.push(card);

   
    if (flippedCards.length === 2){
  const icon1 =flippedCards[0].getAttribute("data-value");
  const icon2 =flippedCards[1].getAttribute("data-value");

  if(isMatching(icon1, icon2)){
   clapSound.play();
   matchCards++;
   updateScoreboard();
   if (matchCards === 25) {
    clearInterval(timerId);
    gameOver = true;
    gameMusic.pause();
    gameMusic.currentTime = 0;
    setTimeout(()=> {
      showMessage("Winner ! You matched all the cards !");
      document.getElementById("Run-it-back").style.display = "inline"; 
    },300);
   } 
   
   
   flippedCards = [];

  } else {
    setTimeout(() => {
      flippedCards[0].textContent = "?";
      flippedCards[1].textContent = "?";
      flippedCards = [];
    },
     1000);

  } 

}
    
  });
gameBoard.appendChild(card);

}); 
}

resetGame();
updateScoreboard();
startTimer();

 
function showMessage(text){
  const messageEl = document.getElementById("message");
  messageEl.textContent = text; 
  messageEl.style.display = "block"
}


// -----------------------------
//  CODE GRAVEYARD – Lessons from the Classic match dou game.
// This section holds code that didn’t make the final cut.
// Left here to remind myself how far I’ve come, and to help future me (or another dev) avoid some of the traps.
// -----------------------------

//  Tried rendering the cards AND clearing the board inside the same loop — cards weren’t showing up right.
/*
function renderCards(allCards) {
  allCards.forEach((cardText) => {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ""; // ← this kept resetting every time, wiping out previous cards
    ...
  });
}
*/
// Lesson: Move `gameBoard.innerHTML = ""` *outside* of the loop before it starts so the board only clears once.

//  I kept accidentally reusing the wrong variable name ("cardElement") instead of "card"
/*
cardElement.textContent = "?"; // undefined!
cardElement.innerHTML = `<img src="${card.img}" alt="${card.match}" />`;
*/
//  Lesson: Stay consistent. “card” ≠ “cardElement”. One small typo, and the whole DOM update fails silently.

//  Alert-based win/loss logic – not rubric-friendly
/*
alert("Winner! You matched all the cards!");
alert("Time is up Game Over.");
*/
//  Replaced with `showMessage()` and updated DOM content to follow best practices and accessibility requirements.

//  Defined `showMessage()` *inside* another function – didn’t work when called globally
/*
if (matchCards === 25) {
  function showMessage(text) {
    ...
  }
  showMessage("Winner!");
}
*/
//  Lesson: Declare helper functions like `showMessage()` *outside* so they can be accessed anywhere.

//  Double `setAttribute()` for data-value caused confusion in matching logic.
/*
card.setAttribute("data-value", cardText);
card.setAttribute("data-value", cardData.match); // Redundant and unclear
*/
//  Learned to clean up unused code once structure becomes clear

//  Thought I needed both image AND text on the card, ended up complicating things for MVP
/*
card.innerHTML = `
  <img src="${card.img}" alt="${card.match}" />
  <p>${card.match}</p>
`;
*/
//  In crunch time, I pivoted back to just showing the names — simpler, readable, still fun!

//  Missed a win condition when testing — gameOver wasn't being properly set in all cases
/*
if (timeLeft <= 0) {
  clearInterval(timerId);
  // forgot to set gameOver = true; and enable reset UI
}
*/
// Got sharper about ensuring state changes (like `gameOver`) happen in *every* path: win or timeout

// Match logic almost tripped me up: I used `.includes()` on the flippedCards array without understanding object identity
/*
if (flippedCards.includes(card)) {
  return;
}
*/
//  Realized that the same visual card might not match the same *reference* if duplicated incorrectly. Keeping things simple avoided bigger bugs.

//  Originally had console logs everywhere for tracking logic — cleaned them up for final submission
/*
console.log("Flipped:", flippedCards);
console.log("Timer:", timeLeft);
console.log("Match Found!", icon1, icon2);
*/
//  Keeping a clean console shows professionalism and helps others reviewing the code

//  Overall: This project taught me A LOT — not just about DOM or game logic, but about *debugging, code clarity, and time management.*
// I started off wanting a full image-based, audio-enhanced game and trimmed it down for polish. That’s a win in itself.
