class Shot{
    shotTexture = new Image();
    collisionDamage;
    type;
    health;
    xSize;
    ySize;
    collisionSize;
    x;
    y;
    dx;
    dy;
    rotation;

    constructor(shotTexture, collisionDamage, type, health, xSize, ySize, collisionSize, x, y, dx, dy, rotation){
        this.shotTexture.src = "textures/weapons/shot" + shotTexture + ".png";
        this.collisionDamage = collisionDamage;
        this.type = type;
        this.health = health;
        this.xSize = xSize;
        this.ySize = ySize;
        this.collisionSize = collisionSize;
        this.x = x - this.xSize / 2;
        this.y = y - this.ySize / 2;
        this.dx = dx;
        this.dy = dy;
        this.rotation = rotation;
    }

    change(controller, model){
        this.x += this.dx;
        this.y += this.dy;

        if(this.x > screen.width || this.x + this.xSize < 0 || this.y > screen.height * 0.85 || this.y + this.ySize < 0)
            this.health = 0;
    }

    draw(context){
        context.save();
        context.translate(this.x + this.xSize / 2, this.y + this.ySize / 2);
        context.rotate(this.rotation * Math.PI / 180.0);
        context.drawImage(this.shotTexture, 0 - this.xSize / 2, 0 - this.ySize / 2, this.xSize, this.ySize);
        context.restore();
    }


}