class Shield extends Item{
    itemType = 5
    shieldValue;
    shieldAbsorption;
    shieldRegenTime;

    constructor(){
        super();
    }

    enhance(ship){
        ship.maxShield += ship.shieldBaseUnit * this.shieldValue;
        ship.shieldAbsorption += this.shieldAbsorption;
        ship.shieldRegenTime += this.shieldRegenTime;
    }
}