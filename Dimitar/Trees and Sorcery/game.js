let player = {x: 0, y: 0, width: 55, height: 110, dir: 0};
let boss = {x: 0, y: 0, width: 100, height: 150};
// let enemies = [];
let camera = {x: 0, y: 0, speed: 4}, game = {victory: false, loss: false, start: false, pause: false};
let updates = 0, timeLeft = 500;
let coins = [], collectedCoins = 0, framesPlayer = 0, framesCoins = 0, framesEnemies = 0;
// const startBGMusic = new Audio('./music/FullScores/Orchestral Scores/Ove Melaa - Theme Crystalized .mp3');
// const gameplayBGMusic = new Audio('./music/Loops/Drum Only Loops/Ove Melaa - DrumLoop 1.mp3');
// const coinCollect = new Audio('./music/Sound Effects/AbstractPackSFX/Files/AbstractSFX/20.mp3');
// const winBGMusic = new Audio('./music/FullScores/Orchestral Scores/Ove Melaa - Heaven Sings.mp3');
// const lossBGMusic = new Audio('./music/FullScores/Orchestral SCores/Ove Melaa - Times.mp3');

function init() {
    for(let i = 0; i < 50; i++){
        coins.push(new Coins(Math.round(Math.random() * (10000 + canvas.width) - 5000 - canvas.width / 2),
                             Math.round(Math.random() * (10000 + canvas.height) - 5000 - canvas.height / 2), 50));
    }

    // for(let i = 0; i < 10; i++){
    //    enemies.push(new Enemies(Math.round(Math.random() * (10000 + canvas.width) - 5000 - canvas.width / 2),
    //                             Math.round(Math.random() * (10000 + canvas.height) - 5000 - canvas.height / 2), 100, 25));
    // }
}

function update() {
    // if(!game.start){
    //     startBGMusic.play();
    // }else{
    //     startBGMusic.pause();
    // }

    if(game.start && !game.loss && !game.victory){

        updates++;

        if(!game.pause){
            // gameplayBGMusic.play();

            player.dir = 0;

            if(updates % 10 == 0){
                framesPlayer++;
            }
            if(framesPlayer == 3){
                framesPlayer = 0;
            }

            if(updates % 10 == 0){
                framesCoins++
            }
            if(framesCoins == 8){
                framesCoins = 0;
            }
            if(updates % 100 == 0){
                timeLeft--;
            }
            if(timeLeft <= 0){
                game.loss = true;
            }
            if(updates % 20 == 0){
                framesEnemies++;
            }
            // if()
            
            if(isKeyPressed[87]){
                player.dir = 1;
                camera.y -= camera.speed;
            }else if(isKeyPressed[83]){
                player.dir = 2;
                camera.y += camera.speed;
            }else if(isKeyPressed[65]){
                player.dir = 3;
                camera.x -= camera.speed;
            }else if(isKeyPressed[68]){
                player.dir = 4;
                camera.x += camera.speed;
            }
            
            if(camera.y >= 5000 - canvas.height / 2 && player.dir == 2){
                player.dir = 0;
                camera.speed = 0;
            }else if(camera.y <= -5000 + canvas.height / 2 + 4 && player.dir == 1){
                player.dir = 0;
                camera.speed = 0;
            }else if(camera.x >= 5000 - canvas.width / 2 - 4 && player.dir == 4){
                player.dir = 0;
                camera.speed = 0;
            }else if(camera.x <= -5000 + canvas.width / 2 + 4 && player.dir == 3){
                player.dir = 0;
                camera.speed = 0;
            }else{
                camera.speed = 5;
            }

            for(let i = 0; i < 50; i++){
                if(coins[i].collide(camera.x, camera.y, player.width, player.height)){
                    coins[i].x = NaN;
                    collectedCoins++;
                    // coinCollect.play();
                }
            }

            if(collectedCoins >= 50){
                game.victory = true;
            }
        }
    }else{
        gameplayBGMusic.pause();
        collectedCoins = 0;
    }

    if(game.victory){
        // winBGMusic.play();
    }else{
        winBGMusic.pause();
    }

    if(game.loss){
        // lossBGMusic.play();
    }else{
        lossBGMusic.pause();
    }
}

function draw() {
    if(game.start && !game.loss && !game.victory){
        drawImage(backDarkForest, -5000  + canvas.width / 2 - camera.x, -5000 + canvas.height / 2 - camera.y, 10000, 10000);
        
        for(let i = 0; i < 50; i++){
            drawImage(coin[framesCoins], coins[i].x + canvas.width / 2 - camera.x, coins[i].y + canvas.height / 2 - camera.y, coins[i].width, coins[i].width);
        }

        if(player.dir == 0){
            drawImage(monkeyStand[framesPlayer], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }else if(player.dir == 1){
            drawImage(monkeyUp[framesPlayer], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }else if(player.dir == 2){
            drawImage(monkeyDown[framesPlayer], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }else if(player.dir == 3){
            drawImage(monkeyLeft[framesPlayer], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }else if(player.dir == 4){
            drawImage(monkeyRight[framesPlayer], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }

        context.fillStyle = '#FFC300';
        context.font = '50px MS PGothic';
        context.fillText(`Coins: ${collectedCoins} / 50`, 10, 0);

        context.fillStyle = '#FF0000';
        context.font = '50px MS PGothic';
        context.fillText(`Time: ${timeLeft}`, canvas.width - 225, 0);

        for(let i = 0; i < 10; i++){

        }

        if(game.pause){
            context.fillStyle = '#FFFFFF';
            context.globalAlpha = 0.3;
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.fillStyle = '#FFD100';
            
            context.globalAlpha = 1;
            context.font = '150px MS PGothic';
            context.fillText('PAUSE', canvas.width / 2 - 250, 50);
            context.font = '75px MS PGothic';
            context.fillText('Press "Esc" to continue', canvas.width / 2 - 400, 300);
        }
    }

    if(!game.start){
        drawImage(backDarkForest, 0, 0, canvas.width, canvas.height);
        drawImage(monkeyStand[framesPlayer], canvas.width / 2 - 27.5, canvas.height / 2 + player.width, player.width, player.height);

        context.fillStyle = '#000000';
        context.font = '100px bold MS PGothic';
        context.fillText('Trees & Sorcery', canvas.width / 2 - 350, canvas.height / 2 - 300);
    }

    if(game.victory){
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#FFC300';
        context.font = '150px MS PGothic';
        context.fillText('YOU WIN', 425, player.height);
        
        context.fillStyle = '#FF5733';
        context.font = '50px MS PGothic';
        context.fillText('Press "Enter" to restart.', 465, 350);
    }

    if(game.loss){
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#FF0000';
        context.font = '150px MS PGothic';
        context.fillText('GAME OVER', 300, player.height);

        context.fillStyle = '#FF5733';
        context.font = '50px MS PGothic';
        context.fillText('Press "Enter" to restart.', 465, 350);
    }
}

function keydown(key) {
    if(key == 27 && !game.pause){
        game.pause = true;
    }else if(key == 27 && game.pause){
        game.pause = false;
    }

    if(key == 13 && !game.start){
        game.start = true;
    }

    if(key == 13 && game.victory || game.loss){
        game.victory = false;
        game.loss = false;
        game.start = false;
    }
}
