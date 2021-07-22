class Rocket extends SecondaryWeapon{
    itemID = "2_1";
    shotType = 1;
    shotCollisionDamage = 300;

    shotXSize = ScalableSize.x(20);
    shotYSize = ScalableSize.y(70);
    shotCollisionSize = this.shotXSize;
    speed = 7;
    health = 1;
    keepAlive = -1;
    special = 0;

    cooldownTimer = 0;
    cooldown = 150;

    construction = "new Rocket();";
    price = [1000, 0, 0, 0];

    constructor(){
        super();
        this.texture.src = "textures/shop/items/2_1.png";
    }

    shoot(model, booleanShoot, rotationOffset, playerShip){
        if(booleanShoot && this.cooldownTimer == 0){
            this.rotation = model.playerShip.rotation + rotationOffset;
            this.rotationRadians = this.rotation * Math.PI / 180.0;
            this.dy = - Math.cos(this.rotationRadians) * this.speed;
            this.dx = Math.sin(this.rotationRadians) * this.speed;

            playerShip.shield -= 100;
            playerShip.hitTimer = 0;
            playerShip.activeShieldTextureTimer = 10;

            model.objects_4.push(new Shot(this, model));
            this.cooldownTimer = this.cooldown;
        }
        else if(this.cooldownTimer > 0)
            this.cooldownTimer--;  
    }
}