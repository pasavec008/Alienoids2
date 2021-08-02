class LevelChoiceFrame{
    yesFocusTexture = new Image();
    noFocusTexture = new Image();
    lockedTexture = new Image();
    doneTexture = new Image();
    focus = -1;
    id;
    unlocked = -1;
    done = -1;
    xSize;
    ySize;
    x;
    y;

    constructor(x, y, size, id){
        this.noFocusTexture.src = "textures/shop/frame.png";
        this.yesFocusTexture.src = "textures/shop/frame2.png";
        this.lockedTexture.src = "textures/levels/locked.png";
        this.doneTexture.src = "textures/levels/done.png";
        this.x = x;
        this.y = y;
        this.xSize = size;
        this.ySize = this.xSize;
        this.id = id;
    }

    change(controller, model, levelChoiceScreen){
        if(controller.mouseCheck(this.x, this.y, this.x + this.xSize, this.y + this.ySize)){
            levelChoiceScreen.changeFocus(this.id);
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
            
        if(this.unlocked < 0)
            context.drawImage(this.lockedTexture, this.x, this.y, this.xSize, this.ySize);
        else if(this.done > 0)
            context.drawImage(this.doneTexture, this.x, this.y, this.xSize, this.ySize);
    }
}