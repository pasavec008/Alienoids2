class ReinforcedRotationMechanism extends Avionic{
    itemID = "3_4";
    construction = "new ReinforcedRotationMechanism();";
    price = [7000, 0, 0, 0];

    rotationSpeed = 0.4;
    consumption = 0.5;

    constructor(){
        super();
        this.texture.src = "textures/shop/items/3_4.png";
        this.toolTipTexture.src = "textures/shop/items/3_4TT.png";
    }
}