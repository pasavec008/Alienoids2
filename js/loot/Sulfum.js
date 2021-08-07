class Sulfum extends Loot{

    constructor(destroyedObject){
        super(destroyedObject);
        this.xSize += 10;
        this.ySize += 10;
        this.collisionSize = this.xSize * 1.1;
        this.texture.src = "textures/loot/sulfum.png";
        this.value = Math.floor(this.xSize * 8 / 10) * 10;
    }

    takeLoot(player){
        player.sulfum += this.value;
    }
}