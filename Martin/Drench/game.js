const sizeX = 10, sizeY = 10;
const width = 500 / sizeX, height = 500 / sizeY;
const colors = ["red", "blue", "green", "magenta", "black", "gold"];
const gridColors = [];
const widthButton = 100, heightButton = 420 / colors.length;
let lost = false;
let jivoti = 30
for (let i = 0; i < sizeX; i++) {
	gridColors[i] = [];
	for (let j = 0; j < sizeY; j++) {
		gridColors[i][j] = randomInteger(colors.length);
	}
}

function update() {
}

function draw() {
	context.fillStyle = "#2F3C7E"
	context.fillRect(0, 0, 720, 700)
	context.fillStyle = "#FBEAEB"
	context.fillRect(720, 120, 280, 700)
	context.fillStyle = "black"
	context.fillRect(825, 145, 45, 40)
	context.fillStyle = "white"
	context.font = "40px Arial"
	context.fillText(jivoti, 825, 180)
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
}

function mouseup() {
	if (jivoti == 0) {
		lost = true;
	}
	for (let i = 0; i < colors.length; i++) {
		if (!lost) {
			if (mouseX >= 800 && mouseX <= 800 + widthButton && mouseY >= 200 + i * heightButton && mouseY <= 200 + i * heightButton + heightButton) {
				jivoti = jivoti - 1
				drench(i);
				for (let i = 0; i < sizeX; i++) {
					for (let j = 0; j < sizeY; j++) {
						if (gridColors[0][0] != gridColors[i][j]) {
							return false
						}
					}
				}
				return true
			}
		}
	}
}
