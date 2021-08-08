class DualCoreBattery extends Shield{
    itemID = "4_2";
    construction = "new DualCoreBattery();";
    price = [5000, 600, 0, 0];

    shieldValue = 1.5;
    shieldAbsorption = 0.7;
    shieldRegenTime = 750;

    constructor(){
        super();
        this.texture.src = "textures/shop/items/4_2.png";
        this.toolTipTexture.src = "textures/shop/items/4_2TT.png";
    }
}