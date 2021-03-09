let boardSize = 15;
let board = document.getElementById("board");


function drawBoard()
{
    for (let j = 0; j < boardSize; j++) {
        for (let i = 0; i < boardSize; i++) {
            board.innerHTML += "<div id='x" + i + "y"+j+"' class='cell'>" + i +"-"+ j+"</div>";
        }
        board.innerHTML += "<br>";
    }
}

drawBoard();


let halfBoardSize = Math.round(boardSize/2)-1;
let snakeHeadPosition = "x"+halfBoardSize+"y"+halfBoardSize;
console.log(snakeHeadPosition);
let head = document.getElementById(snakeHeadPosition).style.background = "red";