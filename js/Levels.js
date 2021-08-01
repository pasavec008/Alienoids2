class Levels{
    
    constructor(){
    }

    init(model){
        model.changeModeCounter = 0;
        model.playerShip = model.player.playerShip[model.player.activePlayerShip];
        model.objects_2 = [];
        model.objects_3 = [];
        model.objects_4 = [];
        

        model.player.playerShip[model.player.activePlayerShip].x = 1920 / 2 - model.player.playerShip[model.player.activePlayerShip].xSize / 2;
        model.player.playerShip[model.player.activePlayerShip].y = 1080 * 0.85 / 2 - model.player.playerShip[model.player.activePlayerShip].ySize / 2;

        model.player.playerShip[model.player.activePlayerShip].health = model.player.playerShip[model.player.activePlayerShip].maxHealth;
        model.player.playerShip[model.player.activePlayerShip].shield = model.player.playerShip[model.player.activePlayerShip].maxShield;
        model.player.playerShip[model.player.activePlayerShip].dx = 0;
        model.player.playerShip[model.player.activePlayerShip].dy = 0;
        model.player.playerShip[model.player.activePlayerShip].rotation = 0;
    }

    create_level_1(model){
        this.init(model);
        
        model.music.src = "songs/Bear_McCreary_Something_dark_is_coming.mp3";
        model.music.loop = true;
        model.music.play();
        
        model.maxEnemies = 10;

        model.objects_2.push(new Wallpaper(1));
        model.objects_5.push(new Hud(model));

        for(var i = 0; i < 25; i++)
            model.objects_3.push(new Asteroid());
    }
}