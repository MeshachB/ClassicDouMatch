
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


function renderCards(allCards) {

  const gameBoard = document.getElementById("game-board");

allCards.forEach((cardText)=> {
  const card = document.createElement("div")
  card.textContent = "?";
  card.setAttribute("data-value",cardText);
}); 
}
renderCards(allCards);
