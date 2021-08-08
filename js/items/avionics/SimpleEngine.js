class SimpleEngine extends Avionic{
    itemID = "3_1";
    construction = "new SimpleEngine();";
    price = [1500, 0, 0, 0];

    speed = 0.1;
    consumption = 0.2;

    constructor(){
        super();
        this.texture.src = "textures/shop/items/3_1.png";
        this.toolTipTexture.src = "textures/shop/items/3_1TT.png";
    }
}