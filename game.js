let grid = [], brtowers = 10, clicks = -1, updates = 0,
    waypoints =
        [{ x: 15 * 50 + 5, y: 5 }, { x: 15 * 50 + 5, y: 2 * 50 + 5 },
        { x: 4 * 50 + 5, y: 2 * 50 + 5 }, { x: 4 * 50 + 5, y: 4 * 50 + 5 },
        { x: 15 * 50 + 5, y: 4 * 50 + 5 }, { x: 15 * 50 + 5, y: 8 * 50 + 5 },
        { x: 7 * 50 + 5, y: 8 * 50 + 5 }, { x: 7 * 50 + 5, y: 12 * 50 + 5 }],
    DistanceY = [], DistanceX = [], angle = [], waypoint, enemy = [],
    range = [100, 120, 130, 170],
    brenemies = 8, money = 3000, testX, testY, distX, distY
    , distance, towers = [], lifes = 10, menu = [], selectedTowerTip
    , cost, costTowers = [], waves, brwaves = 0, enemiesonwaves = [8, 10, 15, 20], enemy_limit = 0, TowersCheck, EnemiesCheck, Last2EnemiesIndex = [], EnemyLimit
for (x = 16; x < 18; x++) {
    menu[x] = []
    for (y = 0; y < 2; y++) {
        menu[x][y] = 0
    }
}
for (i = 0; i < 2; i++) {
    costTowers[i] = []
    for (j = 0; j < 2; j++) {
        costTowers[i][j] = 0
    }
}
costTowers[0][0] = 1000
costTowers[1][0] = 2000
for (x = 0; x < 16; x++) {
    grid[x] = []
    for (y = 0; y < 13; y++) {
        grid[x][y] = 0
    }
}
menu[16][0] = 0
menu[17][0] = 1
menu[16][1] = 2
menu[17][1] = 3

function init() {

    class Towers {
        consructor(positionX, positionY, tip) {
            this.positionX = positionX
            this.positionY = positionY
            this.tip = tip
            this.radius = 25
            this.color = white
            this.strelq_li_kula = false
        }
    }
    for (i = 0; i < brtowers; i++) {
        towers[i] = new Towers(0, 0, 0)
    }


    for (x = 0; x < 16; x++) {
        for (y = 0; y < 1; y++) {
            grid[x][y] = 1
        }
    }
    for (x = 4; x < 16; x++) {
        for (y = 4; y < 5; y++) {
            grid[x][y] = 1
        }
    }
    for (x = 15; x < 16; x++) {
        for (y = 0; y < 3; y++) {
            grid[x][y] = 1
        }
    }
    for (x = 4; x < 16; x++) {
        for (y = 2; y < 3; y++) {
            grid[x][y] = 1
        }
    }
    for (x = 4; x < 5; x++) {
        for (y = 3; y < 4; y++) {
            grid[x][y] = 1
        }
    }
    for (x = 15; x < 16; x++) {
        for (y = 5; y < 9; y++) {
            grid[x][y] = 1
        }
    }
    for (x = 7; x < 16; x++) {
        for (y = 8; y < 9; y++) {
            grid[x][y] = 1
        }
    }
    for (x = 7; x < 8; x++) {
        for (y = 8; y < 14; y++) {
            grid[x][y] = 1
        }
    }
}
class Wave {
    constructor() {
        this.index = 0
        this.DeadEnemies = 0
        this.spawnoncewave1 = false
        this.spawnoncewave2 = false
    }
}

class Enemy {
    constructor(positionX, positionY, color) {
        this.positionX = positionX
        this.positionY = positionY
        this.color = color
        this.width = 40
        this.height = 40
        this.index = 0
        this.life = 10
        this.updates = 0
        this.once = false
        this.lifesonce = false
        this.deadonce = false
        this.spawnonce = false
        this.tip = 0
        this.strelbaonce = false
        this.strelq_li_me_kula_0 = false
        this.strelq_li_me_kula_1 = false
        this.strelq_li_me_kula_2 = false
        this.strelq_li_me_kula_3 = false
        this.AddCheck = false
    }
}
waves = new Wave()
function Waves(count) {
    for (i = 0; i < count; i++) {
        if (waves.index == 0) {
            enemy.push(new Enemy(0 - i * 200, 5, "SkyBlue"))
        }
        if (waves.index == 1) {
            enemy.push(new Enemy(0 - i * 200, 5, "SkyBlue"))
            enemy[i + enemiesonwaves[waves.index - 1]].life = 15
        }
        if (waves.index == 2) {
            enemy.push(new Enemy(0 - i * 200, 5, "SkyBlue"))
            enemy[i + enemiesonwaves[waves.index - 1] + enemiesonwaves[waves.index - 2]].life = 20
        }
    }
}
Waves(brenemies)
function update() {
    if (waves.DeadEnemies == brenemies) {
        if (!waves.spawnoncewave1) {
            waves.spawnoncewave1 = true
            waves.index += 1
            brenemies += enemiesonwaves[waves.index]
            Waves(brenemies)
        }
    }
    if (waves.DeadEnemies == brenemies) {
        if (!waves.spawnoncewave2) {
            waves.spawnoncewave2 = true
            waves.index += 1
            brenemies += enemiesonwaves[waves.index]
            Waves(brenemies)
        }
    }


    //console.log(validEnemies)



    for (i = 0; i < brenemies; i++) {
        if (enemy[i].life <= 0) {
            if (!enemy[i].deadonce) {
                enemy[i].deadonce = true
                waves.DeadEnemies++
            }
        }
    }

    if (lifes <= 0) {
        lifes = 0
    }
    for (i = 0; i < brenemies; i++) {
        waypoint = waypoints[enemy[i].index]
        DistanceY[i] = waypoint.y - enemy[i].positionY
        DistanceX[i] = waypoint.x - enemy[i].positionX
        angle[i] = Math.atan2(DistanceY[i], DistanceX[i])
        enemy[i].positionX += Math.cos(angle[i])
        enemy[i].positionY += Math.sin(angle[i])
        if (Math.round(enemy[i].positionX) == Math.round(waypoint.x) && Math.round(enemy[i].positionY) == Math.round(waypoint.y) && enemy[i].life > 0) {
            enemy[i].index++
        }
        if (enemy[i].index > 7 && enemy[i].life > 0) {
            enemy[i].index = 7
            enemy[i].tip = 1

            if (!enemy[i].lifesonce) {
                enemy[i].lifesonce = true
                waves.DeadEnemies++
                lifes -= 1
            }
        }
    }
    if (money <= 0) {
        money = 0
    }
    for (n = 0; n < brtowers; n++) {
        for (i = 0; i < brenemies; i++) {
            if (enemy[i].life <= 0) {
                enemy[i].life = 0
                enemy[i].index = 0
                if (!enemy[i].once && enemy[i].positionX != NaN) {
                    enemy[i].once = true
                    money += 250
                }
            }
        }
    }


    for (n = 0; n < brtowers; n++) {
        for (i = 0; i < brenemies; i++) {
            testX = towers[n].positionX
            testY = towers[n].positionY
            if (towers[n].positionX < enemy[i].positionX) {
                testX = enemy[i].positionX
            } else if (towers[n].positionX > enemy[i].positionX + enemy[i].width) {
                testX = enemy[i].positionX + enemy[i].width
            }
            if (towers[n].positionY < enemy[i].positionY) {
                testY = enemy[i].positionY
            } else if (towers[n].positionY > enemy[i].positionY + enemy[i].height) {
                testY = enemy[i].positionY + enemy[i].height
            }
            distX = towers[n].positionX - testX
            distY = towers[n].positionY - testY
            distance = Math.sqrt(distX * distX + distY * distY)


            if (distance <= range[0]) {
                ////////////////////KULA1//////////////////////////////////////////////
                if (towers[n].tip == 1 && enemy[i].life > 0 && enemy[i].tip == 0) {
                    if (enemy[i].strelq_li_me_kula_0 == true) {
                        enemy[i].updates++
                    }
                    if (enemy[i].updates % 50 == 0 && enemy[i].updates > 0) {
                        enemy[i].life -= 1
                    }
                    break;
                }
            }
            ///////////////////////////KULA2///////////////////////////////////////////////
        }
    }

    for (n = 0; n < brtowers; n++) {
        for (i = 0; i < brenemies; i++) {
            testX = towers[n].positionX
            testY = towers[n].positionY
            if (towers[n].positionX < enemy[i].positionX) {
                testX = enemy[i].positionX
            } else if (towers[n].positionX > enemy[i].positionX + enemy[i].width) {
                testX = enemy[i].positionX + enemy[i].width
            }
            if (towers[n].positionY < enemy[i].positionY) {
                testY = enemy[i].positionY
            } else if (towers[n].positionY > enemy[i].positionY + enemy[i].height) {
                testY = enemy[i].positionY + enemy[i].height
            }
            distX = towers[n].positionX - testX
            distY = towers[n].positionY - testY
            distance = Math.sqrt(distX * distX + distY * distY)
            if (distance <= range[1]) {
                if (towers[n].tip == 2 && enemy[i].life > 0 && enemy[i].tip == 0) {
                    if (enemy[i].strelq_li_me_kula_1 == true) {
                        enemy[i].updates++
                    }
                    if (enemy[i].updates % 100 == 0 && enemy[i].updates > 0) {
                        enemy[i].life -= 2
                    }
                }
            }
            if (distance <= range[2]) {
                if (towers[n].tip == 3 && enemy[i].life > 0 && enemy[i].tip == 0) {
                    if (enemy[i].life > 0 && enemy[i].strelq_li_me_kula_2 == true) {
                        enemy[i].updates++
                    }
                    if (enemy[i].updates % 200 == 0 && enemy[i].updates > 0) {
                        enemy[i].life -= 4
                    }
                }
            }
        }
    }
    //Enenmy dead check
    for (i = 0; i < brenemies; i++) {
        if (enemy[i].positionX > 7 * 50 && enemy[i].positionY > 12 * 50) {
            enemy[i].positionX = NaN
            lifes--
        }
    }
}


function draw() {
    for (x = 0; x < 16; x++) {
        for (y = 0; y < 13; y++) {
            if (grid[x][y] == 1 || grid[x][y] == 2) {
                context.fillStyle = "SaddleBrown"
                context.fillRect(x * 50, y * 50, 50, 50)
            }
            if (grid[x][y] == 0) {
                context.fillStyle = "SeaGreen"
                context.fillRect(x * 50, y * 50, 50, 50)
                context.lineWidth = 2
                context.strokeStyle = "green"
                context.strokeRect(x * 50, y * 50, 50, 50)
            }
        }
    }
    /////////////////////////menu///////////////////////////////
    context.fillStyle = "#282C35"
    context.lineWidth = 3
    context.fillRect(800, 0, 320, 650)
    context.strokeStyle = "LightSlateGrey"
    context.strokeRect(800, 0, 320, 650)


    for (x = 16; x < 18; x++) {
        context.strokeStyle = "#cbfff5"
        context.strokeRect((x - 10) * 130 + 50, 200, 130, 130)
    }
    ////////////////////menu////////////////////////////////////

    ////////////////////////risuvane na vidove kuli////////////////////
    context.lineWidth = 5
    context.fillStyle = "Indigo"
    context.beginPath()
    context.arc(890, 260, 35, 0, 2 * Math.PI)
    context.strokeStyle = "#cbfff5"
    context.stroke()
    context.fill()

    context.lineWidth = 5
    context.fillStyle = "LightCoral"
    context.beginPath()
    context.arc(1020, 260, 35, 0, 2 * Math.PI)
    context.strokeStyle = " #cbfff5"
    context.stroke()
    context.fill()


    for (i = 0; i < 2; i++) {
        for (j = 0; j < 1; j++) {
            context.fillStyle = "#cbfff5"
            context.font = "25px Arial"
            context.fillText("cost:" + costTowers[i][j], i * 130 + 840, j * 130 + 300)

        }
    }
    /////////////////////risuvane na vidove kuli//////////////////////////
    for (i = 0; i < brenemies; i++) {
        if (enemy[i].life > 0) {
            if (enemy[i].strelq_li_me_kula_0 == false) {
                enemy[i].color = "SkyBlue"
            }
            if (enemy[i].strelq_li_me_kula_0 == true) {
                enemy[i].color = "red"
            }

            if (enemy[i].life > 0) {
                if (enemy[i].strelq_li_me_kula_1 == false) {
                    enemy[i].color = "SkyBlue"
                } else if (enemy[i].strelq_li_me_kula_1 == true) {
                    enemy[i].color = "red"
                }
            }
            if (enemy[i].life > 0) {
                if (enemy[i].strelq_li_me_kula_2 == false) {
                    enemy[i].color = "SkyBlue"
                } else if (enemy[i].strelq_li_me_kula_2 == true) {
                    enemy[i].color = "red"
                }
            }
            context.fillStyle = enemy[i].color
            context.fillRect(enemy[i].positionX, enemy[i].positionY, enemy[i].width, enemy[i].height)
            if (enemy[i].life <= 10 && waves.index == 0) {
                context.fillStyle = "green"
                context.lineWidth = 2.5
                context.fillRect(enemy[i].positionX, enemy[i].positionY + 16.5, enemy[i].life * 4, 7)
            }
            if (enemy[i].life <= 15 && waves.index == 1) {
                context.fillStyle = "green"
                context.lineWidth = 2.5
                context.fillRect(enemy[i].positionX, enemy[i].positionY + 16.5, enemy[i].life * 2.66666666666666, 7)
            }
            if (enemy[i].life <= 20 && waves.index == 2) {
                context.fillStyle = "green"
                context.lineWidth = 2.5
                context.fillRect(enemy[i].positionX, enemy[i].positionY + 16.5, enemy[i].life * 2, 7)
            }
        }
    }
    drawImage(laserRed[2], 7 * 50, 12 * 50, 50, 50)
    ////////////////////////KULA1/////////////////////////////
    for (i = 0; i < brtowers; i++) {
        if (towers[i].tip == 1) {
            context.lineWidth = 5;
            context.fillStyle = "Indigo"
            context.beginPath()
            context.arc(towers[i].positionX, towers[i].positionY, 20, 0, 2 * Math.PI)
            context.strokeStyle = " #ADD8E6"
            context.stroke()
            context.fill()


            context.lineWidth = 0.5;
            context.beginPath()
            context.arc(towers[i].positionX, towers[i].positionY, range[0], 0, 2 * Math.PI)
            context.strokeStyle = "Maroon"
            context.stroke()

        }
        ////////////////////////KULA2//////////////////////////////
        if (towers[i].strelq_li_kula == true) {
            towers[i].color = "#FF40408C"
        }
        if (towers[i].tip == 2) {
            context.lineWidth = 5;
            context.fillStyle = "LightCoral"
            context.beginPath()
            context.arc(towers[i].positionX, towers[i].positionY, 20, 0, 2 * Math.PI)
            context.strokeStyle = " #ADD8E6"
            context.stroke()
            context.fill()


            context.lineWidth = 0.5;
            context.beginPath()
            context.fillStyle = towers[i].color
            context.arc(towers[i].positionX, towers[i].positionY, range[1], 0, 2 * Math.PI)
            context.strokeStyle = "Maroon"
            context.stroke()
            if (towers[i].strelq_li_kula == true) {
                context.fill()
            }
        }
    }
    context.fillStyle = "#cbfff5"
    context.font = "30px Arial"
    context.fillText("money:" + money, 830, 530)
    context.fillText("lives:" + lifes, 830, 500)
    ///////////////////lives and money////////////////////////////////////////////


    for (n = 0; n < brtowers; n++) {
        for (i = 0; i < brenemies; i++) {
            testX = towers[n].positionX
            testY = towers[n].positionY
            if (towers[n].positionX < enemy[i].positionX) {
                testX = enemy[i].positionX
            } else if (towers[n].positionX > enemy[i].positionX + enemy[i].width) {
                testX = enemy[i].positionX + enemy[i].width
            }
            if (towers[n].positionY < enemy[i].positionY) {
                testY = enemy[i].positionY
            } else if (towers[n].positionY > enemy[i].positionY + enemy[i].height) {
                testY = enemy[i].positionY + enemy[i].height
            }
            distX = towers[n].positionX - testX
            distY = towers[n].positionY - testY
            distance = Math.sqrt(distX * distX + distY * distY)

            //////////////////////////KULA1///////////////////////////////
            if (distance <= range[0]) {
                if (enemy[i].life > 0 && enemy[i].tip == 0 && towers[n].tip == 1) {
                    enemy[i].strelq_li_me_kula_0 = true
                    context.lineWidth = 7;
                    context.beginPath()
                    context.moveTo(towers[n].positionX, towers[n].positionY)
                    context.lineTo(enemy[i].positionX + 20, enemy[i].positionY + 20)
                    context.strokeStyle = "yellow"
                    context.stroke()

                    break;
                }
            }
            if (distance <= range[1]) {
                if (enemy[i].life > 0 && enemy[i].tip == 0 && towers[n].tip == 2) {
                    enemy[i].strelq_li_me_kula_1 = true
                    towers[n].strelq_li_kula = true
                }
            } else if (distance > range[1]) {
                if (enemy[i].life > 0 && enemy[i].tip == 0 && towers[n].tip == 2) {
                    enemy[i].strelq_li_me_kula_1 = false
                }
            }
        }
    }
    for (n = 0; n < brtowers; n++) {
        for (i = 0; i < brenemies; i++) {
            testX = towers[n].positionX
            testY = towers[n].positionY
            if (towers[n].positionX < enemy[i].positionX) {
                testX = enemy[i].positionX
            } else if (towers[n].positionX > enemy[i].positionX + enemy[i].width) {
                testX = enemy[i].positionX + enemy[i].width
            }
            if (towers[n].positionY < enemy[i].positionY) {
                testY = enemy[i].positionY
            } else if (towers[n].positionY > enemy[i].positionY + enemy[i].height) {
                testY = enemy[i].positionY + enemy[i].height
            }
            distX = towers[n].positionX - testX
            distY = towers[n].positionY - testY
            distance = Math.sqrt(distX * distX + distY * distY)
            if (distance <= range[2]) {
                if (enemy[i].life > 0 && towers[n].tip == 3) {
                    enemy[i].strelq_li_me_kula_2 = true
                    enemy[i].fuckonce = false
                }
            } else if (distance > range[2]) {
                if (enemy[i].life > 0) {
                    enemy[i].strelbaonce = false
                    enemy[i].strelq_li_me_kula_2 = false
                }
            }
        }
    }
}
function MaxEnemiesInRange(k, j) {
    context.lineWidth = 7;
    context.beginPath()
    context.moveTo(towers[k].positionX, towers[k].positionY)
    context.lineTo(enemy[j].positionX + 20, enemy[j].positionY + 20)
    context.strokeStyle = "yellow"
    context.stroke()
}

// console.log(validEnemies)
function mouseup() {
    console.log("Mouse clicked at", mouseX, mouseY)
    for (x = 16; x < 18; x++) {
        for (y = 0; y < 2; y++) {
            if (mouseX < (x - 9) * 130 + 50 && mouseX > (x - 10) * 130 + 50) {
                if (mouseY < (y + 1) * 130 + 200 && mouseY > y * 130 + 200) {
                    if (menu[x][y] == 0 && money >= 1000) {
                        selectedTowerTip = 1
                        cost = 1000
                    }
                    if (menu[x][y] == 1 && money >= 2000) {
                        selectedTowerTip = 2
                        cost = 2000
                    }
                }
            }
        }
    }
    for (x = 0; x < 16; x++) {
        for (y = 0; y < 13; y++) {
            if (mouseX < (x + 1) * 50 && mouseX > x * 50) {
                if (mouseY < (y + 1) * 50 && mouseY > y * 50) {
                    if (grid[x][y] == 0 && selectedTowerTip > 0) {
                        money -= cost
                        clicks++
                        towers[clicks].tip = selectedTowerTip
                        towers[clicks].positionX = Math.floor(mouseX / 50) * 50 + 25
                        towers[clicks].positionY = Math.floor(mouseY / 50) * 50 + 25
                        selectedTowerTip = 0
                    }
                }
            }
        }
    }
}

function keyup(key) {
    console.log("Pressed", key);
}