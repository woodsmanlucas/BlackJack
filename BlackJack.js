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
    let handElement = document.getElementById(handId)
    if(handElement != null){
      handElement.innerHTML = this.hit();
    }

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

    playerDiv.id = `PLAYERDIV`
    playerBtns.id = `PLAYERBTNS`
    hand.id = `HAND`
    hit.id = 'HIT'
    stay.id = 'STAY'

    let splitCard = this.hand.pop()
    let splitPlayer = new Player(splitCard)
    let cardVal, suit, string = ""
    for (let c in this.hand) {
      cardVal = identifyCard(this.hand[c] % 13)
      suit = identifySuit(Math.floor(this.hand[c] / 13))
      string += `<span><p>${suit}</p><p>${cardVal}</p><p>${suit}</p></span>`
    }
    document.getElementById(`hand${this.playerNum}`).innerHTML = string
    document.getElementById("split").remove()

    let playerXDiv = document.getElementById('PLAYERDIV')
    let playerXBtns = document.getElementById('PLAYERBTNS')
    let playerXHand = document.getElementById("HAND")
    let playerXHit = document.getElementById("HIT")
    let playerXStay = document.getElementById('STAY')

    playerXDiv.id = `player${splitPlayer.playerNum}`
    playerXBtns.id = `player${splitPlayer.playerNum}-btns`
    playerXHand.id = `hand${splitPlayer.playerNum}`
    playerXHit.id = `hit${splitPlayer.playerNum}`
    playerXStay.id = `stay${splitPlayer.playerNum}`

    //Display card for playerX
    string = ""
    for (let c in splitPlayer.hand) {
      cardVal = identifyCard(splitPlayer.hand[c] % 13)
      suit = identifySuit(Math.floor(splitPlayer.hand[c] / 13))
      string += `<span><p>${suit}</p><p>${cardVal}</p><p>${suit}</p></span>`
    }
    console.log(playerXHand)
    playerXHand.innerHTML = string

    //Map Buttons
    playerXHit.onclick = function () {
      document.getElementById(`hand${splitPlayer.playerNum}`).innerHTML = splitPlayer.hit()
    }
    playerXStay.onclick = function (){
      splitPlayer.stay()
    }
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
      split.id = "split"
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
