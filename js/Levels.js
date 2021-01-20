class Levels{
    constructor(){
    }

    create_level_1(model){
        model.objects_2 = [];
        model.objects_3 = [];
        model.objects_4 = [];

        model.playerShip = new PlayerShip(1);
        model.objects_2.push(new Wallpaper(1));
    }
}