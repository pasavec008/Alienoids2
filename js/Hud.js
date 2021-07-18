class Hud{
    texture = new Image();
    numbersYellow = new Image();
    numbersPurple = new Image();
    numbersBlue = new Image();
    numbersGreen = new Image();
    numbersRed = new Image();

    chunkOrange = new Image();
    chunkBlue = new Image();
    
    xSizeNumber = screen.width / 1920 * 40;
    ySizeNumber = screen.height / 1080 * 40;

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

        this.maxHealth = model.player.playerShip[model.player.activePlayerShip].maxHealth;
        this.maxShield = model.player.playerShip[model.player.activePlayerShip].maxShield;
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

    draw(context){
        context.drawImage(this.texture, 0, screen.height * 0.85, screen.width, screen.height * 0.15);

        //sulfum
        this.drawMaterial(context, screen.width * 0.051, screen.height * 0.870, this.sulfum, this.sulfum, this.numbersYellow);
        //titanium
        this.drawMaterial(context, screen.width * 0.051, screen.height * 0.935, this.titanium, this.titanium, this.numbersPurple);
        //ice
        this.drawMaterial(context, screen.width * 0.275, screen.height * 0.870, this.ice, this.ice, this.numbersBlue);
        //algae
        this.drawMaterial(context, screen.width * 0.275, screen.height * 0.935, this.algae, this.algae, this.numbersGreen);
        
        //enemies
        this.drawMaterial(context, screen.width * 0.499, screen.height * 0.9025, this.enemiesLeft, this.enemiesLeft, this.numbersRed);

        //ship state
        this.drawShipState(context, screen.width * 0.7203, screen.height * 0.8704, this.health, this.maxHealth, this.chunkOrange);
        //shield state
        this.drawShipState(context, screen.width * 0.7203, screen.height * 0.9370, this.shield, this.maxShield, this.chunkBlue);
    }

    change(controller, model){
        this.sulfum = model.player.sulfum;
        this.titanium = model.player.titanium;
        this.ice = model.player.ice;
        this.algae = model.player.algae;
        this.enemiesLeft = model.objects_3.length;

        this.health = model.player.playerShip[model.player.activePlayerShip].health;
        this.shield = model.player.playerShip[model.player.activePlayerShip].shield;
    }
}