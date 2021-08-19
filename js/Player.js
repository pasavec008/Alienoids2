class Player{
    activePlayerShip = 0;
    playerShip = [new Falcon()];
    storageFrames = [];
    sulfum = 250000;
    titanium = 250000;
    ice = 250000;
    algae = 250000;
    maxLevel = 1;

    xSizeNumber = 25;
    ySizeNumber = 25;

    numbersYellow = new Image();
    numbersPurple = new Image();
    numbersBlue = new Image();
    numbersGreen = new Image();

    frameConstantX = 1345;
    frameConstantChangeX = 60;
    frameConstantY = 195;
    frameConstantChangeY = 60;

    constructor(){
        this.numbersYellow.src = "textures/hud/numbersYellow.png";
        this.numbersPurple.src = "textures/hud/numbersPurple.png";
        this.numbersBlue.src = "textures/hud/numbersBlue.png";
        this.numbersGreen.src = "textures/hud/numbersGreen.png";

        for(var i = 0; i < 8; i++){
            for(var j = 0; j < 7; j++){
                this.storageFrames.push(new Frame(this.frameConstantX + j * this.frameConstantChangeX, this.frameConstantY + i * this.frameConstantChangeY, 6, 0, 50));
            }
        }
    }

    drawMaterial(context, x, y, pom, color){
        var pom2 = pom;
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
}