class CombatEngine extends Avionic{
    itemID = "3_5";
    construction = "new CombatEngine();";
    price = [10000, 0, 250, 0];

    speed = 0.25;
    rotationSpeed = 0.25;
    consumption = 1.5;

    constructor(){
        super();
        this.texture.src = "textures/shop/items/3_5.png";
        this.toolTipTexture.src = "textures/shop/items/3_5TT.png";
    }
}