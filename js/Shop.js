class Shop{
    texture = new Image();
    focusedFrame;
    shipFrames = [];
    shopFrames = [];

    shopFrameBaseX = ScalableSize.x(850);
    shopFrameBaseY = ScalableSize.y(195);
    shopFrameChangeX = ScalableSize.x(60);

    shipFrameBaseX = ScalableSize.x(150);
    shipFrameBaseY = ScalableSize.x(795);
    shipFrameChangeX = ScalableSize.x(110);
    player;
    levelButton = new Button(ScalableSize.x(1570), ScalableSize.y(830), ScalableSize.x(200), ScalableSize.y(100), "textures/shop/button.png");
    buyButton = new Button(ScalableSize.x(840), ScalableSize.y(830), ScalableSize.x(200), ScalableSize.y(100), "textures/shop/buy.png");
    sellButton = new Button(ScalableSize.x(1070), ScalableSize.y(830), ScalableSize.x(200), ScalableSize.y(100), "textures/shop/sell.png");


    constructor(player){
        this.texture.src = "textures/shop/1.png";
        for(var i = 0; i < 3; i++){
            this.shipFrames.push(new Frame(this.shipFrameBaseX + i * this.shipFrameChangeX, this.shipFrameBaseY, 1, 0, 90));
        }
        for(var i = 0; i < 8; i++){
            for(var j = 0; j < 7; j++){
                this.shopFrames.push(new Frame(this.shopFrameBaseX + j * this.shopFrameChangeX, this.shopFrameBaseY + i * this.shopFrameChangeX, 7, 0, 50, "new LaserGun();"));
            }
        }

        this.shopFrames[0].item = new LaserGun();
        this.shopFrames[1].item = new MiningBeam();
        this.shopFrames[21].item = new Rocket();
        this.player = player;
    }

    switchItems(newFrame){
        if(this.focusedFrame != undefined){
            if(this.focusedFrame.item != 0 && this.focusedFrame.frameType != 7){
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

    buy(){
        //test if player has enough resources
        if(this.player.sulfum >= this.focusedFrame.item.price[0] &&
        this.player.titanium >= this.focusedFrame.item.price[1] &&
        this.player.ice >= this.focusedFrame.item.price[2] &&
        this.player.algae >= this.focusedFrame.item.price[3]){
            for(var i = 0; i < this.player.storageFrames.length; i++){
                if(this.player.storageFrames[i].item == 0){
                    this.player.sulfum -= this.focusedFrame.item.price[0];
                    this.player.titanium -= this.focusedFrame.item.price[1];
                    this.player.ice -= this.focusedFrame.item.price[2];
                    this.player.algae -= this.focusedFrame.item.price[3];
                    this.player.storageFrames[i].item = eval(this.focusedFrame.item.construction);
                    break;
                }
            }
        }
    }

    sell(){
        this.player.sulfum += this.focusedFrame.item.price[0] / 2;
        this.player.titanium += this.focusedFrame.item.price[1] / 2;
        this.player.ice += this.focusedFrame.item.price[2] / 2;
        this.player.algae += this.focusedFrame.item.price[3] / 2;
        this.focusedFrame.item = 0;
    }

    change(controller, model){
        for(var i = 0; i < this.shipFrames.length; i++){
            this.shipFrames[i].change(controller, model, this);
        }
        for(var i = 0; i < this.shopFrames.length; i++){
            this.shopFrames[i].change(controller, model, this);
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
        if(this.levelButton.change(controller, model)){
            if(this.focusedFrame != undefined)
                this.focusedFrame.focus = -1;
            this.focusedFrame = undefined;
            model.mode = 1;
        }

        //buy\sell buttons
        if(this.focusedFrame != undefined){
            if(this.focusedFrame.frameType == 7 && this.buyButton.change(controller, model))
                this.buy();
            else if(this.focusedFrame.item != 0 && this.focusedFrame.frameType != 7 && this.sellButton.change(controller, model))
                this.sell();  
        }
             
    }

    draw(context){
        context.drawImage(this.texture, 0, 0, screen.width, screen.height);
        
        //frames draw
        for(var i = 0; i < this.shipFrames.length; i++){
            this.shipFrames[i].draw(context);
        }
        for(var i = 0; i < this.shopFrames.length; i++){
            this.shopFrames[i].draw(context);
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

        

        //buttons
        this.levelButton.draw(context);
        if(this.focusedFrame != undefined){
            if(this.focusedFrame.frameType == 7 && this.focusedFrame.item != 0)
                this.buyButton.draw(context);
            else if(this.focusedFrame.item != 0)
                this.sellButton.draw(context);
        }

        //materials
        this.player.drawMaterial(context, ScalableSize.x(1000), ScalableSize.y(700), this.player.sulfum, this.player.numbersYellow);
        this.player.drawMaterial(context, ScalableSize.x(1000), ScalableSize.y(770), this.player.titanium, this.player.numbersPurple);
        this.player.drawMaterial(context, ScalableSize.x(1495), ScalableSize.y(700), this.player.ice, this.player.numbersBlue);
        this.player.drawMaterial(context, ScalableSize.x(1495), ScalableSize.y(770), this.player.algae, this.player.numbersGreen);
    }
}