class Coins{
    constructor (x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
    }

    collide(playerX, playerY, playerWidth, playerHeight){

        return areColliding(playerX, playerY, playerWidth, playerHeight, this.x, this.y, this.width, this.width);
    }
}

class Enemies{
    constructor (x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    collide(playerX, playerY, playerWidth, playerHeight){

        return areColliding(playerX, playerY, playerWidth, playerHeight, this.x, this.y, this.width, this.height);
    }

    // pathfind(playerX, playerY, ){

    // }
}
