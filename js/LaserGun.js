class LaserGun{
    texture = new Image();
    shotTexture = 1;
    shotType = 1;
    shotCollisionDamage = 50;

    shotXSize = screen.width / 1920 * 10;
    shotYSize = screen.height / 1080 * 50;
    shotCollisionSize = this.shotXSize;
    speed = 10;
    dx;
    dy;
    rotation;
    rotationOffset;

    cooldownTimer = 0;
    cooldown = 50;

    constructor(rotationOffset){
        this.rotationOffset = rotationOffset;
    }

    shoot(model, booleanShoot){
        if(booleanShoot && this.cooldownTimer == 0){
            this.rotation = model.playerShip.rotation + this.rotationOffset;
            this.rotationRadians = this.rotation * Math.PI / 180.0;
            this.dy = - Math.cos(this.rotationRadians) * this.speed;
            this.dx = Math.sin(this.rotationRadians) * this.speed;

            model.objects_4.push(new Shot(this.shotTexture, this.shotCollisionDamage, this.shotType, 1, this.shotXSize, this.shotYSize, this.shotCollisionSize,
                model.playerShip.x + model.playerShip.xSize / 2, model.playerShip.y + model.playerShip.ySize / 2, this.dx, this.dy, this.rotation));
            this.cooldownTimer = this.cooldown;
        }
        else if(this.cooldownTimer > 0)
            this.cooldownTimer--;
            
    }
}