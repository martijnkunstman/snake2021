let boardSize = 15;
let board = document.getElementById("board");
let keyboardInput = document.getElementById("keyboardInput");
let direction = 0;
let position = { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) };

//drawBoard (maakt het speelveld dat is opgebouwd uit div elementen met een unieke id)

function drawBoard() {
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            board.innerHTML += "<div id='x" + x + "y" + y + "' class='cell'>x"+x+"y"+y+"</div>";
        }
        board.innerHTML += "<br>";
    }
}

//clearBoard

function clearBoard() {
    for (let j = 0; j < boardSize; j++) {
        for (let i = 0; i < boardSize; i++) {
            let snakeId = "x" + i + "y" + j;
            document.getElementById(snakeId).className = "cell";
        }
    }
}

//updatePosition

function updatePosition() {
    if (direction == 1) {
        position.y = position.y - 1;
    }
    if (direction == 2) {
        position.y = position.y + 1;
    }
    if (direction == 3) {
        position.x = position.x + 1;
    }
    if (direction == 4) {
        position.x = position.x - 1;
    }
}

//resetGame

function resetGame() {
    direction = 0;
    position = { x: Math.floor((boardSize - 1) / 2), y: Math.floor((boardSize - 1) / 2) };
}

//collisionCheck

function collisionCheck() {
    if (position.x < 0 || position.y < 0 || position.x > boardSize - 1 || position.y > boardSize - 1) { resetGame() }
}

//drawSnake

function drawSnake() {
    let snakeHeadPosition = "x" + position.x + "y" + position.y;
    document.getElementById(snakeHeadPosition).className += " body";
}

//gameLoop

function gameLoop()
{
    updatePosition();
    collisionCheck();
    clearBoard();
    drawSnake();
}


//start Game from here......

drawBoard();
setInterval(gameLoop, 500);

//
// window.requestAnimationFrame
//

// keyboard controls

window.addEventListener("keydown", function (event) {

    if (event.key == "ArrowUp") {
        direction = 1;
    }
    if (event.key == "ArrowDown") {
        direction = 2;
    }
    if (event.key == "ArrowRight") {
        direction = 3;
    }
    if (event.key == "ArrowLeft") {
        direction = 4;
    }
    // voeg WASD toe (voor de echte gamers onder ons....)
    keyboardInput.innerHTML = direction;
}, true);