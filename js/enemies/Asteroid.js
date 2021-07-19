class Asteroid extends Enemy{
    texture = new Image();
    x;
    y;
    size = (Math.random() * 200 + 50) / 1080 * screen.height;
    ySize = this.size;
    xSize = this.ySize;
    collisionSize = this.xSize * 0.9;
    dx = (300 - this.size) / 150 / 1080 * screen.height;
    dy = (300 - this.size) / 150 / 1080 * screen.height;
    rotation = 0;
    rotationSpeed = (260 - this.size) / 150;
    maxHealth = Math.floor(this.size * 2);
    health = this.maxHealth;
    collisionDamage = this.maxHealth;

    constructor(){
        super();
        if(Math.random() > 0.5)
            this.dx *= -1;
        if(Math.random() > 0.5)
            this.dy *= -1;
        if(Math.random() > 0.5)
            this.rotationSpeed *= -1;

        if(Math.random() > 0.5){
            this.x = Math.random() * screen.width;
            this.y = -500;
        }
        else{
            this.x = -500;
            this.y = Math.random() * screen.height;
        }

        this.texture.src = "textures/enemies/aste" + Math.floor(Math.random()*3 + 1) + ".png";
    }

    takeDamage(collidedObject){
        var modifier = 1;
        if(collidedObject.special == 1){
            modifier = 7;
            this.dx /= 1.02;
            this.dy /= 1.02;
            this.rotationSpeed /= 1.03;
        }
        this.health -= collidedObject.collisionDamage * modifier;
        this.lastDamage = 0;
    }

    change(controller, model){
        this.x += this.dx;
        this.y += this.dy;
        this.lastDamage++;

        if(this.x > screen.width)
            this.x = 0 - this.xSize;
        else if(this.x + this.xSize < 0)
            this.x = screen.width;

        if(this.y > screen.height * 0.85)
            this.y = 0 - this.ySize;
        else if(this.y + this.ySize < 0)
            this.y = screen.height * 0.85;

        this.rotation += this.rotationSpeed;

        if(this.rotation >= 360)
            this.rotation -= 360;
        else if(this.rotation < 0)
            this.rotation += 360;
    }
}