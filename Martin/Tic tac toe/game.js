const padding = 10;
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
    context.fillRect(0, 0, 800, 600);

    context.strokeStyle = "white";
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            context.fillStyle = playerColors[currCell[x][y]];
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


function mouseup() {
    if (winner) {
        return;
    }

    let gridX = Math.floor((mouseX - padding) / size);
    let gridY = Math.floor((mouseY - padding) / size);

    if (currCell[gridX][gridY] == 0) {
        currCell[gridX][gridY] = currPlayer;

        if (currPlayer == 1) {
            currPlayer = 2;
        } else {
            currPlayer = 1;
        }
    }
}

