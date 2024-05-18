let paddle = {x: 0, y: 0, z: 1, width: 200, height: 100};
let ball = {x: 0, y: 0, z: 1.5, dx: 1, dy: 1, dz: 0.02, r: 50};
let score = 0;
let loss = false, win = false;
let pause = false;

function ORKEX(x, z) {
    return x / z + canvas.width / 2;
}

function ORKEY(y, z) {
    return y / z + canvas.height / 2;
}

function ORKER(r, z) {
    return r / z;
}

function update() {
    if(!pause){
        paddle.x = mouseX - paddle.width / 2 - canvas.width / 2;
        paddle.y = mouseY - paddle.height / 2 - canvas.height / 2;
        ball.x += ball.dx;
        ball.y += ball.dy;
        ball.z += ball.dz;

        if (ball.x < -canvas.width / 2 || ball.x > canvas.width / 2 - paddle.height / 2) {
            ball.dx = -ball.dx;
        }
        if (ball.y < -canvas.height / 2 || ball.y > canvas.height / 2 - paddle.height / 2) {
            ball.dy = -ball.dy;
        }
        if ((areColliding(paddle.x, paddle.y, paddle.width, paddle.height, ball.x, ball.y, ball.r, ball.r) && Math.abs(paddle.z - ball.z) < 0.05) || ball.z > 4){
            ball.dz = -ball.dz;
        }
        if ((areColliding(paddle.x, paddle.y, paddle.width, paddle.height, ball.x, ball.y, ball.r, ball.r) && Math.abs(paddle.z - ball.z) < 0.05)){
            score++;
        }
        if (ball.z < 0.9){
            loss = true;
            score = 0;
        }
        if(score >= 20){
            win = true;
            score = 20;
        }
    }
}

function draw() {
    if(loss){
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#FF0000';
        context.font = 'bold 130px MS PGothic';
        context.fillText('GAME OVER', canvas.width / 2 - 360, 200);
        context.font = '75px MS PGothic';
        context.fillText('Press "r" to restart', canvas.width / 2 - 300, 400);
    }
    if(win){
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height, );
        context.fillStyle = '#FFDD00';
        context.font = 'bold 150px MS PGothic';
        context.fillText('YOU WIN!', canvas.width / 2 - 335, 200);
        context.font = '75px MS PGothic';
        context.fillText('Press "r" to restart', canvas.width / 2 - 320, 400);
    }
    if(!loss && !win){
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = '#FFFFFF';
        context.lineWidth = 3;
        context.strokeRect(ORKEX(-canvas.width / 2, 4), ORKEY(-canvas.height / 2, 4), ORKER(canvas.width, 4), ORKER(canvas.height, 4));

        context.beginPath();
        context.moveTo(ORKEX(-canvas.width / 2, 1), ORKEY(-canvas.height / 2, 1));
        context.lineTo(ORKEX(-canvas.width / 2, 4), ORKEY(-canvas.height / 2, 4));
        context.stroke();

        context.beginPath();
        context.moveTo(ORKEX(-canvas.width / 2, 1), ORKEY(canvas.height / 2, 1));
        context.lineTo(ORKEX(-canvas.width / 2, 4), ORKEY(canvas.height / 2, 4));
        context.stroke();

        context.beginPath();
        context.moveTo(ORKEX(canvas.width / 2, 1), ORKEY(canvas.height / 2, 1));
        context.lineTo(ORKEX(canvas.width / 2, 4), ORKEY(canvas.height / 2, 4));
        context.stroke();

        context.beginPath();
        context.moveTo(ORKEX(canvas.width / 2, 1), ORKEY(-canvas.height / 2, 1));
        context.lineTo(ORKEX(canvas.width / 2, 4), ORKEY(-canvas.height / 2, 4));
        context.stroke();

        context.strokeStyle = '#FF00FF';
        context.strokeRect(ORKEX(-canvas.width / 2, ball.z), ORKEY(-canvas.height / 2, ball.z), ORKER(canvas.width, ball.z), ORKER(canvas.height, ball.z));

        context.beginPath();
        context.fillStyle = '#FF00FF';
        context.arc(ORKEX(ball.x, ball.z), ORKEY(ball.y, ball.z), ORKER(ball.r, ball.z), 0, 2 * Math.PI, false);
        context.fill();

        context.fillStyle = '#00FF00';
        context.strokeStyle = '#00FF00';
        context.lineWidth = 3;
        context.strokeRect(ORKEX(paddle.x, paddle.z), ORKEY(paddle.y, paddle.z), ORKER(paddle.width, paddle.z), ORKER(paddle.height, paddle.z));
        context.globalAlpha = 0.5;
        context.fillRect(ORKEX(paddle.x, paddle.z), ORKEY(paddle.y, paddle.z), ORKER(paddle.width, paddle.z), ORKER(paddle.height, paddle.z));

        context.fillStyle = '#FF0000';
        context.font = "100px Arial";
        context.fillText(score, 90, 100);

        if(pause){
            context.globalAlpha = 0.3;
            context.fillStyle = '#FFFFFF';
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.globalAlpha = 1;
            context.fillStyle = '#FFC300';
            context.font = '150px MS PGothic';
            context.fillText('PAUSE', canvas.width / 2 - 250, 100);
        }
    }
}

function keyup(key) {
    if(key == 27 && !pause){
        pause = true;
    }else if(key == 27 && pause){
        pause = false;
    }

    if(key == 82){
        win = false;
        loss = false;
        pause = false;
        score = 0;
        ball.z = 1.5;
        if(ball.dz < 0){
            ball.dz = -ball.dz;
        }
    }
}
