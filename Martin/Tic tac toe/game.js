const padding = 30;
const size = (600 - 2 * padding) / 3;

let playerColors = ['black', 'green', 'magenta'];
let currCell = [];
let currPlayer = 1;
let winner = false;
let tie = false;

for (let x = 0; x < 3; x++) {
    currCell[x] = [];
    for (let y = 0; y < 3; y++) {
        currCell[x][y] = 0;
    }
}
function draw() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "white";
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            context.fillStyle = playerColors[currCell[x][y]];
            context.strokeStyle = "red";
            context.fillRect(x * size + padding, y * size + padding,
                size, size);
            context.strokeRect(x * size + padding, y * size + padding,
                size, size);
        }
    }

    context.fillStyle = playerColors[currPlayer];
    context.font = "25px Arial";

    if (winner) {
        context.fillText("Player " + currPlayer + " wins!", 620, 100);
    } else if (tie) {
        context.fillStyle = "yellow";
        context.fillText("No one wins!", 620, 100);
    } else {
        context.fillText("Player " + currPlayer + " plays", 620, 100);
    }
}

function checkWin() {
    for (let y = 0; y < 3; y++) {
        let rowCheck = [0, 0, 0];
        for (let x = 0; x < 3; x++) {
            rowCheck[currCell[x][y]]++;
        }

        if (rowCheck[1] == 3 || rowCheck[2] == 3) {
            winner = true;
            return true;
        }
    }

    for (let x = 0; x < 3; x++) {
        let colCheck = [0, 0, 0];
        for (let y = 0; y < 3; y++) {
            colCheck[currCell[x][y]]++;
        }
        if (colCheck[1] == 3 || colCheck[2] == 3) {
            winner = true;
            return true;
        }
    }

    if ((currCell[1][1] != 0 && currCell[0][0] == currCell[1][1] && currCell[1][1] == currCell[2][2]) ||
        (currCell[1][1] != 0 && currCell[0][2] == currCell[1][1] && currCell[1][1] == currCell[2][0])) {
        winner = true;
        return true;
    }

    tie = true;
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (currCell[x][y] == 0) {
                tie = false;
            }
        }
    }
}

function mouseup() {
    if (winner) {
        return;
    }

    let gridX = Math.floor((mouseX - padding) / size);
    let gridY = Math.floor((mouseY - padding) / size);

    if (currCell[gridX][gridY] == 0) {
        currCell[gridX][gridY] = currPlayer;
        if (checkWin())
            return;
        if (currPlayer == 1) {
            currPlayer = 2;
        } else {
            currPlayer = 1;
        }
    }
}

