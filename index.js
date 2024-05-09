//sate element by Id or classes fetch krliya ek jgha

const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// variable we need

let currentPlayer;
let gameGrid;

//array of winning possibility
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//let's create a function to initialise the game
// jub bhi game open hoga ye function run hoga automatically and on click of new game button

function initGame() {
  currentPlayer = "X";
  //gameGrid ye internal logic ke liye array hai boxes ki position ki
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  //UI pr empty bhi karna padega boxes ko
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    //one more thing is missing, initialise box with css properties again <div class="box box1"></div>
    box.classList = `box box${index + 1}`;
  });

  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current player - ${currentPlayer}`;
}

initGame();

function handleClick(index) {
  //if empty box only non empty not clickable
  if (gameGrid[index] === "") {
    //UI ke liye
    boxes[index].innerText = currentPlayer;
    //inner logic ke liye
    gameGrid[index] = currentPlayer;
    //idr hum box fill hone ke baad pinter hta daige
    boxes[index].style.pointerEvents = "none";
    //swap karo turn ko
    swampTurn();

    checkGameOver();
  }
}

function swampTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  //showing player at the top
  gameInfo.innerText = `Current player - ${currentPlayer}`;
}

function checkGameOver() {
  //for winner we took player
  let answer = "";

  winningPositions.forEach((position) => {
    //all 3 boxes should be non-empty and exactly same in value
    //gameGrid jo upr array lai rakhi hai
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check if winner is X
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      //disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      //now we know X/O is a winner so we change the color to green
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  //it means we have winner
  if (answer !== "") {
    //winner text add krdiya and new game button active kr di
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }
}

//applying event lister on each box click

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
