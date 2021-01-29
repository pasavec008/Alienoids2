class PlayerShip{
    ySize = screen.height / 1080 * 70;
    xSize = this.ySize;
    x = screen.width / 2 - this.xSize / 2;
    y = screen.height * 0.85 / 2 - this.ySize / 2;
    collisionSize = this.xSize * 0.8;
    
    dx = 0;
    dy = 0;
    rotation = 0;
    rotationRadians;
    rotationSpeed = 2;
    speed = 0.07;
    passiveSlowSpeed = 50;

    animation = 0.95;
    maxHealth = 1000;
    maxShield = 500;
    collisionDamage = this.maxHealth;
    health = this.maxHealth;
    shield = this.maxShield;
    shieldAbsorption = 0.8;
    shieldSize = screen.height / 1080 * 90;
    shieldOffset = (this.shieldSize - this.ySize) / 2;
    hitTimer = 100;
    activeShieldTextureTimer = 0;
    activeShieldTexture = 0;

    texture = new Image();
    texture_shield = new Image();

    constructor(spaceshipID){
        this.texture.src = "textures/spaceships/" + spaceshipID + ".png";
        this.texture_shield.src = "textures/spaceships/shield" + spaceshipID + ".png";
    }

    takeDamage(x){
        this.hitTimer = 0;
        this.activeShieldTextureTimer = 10;
        var shieldDamage = x * this.shieldAbsorption;
        var shipDamage = x - shieldDamage;
        this.shield -= shieldDamage;

        if(this.shield <= 0){
            shipDamage -= this.shield;
            this.shield = 0;
        }

        this.health -= shipDamage;
    }

    change(controller, model){
        this.hitTimer++;
        if(this.hitTimer > 300 && this.shield < this.maxShield){
            this.activeShieldTextureTimer = 1;
            this.shield += this.maxShield / 500;
            if(this.shield > this.maxShield)
                this.shield = this.maxShield;
        }

        if(this.activeShieldTextureTimer > 0){
            this.activeShieldTextureTimer--;
            this.activeShieldTexture = 1;
        }
        else
            this.activeShieldTexture = 0;


        //passive slow
        if(this.dx > 0)
            this.dx -= this.dx/this.passiveSlowSpeed;
        else if(this.dx < 0)
            this.dx -= this.dx/this.passiveSlowSpeed;
        if(this.dy > 0)
            this.dy -= this.dy/this.passiveSlowSpeed;
        else if(this.dy < 0)
            this.dy -= this.dy/this.passiveSlowSpeed;
        
        if(controller.keys[37]) //left
            this.rotation -= this.rotationSpeed;
        if(controller.keys[39]) //right
            this.rotation += this.rotationSpeed;
        if(this.rotation > 360)
            this.rotation -= 360;
        else if(this.rotation < 0)
            this.rotation += 360;

        if(controller.keys[38] && model.player.sulfum > 0){//up
            if(this.animation <= 5.5)
                this.animation += 0.05;
            else
                this.animation--;

            model.player.sulfum -= 0.1;
            if(model.player.sulfum < 0)
                model.player.sulfum = 0;

            this.rotationRadians = this.rotation * Math.PI / 180.0;
            this.dy -= Math.cos(this.rotationRadians) * this.speed;
            this.dx += Math.sin(this.rotationRadians) * this.speed;
        }
        else
            if(this.animation >= 1)
                this.animation -= 0.05;
        


        this.x += this.dx;
        this.y += this.dy;

        //edges of map
        if(this.x < 0 || this.x + this.xSize > screen.width)
            this.dx *= -1.25;
        if(this.y < 0 || this.y + this.ySize > screen.height * 0.85)
            this.dy *= -1.25;
    }

    draw(context){
        context.save();
        context.translate(this.x + this.xSize / 2, this.y + this.ySize / 2);
        context.rotate(this.rotation * Math.PI / 180.0);
        context.drawImage(this.texture, Math.floor(this.animation) * 200, 0, 200, 200, 0 - this.xSize / 2, 0 - this.ySize / 2, this.xSize, this.ySize);
        if(this.shield)
            context.drawImage(this.texture_shield, this.activeShieldTexture * 230, 0, 230, 230, 0 - this.xSize / 2 - this.shieldOffset, 0 - this.ySize / 2 - this.shieldOffset, this.shieldSize, this.shieldSize);
        context.restore();
    }
}