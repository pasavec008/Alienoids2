class Avionic extends Item{
        itemType = 4
        speed = 0;
        consumption = 1;
        rotationSpeed = 0;
    
        constructor(){
            super();
        }

        enhance(ship){
            ship.speed += ship.speedO * this.speed;
            ship.rotationSpeed += ship.rotationSpeedO * this.rotationSpeed;
            ship.consumption += ship.consumptionO * this.consumption;
        }
}