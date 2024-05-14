class Runes{
    constructor (x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
    }
}

class Enemies{
    constructor (x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    
    pathfind(playerX, playerY, enemyX, enemyY){
        enemyX += Math.cos(Math.atan2(Math.abs(playerY - enemyY), Math.abs(playerX - enemyX)));
        enemyY += Math.sin(Math.atan2(Math.abs(playerY - enemyY), Math.abs(playerX - enemyX)));
    }
}
