class Sulfid extends Enemy{
    texture = new Image();
    x;
    y;
    size = 75;
    ySize = this.size;
    xSize = this.ySize;
    collisionSize = this.xSize * 0.9;
    dx = Math.random() + 0.5;
    dy = 2 - this.dx;
    rotation = 0;
    rotationSpeed = 0.5;
    maxHealth = 150;
    health = this.maxHealth;
    collisionDamage = 100;
    howDamaged;
    special = 1;
    destroyedByShip = 0;

    tick = Math.floor(Math.random() * 100);
    expand = 1;
    angry = 0;

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

        this.texture.src = "textures/enemies/sulfid.png";
    }

    takeDamage(collidedObject){
        if(typeof collidedObject.specialEffectOnEnemy == "function")
            collidedObject.specialEffectOnEnemy(this);
        if(collidedObject.shipID != undefined)
            this.destroyedByShip = 1;
        this.health -= collidedObject.collisionDamage;
        this.lastDamage = 0;
    }

    death(model){
        this.rotationSpeed /= 5;
        if(!this.destroyedByShip)
            model.loot.push(new Sulfum(this, 500));
    }

    specialEffectOnShip(playerShip){
        playerShip.burn += 300;
    }

    shouldBeAngry(model){
        if(model.distance(model.playerShip, this) < 350){
            this.angry = 1;
            this.rotationSpeed *= 5;
        }
            
    }

    change(controller, model){
        //cannot be burned

        this.tick++;
        if(!this.angry){
            if(this.tick % 10 == 0)
                this.shouldBeAngry(model);
        }
        else{
            if(model.playerShip.x > this.x && this.dx < 2)
                this.dx += 0.04;
            if(model.playerShip.x < this.x && this.dx > -2)
                this.dx -= 0.04;
            if(model.playerShip.y > this.y && this.dy < 2)
                this.dy += 0.04;
            if(model.playerShip.y < this.y && this.dy > -2)
                this.dy -= 0.04;
        }

        if(this.frost > 0)
            this.frost--;

        this.x += this.dx * Math.pow(0.999, this.frost);
        this.y += this.dy * Math.pow(0.999, this.frost);
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
    }

    draw(context){
        context.save();
        context.translate(this.x + this.xSize / 2, this.y + this.ySize / 2);
        context.rotate(this.rotation * Math.PI / 180.0);
        context.drawImage(this.texture, 0 - this.xSize / 2, 0 - this.ySize / 2, this.xSize, this.ySize);
        context.restore();
    }
}