class Rocket extends SecondaryWeapon{
    itemID = "2_1";
    shotType = 1;
    shotCollisionDamage = 350;

    shotXSize = 40 / 2;
    shotYSize = 160 / 2;
    shotCollisionSize = this.shotXSize;
    speed = -3;
    health = 1;
    special = 0;
    shieldCost = 250;

    cooldownTimer = 0;
    cooldown = 50;

    construction = "new Rocket();";
    price = [3000, 0, 0, 0];

    constructor(){
        super();
        this.texture.src = "textures/shop/items/2_1.png";
        this.toolTipTexture.src = "textures/shop/items/toolTip2_1.png";
    }

    shoot(model, booleanShoot, rotationOffset, playerShip){
        if(booleanShoot && this.cooldownTimer == 0 && playerShip.shield >= this.shieldCost){
            this.rotation = model.playerShip.rotation + rotationOffset + (Math.random() - 0.5) * 40;
            this.rotationRadians = this.rotation * Math.PI / 180.0;
            this.dy = - Math.cos(this.rotationRadians) * this.speed;
            this.dx = Math.sin(this.rotationRadians) * this.speed;
            this.ddx = -this.dx / 25;
            this.ddy = -this.dy / 25;
            playerShip.shield -= this.shieldCost;
            playerShip.hitTimer = 0;
            playerShip.activeShieldTextureTimer = 10;

            model.projectiles.push(new RocketShot(this, model));
            this.cooldownTimer = this.cooldown;
        }
        else if(this.cooldownTimer > 0)
            this.cooldownTimer--;  
    }
}