class StellarEngine extends Avionic{
    itemID = "3_7";
    construction = "new StellarEngine();";
    price = [15000, 0, 2000, 0];
    
    speed = 0.75;
    consumption = 3;

    constructor(){
        super();
        this.texture.src = "textures/shop/items/3_7.png";
        this.toolTipTexture.src = "textures/shop/items/3_7TT.png";
    }
}