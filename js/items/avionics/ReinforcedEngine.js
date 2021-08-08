class ReinforcedEngine extends Avionic{
    itemID = "3_3";
    construction = "new ReinforcedEngine();";
    price = [1500, 0, 0, 0];

    speed = 0.3;
    consumption = 0.8;

    constructor(){
        super();
        this.texture.src = "textures/shop/items/3_3.png";
        this.toolTipTexture.src = "textures/shop/items/3_3TT.png";
    }
}