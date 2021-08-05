class RocketShot{
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
    ddx;
    ddy;
    rotation;
    special;

    animation = 0;
    animationFrame = 0;

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
        this.ddx = weapon.ddx;
        this.ddy = weapon.ddy;
        this.rotation = weapon.rotation;
        this.special = weapon.special;
    }

    change(controller, model){
        this.dx += this.ddx;
        this.dy += this.ddy;
        this.x += this.dx;
        this.y += this.dy;

        this.animation++;
        if(this.animation > 74)
            this.animation -= 30
        this.animationFrame = Math.floor((this.animation / 15));
    }

    draw(context){
        context.save();
        context.translate(this.x + this.xSize / 2, this.y + this.ySize / 2);
        context.rotate(this.rotation * Math.PI / 180.0);
        context.drawImage(this.shotTexture, 0 + this.animationFrame * 40, 0, 40, 160, 0 - this.xSize / 2, 0 - this.ySize / 2, this.xSize, this.ySize);
        context.restore();
    }


}