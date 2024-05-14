const sizeX = 10, sizeY = 10;
const width = 500 / sizeX, height = 500 / sizeY;
const colors = ["red", "blue", "green", "magenta", "black", "gold"];
const gridColors = [];
const widthButton = 100, heightButton = 420 / colors.length;
let lost = false;
let won = false, win_check = true;
let jivoti = 30;
for (let i = 0; i < sizeX; i++) {
	gridColors[i] = [];
	for (let j = 0; j < sizeY; j++) {
		gridColors[i][j] = randomInteger(colors.length);
	}
}

function draw() {
	context.fillStyle = "#2F3C7E";
	context.fillRect(0, 0, 720, 700);
	context.fillStyle = "#FBEAEB";
	context.fillRect(720, 120, 280, 700);
	context.fillStyle = "black";
	context.fillRect(825, 145, 45, 40);
	context.fillStyle = "white";
	context.font = "40px Arial";
	context.fillText(jivoti, 825, 180);
	for (let i = 0; i < sizeX; i++) {
		for (let j = 0; j < sizeY; j++) {
			context.fillStyle = colors[gridColors[i][j]];
			context.fillRect(100 + i * width, 100 + j * height, width - 1, height - 1);
		}
	}

	for (let i = 0; i < colors.length; i++) {
		context.fillStyle = colors[i];
		context.fillRect(800, 200 + i * heightButton, widthButton, heightButton);
	}
	if (lost) {
		context.fillStyle = "red";
		context.globalAlpha = 0.6;
		context.fillRect(0, 0, 720, 700);
		context.globalAlpha = 1;
		context.fillStyle = "black";
		context.fillRect(125, 175, 450, 350);
		context.fillStyle = "red";
		context.font = "50px MS PGothic";
		context.fillText("GAME OVER", 210, 300);
		context.strokeStyle = "red"
		context.lineWidth = 2
		context.strokeRect(270, 350, 150, 70)
		context.fillStyle = "red";
		context.font = "20px MS PGothic";
		context.fillText("RESTART", 302.5, 392.5);
	}
	if (won) {
		context.fillStyle = "red";
		context.globalAlpha = 0.6;
		context.fillRect(0, 0, 720, 700);
		context.globalAlpha = 1;
		context.fillStyle = "black";
		context.fillRect(125, 175, 450, 350);
		context.fillStyle = "red";
		context.font = "50px MS PGothic";
		context.fillText("YOU WON", 240, 300);
		context.strokeStyle = "red"
		context.lineWidth = 2
		context.strokeRect(270, 350, 150, 70)
		context.fillStyle = "red";
		context.font = "20px MS PGothic";
		context.fillText("RESTART", 302.5, 392.5);
	}
}

function drench(colorInd) {
	let activex = [], activey = [];
	let oldColor = gridColors[0][0];
	if (colorInd == oldColor) { return; }

	activex.push(0);
	activey.push(0);
	gridColors[0][0] = colorInd;

	for (let i = 0; i < activex.length; i++) {
		let currx = activex[i], curry = activey[i];

		if (currx != 0 && gridColors[currx - 1][curry] == oldColor) {
			activex.push(currx - 1);
			activey.push(curry);
			gridColors[currx - 1][curry] = colorInd;
		}
		if (curry != 0 && gridColors[currx][curry - 1] == oldColor) {
			activex.push(currx);
			activey.push(curry - 1);
			gridColors[currx][curry - 1] = colorInd;
		}
		if (currx != sizeX - 1 && gridColors[currx + 1][curry] == oldColor) {
			activex.push(currx + 1);
			activey.push(curry);
			gridColors[currx + 1][curry] = colorInd;
		}
		if (curry != sizeY - 1 && gridColors[currx][curry + 1] == oldColor) {
			activex.push(currx);
			activey.push(curry + 1);
			gridColors[currx][curry + 1] = colorInd;
		}
	}
	for (let i = 0; i < sizeX; i++) {
		for (let j = 0; j < sizeY; j++) {
			if (gridColors[i][j] != colorInd) {
				win_check = false;
			}
		}
	}
	if (win_check) {
		won = true;
	} else {
		win_check = true;
	}
}

function mouseup() {
	for (let i = 0; i < colors.length; i++) {
		if (!lost && !won) {
			if (mouseX >= 800 && mouseX <= 800 + widthButton && mouseY >= 200 + i * heightButton && mouseY <= 200 + i * heightButton + heightButton) {
				jivoti = jivoti - 1;
				drench(i);
			}
		}
	}
	if (jivoti == 0 && !won) {
		lost = true;
	}
	if (lost || won) {
		if (mouseX >= 270 && mouseY >= 350 && mouseX <= 420 && mouseY <= 420) {
			lost = false;
			won = false;
			jivoti = 30;
			for (let i = 0; i < sizeX; i++) {
				for (let j = 0; j < sizeY; j++) {
					gridColors[i][j] = randomInteger(colors.length);
				}
			}
		}
	}
}