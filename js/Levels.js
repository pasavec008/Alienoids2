class Levels{
    
    constructor(){
    }

    create_level_1(model){
        model.objects_2 = [];
        model.objects_3 = [];
        model.objects_4 = [];
        model.maxEnemies = 1000;

        model.playerShip = new PlayerShip(1);
        model.objects_2.push(new Wallpaper(1));
        model.objects_5.push(new Hud());

        for(var i = 0; i < 20; i++)
            model.objects_3.push(new Asteroid());


    }
}