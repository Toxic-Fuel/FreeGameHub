let player = { x: 0, y: 0, width: 55, height: 110, dir: 0, health: 275 };
let frames = { player: 0, enemies: 0, death: 0 };
let boss = { x: 0, y: 0, width: 100, height: 150 };
let camera = { x: 0, y: 0, speed: 4 }, game = { victory: false, loss: false, pause: false, start: true, bossfight: false };
let magic = { 1: { frames: 0, activated: false }, 2: { frames: 0, activated: false }, 3: { frames: 0, activated: false },
              4: { frames: 0, activated: false } };
let updates = 0, timeLeft = 250, collectedRunes = 0;
let runes = [], enemies = [], distanceX = [], distanceY = [], angle = [];
let deathAnimation = false;
// const bossfightBGMusic = new Audio('./music/FullScores/Orchestral Scores/bosstheme_WO_low.mp3');
// const gameplayBGMusic = new Audio('./music/Loops/Drum Only Loops/Ove Melaa - DrumLoop 1.mp3');
// const winBGMusic = new Audio('./music/FullScores/Orchestral Scores/Ove Melaa - Heaven Sings.mp3');
// const lossBGMusic = new Audio('./music/FullScores/Orchestral SCores/Ove Melaa - Times.mp3');

function init() {
    for (let i = 0; i < 70; i++) {
        //adding elements to the runes array
        runes.push(new Runes(Math.round(Math.random() * (10000 + canvas.width) - 5000),
            Math.round(Math.random() * (10000 + canvas.height) - 5000), 50));
    }

    for (let i = 0; i < 10; i++) {
        //adding elements to the enemies array
        enemies.push(new Enemies(Math.round(Math.random() * 10000 - 5000 - canvas.width / 2),
            Math.round(Math.random() * 10000 - 5000 - canvas.height / 2), 75, 100));
    }
    
    console.log('Initialization complete', { runes, enemies });
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
            for (let i = 0; i < 10; i++) {
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

            //animation enemies
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
                //up
                player.dir = 1;
                camera.y -= camera.speed;
            } else if (isKeyPressed[83]) {
                //down
                player.dir = 2;
                camera.y += camera.speed;
            } else if (isKeyPressed[65]) {
                // left
                player.dir = 3;
                camera.x -= camera.speed;
            } else if (isKeyPressed[68]) {
                //right
                player.dir = 4;
                camera.x += camera.speed;
            }

            //border
            if (camera.y <= -5000 + canvas.height / 2 && player.dir == 1) {
                //north side of the border
                player.dir = 0;
                camera.y = -5000 + canvas.height / 2;
            }
            if (camera.y >= 5000 - canvas.height / 2 && player.dir == 2) {
                //south side of the border
                player.dir = 0;
                camera.y = 5000 - canvas.height / 2;
            }
            if (camera.x <= -5000 + canvas.width / 2 && player.dir == 3) {
                //east side of the border
                player.dir = 0;
                camera.x = -5000 + canvas.width / 2;
            }
            if (camera.x >= 5000 - canvas.width / 2 && player.dir == 4) {
                //west side of the border
                player.dir = 0;
                camera.x = 5000 - canvas.width / 2;
            }

            //collecting runes
            for (let i = 0; i < 70; i++) {
                runes[i].collide(camera.x, camera.y,  player.width, player.height, collectedRunes);
            }

            //removing the runes that spawn out of the border
            for (let i = 0; i < 70; i++) {
                if (runes[i].x < -5000 + canvas.width / 2 || runes[i].x > 5000 - canvas.width / 2 || 
                    runes[i].y < -5000 + canvas.height / 2 || runes[i].y > 5000 - canvas.height / 2) {
                    runes[i].x = NaN;
                }
            }

            //healthbar
            if (player.health <= 0) {
                player.health = 0;
            }

            //damage from enemies
            for (let i = 0; i < 10; i++) {
                enemies[i].collide(camera.x, camera.y, player.width, player.height);
            }

            //game victory
            if (collectedRunes == 20) {
                game.bossfight = true;
            }

            //game loss
            if(timeLeft <= 0 || player.health == 0){
                game.loss = true;
            }    
        }
    } else {
        // gameplayBGMusic.pause();
        collectedRunes = 0;
        game.start = false;
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
        //drawing the gameplay background
        drawImage(backDarkForest, -5000 + canvas.width / 2 - camera.x, -5000 + canvas.height / 2 - camera.y, 10000, 10000);
        for (let i = 0; i < 50; i++) {
            //drawing the runes
            drawImage(rune, runes[i].x + canvas.width / 2 - camera.x, runes[i].y + canvas.height / 2 - camera.y, runes[i].size, runes[i].size);
        }
        for (let i = 0; i < 10; i++) {
            //drawing the enemies
            if (enemies[i].x >= camera.x) {
                //if the enemies are farther left then the player they're drawn facing right
                drawImage(skeletonRight[frames.enemies], enemies[i].x + canvas.width / 2 - camera.x,
                    enemies[i].y + canvas.height / 2 - camera.y, enemies[i].width, enemies[i].height);
            } else if (enemies[i].x <= camera.x) {
                //if the enemies are farther right than the player they're drawn facing right
                drawImage(skeletonLeft[frames.enemies], enemies[i].x + canvas.width / 2 - camera.x,
                    enemies[i].y + canvas.height / 2 - camera.y, enemies[i].width, enemies[i].height);
            }
        }

        //animations for the player's character
        if (player.dir == 0) {
            //idle
            drawImage(monkeyIdle[frames.player], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if (player.dir == 1) {
            //walking up
            drawImage(monkeyUp[frames.player], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if (player.dir == 2) {
            //walking down
            drawImage(monkeyDown[frames.player], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if (player.dir == 3) {
            //walking left
            drawImage(monkeyLeft[frames.player], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }
        if (player.dir == 4) {
            //walking right
            drawImage(monkeyRight[frames.player], player.x + canvas.width / 2, player.y + canvas.height / 2, player.width, player.height);
        }

        for (let i = 0 ; i < 10; i++) {
            if (deathAnimation) {
                //drawing the death animation (doesn't work yet)
                drawImage(enemyDeath[frames.death], enemies[i].x, enemies[i].y, enemies[i].width, enemies[i].height);
            }
        }
        
        //text how much runes have been collected
        context.fillStyle = '#00FFFF';
        context.font = '50px MS PGothic';
        context.fillText(`runes: ${collectedRunes} / 20`, 10, 0);

        //text how much time is left
        context.fillStyle = '#FF0000';
        context.font = '50px MS PGothic';
        context.fillText(`Time: ${timeLeft}`, canvas.width - 225, 0);

        //healthbar
        context.fillStyle = '#007700';
        context.fillRect(10, 70, 275, 50);
        context.fillStyle = '#00FF00';
        context.fillRect(10, 70, player.health, 50);
        context.strokeStyle = '#004400';
        context.lineWidth = 3;
        context.strokeRect(10, 70, 275, 50);
        context.fillStyle = '#004400';
        context.font = '42.5px MS PGothic';
        context.fillText('Health', 90, 72.5);

        if (game.pause) {
            //drawing a white partially transparent background
            context.fillStyle = '#FFFFFF';
            context.globalAlpha = 0.3;
            context.fillRect(0, 0, canvas.width, canvas.height);

            //pause text
            context.fillStyle = '#FFD100';
            context.globalAlpha = 1;
            context.font = '150px MS PGothic';
            context.fillText('PAUSE', canvas.width / 2 - 250, 50);

            //text for command to resume
            context.font = '75px MS PGothic';
            context.fillText('Press "Esc" to continue', canvas.width / 2 - 400, 300);
        }
    }

    if (game.victory) {
        //drawing a black background
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        //you win text
        context.fillStyle = '#FFC300';
        context.font = '150px MS PGothic';
        context.fillText('YOU WIN!', canvas.width / 2 - 320, player.height);

        //text for command to restart
        context.fillStyle = '#FF5733';
        context.font = '50px MS PGothic';
        context.fillText('Press "r" to restart.', canvas.width / 2 - 220, 350);
    }

    if (game.loss) {
        //drawing a black background
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        //game over text
        context.fillStyle = '#FF0000';
        context.font = '150px MS PGothic';
        context.fillText('GAME OVER', canvas.width / 2 - 425, player.height);

        //text for command to restart
        context.fillStyle = '#FF5733';
        context.font = '50px MS PGothic';
        context.fillText('Press "r" to restart.', canvas.width / 2 - 220, 350);
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
    if (key == 82 && game.victory || game.loss) {
        game.victory = false;
        game.loss = false;
        game.start = true;
        timeLeft = 250;
        player.x = 0;
        camera.x = 0;
        player.y = 0;
        camera.y = 0;
    }

    //1st attack
    if (key == 49) {
        magic[1].activated = true;
    }
}

function mouseup() {
    // console.log(mouseX, mouseY);
}
