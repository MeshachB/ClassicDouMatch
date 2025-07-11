
let allCards = [];

dousCards.forEach(duo => {
    allCards.push(duo.match);
    allCards.push(duo.made);
    
});
console.log(allCards);


function shuffle(allCards) {
  for (let i = allCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]]; 
  }
}

shuffle(allCards); 
console.log(allCards); 


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

function updateScoreboard(){
const scoreboard = document.getElementById("scoreboard");
  scoreboard.textContent = `Score: ${matchCards}`;
}
function startTimer() {
  const timerDisplay = document.getElementById("timer");
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;

  timerId = setInterval(() => {
    timeLeft--; 
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if(timeLeft <= 0) {
      clearInterval(timerId);
      alert("Time is up Game Over.");
      resetGame();
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
   if (flippedCards.length === 2 || flippedCards.includes(card)){
    return;
   }
  
   card.textContent = card.getAttribute("data-value");
      flippedCards.push(card);

   
    if (flippedCards.length === 2){
  const icon1 =flippedCards[0].getAttribute("data-value");
  const icon2 =flippedCards[1].getAttribute("data-value");

  if(isMatching(icon1, icon2)){
   matchCards++;
   updateScoreboard();
   if (matchCards === 25) {
    setTimeout(()=> {
      alert ("Winner ! You matched all the cards !");
    });
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

renderCards(allCards); 
updateScoreboard();  
startTimer();




