class Button{
    texture = new Image();
    leftX;
    leftY;
    sizeX;
    sizeY;

    constructor(leftX, leftY, sizeX, sizeY, texture){
        this.leftX = leftX;
        this.leftY = leftY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.texture.src = texture;
    }

    change(controller, model){
        if(controller.mouseCheck(this.leftX, this.leftY, this.leftX + this.sizeX, this.leftY + this.sizeY))
            return 1;
        return 0;
    }

    draw(context){
        context.drawImage(this.texture, this.leftX, this.leftY, this.sizeX, this.sizeY);
    }
}