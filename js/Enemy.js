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

    constructor(){
        this.lastDamage = 200;
    }

    takeDamage(x){
        this.health -= x;
        this.lastDamage = 0;
    }

    drawHealth(context){
        if(this.lastDamage >= 0 && this.lastDamage < 180 && this.health > 0){
            var currentHealth = Math.ceil(this.health / this.maxHealth * this.xSize);
            var damagedHealth = this.xSize - currentHealth;
            context.beginPath();
            context.lineWidth = "2";
            context.strokeStyle = "rgba(0, 255, 0, 0.7)";
            context.rect(this.x, this.y - screen.height / 1080 * 10, currentHealth, 1);
            context.stroke();
            context.beginPath();
            context.strokeStyle = "rgba(255, 0, 0, 0.7)";
            context.rect(this.x + currentHealth, this.y - screen.height / 1080 * 10, damagedHealth, 1);
            context.stroke();
        }
    }

    draw(context){
        context.save();
        context.translate(this.x + this.xSize / 2, this.y + this.ySize / 2);
        context.rotate(this.rotation * Math.PI / 180.0);
        context.drawImage(this.texture, 0 - this.xSize / 2, 0 - this.ySize / 2, this.xSize, this.ySize);
        context.restore();
    }
}