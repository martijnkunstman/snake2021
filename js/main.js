let boardSize = 11;
let board = document.getElementById("board");
let keyboardInput = document.getElementById("keyboardInput");
let direction = 0;
let position = { x: Math.floor((boardSize - 1) / 2), y: Math.floor((boardSize - 1) / 2) };


//drawBoard

function drawBoard() {
    for (let j = 0; j < boardSize; j++) {
        for (let i = 0; i < boardSize; i++) {
            board.innerHTML += "<div id='x" + i + "y" + j + "' class='cell'>" + i + "-" + j + "</div>";
        }
        board.innerHTML += "<br>";
    }
}

//clearBoard

function clearBoard() {
    for (let j = 0; j < boardSize; j++) {
        for (let i = 0; i < boardSize; i++) {
            let snakeId = "x" + i + "y" + j;
            document.getElementById(snakeId).style.background = "gray";
        }
    }
}

//updatePosition

function updatePosition() {
    if (direction == "up") {
        position.y = position.y - 1;
    }
    if (direction == "down") {
        position.y = position.y + 1;
    }
    if (direction == "right") {
        position.x = position.x + 1;
    }
    if (direction == "left") {
        position.x = position.x - 1;
    }
}

//resetGame

function resetGame() {
    direction = 0;
    position = { x: Math.floor((boardSize - 1) / 2), y: Math.floor((boardSize - 1) / 2) };
}

//gameOver

function collisionCheck() {
    if (position.x < 0 || position.y < 0 || position.x > boardSize - 1 || position.y > boardSize - 1) { resetGame() }
}

//drawSnake

function drawSnake() {
    let snakeHeadPosition = "x" + position.x + "y" + position.y;
    document.getElementById(snakeHeadPosition).style.background = "red";
}

drawBoard();

//gameLoop

function gameLoop()
{
    updatePosition();
    collisionCheck();
    clearBoard();
    drawSnake();
}

setInterval(gameLoop, 500);

// keyboard controls

window.addEventListener("keydown", function (event) {

    if (event.key == "ArrowUp") {
        direction = "up";
    }
    if (event.key == "ArrowDown") {
        direction = "down";
    }
    if (event.key == "ArrowRight") {
        direction = "right";
    }
    if (event.key == "ArrowLeft") {
        direction = "left";
    }
    keyboardInput.innerHTML = direction;
}, true);