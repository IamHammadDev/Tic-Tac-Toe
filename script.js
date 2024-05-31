let gameBox = document.querySelectorAll(".box");
let rstBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
//PlayerX, Player0
let turn0 = true;
let count = 0;
// 2D ARRAY for storing the wining patterns
let winPatterns = [
  // 0 wining Patterns
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  // 1 wining Patterns
  [1, 4, 7],
  // 2 wining Patterns
  [2, 5, 8],
  [2, 4, 6],
  // 3 wining Patterns
  [3, 4, 5],
  // 6 wining Patterns
  [6, 7, 8],
];

// Adding Events to btns
gameBox.forEach((box, idx) => {
  box.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log("Clicked in the box!", idx);
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const gameDraw = () => {
  msg.innerText = `Game is Drawn!`;
  msgContainer.classList.remove("hide");
  disableBtns();
};

// Logic for wining patterns
const checkWinner = () => {
  for (const pattern of winPatterns) {
    let pos1Val = gameBox[pattern[0]].innerText;
    let pos2Val = gameBox[pattern[1]].innerText;
    let pos3Val = gameBox[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        // console.log("Winner", pos1Val);
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

const disableBtns = () => {
  for (const box of gameBox) {
    box.disabled = true;
  }
};
const enableBtns = () => {
  for (const box of gameBox) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulation! Winner is: Player-${winner}`;
  msgContainer.classList.remove("hide");
  disableBtns();
};

// Reset Game
const resetGame = () => {
  turn0 = true;
  count = 0;
  enableBtns();
  msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", (e) => {
  resetGame();
});
rstBtn.addEventListener("click", (e) => {
  resetGame();
});
