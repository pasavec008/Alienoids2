class FlameShot{
    shotTexture = new Image();
    collisionDamage;
    type;
    keepAlive;
    health;
    xSize;
    ySize;
    collisionSize;
    x;
    y;
    dx;
    dy;
    rotation;
    special;
    burnPotential = 7;

    animation = 0;
    animationFrame = 0;

    constructor(weapon, model){
        this.shotTexture.src = "textures/weapons/shot" + weapon.itemID + ".png";
        this.collisionDamage = weapon.shotCollisionDamage;
        this.type = weapon.shotType;
        this.keepAlive = weapon.keepAlive;
        this.health = weapon.health;
        this.xSize = weapon.shotXSize;
        this.ySize = weapon.shotYSize;
        this.collisionSize = weapon.shotCollisionSize;
        this.x = model.playerShip.x + model.playerShip.xSize / 2 - this.xSize / 2;
        this.y = model.playerShip.y + model.playerShip.ySize / 2 - this.ySize / 2;
        this.dx = weapon.dx;
        this.dy = weapon.dy;
        this.rotation = weapon.rotation;
        this.special = weapon.special;
    }

    specialEffectOnEnemy(hitObject){
        if(hitObject.burn < 30)
            hitObject.burn += 30;
        else
            hitObject.burn += this.burnPotential;
        this.burnPotential = 0;
    }

    change(controller, model){
        this.x += this.dx;
        this.y += this.dy;

        this.xSize += 0.25;
        this.ySize += 0.25;
        this.collisionSize += 0.25;

        this.rotation += (Math.random() - 0.5) * 5;

        this.animation++;
        this.keepAlive--;
        
        if(this.keepAlive <= 0)
            this.health = 0;
        console.log(this.keepAlive, this.health)
        if(this.animation >= 45)
            this.animation -= 45
        this.animationFrame = Math.floor((this.animation / 15));
    }

    draw(context){
        context.save();
        context.translate(this.x + this.xSize / 2, this.y + this.ySize / 2);
        context.rotate(this.rotation * Math.PI / 180.0);
        context.drawImage(this.shotTexture, 0 + this.animationFrame * 230, 0, 230, 230, 0 - this.xSize / 2, 0 - this.ySize / 2, this.xSize, this.ySize);
        context.restore();
    }
}