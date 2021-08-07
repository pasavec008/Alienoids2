class Levels{
    
    constructor(){
    }

    init(model){
        model.changeModeCounter = 0;
        model.playerShip = model.player.playerShip[model.player.activePlayerShip];
        model.wallpaper = undefined;
        model.hud = new Hud(model);
        model.enemies = [];
        model.projectiles = [];
        model.loot = [];

        model.player.playerShip[model.player.activePlayerShip].init();
    }

    createLevel1(model){
        this.init(model);
        
        model.levelID = 1;
        model.music.src = "songs/Bear_McCreary_Something_dark_is_coming.mp3";
        model.music.loop = true;
        model.music.play();
        
        model.maxEnemies = 2;

        model.wallpaper = new Wallpaper(1);
        

        for(var i = 0; i < 10; i++)
            model.enemies.push(new Asteroid());
        model.hud.enemiesLeft = model.enemies.length;
    }

    createLevel2(model){
        this.init(model);
        
        model.levelID = 2;
        model.music.src = "songs/Bear_McCreary_Something_dark_is_coming.mp3";
        model.music.loop = true;
        model.music.play();
        
        model.maxEnemies = 7;

        model.wallpaper = new Wallpaper(2);
        

        for(var i = 0; i < 15; i++)
            model.enemies.push(new Asteroid());
        model.hud.enemiesLeft = model.enemies.length;
    }

    createLevel3(model){
        this.init(model);
        
        model.levelID = 3;
        model.music.src = "songs/Bear_McCreary_Something_dark_is_coming.mp3";
        model.music.loop = true;
        model.music.play();
        
        model.maxEnemies = 15;

        model.wallpaper = new Wallpaper(2);
        

        for(var i = 0; i < 30; i++)
            model.enemies.push(new Asteroid());
        model.hud.enemiesLeft = model.enemies.length;
    }
}