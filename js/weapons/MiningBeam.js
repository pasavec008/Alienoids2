class MiningBeam extends PrimaryWeapon{
    itemID = 2;
    shotTexture = 2;
    shotType = 1;
    special = 1; //anti-asteroid
    keepAlive;
    shotCollisionDamage = 1;

    shotXSize = screen.width / 1920 * 5;
    shotYSize = screen.height / 1080 * 5;
    shotCollisionSize = this.shotXSize;
    speed = 7;
    health = 1;

    cooldownTimer = 0;
    cooldown = 1;

    constructor(){
        super();
        this.texture.src = "textures/shop/items/2.png";
    }

    shoot(model, booleanShoot, rotationOffset){
        if(booleanShoot && this.cooldownTimer == 0){
            this.rotation = model.playerShip.rotation + rotationOffset;
            this.rotationRadians = this.rotation * Math.PI / 180.0 + (Math.random() - 0.5) / 1.5;
            this.dy = - Math.cos(this.rotationRadians) * this.speed;
            this.dx = Math.sin(this.rotationRadians) * this.speed;
            this.keepAlive = 10 + Math.ceil(Math.random() * 30);
            model.objects_4.push(new Shot(this, model));
            this.cooldownTimer = this.cooldown;
        }
        else if(this.cooldownTimer > 0)
            this.cooldownTimer--;
            
    }
}