class NitrogenLaserGun extends PrimaryWeapon{
    itemID = "1_4";
    shotType = 1;
    shotCollisionDamage = 75;

    shotXSize = 15;
    shotYSize = 70;
    shotCollisionSize = this.shotXSize;
    speed = 8;
    health = 1;
    keepAlive = -1;
    special = 0;

    cooldownTimer = 0;
    cooldown = 80;

    construction = "new NitrogenLaserGun();";
    price = [7000, 0, 0, 0];

    constructor(){
        super();
        this.texture.src = "textures/shop/items/1_4.png";
        this.toolTipTexture.src = "textures/shop/items/1_4TT.png";
    }

    shoot(model, booleanShoot, rotationOffset){
        if(booleanShoot && this.cooldownTimer == 0){
            this.rotation = model.playerShip.rotation + rotationOffset;
            this.rotationRadians = this.rotation * Math.PI / 180.0;
            this.dy = - Math.cos(this.rotationRadians) * this.speed;
            this.dx = Math.sin(this.rotationRadians) * this.speed;

            model.projectiles.push(new NitrogenShot(this, model));
            this.cooldownTimer = this.cooldown;
        }
        else if(this.cooldownTimer > 0)
            this.cooldownTimer--;  
    }

}