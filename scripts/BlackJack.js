import Player from './Player.js'

const player1 = new Player(null)
const player2 = new Player(null)

document.getElementById('hit1').onclick = function () {
  document.getElementById('hand1').innerHTML = player1.hit()
}
document.getElementById('stay1').onclick = function () {
  player1.stay()
}
// document.getElementById('split').onclick = function(){
//   player1.split()
// }

document.getElementById('hit2').onclick = function () {
  document.getElementById('hand2').innerHTML = player2.hit()
}
document.getElementById('stay2').onclick = function () {
  player2.stay()
}
