class PlayerShip{
    x = screen.width / 2;
    y = screen.height / 2;
    ySize = screen.height / 1080 * 70;
    xSize = this.ySize;
    collisionSize = this.xSize * 0.8;
    dx = 0;
    dy = 0;
    rotation = 0;
    rotationRadians;
    rotationSpeed = 2;
    speed = 0.07;
    passiveSlowSpeed = 50;
    animation = 0.95;
    health;
    shield;
    texture = new Image();

    constructor(spaceshipID){
        this.texture.src = "textures/spaceships/" + spaceshipID + ".png";
    }

    change(controller, model){
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

        if(controller.keys[38]){//up
            if(this.animation <= 5.5)
                this.animation += 0.05;
            else
                this.animation--;

            //zmazat potom
            model.player.money++;

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
        context.restore();
    }
}