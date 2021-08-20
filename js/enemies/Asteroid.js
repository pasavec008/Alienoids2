class Asteroid extends Enemy{
    texture = new Image();
    x;
    y;
    size = Math.random() * 200 + 50;
    ySize = this.size;
    xSize = this.ySize;
    collisionSize = this.xSize * 0.9;
    dx = (300 - this.size) / 150;
    dy = this.dx;
    rotation = 0;
    rotationSpeed = (260 - this.size) / 150;
    maxHealth = Math.floor(this.size * 2);
    health = this.maxHealth;
    collisionDamage = this.maxHealth;
    howDamaged;

    type;
    textureType = Math.floor(Math.random() * 3);

    constructor(){
        super();
        if(Math.random() > 0.5)
            this.dx *= -1;
        if(Math.random() > 0.5)
            this.dy *= -1;
        if(Math.random() > 0.5)
            this.rotationSpeed *= -1;

        if(Math.random() > 0.5){
            this.x = Math.random() * 1920;
            this.y = -500;
        }
        else{
            this.x = -500;
            this.y = Math.random() * 1080;
        }

        var typeDecider = Math.floor(Math.random() * 100) + 1; // range 1-100

        //basic asteroid
        if(typeDecider <= 80)
            this.type = 0;

        //sulfum asteroid
        else if(typeDecider <= 95)
            this.type = 1;

        //titanium asteroid
        else if(typeDecider <= 99)
            this.type = 2;

        //ice asteroid
        else
            this.type = 3;

        this.texture.src = "textures/enemies/asteroids.png";
    }

    death(model){
        if(this.type == 1)
            model.loot.push(new Sulfum(this));
        if(this.type == 2)
            model.loot.push(new Titanium(this));
        if(this.type == 3)
            model.loot.push(new Ice(this));
    }

    takeDamage(collidedObject){
        if(typeof collidedObject.specialEffectOnEnemy == "function")
            collidedObject.specialEffectOnEnemy(this);
        var modifier = 1;
        if(collidedObject.special == 1){
            modifier = 5;
            this.dx /= 1.02;
            this.dy /= 1.02;
            this.rotationSpeed /= 1.03;
        }
        this.health -= collidedObject.collisionDamage * modifier;
        this.lastDamage = 0;
    }

    change(controller, model){
        this.burnTextureTimer++;
        if(this.burnTextureTimer > 900000)
            this.burnTextureTimer = 0;
        if(this.burn > 0)
            this.burnDamage();
        this.x += this.dx;
        this.y += this.dy;
        this.lastDamage++;

        if(this.x > 1920)
            this.x = 0 - this.xSize;
        else if(this.x + this.xSize < 0)
            this.x = 1920;

        if(this.y > 1080 * 0.85)
            this.y = 0 - this.ySize;
        else if(this.y + this.ySize < 0)
            this.y = 1080 * 0.85;

        this.rotation += this.rotationSpeed;

        if(this.rotation >= 360)
            this.rotation -= 360;
        else if(this.rotation < 0)
            this.rotation += 360;

        this.howDamaged = Math.floor((this.health / this.maxHealth - 0.001) / 0.25);
    }

    draw(context){
        context.save();
        context.translate(this.x + this.xSize / 2, this.y + this.ySize / 2);
        context.rotate(this.rotation * Math.PI / 180.0);
        context.drawImage(this.texture, 750 * this.type + 250 * this.textureType, 0 + 250 * (3 - this.howDamaged), 250, 250, 0 - this.xSize / 2, 0 - this.ySize / 2, this.xSize, this.ySize);
        context.restore();

        if(this.burn > 0)
            context.drawImage(this.texture_burn, Math.floor((this.burnTextureTimer % 30 / 10)) * 230, 0, 230, 230, this.x - 20, this.y - 20, this.xSize + 40, this.ySize + 40);
    }
}