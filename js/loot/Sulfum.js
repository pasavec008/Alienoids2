class Sulfum extends Loot{

    constructor(destroyedObject, x){
        super(destroyedObject);
        
        this.texture.src = "textures/loot/sulfum.png";
        if(typeof x == "number"){
            this.xSize = x / 10;
            this.ySize = this.xSize;
            this.collisionSize = this.xSize * 1.1;
            this.value = x;
        }
        else{
            this.xSize += 10;
            this.ySize += 10;
            this.collisionSize = this.xSize * 1.1;
            this.value = Math.floor(this.xSize * 8 / 10) * 10;
        }
            
    }

    takeLoot(player){
        player.sulfum += this.value;
    }
}