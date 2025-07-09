
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

};



function renderCards(allCards) {

  const gameBoard = document.getElementById("game-board");

allCards.forEach((cardText)=> {
  const card = document.createElement("div")
  card.textContent = "?";
  card.setAttribute("data-value",cardText);
  card.classList.add("card"); 

  card.addEventListener("click",() =>{
    card.textContent = card.getAttribute("data-value");
  });
gameBoard.appendChild(card);

}); 
}


let flippedCards = [];
let matchCards = 0;

renderCards(allCards); 


