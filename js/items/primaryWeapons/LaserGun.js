class LaserGun extends PrimaryWeapon{
    itemID = "1_1";
    shotType = 1;
    shotCollisionDamage = 30;

    shotXSize = 10;
    shotYSize = 50;
    shotCollisionSize = this.shotXSize;
    speed = 10;
    health = 1;
    keepAlive = -1;
    special = 0;

    cooldownTimer = 0;
    cooldown = 50;

    construction = "new LaserGun();";
    price = [1000, 0, 0, 0];

    constructor(){
        super();
        this.texture.src = "textures/shop/items/1_1.png";
        this.toolTipTexture.src = "textures/shop/items/1_1TT.png";
    }

    shoot(model, booleanShoot, rotationOffset){
        if(booleanShoot && this.cooldownTimer == 0){
            this.rotation = model.playerShip.rotation + rotationOffset;
            this.rotationRadians = this.rotation * Math.PI / 180.0;
            this.dy = - Math.cos(this.rotationRadians) * this.speed;
            this.dx = Math.sin(this.rotationRadians) * this.speed;

            model.projectiles.push(new Shot(this, model));
            this.cooldownTimer = this.cooldown;
        }
        else if(this.cooldownTimer > 0)
            this.cooldownTimer--;  
    }
}