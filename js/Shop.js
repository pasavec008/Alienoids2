class Shop{
    texture = new Image();
    shipFrames = [];
    frameBaseX = screen.width / 1920 * 155;
    frameBaseY = screen.height / 1080 * 220;
    frameConstantX = screen.width / 1920 * 110;
    player;


    constructor(player){
        this.texture.src = "textures/shop/1.png";
        for(var i = 0; i < 3; i++){
            this.shipFrames.push(new Frame(155 + i * this.frameConstantX, this.frameBaseY));
        }
        this.player = player;
    }

    change(controller, model){
        for(var i = 0; i < this.shipFrames.length; i++){
            this.shipFrames[i].change(controller, model);
        }
        for(var i = 0; i < this.player.playerShip[this.player.activePlayerShip].weaponFrames.length; i++){
            this.player.playerShip[this.player.activePlayerShip].weaponFrames[i].change(controller, model);
        }
        for(var i = 0; i < this.player.playerShip[this.player.activePlayerShip].avionicsFrames.length; i++){
            this.player.playerShip[this.player.activePlayerShip].avionicsFrames[i].change(controller, model);
        }
        for(var i = 0; i < this.player.playerShip[this.player.activePlayerShip].shieldFrames.length; i++){
            this.player.playerShip[this.player.activePlayerShip].shieldFrames[i].change(controller, model);
        }
    }

    draw(context){
        context.drawImage(this.texture, 0, 0, screen.width, screen.height);

        //frames draw
        for(var i = 0; i < this.shipFrames.length; i++){
            this.shipFrames[i].draw(context);
        }
        for(var i = 0; i < this.player.playerShip[this.player.activePlayerShip].weaponFrames.length; i++){
            this.player.playerShip[this.player.activePlayerShip].weaponFrames[i].draw(context);
        }
        for(var i = 0; i < this.player.playerShip[this.player.activePlayerShip].avionicsFrames.length; i++){
            this.player.playerShip[this.player.activePlayerShip].avionicsFrames[i].draw(context);
        }
        for(var i = 0; i < this.player.playerShip[this.player.activePlayerShip].shieldFrames.length; i++){
            this.player.playerShip[this.player.activePlayerShip].shieldFrames[i].draw(context);
        }
    }
}