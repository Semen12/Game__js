var $start = document.querySelector(".game__button");
var $game = document.querySelector(".game__body");
var score = 0;
var $timer = document.querySelector("#game__time");
var startedgame = false;
var $timertitle = document.querySelector(".game__title");
var $resulttitle = document.querySelector(".game__result");
var $result = document.querySelector("#game__res");
var $timevalue = document.getElementById('game__seconds');

$start.addEventListener("click", startGame);
$game.addEventListener("click", function (e) {
  if (!startedgame) {
    return
  }else{
    if (e.target.dataset.box) {
        score++;
        renderBox();
      }
  }
 
});

$timevalue.addEventListener('input', setInputTime)

function setInputTime() {
 $timer.textContent = $timevalue.value;
 $timertitle.classList.remove("hide__title");
 $timertitle.classList.add("block__title");
 $resulttitle.classList.remove("block__title");
 $resulttitle.classList.add("hide__title");
}

function startGame() {
  setInputTime();
  $start.classList.add("game__button_hide");
  $game.style.backgroundColor = "#fff";
  $timertitle.classList.remove("hide__title");
  $timertitle.classList.add("block__title");
  $resulttitle.classList.remove("block__title");
  $resulttitle.classList.add("hide__title");
  $timevalue.setAttribute('disabled','true');
  startedgame = true;

  score = 0
  
  var interval = setInterval(function () {
    var time = parseFloat($timer.textContent);
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $timer.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
 
}
function endGame() {
  startedgame = false;
  $game.innerHTML = '';
  $game.style.backgroundColor = "rgba(128, 128, 128, 0.322)";
  $start.classList.remove("game__button_hide");
  $timertitle.classList.add("hide__title");
  $timertitle.classList.remove("block__title");
  $resulttitle.classList.add("block__title");
  $resulttitle.classList.remove("hide__title");
  $timevalue.removeAttribute("disabled");

  $result.textContent = score.toString();
  $timer.innerHTML = "";

}

function renderBox() {
  $game.innerHTML = "";
  var box = document.createElement("div");
  var gameSize = $game.getBoundingClientRect();

  var boxSize = getRanom(25, 120);
  var maxTop = gameSize.height - boxSize;
  var maxLeft = gameSize.width - boxSize;

  box.style.height = box.style.width = boxSize + "px";
  box.style.position = "absolute";
  box.style.backgroundColor = getRandomColor();
  box.style.top = getRanom(0, maxTop) + "px";
  box.style.left = getRanom(0, maxLeft) + "px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", true);

  $game.insertAdjacentElement("afterbegin", box);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRanom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
