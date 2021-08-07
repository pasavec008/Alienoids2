class RotationMechanism extends Avionic{
    itemID = "3_2";
    construction = "new RotationMechanism();";
    price = [2000, 0, 0, 0];

    constructor(){
        super();
        this.texture.src = "textures/shop/items/3_2.png";
        this.toolTipTexture.src = "textures/shop/items/3_2TT.png";
    }

    enhance(ship){
        ship.rotationSpeed *= 1.2;
        ship.consumption *= 1.15;
    }
}