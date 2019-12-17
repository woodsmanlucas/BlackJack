const numberOfPlayers = 2
const scores = {}
const deck = {}
deck.draw = function () {
  const card = Math.floor(Math.random() * 52)
  console.log(`a new card has been drawn '${card}'`)
  return card
}

function identifyCard (card) {
  switch (card) {
    case 0:
      return 'K'
      break
    case 1:
      return 'A'
      break
    case 11:
      return 'J'
      break
    case 12:
      return 'Q'
      break
    default:
      return card
      break
  }
}

function identifySuit (suit) {
  switch (suit) {
    case 0:
      return '&diams;'
      break
    case 1:
      return '&hearts;'
      break
    case 2:
      return '&clubs;'
      break
    case 3:
      return '&spades;'
      break
  }
}

var Player = class Player {

  constructor (startingCard) {
    if (startingCard == null){
      this.hand = []
      this.hit()
    }else{
      this.hand = [startingCard]
    }
    this.playerNum = NextPlayerNumber()
    let handId = "hand" + this.playerNum
    document.getElementById(handId).innerHTML = this.hit();

    console.log(this.hand)
    this.checkDouble();
  }

  hit () {
    const card = deck.draw()
    this.hand[this.hand.length] = card
    var c
    var string = ''
    var suit
    var cardVal

    for (c in this.hand) {
      cardVal = identifyCard(this.hand[c] % 13)
      suit = identifySuit(Math.floor(this.hand[c] / 13))
      string += `<span><p>${suit}</p><p>${cardVal}</p><p>${suit}</p></span>`
    }
    return string
  }

  stay () {
    const score = find(this.hand, 0)
    checkWin(score, this.playerNum)
  }

  split(){
    console.log(this.playerNum)
    console.log(this.hand)
    
    let playerId = "player" + this.playerNum
    let playerTag = document.getElementById(playerId)

    let playerDiv = document.createElement('div')

    let hand = document.createElement('div')
    hand.classList.add("hand")

    let playerBtns = document.createElement('div')


    let hit = document.createElement('button')
    let stay = document.createElement('button')

    hit.appendChild(document.createTextNode('Hit Me!'))
    stay.appendChild(document.createTextNode('Stay.'))

    playerBtns.appendChild(hit)
    playerBtns.appendChild(stay)
    
    playerDiv.appendChild(hand)
    playerDiv.appendChild(playerBtns)
    playerTag.appendChild(playerDiv)

    let splitCard = this.hand.pop()
    let splitPlayer = new Player(splitCard)

    playerDiv.id = `player${splitPlayer.playerNum}`
    playerBtns.id = `player${splitPlayer.playerNum}-btns`
    hand.id = `hand${splitPlayer.playerNum}`

    
  }

  checkDouble (card) {
    let firstcard = identifyCard(this.hand[0] % 13);
    let secondcard = identifyCard(this.hand[1] % 13);
    if(firstcard === secondcard){
      let btnsTag = "player" + this.playerNum + "-btns"
      console.log(btnsTag)
      let btns = document.getElementById(btnsTag)
      let split = document.createElement("button")
      split.onclick = this.split
      split.appendChild(document.createTextNode("Split"))
      btns.appendChild(split)
    }
  }
}

function find (array, sum) {
  console.log(`The array is ${array} The sum is ${sum}`)
  if (array.length != 0) {
    var card = array.pop()
    const cardVal = card % 13
    if (cardVal == 1) {
      return find(array, sum + 11) || find(array, sum + 1)
    } else if (cardVal == 0 || cardVal == 11 || cardVal == 12) {
      // if the card is a King, Jack or Queen it is worth 10
      return find(array, sum + 10)
    } else {
      return find(array, sum + cardVal)
    }
  } else {
    if (sum <= 21) {
      return sum
    } else {
      return null
    }
  }
}

function checkWin (score, player) {
  console.log(scores)
  const length = Object.keys(scores).length + 1
  console.log(length)
  scores[player] = score

  if (length >= numberOfPlayers) {
    let winner = null
    let winningScore = 0
    for (player in scores) {
      if (scores[player] === winningScore) {
        document.getElementById('win').innerHTML = 'Tie Game <button type="button" onclick="location.reload()">Play Again?</button>'
      } else if (scores[player] > winningScore) {
        winner = player
        winningScore = scores[player]
        document.getElementById('win').innerHTML = `Player ${winner} wins! <button type="button" onclick="location.reload()">Play Again?</button>`
      }
    }
  }
}

let currentplayerNumber = 1
function NextPlayerNumber () {
  return currentplayerNumber++
}

const player1 = new Player(null)
const player2 = new Player(null)

document.getElementById('hit1').onclick = function () {
  document.getElementById('hand1').innerHTML = player1.hit()
}
document.getElementById('stay1').onclick = function () {
  player1.stay()
}
document.getElementById('split').onclick = function(){
  player1.split()
}

document.getElementById('hit2').onclick = function () {
  document.getElementById('hand2').innerHTML = player2.hit()
}
document.getElementById('stay2').onclick = function () {
  player2.stay()
}
