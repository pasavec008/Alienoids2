class Loot{
    texture = new Image();
    x;
    y;
    dx;
    dy;
    ySize;
    xSize;
    rotation;
    rotationSpeed;

    constructor(destroyedObject){
        this.xSize = destroyedObject.xSize / 3;
        this.ySize = destroyedObject.ySize / 3;
        this.collisionSize = this.xSize * 1.1;
        this.x = destroyedObject.x + destroyedObject.xSize / 2 - this.xSize / 2;
        this.y = destroyedObject.y + destroyedObject.ySize / 2 - this.ySize / 2;
        this.dx = destroyedObject.dx / 2;
        this.dy = destroyedObject.dy / 2;
        this.rotation = destroyedObject.rotation;
        this.rotationSpeed = destroyedObject.rotationSpeed * -1;
    }

    change(controller, model){
        this.x += this.dx;
        this.y += this.dy;

        //edges of map
        if(this.x > 1920)
            this.x = 0 - this.xSize;
        else if(this.x + this.xSize < 0)
            this.x = 1920;

        if(this.y > 1080 * 0.85)
            this.y = 0 - this.ySize;
        else if(this.y + this.ySize < 0)
            this.y = 1080 * 0.85;

        this.rotation += this.rotationSpeed;

        if(this.rotation >= 360)
            this.rotation -= 360;
        else if(this.rotation < 0)
            this.rotation += 360;
    }

    takeLoot(player){
    }

    draw(context){
        context.save();
        context.translate(this.x + this.xSize / 2, this.y + this.ySize / 2);
        context.rotate(this.rotation * Math.PI / 180.0);
        context.drawImage(this.texture, 0 - this.xSize / 2, 0 - this.ySize / 2, this.xSize, this.ySize);
        context.restore();
    }
}