class CombinedBioEngine extends Avionic{
    itemID = "3_6";
    construction = "new CombinedBioEngine();";
    price = [10000, 0, 500, 1000];

    speed = 0.25;
    rotationSpeed = 0.3;
    consumption = -0.2;

    constructor(){
        super();
        this.texture.src = "textures/shop/items/3_6.png";
        this.toolTipTexture.src = "textures/shop/items/3_6TT.png";
    }
}