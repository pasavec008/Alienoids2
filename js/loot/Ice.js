class Ice extends Loot{

    constructor(destroyedObject){
        super(destroyedObject);
        this.xSize += 10;
        this.ySize += 10;
        this.collisionSize = this.xSize * 1.1;
        this.texture.src = "textures/loot/ice.png";
        this.value = Math.floor(this.xSize * 5 / 30) * 10;
    }

    takeLoot(player){
        player.ice += this.value;
    }
}