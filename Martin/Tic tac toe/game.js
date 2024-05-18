const padding = 30;
const size = (600 - 2 * padding) / 3;
const changeText = document.querySelector("#playVSbot");

let playerColors = ['black', '	#8CC653', '	#8C1AFF'];
let currCell = [];
let currPlayer = 1;
let winner = false;
let tie = false;
let playVSbot = false;

for (let x = 0; x < 3; x++) {
    currCell[x] = [];
    for (let y = 0; y < 3; y++) {
        currCell[x][y] = 0;
    }
}
document.getElementById('playVSbot').addEventListener('click', function () {
    if (!playVSbot) {
        winner = false;
        tie = false;
        currPlayer = 1;
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                currCell[x][y] = 0;
            }
        }
        playVSbot = true;
        changeText.textContent = "Play Tic Tac Toe vs friend";
    } else {
        winner = false;
        tie = false;
        currPlayer = 1;
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                currCell[x][y] = 0;
            }
        }
        playVSbot = false;
        changeText.textContent = "Play Tic Tac Toe vs bot";
    }
});
window.addEventListener("keydown", checkKeyPressed);

function checkKeyPressed(evt) {
    if (evt.keyCode == "82") {
        if (winner || tie) {
            winner = false;
            tie = false;
            currPlayer = 1;
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 3; y++) {
                    currCell[x][y] = 0;
                }
            }
        }
    }
}
function draw() {
    context.fillStyle = "rebeccapurple";
    context.fillRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            context.fillStyle = playerColors[currCell[x][y]];
            context.strokeStyle = "white";
            context.fillRect(450 + x * size + padding, 75 + y * size + padding,
                size, size);
            context.strokeRect(450 + x * size + padding, 75 + y * size + padding,
                size, size);
        }
    }

    context.fillStyle = playerColors[currPlayer];
    context.font = "35px Gothhic";

    if (winner) {
        context.fillText("Player " + currPlayer + " wins!", 1050, 200);
        context.fillText("Press R to restart", 1050, 280)
    } else if (tie) {
        context.fillStyle = "yellow";
        context.fillText("No one wins!", 1050, 200);
        context.fillText("Press R to restart", 1050, 280)
    } else {
        context.fillText("Player " + currPlayer + " plays", 1050, 200);
    }
}
function playBot() {
    let playX, playY;
    let startingCheck = [0, 0, 0];
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            startingCheck[currCell[x][y]]++;
        }
    }
    if (startingCheck[1] == 1) {
        do {
            playX = randomInteger(3);
            playY = randomInteger(3);
        }
        while (currCell[playX][playY] == 1)
        console.log("starting move");
        currCell[playX][playY] = currPlayer;
        return;
    }

    for (let y = 0; y < 3; y++) {
        let Check = [0, 0, 0];
        let notPlayer = -1;
        for (let x = 0; x < 3; x++) {
            if (currCell[x][y] == 0) {
                notPlayer = x;
            }
            Check[currCell[x][y]]++;
        }
        if (Check[2] == 2 && notPlayer != -1 && currPlayer == 2) {
            playX = notPlayer;
            playY = y;
            console.log("rows - bot wins");
            currCell[playX][playY] = currPlayer;
            return;
        }
    }

    for (let y = 0; y < 3; y++) {
        let Check = [0, 0, 0];
        let notPlayer = -1;
        for (let x = 0; x < 3; x++) {
            if (currCell[x][y] == 0) {
                notPlayer = x;
            }
            Check[currCell[x][y]]++;
        }

        if (Check[1] == 2 && notPlayer != -1 && currPlayer == 2) {
            playX = notPlayer;
            playY = y;
            console.log("rows - player winning but blocked from bot");
            currCell[playX][playY] = currPlayer;
            return;
        }
    }
    for (let x = 0; x < 3; x++) {
        let Check = [0, 0, 0];
        let notPlayer = -1;
        for (let y = 0; y < 3; y++) {
            if (currCell[x][y] == 0) {
                notPlayer = y;
            }
            Check[currCell[x][y]]++;
        }

        if (Check[2] == 2 && notPlayer != -1 && currPlayer == 2) {
            playX = x;
            playY = notPlayer;
            console.log("columns - bot wins");
            currCell[playX][playY] = currPlayer;
            return;
        }
    }
    for (let x = 0; x < 3; x++) {
        let Check = [0, 0, 0];
        let notPlayer = -1;
        for (let y = 0; y < 3; y++) {
            if (currCell[x][y] == 0) {
                notPlayer = y;
            }
            Check[currCell[x][y]]++;
        }


        if (Check[1] == 2 && notPlayer != -1 && currPlayer == 2) {
            playX = x;
            playY = notPlayer;
            console.log("columns - player winning but blocked from bot");
            currCell[playX][playY] = currPlayer;
            return;
        }
    }

    let Check = [0, 0, 0];
    let notPlayer = -1;
    for (let i = 0; i < 3; i++) {
        Check[currCell[i][i]]++;
        if (currCell[i][i] == 0) {
            notPlayer = i;
        }
    }

    if (Check[2] == 2 && notPlayer != -1 && currPlayer == 2) {
        playX = notPlayer;
        playY = notPlayer;
        console.log("left diagonal - bot wins");
        currCell[playX][playY] = currPlayer;
        return;
    }

    if (Check[1] == 2 && notPlayer != -1 && currPlayer == 2) {
        playX = notPlayer;
        playY = notPlayer;
        console.log("left diagonal - player winning but blocked from bot");
        currCell[playX][playY] = currPlayer;
        return;
    }

    Check = [0, 0, 0];
    notPlayer = -1;
    for (let i = 0; i < 3; i++) {
        Check[currCell[i][2 - i]]++;
        if (currCell[i][2 - i] == 0) {
            notPlayer = i;
        }
    }

    if (Check[2] == 2 && notPlayer != -1 && currPlayer == 2) {
        playX = notPlayer;
        playY = 2 - notPlayer;
        console.log("riight diagonal - bot wins");
        currCell[playX][playY] = currPlayer;
        return;
    }

    if (Check[1] == 2 && notPlayer != -1 && currPlayer == 2) {
        playX = notPlayer;
        playY = 2 - notPlayer;
        console.log("right diagonal - player winning but blocked from bot");
        currCell[playX][playY] = currPlayer;
        return;
    }

    //chekings when there isnt any possibility of player winning and making the bot place a sapce wherer he alreay has one
    let leftDiagonalCheck = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        leftDiagonalCheck[currCell[i][i]]++;
    }
    if (leftDiagonalCheck[1] == 0 && leftDiagonalCheck[2] == 1) {
        for (let i = 0; i < 3; i++) {
            if (currCell[i][i] == 0) {
                console.log("leftDiagonal already one space taken from bot and none from player");
                currCell[i][i] = 2;
                return;
            }
        }
    }

    let rightDiagonalCheck = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        rightDiagonalCheck[currCell[i][2 - i]]++;
    }
    if (rightDiagonalCheck[1] == 0 && rightDiagonalCheck[2] == 1) {
        for (let i = 0; i < 3; i++) {
            if (currCell[i][2 - i] == 0) {
                console.log("rightDiagonal already one space taken from bot and none from player");
                currCell[i][2 - i] = 2;
                return;
            }
        }
    }

    for (let y = 0; y < 3; y++) {
        let Check = [0, 0, 0];
        let notPlayer = [];
        for (let x = 0; x < 3; x++) {
            if (currCell[x][y] == 0) {
                notPlayer.push(x);
            }
            Check[currCell[x][y]]++;
        }
        for (i = 0; i < notPlayer.length; i++) {
            if (Check[1] == 0 && notPlayer[i] < 2 && currCell[notPlayer[i] + 1][y] == 2) {
                console.log("rows - already one space taken from bot but none from player and the left space is free");
                currCell[notPlayer[i]][y] = 2;

                return;
            } else if (Check[1] == 0 && notPlayer[i] > 0 && currCell[notPlayer[i] - 1][y] == 2) {
                console.log("rows - already one space taken from bot but none from player and the right space is free");
                currCell[notPlayer[i]][y] = 2;
                return;
            }
        }
    }

    for (let x = 0; x < 3; x++) {
        let Check = [0, 0, 0];
        let notPlayer = [];
        for (let y = 0; y < 3; y++) {
            if (currCell[x][y] == 0) {
                notPlayer.push(y);
            }
            Check[currCell[x][y]]++;
        }
        for (i = 0; i < notPlayer.length; i++) {
            if (Check[1] == 0 && notPlayer[i] < 2 && currCell[x][notPlayer[i] + 1] == 2) {
                console.log("columns - already one space taken from bot but none from player and the top space is free");
                currCell[x][notPlayer[i]] = 2;
                return;
            } else if (Check[1] == 0 && notPlayer[i] > 0 && currCell[x][notPlayer[i] - 1] == 2) {
                console.log("columns - already one space taken from bot but none from player and the bottom space is free");
                currCell[x][notPlayer[i]] = 2;
                return;
            }
        }
    }
    freeCell = false;
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            if (currCell[x][y] == 0) {
                freeCell = true;
            }
        }
    }
    if (freeCell) {
        do {
            playX = randomInteger(3);
            playY = randomInteger(3);
        }
        while (currCell[playX][playY] == 1 || currCell[playX][playY] == 2);
        console.log("no other possible moves");
        currCell[playX][playY] = currPlayer;
    }
}
function checkWin() {
    for (let y = 0; y < 3; y++) {
        let Check = [0, 0, 0];
        for (let x = 0; x < 3; x++) {
            Check[currCell[x][y]]++;
        }

        if (Check[1] == 3 || Check[2] == 3) {
            winner = true;
            return true;
        }
    }

    for (let x = 0; x < 3; x++) {
        let Check = [0, 0, 0];
        for (let y = 0; y < 3; y++) {
            Check[currCell[x][y]]++;
        }
        if (Check[1] == 3 || Check[2] == 3) {
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

    let gridX = Math.floor((mouseX - padding - 450) / size);
    let gridY = Math.floor((mouseY - padding - 75) / size);

    if (gridX < 3 && gridY < 3 && gridX >= 0 && gridY >= 0 && currCell[gridX][gridY] == 0) {
        currCell[gridX][gridY] = currPlayer;
        if (checkWin())
            return;
        if (currPlayer == 1) {
            currPlayer = 2;
        } else {
            currPlayer = 1;
        }
        if (playVSbot) {
            playBot();
            if (checkWin())
                return;

            if (currPlayer == 1) {
                currPlayer = 2;
            } else {
                currPlayer = 1;
            }
        }
    }
}

