class Napalm extends PrimaryWeapon{
    itemID = "1_7";
    shotTexture = 2;
    shotType = 2;
    special = 0;
    keepAlive;
    shotCollisionDamage = 0.1;

    shotXSize = 50;
    shotYSize = 50;
    shotCollisionSize = this.shotXSize;
    speed = 7;
    health = 1;

    cooldownTimer = 0;
    cooldown = 1;

    construction = "new Napalm();";
    price = [5000, 0, 150, 0];

    constructor(){
        super();
        this.texture.src = "textures/shop/items/1_3.png";
        this.toolTipTexture.src = "textures/shop/items/1_3TT.png";
    }

    shoot(model, booleanShoot, rotationOffset){
        if(booleanShoot && this.cooldownTimer == 0){
            this.rotation = model.playerShip.rotation + rotationOffset;
            this.rotationRadians = this.rotation * Math.PI / 180.0 + (Math.random() - 0.5) / 3;
            this.dy = - Math.cos(this.rotationRadians) * this.speed;
            this.dx = Math.sin(this.rotationRadians) * this.speed;
            //set random rotation for draw
            this.rotation = Math.random() * 360;
            this.keepAlive = 130 + Math.floor((Math.random() * 20));
            model.projectiles.push(new NapalmShot(this, model));
            this.cooldownTimer = this.cooldown;
        }
        else if(this.cooldownTimer > 0)
            this.cooldownTimer--;
            
    }
}