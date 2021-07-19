class Hud{
    texture = new Image();
    numbersYellow = new Image();
    numbersPurple = new Image();
    numbersBlue = new Image();
    numbersGreen = new Image();
    numbersRed = new Image();

    chunkOrange = new Image();
    chunkBlue = new Image();
    
    xSizeNumber = screen.width / 1920 * 25;
    ySizeNumber = screen.height / 1080 * 25;

    xSizeChunk = screen.width / 1920 * 10;
    ySizeChunk = screen.height / 1080 * 40;
    
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
        this.numbersYellow.src = "textures/hud/numbersYellow.png";
        this.numbersPurple.src = "textures/hud/numbersPurple.png";
        this.numbersBlue.src = "textures/hud/numbersBlue.png";
        this.numbersGreen.src = "textures/hud/numbersGreen.png";
        this.numbersRed.src = "textures/hud/numbersRed.png";

        this.chunkOrange.src = "textures/hud/chunkOrange.png";
        this.chunkBlue.src = "textures/hud/chunkBlue.png";

        this.player = model.player;
    }



    drawMaterial(context, x, y, pom, pom2, color){
        var numberOfNumbers = 1;

        //how many numbers
        while(Math.floor(pom / 10) != 0){
            numberOfNumbers++;
            pom = Math.floor(pom / 10);
        }

        for(var i = 1; i <= numberOfNumbers; i++){
            pom = Math.floor(pom2 / Math.pow(10, numberOfNumbers - i));
            pom2 = Math.floor(pom2 % Math.pow(10, numberOfNumbers - i));


            context.drawImage(color, pom * 40, 0, 40, 40, x, y, this.xSizeNumber, this.ySizeNumber);
            x += this.xSizeNumber * 1.1;
        }
    }

    drawShipState(context, x, y, current, max, color){
        var numberOfChunks = Math.ceil(current / max * 30);

        for(var i = 0; i < numberOfChunks; i++)
            context.drawImage(color, x + i * this.xSizeChunk, y, this.xSizeChunk, this.ySizeChunk);
    }

    drawCoolDowns(context){
        //primary weapons
        for(var i = 0; i < this.playerShip.primaryFrames.length; i++){
            if(this.playerShip.primaryFrames[i].item != 0){
                context.drawImage(this.playerShip.primaryFrames[i].item.texture, (940 + i * 75) / 1920 * screen.width, 935 / 1080 * screen.height, 50, 50);
                var percentualCoolDown = this.playerShip.primaryFrames[i].item.cooldownTimer / this.playerShip.primaryFrames[i].item.cooldown * 50;
                if(!percentualCoolDown)
                    percentualCoolDown = 50;
                context.beginPath();
                context.fillStyle = "rgba(255, 0, 0, 0.5)";
                context.fillRect((940 + i * 75) / 1920 * screen.width, (935 + percentualCoolDown) / 1080 * screen.height, 50, 50 - percentualCoolDown);
                context.stroke();
            }
        }

        for(var i = 0; i < this.playerShip.secondaryFrames.length; i++){
            if(this.playerShip.secondaryFrames[i].item != 0){
                context.drawImage(this.playerShip.secondaryFrames[i].item.texture, (940 + i * 75) / 1920 * screen.width, 1007 / 1080 * screen.height, 50, 50);
                var percentualCoolDown = this.playerShip.secondaryFrames[i].item.cooldownTimer / this.playerShip.secondaryFrames[i].item.cooldown * 50;
                if(!percentualCoolDown)
                    percentualCoolDown = 50;
                context.beginPath();
                context.fillStyle = "rgba(255, 0, 0, 0.5)";
                context.fillRect((940 + i * 75) / 1920 * screen.width, (1007 + percentualCoolDown) / 1080 * screen.height, 50, 50 - percentualCoolDown);
                context.stroke();
            }
                
        }
    }

    draw(context){
        context.drawImage(this.texture, 0, screen.height * 0.85, screen.width, screen.height * 0.15);

        //sulfum
        this.drawMaterial(context, screen.width * 0.051, 947 / 1080 * screen.height, this.sulfum, this.sulfum, this.numbersYellow);
        //titanium
        this.drawMaterial(context, screen.width * 0.051, 1019 / 1080 * screen.height, this.titanium, this.titanium, this.numbersPurple);
        //ice
        this.drawMaterial(context, 380 / 1920 * screen.width, 947 / 1080 * screen.height, this.ice, this.ice, this.numbersBlue);
        //algae
        this.drawMaterial(context, 380 / 1920 * screen.width, 1019 / 1080 * screen.height, this.algae, this.algae, this.numbersGreen);
        
        //enemies
        this.drawMaterial(context, 660 / 1920 * screen.width, 983 / 1080 * screen.height, this.enemiesLeft, this.enemiesLeft, this.numbersRed);

        //ship state
        this.drawShipState(context, 1583 / 1920 * screen.width, screen.height * 0.8704, this.health, this.playerShip.maxHealth, this.chunkOrange);
        //shield state
        this.drawShipState(context, 1583 / 1920 * screen.width, screen.height * 0.9370, this.shield, this.playerShip.maxShield, this.chunkBlue);

        //weapon cooldowns
        this.drawCoolDowns(context);
    }

    change(controller, model){
        this.sulfum = model.player.sulfum;
        this.titanium = model.player.titanium;
        this.ice = model.player.ice;
        this.algae = model.player.algae;
        this.enemiesLeft = model.objects_3.length;

        this.playerShip = this.player.playerShip[this.player.activePlayerShip];
        this.health = this.playerShip.health;
        this.shield = this.playerShip.shield;

    }
}