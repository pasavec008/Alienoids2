class Shop{
    texture = new Image();
    focusedFrame;
    shipFrames = [];
    frameBaseX = screen.width / 1920 * 155;
    frameBaseY = screen.height / 1080 * 795;
    frameConstantX = screen.width / 1920 * 150;
    frameConstantChangeX = screen.width / 1920 * 110;
    player;
    levelButton = new Button(1570, 830, 200, 100, "textures/shop/button.png");


    constructor(player){
        this.texture.src = "textures/shop/1.png";
        for(var i = 0; i < 3; i++){
            this.shipFrames.push(new Frame(this.frameConstantX + i * this.frameConstantChangeX, this.frameBaseY, 1));
        }
        this.player = player;

    }

    switchItems(newFrame){
        if(this.focusedFrame != undefined){
            if(this.focusedFrame.item != 0){
                //all cases when switch is possible
                if((newFrame.frameType == 6 && newFrame.item == 0) || newFrame.frameType == this.focusedFrame.frameType ||
                (this.focusedFrame.frameType == 6 && newFrame.frameType == this.focusedFrame.item.itemType) ||
                this.focusedFrame.frameType == newFrame.item.itemType){
                    var item1 = this.focusedFrame.item;
                    this.focusedFrame.item = newFrame.item;
                    newFrame.item = item1;
                    this.focusedFrame.focus *= -1;
                    this.focusedFrame = undefined;
                    return 1;
                }
            }
        }
        return 0;
    }

    switchFocus(newFrame){
        newFrame.focus *= -1;
        if(this.focusedFrame != undefined)
            this.focusedFrame.focus = -1;
        if(newFrame.focus > 0)
            this.focusedFrame = newFrame;
        else
            this.focusedFrame = undefined;
    }

    change(controller, model){
        for(var i = 0; i < this.shipFrames.length; i++){
            this.shipFrames[i].change(controller, model, this);
        }
        for(var i = 0; i < this.player.playerShip[this.player.activePlayerShip].primaryFrames.length; i++){
            this.player.playerShip[this.player.activePlayerShip].primaryFrames[i].change(controller, model, this);
        }
        for(var i = 0; i < this.player.playerShip[this.player.activePlayerShip].secondaryFrames.length; i++){
            this.player.playerShip[this.player.activePlayerShip].secondaryFrames[i].change(controller, model, this);
        }
        for(var i = 0; i < this.player.playerShip[this.player.activePlayerShip].avionicsFrames.length; i++){
            this.player.playerShip[this.player.activePlayerShip].avionicsFrames[i].change(controller, model, this);
        }
        for(var i = 0; i < this.player.playerShip[this.player.activePlayerShip].shieldFrames.length; i++){
            this.player.playerShip[this.player.activePlayerShip].shieldFrames[i].change(controller, model, this);
        }
        for(var i = 0; i < this.player.storageFrames.length; i++){
            this.player.storageFrames[i].change(controller, model, this);
        }

        //levels screen button
        if(this.levelButton.change(controller, model))
            model.mode = 1;
    }

    draw(context){
        context.drawImage(this.texture, 0, 0, screen.width, screen.height);
        
        //frames draw
        for(var i = 0; i < this.shipFrames.length; i++){
            this.shipFrames[i].draw(context);
        }
        for(var i = 0; i < this.player.playerShip[this.player.activePlayerShip].primaryFrames.length; i++){
            this.player.playerShip[this.player.activePlayerShip].primaryFrames[i].draw(context);
        }
        for(var i = 0; i < this.player.playerShip[this.player.activePlayerShip].secondaryFrames.length; i++){
            this.player.playerShip[this.player.activePlayerShip].secondaryFrames[i].draw(context);
        }
        for(var i = 0; i < this.player.playerShip[this.player.activePlayerShip].avionicsFrames.length; i++){
            this.player.playerShip[this.player.activePlayerShip].avionicsFrames[i].draw(context);
        }
        for(var i = 0; i < this.player.playerShip[this.player.activePlayerShip].shieldFrames.length; i++){
            this.player.playerShip[this.player.activePlayerShip].shieldFrames[i].draw(context);
        }
        for(var i = 0; i < this.player.storageFrames.length; i++){
            this.player.storageFrames[i].draw(context);
        }

        //levels screen button
        this.levelButton.draw(context);
    }
}