//DONE: slang kan botsen tegen zichzelf
//DONE: bug eruit halen als slang tegen de muur aan komt...
//DONE: slang mag niet tegen zichzelf in bewegen
//TODO: css styling verbeteren (positie midden op het scherm)
//DONE: slang hoofd en staart einde
//TODO: slang staart einde
//TODO: game is responsive
//DONE: snake steeds sneller op basis van lengte (en tijd!)

//TODO: game online zetten

let boardSize = 13;
let board = document.getElementById("board");
let keyboardInput = document.getElementById("keyboardInput");
//let direction = [0,0]; //alternatief
let direction = 0;
let foodIsEaten = true;
let snakePosition = { x: Math.floor(boardSize / 2), y: Math.floor(boardSize / 2) };
let foodPosition = { x: 0, y: 0 };

let snakePositions = [];
snakePositions.push("x" + snakePosition.x + "y" + snakePosition.y);

function drawBoard() {
    //drawBoard (maakt het speelveld dat is opgebouwd uit div elementen met een unieke id)
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            board.innerHTML += "<div id='x" + x + "y" + y + "' class='cell'>x" + x + "y" + y + "</div>";
        }
        board.innerHTML += "<br>";
    }
}

function clearBoard() {
    //clearBoard (maak het bord leeg door de class van alle blokjes terug te zetten naar cell)
    /*
    for (let j = 0; j < boardSize; j++) {
        for (let i = 0; i < boardSize; i++) {
            let snakeId = "x" + i + "y" + j;
            document.getElementById(snakeId).className = "cell";
        }
    }
    */

    // bovenstaande kan met minder code door dit te doen....
    document.querySelectorAll('.cell').forEach(function (cell) {
        cell.className = "cell";
    });

}

//updatesnakePosition

function updatesnakePosition() {

    //snakePosition.y += direction[1]; //alternatief
    //snakePosition.x += direction[0]; //alternatief   

    if (direction == 1) {
        snakePosition.y = snakePosition.y - 1;
    }
    if (direction == 2) {
        snakePosition.y = snakePosition.y + 1;
    }
    if (direction == 3) {
        snakePosition.x = snakePosition.x + 1;
    }
    if (direction == 4) {
        snakePosition.x = snakePosition.x - 1;
    }

    snakePositions.shift();
    snakePositions.push("x" + snakePosition.x + "y" + snakePosition.y);

}

//resetGame

function resetGame() {
    //direction = [0,0]; //alternatief
    direction = 0;
    snakePosition = { x: Math.floor((boardSize - 1) / 2), y: Math.floor((boardSize - 1) / 2) };
    snakePositions = [];
    snakePositions.push("x" + snakePosition.x + "y" + snakePosition.y);
}

//collisionBoarderCheck

function collisionCheck() {
    //checkt of de slang buiten het speelveld komt
    if (snakePosition.x < 0 || snakePosition.y < 0 || snakePosition.x > boardSize - 1 || snakePosition.y > boardSize - 1) { resetGame() }

    //checken of slag zichzelf raakt = als positie van het hoofd hetzelfde is als een van de posities van het lijf

    let snakePositionControle = "x"+snakePosition.x+"y"+snakePosition.y;
    
    for(let i=0;i<snakePositions.length-1;i++)
    {
        if (snakePositionControle==snakePositions[i])
        {
            //console.log("botsing tegen eigen lijf!!!!");
            resetGame();
        }
    }


}

//drawSnake

function drawSnake() {
    //let snakeHeadsnakePosition = "x" + snakePosition.x + "y" + snakePosition.y;
    //document.getElementById(snakeHeadsnakePosition).className += " bodySnake";
    for (let i = 0; i < snakePositions.length; i++) {
        if (i == 0) {
            //TODO: staart wordt getekend
           
            //document.getElementById(snakePositions[i]).className += " bodyTail";
            //document.getElementById(snakePositions[i]).className += " bodyHeadDirection" + direction;
      
        }
        if (i == snakePositions.length - 1) {
            //DONE: hoofd wordt getekend
            document.getElementById(snakePositions[i]).className += " bodyHead";
            document.getElementById(snakePositions[i]).className += " bodyHeadDirection" + direction;
        }
        //console.log(snakePositions[i]);
        document.getElementById(snakePositions[i]).className += " bodySnake";
    }

    document.getElementById("keyboardInput").innerHTML = snakePositions.length;

}

//drawFood

function drawFood() {
    if (foodIsEaten) {
        //
        //TODO: zorg er voor dat het voedsel nooit op de slang kan komen te staan!!
        //
        let xRandom = Math.floor(Math.random() * (boardSize - 1));
        let yRandom = Math.floor(Math.random() * (boardSize - 1));
        foodPosition.x = xRandom;
        foodPosition.y = yRandom;
        foodIsEaten = false;
    }
    let foodPositionID = "x" + foodPosition.x + "y" + foodPosition.y;
    document.getElementById(foodPositionID).className += " food";
}

function snakeEatsFood() {
    if (snakePosition.x == foodPosition.x && snakePosition.y == foodPosition.y) {
        //console.log("Yummy!!!!!!");
        foodIsEaten = true;
        snakePositions.push("x" + snakePosition.x + "y" + snakePosition.y);
        //console.log(snakePositions);
    }
}



//gameLoop
let timeCounter = 0;
function gameLoop() {

    updatesnakePosition();
    collisionCheck();
    clearBoard();
    drawFood();
    drawSnake();
    snakeEatsFood();

    timeCounter++;
    var timeoutTime = 550 - snakePositions.length * 30 - timeCounter / 2;
    if (timeoutTime < 100) {
        timeoutTime = 100;
    }
    //console.log(timeoutTime);
    setTimeout(gameLoop, timeoutTime);
}

//start Game here......

drawBoard();

// setInterVal werkt niet als je de slang sneller wilt laten gaan...
//setInterval(gameLoop, 550-snakePositions.length*100);//500 450 400 350 300

//
// TODO: werk met window.requestAnimationFrame i.p.v. setInterval
//

setTimeout(gameLoop, 0);

// keyboard controls

window.addEventListener("keydown", function (event) {

    if (event.key == "ArrowUp") {
        //direction = [0,-1]; //alternatief
        if (direction != 2) {
            direction = 1;
        }
    }
    if (event.key == "ArrowDown") {
        //direction = [0,1]; //alternatief
        if (direction != 1) {
            direction = 2;
        }
    }
    if (event.key == "ArrowRight") {
        //direction = [1,0]; //alternatief
        if (direction != 4) {
            direction = 3;
        }
    }
    if (event.key == "ArrowLeft") {
        //direction = [-1,0]; //alternatief
        if (direction != 3) {
            direction = 4;
        }

    }

    // TODO: voeg WASD toe (voor de echte gamers onder ons....)
    keyboardInput.innerHTML = "direction:" + direction;
}, true);