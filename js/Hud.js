class Hud{
    texture = new Image();
    numbersYellow = new Image();
    numbersPurple = new Image();
    numbersBlue = new Image();
    numbersGreen = new Image();
    numbersRed = new Image();

    framePrimary = new Image();
    frameSecondary = new Image();

    chunkOrange = new Image();
    chunkBlue = new Image();

    xSizeChunk = ScalableSize.x(10);
    ySizeChunk = ScalableSize.y(40);
    
    sulfum;
    titanium;
    ice;
    algae;
    enemiesLeft;

    maxHealth;
    maxShield;
    health;
    shield;

    player;
    playerShip;

    //timer = 60; //once a second will update money count

    constructor(model){
        this.texture.src = "textures/hud/hud1.png";
        this.numbersRed.src = "textures/hud/numbersRed.png";

        this.framePrimary.src = "textures/shop/frame.png";
        this.frameSecondary.src = "textures/shop/frame2.png";

        this.chunkOrange.src = "textures/hud/chunkOrange.png";
        this.chunkBlue.src = "textures/hud/chunkBlue.png";

        this.player = model.player;
    }

    drawShipState(context, x, y, current, max, color){
        var numberOfChunks = Math.ceil(current / max * 30);

        for(var i = 0; i < numberOfChunks; i++)
            context.drawImage(color, x + i * this.xSizeChunk, y, this.xSizeChunk, this.ySizeChunk);
    }

    drawCoolDowns(context){
        //primary weapons
        for(var i = 0; i < this.playerShip.primaryFrames.length; i++){
            context.drawImage(this.framePrimary, ScalableSize.x((940 + i * 75 - 5)), ScalableSize.y(930), ScalableSize.x(60), ScalableSize.y(60));
            if(this.playerShip.primaryFrames[i].item != 0){
                context.drawImage(this.playerShip.primaryFrames[i].item.texture, ScalableSize.x(940 + i * 75), ScalableSize.y(935), 50, 50);
                var percentualCoolDown = this.playerShip.primaryFrames[i].item.cooldownTimer / this.playerShip.primaryFrames[i].item.cooldown * 50;
                if(!percentualCoolDown)
                    percentualCoolDown = 50;
                context.beginPath();
                context.fillStyle = "rgba(255, 0, 0, 0.5)";
                context.fillRect( ScalableSize.x(940 + i * 75),  ScalableSize.y(935 + percentualCoolDown),  ScalableSize.x(50),  ScalableSize.y(50 - percentualCoolDown));
                context.stroke();
            }
        }

        for(var i = 0; i < this.playerShip.secondaryFrames.length; i++){
            context.drawImage(this.frameSecondary,  ScalableSize.x(940 + i * 75 - 5),  ScalableSize.y(1002),  ScalableSize.x(60),  ScalableSize.y(60));
            if(this.playerShip.secondaryFrames[i].item != 0){
                context.drawImage(this.playerShip.secondaryFrames[i].item.texture,  ScalableSize.x(940 + i * 75),  ScalableSize.y(1007), 50, 50);
                var percentualCoolDown = this.playerShip.secondaryFrames[i].item.cooldownTimer / this.playerShip.secondaryFrames[i].item.cooldown * 50;
                if(!percentualCoolDown)
                    percentualCoolDown = 50;
                context.beginPath();
                context.fillStyle = "rgba(255, 0, 0, 0.5)";
                context.fillRect(ScalableSize.x(940 + i * 75),  ScalableSize.y(1007 + percentualCoolDown), 50, 50 - percentualCoolDown);
                context.stroke();
            }
                
        }
    }

    draw(context){
        context.drawImage(this.texture, 0, screen.height * 0.85, screen.width, screen.height * 0.15);

        //sulfum
        this.player.drawMaterial(context,  ScalableSize.x(98),  ScalableSize.y(947), this.player.sulfum, this.player.numbersYellow);
        //titanium
        this.player.drawMaterial(context,  ScalableSize.x(98),  ScalableSize.y(1019), this.player.titanium, this.player.numbersPurple);
        //ice
        this.player.drawMaterial(context,  ScalableSize.x(380),  ScalableSize.y(947), this.player.ice, this.player.numbersBlue);
        //algae
        this.player.drawMaterial(context,  ScalableSize.x(380),  ScalableSize.y(1019), this.player.algae, this.player.numbersGreen);
        
        //enemies
        this.player.drawMaterial(context,  ScalableSize.x(660), ScalableSize.y(983), this.enemiesLeft, this.numbersRed);

        //ship state
        this.drawShipState(context,  ScalableSize.x(1583), ScalableSize.y(940), this.health, this.playerShip.maxHealth, this.chunkOrange);
        //shield state
        this.drawShipState(context,  ScalableSize.x(1583), ScalableSize.y(1012), this.shield, this.playerShip.maxShield, this.chunkBlue);

        //weapon cooldowns
        this.drawCoolDowns(context);
    }

    change(controller, model){
        this.enemiesLeft = model.objects_3.length;

        this.playerShip = this.player.playerShip[this.player.activePlayerShip];
        this.health = this.playerShip.health;
        this.shield = this.playerShip.shield;

    }
}