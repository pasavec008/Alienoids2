class SimpleShieldBattery extends Shield{
    itemID = "4_1";
    construction = "new SimpleShieldBattery();";
    price = [2000, 200, 0, 0];

    shieldValue = 1;
    shieldAbsorption = 0.5;
    shieldRegenTime = 500;

    constructor(){
        super();
        this.texture.src = "textures/shop/items/4_1.png";
        this.toolTipTexture.src = "textures/shop/items/4_1TT.png";
    }
}