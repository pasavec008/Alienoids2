class LaserGun extends PrimaryWeapon{
    itemID = 1;
    shotTexture = 1;
    shotType = 1;
    shotCollisionDamage = 50;

    shotXSize = screen.width / 1920 * 10;
    shotYSize = screen.height / 1080 * 50;
    shotCollisionSize = this.shotXSize;
    speed = 10;
    health = 1;
    keepAlive = -1;
    special = 0;

    cooldownTimer = 0;
    cooldown = 50;

    constructor(){
        super();
        this.texture.src = "textures/shop/items/1.png";
    }

    shoot(model, booleanShoot, rotationOffset){
        if(booleanShoot && this.cooldownTimer == 0){
            this.rotation = model.playerShip.rotation + rotationOffset;
            this.rotationRadians = this.rotation * Math.PI / 180.0;
            this.dy = - Math.cos(this.rotationRadians) * this.speed;
            this.dx = Math.sin(this.rotationRadians) * this.speed;

            model.objects_4.push(new Shot(this, model));
            this.cooldownTimer = this.cooldown;
        }
        else if(this.cooldownTimer > 0)
            this.cooldownTimer--;
            
    }
}