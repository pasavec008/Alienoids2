class PlayerShip{
    x = screen.width / 2;
    y = screen.height / 2;
    xSize = 50;
    ySize = 150;
    dx = 0;
    dy = 0;
    rotation = 0;
    rotationRadians;
    rotationSpeed = 5;
    speed = 0.1;
    health;
    shield;
    texture = new Image();

    constructor(spaceshipID){
        this.texture.src = "textures/spaceships/" + spaceshipID + ".png";
    }

    change(controller, model){
        
        if(controller.keys[37]) //left
            this.rotation -= this.rotationSpeed;
        if(controller.keys[39]) //right
            this.rotation += this.rotationSpeed;
        
        if(controller.keys[38]){//up
            this.rotationRadians = this.rotation * Math.PI / 180.0;
            this.dy -= Math.cos(this.rotationRadians) * this.speed;
            this.dx += Math.sin(this.rotationRadians) * this.speed;
        } 

        this.x += this.dx;
        this.y += this.dy;
    }

    draw(context){
        context.save();
        context.translate(this.x + this.xSize / 2, this.y + this.ySize / 2);
        context.rotate(this.rotation * Math.PI / 180.0);
        context.drawImage(this.texture, 0 - this.xSize / 2, 0 - this.ySize / 2, this.xSize, this.ySize);
        context.restore();
    }
}