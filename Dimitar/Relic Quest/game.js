let player = { x: 0, y: 0, width: 55, height: 110, dir: 0 };
let frames = { player: 0, enemies: 0, death: 0 };
let boss = { x: 0, y: 0, width: 100, height: 150 };
let camera = { x: 0, y: 0, speed: 4 }, game = { victory: false, loss: false, pause: false, start: true };
let updates = 0, timeLeft = 250, collectedRunes = 0;
let runes = [], enemies = [], distanceX = [], distanceY = [], angle = [];
let deathAnimation = false;
// const gameplayBGMusic = new Audio('./music/Loops/Drum Only Loops/Ove Melaa - DrumLoop 1.mp3');
// const winBGMusic = new Audio('./music/FullScores/Orchestral Scores/Ove Melaa - Heaven Sings.mp3');
// const lossBGMusic = new Audio('./music/FullScores/Orchestral SCores/Ove Melaa - Times.mp3');

function init() {
    for (let i = 0; i < 50; i++) {
        //adding elements to the runes array
        runes.push(new Runes(Math.round(Math.random() * (10000 + canvas.width) - 5000),
            Math.round(Math.random() * (10000 + canvas.height) - 5000), 50));
    }

    for (let i = 0; i < 100; i++) {
        //adding elements to the enemies array
        enemies.push(new Enemies(Math.round(Math.random() * 10000 - 5000 - canvas.width / 2),
            Math.round(Math.random() * 10000 - 5000 - canvas.height / 2), 75, 100));
    }
}

function update() {
    // if(!game.start){
    //     startBGMusic.play();
    // }else{
    //     startBGMusic.pause();
    // }

    if (game.start && !game.loss && !game.victory) {
        updates++;
        if (!game.pause) {
            // gameplayBGMusic.play();

            //setting the player to idle position
            player.dir = 0;

            //enemies pathfinding to the player
            for (let i = 0; i < 100; i++) {
                enemies[i].pathfind(camera.x, camera.y, 3);
            }

            //animation player
            if (updates % 10 == 0) {
                frames.player++;
            }
            if (frames.player == 3) {
                frames.player = 0;
            }

            //timer
            if (updates % 100 == 0) {
                timeLeft--;
            }
            if (timeLeft <= 0) {
                game.loss = true;
            }

            //animations enemies
            if (updates % 10 == 0) {
                frames.enemies++;
            }
            if (frames.enemies >= 7) {
                frames.enemies = 0;
            }

            //anmimation enemies death
            if (updates % 10 == 0) {
                frames.death++;
            }
            if (frames.death > 4) {
                frames.death = NaN;
            }

            //movement
            if (isKeyPressed[87]) {
                player.dir = 1;
                camera.y -= camera.speed;
            } else if (isKeyPressed[83]) {
                player.dir = 2;
                camera.y += camera.speed;
            } else if (isKeyPressed[65]) {
                player.dir = 3;
                camera.x -= camera.speed;
            } else if (isKeyPressed[68]) {
                player.dir = 4;
                camera.x += camera.speed;
            }

            //border
            if (camera.y <= -5000 + canvas.height / 2 && player.dir == 1) {
                player.dir = 0;
                camera.y = -5000 + canvas.height / 2;
            }
            if (camera.y >= 5000 - canvas.height / 2 && player.dir == 2) {
                player.dir = 0;
                camera.y = 5000 - canvas.height / 2;
            }
            if (camera.x <= -5000 + canvas.width / 2 && player.dir == 3) {
                player.dir = 0;
                camera.x = -5000 + canvas.width / 2;
            }
            if (camera.x >= 5000 - canvas.width / 2 && player.dir == 4) {
                player.dir = 0;
                camera.x = 5000 - canvas.width / 2;
            }

            //collecting runes
            for (let i = 0; i < 50; i++) {
                runes[i].collide(camera.x, camera.y,  player.width, player.height, collectedRunes);
            }
            
            //game victory
            if (collectedRunes == 50) {
                game.victory = true;
            }
        }
    } else {
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
    if (!game.loss && !game.victory && game.start) {
        drawImage(backDarkForest, -5000 + canvas.width / 2 - camera.x, -5000 + canvas.height / 2 - camera.y, 10000, 10000);

        for (let i = 0; i < 50; i++) {
            drawImage(rune, runes[i].x + canvas.width / 2 - camera.x, runes[i].y + canvas.height / 2 - camera.y, runes[i].size, runes[i].size);
        }
        for (let i = 0; i < 10; i++) {
            if (enemies[i].x >= camera.x) {
                drawImage(skeletonRight[frames.enemies], enemies[i].x + canvas.width / 2 - camera.x,
                    enemies[i].y + canvas.height / 2 - camera.y, enemies[i].width, enemies[i].height);
            } else if (enemies[i].x <= camera.x) {
                drawImage(skeletonLeft[frames.enemies], enemies[i].x + canvas.width / 2 - camera.x,
                    enemies[i].y + canvas.height / 2 - camera.y, enemies[i].width, enemies[i].height);
            }
        }

        if (player.dir == 0) {
            drawImage(monkeyIdle[frames.player], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if (player.dir == 1) {
            drawImage(monkeyUp[frames.player], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if (player.dir == 2) {
            drawImage(monkeyDown[frames.player], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if (player.dir == 3) {
            drawImage(monkeyLeft[frames.player], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if (player.dir == 4) {
            drawImage(monkeyRight[frames.player], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }

        for (let i = 0 ; i < 10; i++) {
            if (deathAnimation) {
                drawImage(enemyDeath[frames.death], enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
            }
        }

        context.fillStyle = '#FFC300';
        context.font = '50px MS PGothic';
        context.fillText(`runes: ${collectedRunes} / 50`, 10, 0);

        context.fillStyle = '#FF0000';
        context.font = '50px MS PGothic';
        context.fillText(`Time: ${timeLeft}`, canvas.width - 225, 0);

        if (game.pause) {
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

    if (game.victory) {
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = '#FFC300';
        context.font = '150px MS PGothic';
        context.fillText('YOU WIN', 425, player.height);

        context.fillStyle = '#FF5733';
        context.font = '50px MS PGothic';
        context.fillText('Press "Enter" to restart.', 465, 350);
    }

    if (game.loss) {
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
    //game pause
    if (key == 27 && !game.pause) {
        game.pause = true;
    } else if (key == 27 && game.pause) {
        game.pause = false;
    }

    //game restart
    if (key == 13 && game.victory || game.loss) {
        game.victory = false;
        game.loss = false;
        game.start = true;
        timeLeft = 250;
    }
}

function mouseup() {
    //kill enemies
    for (let i = 0; i < 10; i++) {
        enemies[i].collide(camera.x, camera.y, player.width, player.height);
    }
}
