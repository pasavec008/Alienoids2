class Enemy{
    texture;
    x;
    y;
    ySize;
    xSize;
    maxHealth;
    health;
    collisionDamage;
    lastDamage;
    special = 0;
    burn = 0;
    burnTextureTimer = 0;
    texture_burn = new Image();

    constructor(){
        this.texture_burn.src = "textures/enemies/burn.png";
        this.lastDamage = 200;
    }

    takeDamage(collidedObject){
        if(typeof collidedObject.specialEffectOnEnemy == "function")
            collidedObject.specialEffectOnEnemy(this);
        this.health -= collidedObject.collisionDamage;
        this.lastDamage = 0;
    }

    drawHealth(context){
        if(this.lastDamage >= 0 && this.lastDamage < 180 && this.health > 0){
            var currentHealth = Math.ceil(this.health / this.maxHealth * this.xSize);
            var damagedHealth = this.xSize - currentHealth;
            context.beginPath();
            context.lineWidth = "2";
            context.strokeStyle = "rgba(0, 255, 0, 0.7)";
            context.rect(this.x, this.y - 10, currentHealth, 1);
            context.stroke();
            context.beginPath();
            context.strokeStyle = "rgba(255, 0, 0, 0.7)";
            context.rect(this.x + currentHealth, this.y - 10, damagedHealth, 1);
            context.stroke();
        }
    }

    burnDamage(){
        this.burn--;
        this.health -= 0.2 + this.maxHealth / 5000;
        this.lastDamage = 0;
    }

    draw(context){
        context.save();
        context.translate(this.x + this.xSize / 2, this.y + this.ySize / 2);
        context.rotate(this.rotation * Math.PI / 180.0);
        context.drawImage(this.texture, 0 - this.xSize / 2, 0 - this.ySize / 2, this.xSize, this.ySize);
        context.restore();
        if(this.burn)
            context.drawImage(this.texture_burn, Math.floor((this.burn % 30 / 10)) * 230, 0, 230, 230, this.x + this.xSize / 2 - 45, this.y + this.ySize / 2 - 45, this.xSize + 90, this.ySize + 90);
    }
}