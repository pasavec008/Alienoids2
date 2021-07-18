class Frame{
    texture = new Image();
    itemTexture = new Image();
    xSize = screen.height / 1080 * 90;
    ySize = this.xSize;
    x;
    y;
    item = 0;
    itemType = 0;
    

    constructor(x, y){
        this.texture.src = "textures/shop/frame.png";
        this.x = x;
        this.y = y;
    }

    change(controller, model){
        if(controller.mouseCheck(this.x, this.y, this.x + this.xSize, this.y + this.ySize)){
            console.log("cau");
        }
        else{
        }
    }

    update(itemType){
        this.itemType = itemType;
        this.itemTexture.src = "textures/shop/items/" + this.itemType + ".png";
    }

    draw(context){
        context.drawImage(this.texture, this.x, this.y, this.xSize, this.ySize);
        if(this.itemType != 0){
            context.drawImage(this.itemTexture, this.x + this.xSize / 18, this.y + this.ySize / 18, screen.width / 1920 * 80, screen.height / 1080 * 80);
        }
    }
}