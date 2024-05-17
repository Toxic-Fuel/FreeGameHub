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
    
    pathfind(playerX, playerY, speed){
        distanceY = playerY - this.y;
        distanceX = playerX - this.x;
        angle = Math.atan2(distanceY, distanceX);
        this.x += Math.cos(angle) * speed;
        this.y += Math.sin(angle) * speed;
    }
}
