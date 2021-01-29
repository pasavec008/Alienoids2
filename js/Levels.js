class Levels{
    
    constructor(){
    }

    create_level_1(model){
        model.music.src = "songs/Bear_McCreary_Something_dark_is_coming.mp3";
        model.music.loop = true;
        model.music.play();
        model.objects_2 = [];
        model.objects_3 = [];
        model.objects_4 = [];
        model.maxEnemies = 5;

        model.playerShip = new PlayerShip(1);
        model.objects_2.push(new Wallpaper(1));
        model.objects_5.push(new Hud(model));

        for(var i = 0; i < 25; i++)
            model.objects_3.push(new Asteroid());


    }
}