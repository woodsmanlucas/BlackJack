  
  let deck={};
  deck.draw = function() {
    card = Math.floor(Math.random()*52);
    console.log(`a new card has been drawn '${card}'`);
    return card
  }

  function identifyCard(card) {
    switch(card) {
      case 0:
       return "King";
      break;
      case 1:
        return "Ace";
      break;
  case 11:
      return "Jack";
      break;
      case 12:
        return "Queen";  
      break;
      default:
        return card;
      break;
    }
  }
  
  function identifySuit(suit) {
    switch(suit) {
  case 0:
    return "&diams;";
  break;
  case 1:
    return "&hearts;";
  break;
  case 2:
    return "&clubs;";
  break;
  case 3:
    return "&spades;";
  break;
  }
  }

  var player = class player {
  constructor() {
  this.hand = [];
  }
  hit() {
  card = deck.draw();
  this.hand[this.hand.length]= card;
  var c;
  var string ="";
  var suit;
  var card;
  
    for (c in this.hand) {
       card = identifyCard(this.hand[c]%13);
       suit = identifySuit(Math.floor(this.hand[c]/13));
      string += `${card} ${suit}   `
  }
  return string
  }
  }
  let player1 = new player();
  let player2 = new player();
