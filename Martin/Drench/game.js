const sizeX = 10, sizeY = 10;
const width = 580 / sizeX, height = 580 / sizeY;
const colors = ["red", "blue", "green", "magenta", "black", "gold"];
const gridColors = [];
const widthButton = 150, heightButton = 600 / colors.length;
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
	context.fillRect(0, 0, 720, 760);
	context.fillStyle = "#FBEAEB";
	context.fillRect(720, 120, 820, 640);
	context.fillStyle = "#87004d";
	context.strokeStyle = "#010103";
	context.lineWidth = 1.5;
	context.fillRect(740, 135, 60, 45);
	context.strokeRect(740, 135, 60, 45);
	context.fillStyle = "#010103";
	context.font = "45px Gothic";
	context.fillText(jivoti, 747, 175);
	for (let i = 0; i < sizeX; i++) {
		for (let j = 0; j < sizeY; j++) {
			context.fillStyle = colors[gridColors[i][j]];
			context.fillRect(65 + i * width, 90 + j * height, width - 1, height - 1);
		}
	}

	for (let i = 0; i < 3; i++) {
		context.fillStyle = colors[i];
		context.fillRect(850 + i * widthButton + i * 60, 300, widthButton, heightButton);
	}
	for (let i = 3; i < 6; i++) {
		context.fillStyle = colors[i];
		context.fillRect(850 + (i - 3) * widthButton + (i - 3) * 60, 470, widthButton, heightButton);
	}
	if (lost) {
		context.fillStyle = "red";
		context.globalAlpha = 0.6;
		context.fillRect(0, 0, 720, 760);
		context.globalAlpha = 1;
		context.fillStyle = "black";
		context.fillRect(125, 175, 450, 350);
		context.fillStyle = "red";
		context.font = "50px MS PGothic";
		context.fillText("GAME OVER", 210, 300);
		context.strokeStyle = "red";
		context.lineWidth = 2;
		context.strokeRect(270, 350, 150, 70);
		context.fillStyle = "red";
		context.font = "20px MS PGothic";
		context.fillText("RESTART", 302.5, 392.5);
	}
	if (won) {
		context.fillStyle = "red";
		context.globalAlpha = 0.6;
		context.fillRect(0, 0, 720, 760);
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
	if (!lost && !won) {
		for (let i = 0; i < 3; i++) {
			if (mouseX >= 850 + i * widthButton + i * 60 && mouseX <= 850 + i * widthButton + i * 60 + widthButton && mouseY >= 300 && mouseY <= 300 + heightButton) {
				jivoti = jivoti - 1;
				drench(i);
			}
		}
		for (let i = 3; i < colors.length; i++) {
			if (mouseX >= 850 + (i - 3) * widthButton + (i - 3) * 60 && mouseX <= 850 + (i - 3) * widthButton + (i - 3) * 60 + widthButton && mouseY >= 470 && mouseY <= 470 + heightButton) {
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
