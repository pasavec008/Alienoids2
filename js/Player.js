class Player{
    activePlayerShip = 0;
    playerShip = [new PlayerShip(0)];
    storageFrames = [];
    sulfum = 2500;
    titanium = 500;
    ice = 0;
    algae = 0;

    frameConstantX = screen.width / 1920 * 1345;
    frameConstantChangeX = screen.width / 1920 * 110;
    frameConstantY = screen.width / 1920 * 195;
    frameConstantChangeY = screen.width / 1920 * 110;

    constructor(){
        for(var i = 0; i < 5; i++){
            for(var j = 0; j < 4; j++){
                this.storageFrames.push(new Frame(this.frameConstantX + j * this.frameConstantChangeX, this.frameConstantY + i * this.frameConstantChangeY, 6, 0));
            }
        }
    }
}