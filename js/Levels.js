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

        model.wallpaper = new Wallpaper(1);
        

        for(var i = 0; i < 25; i++)
            model.enemies.push(new Asteroid());
        model.hud.enemiesLeft = model.enemies.length;
    }
}