class MiningBeam extends PrimaryWeapon{
    itemID = "1_2";
    shotTexture = 2;
    shotType = 1;
    special = 1; //anti-asteroid
    keepAlive;
    shotCollisionDamage = 1;

    shotXSize = 5;
    shotYSize = 5;
    shotCollisionSize = this.shotXSize;
    speed = 7;
    health = 1;

    cooldownTimer = 0;
    cooldown = 2;

    construction = "new MiningBeam();";
    price = [3000, 0, 0, 0];

    constructor(){
        super();
        this.texture.src = "textures/shop/items/1_2.png";
        this.toolTipTexture.src = "textures/shop/items/1_2TT.png";
    }

    shoot(model, booleanShoot, rotationOffset){
        if(booleanShoot && this.cooldownTimer == 0){
            this.rotation = model.playerShip.rotation + rotationOffset;
            this.rotationRadians = this.rotation * Math.PI / 180.0 + (Math.random() - 0.5) / 1.5;
            this.dy = - Math.cos(this.rotationRadians) * this.speed;
            this.dx = Math.sin(this.rotationRadians) * this.speed;
            this.keepAlive = 10 + Math.ceil(Math.random() * 30);
            model.projectiles.push(new Shot(this, model));
            this.cooldownTimer = this.cooldown;
        }
        else if(this.cooldownTimer > 0)
            this.cooldownTimer--;
            
    }
}