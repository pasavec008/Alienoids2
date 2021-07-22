class Frame{
    yesFocusTexture = new Image();
    noFocusTexture = new Image();
    focus = -1;
    itemTexture = new Image();
    xSize;
    ySize;
    x;
    y;
    frameType;      //1 for ship, 2 for primary, 3 for secondary, 4 for avionics, 5 for shields, 6 for storage, 7 for shop
    item = 0;
    rotationOfItem;

    constructor(x, y, frameType, rotationOfItem, size){
        this.noFocusTexture.src = "textures/shop/frame.png";
        this.yesFocusTexture.src = "textures/shop/frame2.png";
        this.x = x;
        this.y = y;
        this.frameType = frameType;
        this.rotationOfItem = rotationOfItem;
        this.xSize = ScalableSize.y(size);
        this.ySize = this.xSize;
    }

    change(controller, model, shop){
        if(controller.mouseCheck(this.x, this.y, this.x + this.xSize, this.y + this.ySize)){
            if(this.frameType == 7 || !shop.switchItems(this))
                shop.switchFocus(this);
        }
    }

    loseFocus(){
        this.focus = -1;
    }

    draw(context){
        if(this.focus < 0)
            context.drawImage(this.noFocusTexture, this.x, this.y, this.xSize, this.ySize);
        else
            context.drawImage(this.yesFocusTexture, this.x, this.y, this.xSize, this.ySize);
        if(this.item != 0){
            context.drawImage(this.item.texture, this.x + this.xSize / 18, this.y + this.ySize / 18, this.xSize / 9 * 8, this.ySize / 9 * 8);
        }
    }
}