class SimpleShieldBattery extends Shield{
    itemID = "4_1";
    construction = "new SimpleShieldBattery();";
    price = [2000, 200, 0, 0];

    constructor(){
        super();
        this.texture.src = "textures/shop/items/4_1.png";
        this.toolTipTexture.src = "textures/shop/items/4_1TT.png";
    }

    enhance(ship){
        ship.maxShield += ship.shieldBaseUnit * 1;
        ship.shieldAbsorption += 0.5;
    }
}