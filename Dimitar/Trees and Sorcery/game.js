let player = {x: 0, y: 0, width: 55, height: 110, dir: 0};
let boss = {x: 0, y: 0, width: 100, height: 150};
let camera = {x: 0, y: 0, speed: 4}, game = {victory: false, loss: false, pause: false, start: true};
let updates = 0, timeLeft = 500;
let runes = [], enemies = [], collectedRunes = 0, framesPlayer = 0, framesEnemies = 0;
// const startBGMusic = new Audio('./music/FullScores/Orchestral Scores/Ove Melaa - Theme Crystalized .mp3');
// const gameplayBGMusic = new Audio('./music/Loops/Drum Only Loops/Ove Melaa - DrumLoop 1.mp3');
// const coinCollect = new Audio('./music/Sound Effects/AbstractPackSFX/Files/AbstractSFX/20.mp3');
// const winBGMusic = new Audio('./music/FullScores/Orchestral Scores/Ove Melaa - Heaven Sings.mp3');
// const lossBGMusic = new Audio('./music/FullScores/Orchestral SCores/Ove Melaa - Times.mp3');

function pathfind(x1, y1, x2, y2) {
    //pathfinds from x2, y2 to x1, y1
    x2 += Math.cos(Math.atan2(Math.abs(y1 - y2), Math.abs(x1 - x2)));
    y2 += Math.sin(Math.atan2(Math.abs(y1 - y2), Math.abs(x1 - x2)));
}

function init() {
    for(let i = 0; i < 50; i++){
        runes.push(new Runes(Math.round(Math.random() * (10000 + canvas.width) - 5000 - canvas.width / 2),
                             Math.round(Math.random() * (10000 + canvas.height) - 5000 - canvas.height / 2), 50));
    }

    for(let i = 0; i < 10; i++){
       enemies.push(new Enemies(Math.round(Math.random() * (10000 + canvas.width) - 5000 - canvas.width / 2),
                                Math.round(Math.random() * (10000 + canvas.height) - 5000 - canvas.height / 2), 100, 25));
    }
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

            // for(let i = 0; i < enemies.length; i++){
            //     enemies[i].pathfind;
            // }

            if(updates % 10 == 0){
                framesPlayer++;
            }
            if(framesPlayer == 3){
                framesPlayer = 0;
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
            if(framesEnemies >= 7){
                framesEnemies = 0;
            }
            
            if(isKeyPressed[87]){
                player.dir = 1;
                camera.y -= camera.speed;
            }
            if(isKeyPressed[83]){
                player.dir = 2;
                camera.y += camera.speed;
            }
            if(isKeyPressed[65]){
                player.dir = 3;
                camera.x -= camera.speed;
            }
            if(isKeyPressed[68]){
                player.dir = 4;
                camera.x += camera.speed;
            }

            if(isKeyPressed[87] && isKeyPressed[83] && !isKeyPressed[65] && !isKeyPressed[68]){
                player.dir = 0;
            }
            if(isKeyPressed[65] && isKeyPressed[68] && !isKeyPressed[87] && !isKeyPressed[83]){
                player.dir = 0;
            }
            
            if(camera.y <= 0 + canvas.height / 2 && player.dir == 1){
                player.dir = 0;
                camera.y = 0 + canvas.height / 2
                if(isKeyPressed[65]){
                    player.dir = 3;
                }
                if(isKeyPressed[68]){
                    player.dir = 4;
                }
            }
            if(camera.y >= 10000 - canvas.height / 2 && player.dir == 2){
                player.dir = 0;
                camera.y = 10000 - canvas.height / 2;
                if(isKeyPressed[65]){
                    player.dir = 3;
                }
                if(isKeyPressed[68]){
                    player.dir = 4;
                }
            }
            if(camera.x <= -5000 + canvas.width / 2 && player.dir == 3){
                player.dir = 0;
                camera.x = -5000 + canvas.width / 2;
                if(isKeyPressed[87]){
                    player.dir = 1;
                }
                if(isKeyPressed[83]){
                    player.dir = 2;
                }
            }
            if(camera.x >= 10000 - canvas.width / 2 && player.dir == 4){
                player.dir = 0;
                camera.x = 10000 - canvas.width / 2;
                if(isKeyPressed[87]){
                    player.dir = 1;
                }
                if(isKeyPressed[83]){
                    player.dir = 2;
                }
            }

            for(let i = 0; i < 50; i++){
                if(areColliding(camera.x, camera.y, player.width, player.height, runes[i].x, runes[i].y, runes[i].size, runes[i].size)){
                    runes[i].x = NaN;
                    collectedRunes++;
                    // coinCollect.play();
                }
            }

            if(collectedRunes >= 50){
                game.victory = true;
            }
        }
    }else{
        // gameplayBGMusic.pause();
        collectedRunes = 0;
    }

    // if(game.victory){
    //     winBGMusic.play();
    // }else{
    //     winBGMusic.pause();
    // }

    // if(game.loss){
    //     lossBGMusic.play();
    // }else{
    //     lossBGMusic.pause();
    // }
}

function draw() {
    if(!game.loss && !game.victory && game.start){
        drawImage(backDarkForest, -5000  + canvas.width / 2 - camera.x, -5000 + canvas.height / 2 - camera.y, 10000, 10000);
        
        for(let i = 0; i < 50; i++){
            drawImage(rune, runes[i].x + canvas.width / 2 - camera.x, runes[i].y + canvas.height / 2 - camera.y, runes[i].size, runes[i].size);
        }

        if(player.dir == 0){
            drawImage(monkeyIdle[framesPlayer], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if(player.dir == 1){
            drawImage(monkeyUp[framesPlayer], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if(player.dir == 2){
            drawImage(monkeyDown[framesPlayer], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if(player.dir == 3){
            drawImage(monkeyLeft[framesPlayer], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if(player.dir == 4){
            drawImage(monkeyRight[framesPlayer], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }

        context.fillStyle = '#FFC300';
        context.font = '50px MS PGothic';
        context.fillText(`runes: ${collectedRunes} / 50`, 10, 0);

        context.fillStyle = '#FF0000';
        context.font = '50px MS PGothic';
        context.fillText(`Time: ${timeLeft}`, canvas.width - 225, 0);

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

    if(key == 13 && game.victory || game.loss){
        game.victory = false;
        game.loss = false;
        game.start = true;
        timeLeft = 500;
    }
}
