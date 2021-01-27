class Asteroid{
    texture = new Image();
    x;
    y;
    size = Math.random() * 200 + 50;
    xSize = screen.width / 1920 * this.size;
    ySize = screen.height / 1080 * this.size;
    dx = (260 - this.size) / 100 + 0.2;
    dy = (260 - this.size) / 100 + 0.2;
    rotation = 0;
    rotationSpeed = (260 - this.size) / 150;

    constructor(){
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

        this.texture.src = "textures/enemies/aste1.png";
    }

    draw(context){
        context.save();
        context.translate(this.x + this.xSize / 2, this.y + this.ySize / 2);
        context.rotate(this.rotation * Math.PI / 180.0);
        context.drawImage(this.texture, 0 - this.xSize / 2, 0 - this.ySize / 2, this.xSize, this.ySize);
        context.restore();
    }

    change(controller, model){
        this.x += this.dx;
        this.y += this.dy;

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