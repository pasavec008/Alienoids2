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
    keepAlive;
    special;

    constructor(weapon, model){
        this.shotTexture.src = "textures/weapons/shot" + weapon.itemID + ".png";
        this.collisionDamage = weapon.shotCollisionDamage;
        this.type = weapon.shotType;
        this.health = weapon.health;
        this.xSize = weapon.shotXSize;
        this.ySize = weapon.shotYSize;
        this.collisionSize = weapon.shotCollisionSize;
        this.x = model.playerShip.x + model.playerShip.xSize / 2 - this.xSize / 2;
        this.y = model.playerShip.y + model.playerShip.ySize / 2 - this.ySize / 2;
        this.dx = weapon.dx;
        this.dy = weapon.dy;
        this.rotation = weapon.rotation;
        this.keepAlive = weapon.keepAlive;
        this.special = weapon.special;
    }

    change(controller, model){
        this.x += this.dx;
        this.y += this.dy;
        this.keepAlive--;

        if(this.keepAlive == 0 || this.x > 1920 || this.x + this.xSize < 0 || this.y > 1080 * 0.85 || this.y + this.ySize < 0)
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