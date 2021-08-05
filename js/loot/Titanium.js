class Titanium extends Loot{

    constructor(destroyedObject){
        super(destroyedObject);
        this.xSize += 10;
        this.ySize += 10;
        this.collisionSize = this.xSize * 1.1;
        this.texture.src = "textures/loot/titanium.png";
        this.value = Math.floor(this.xSize * 5 / 20) * 10;
    }

    takeLoot(player){
        player.titanium += this.value;
    }
}