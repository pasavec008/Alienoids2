class Model{
    view;
    mode = 1; // 1-menu 2-level 3-shop 4-levelChoice
    levels;
    player;
    playerShip;
    maxEnemies;
    changeModeCounter;

    menu;
    hud;
    enemies = []; //objects of enemies
    projectiles = []; //objects of ammo
    loot = [];
    shop;
    levelChoice;
    levelID;

    music = new Audio();

    constructor(context){
        this.view = new View(context);
        this.menu = new Menu();
        this.levels = new Levels();
        this.player = new Player();
        this.shop = new Shop(this.player);
        this.levelChoice = new LevelChoice(this.player, this.levels);
    }

    collision(object1, object2){
        var centre1X = object1.x + object1.xSize / 2;
        var centre1Y = object1.y + object1.ySize / 2;
        var centre2X = object2.x + object2.xSize / 2;
        var centre2Y = object2.y + object2.ySize / 2;

        var distance = Math.sqrt((centre1X - centre2X) * (centre1X - centre2X) + (centre1Y - centre2Y) * (centre1Y - centre2Y));
    
        if(distance <= object1.collisionSize / 2 + object2.collisionSize / 2)
            return 1;
        return 0;
    }

    modelLoop(controller){
        var oldMode = this.mode;

        //start of the game
        if(this.mode == 1){
            this.menu.change(controller, this);
        }

        //level
        else if(this.mode == 2){
            //win/lose conditions
            if(this.player.playerShip[this.player.activePlayerShip].health <= 0 || this.enemies.length == 0){
                this.changeModeCounter++;
                if(this.changeModeCounter > 180){
                    if(this.enemies.length == 0 && this.levelID + 1 > this.player.maxLevel){
                        this.player.maxLevel = this.levelID + 1;
                    }
                    this.changeModeCounter = 0;
                    this.mode = 3;
                    canvas.style.cursor = "crosshair";
                    return;
                }
                
            }

            //playership
            this.player.playerShip[this.player.activePlayerShip].change(controller, this);

            //enemies
            for(var i = 0; i < this.maxEnemies && i < this.enemies.length; i++){
                this.enemies[i].change(controller, this);
                if(this.enemies[i].health <= 0){
                    this.enemies[i].death(this);
                    this.enemies.splice(i, 1);
                    i--;
                }
            }

            //projectiles
            for(var i = 0; i < this.projectiles.length; i++){
                this.projectiles[i].change(controller, this);
                if(this.projectiles[i].health <= 0)
                    this.projectiles.splice(i, 1);
            }

            //loot
            for(var i = 0; i < this.loot.length; i++){
                this.loot[i].change(controller, this);
            }

            this.hud.change(controller, this);

            //ship collision
            if(this.player.playerShip[this.player.activePlayerShip].health > 0){
                for(var i = 0; i < this.maxEnemies && i < this.enemies.length; i++){
                    if(this.collision(this.player.playerShip[this.player.activePlayerShip], this.enemies[i])){
                        this.player.playerShip[this.player.activePlayerShip].takeDamage(this.enemies[i]);
                        this.enemies[i].takeDamage(this.player.playerShip[this.player.activePlayerShip]);
                    }
                }
            }
            

            //enemies3 + ammo4 collision
            for(var i = 0; i < this.maxEnemies && i < this.enemies.length; i++){
                for(var ii = 0; ii < this.projectiles.length; ii++){
                    if(this.collision(this.projectiles[ii], this.enemies[i])){
                        this.enemies[i].takeDamage(this.projectiles[ii]);
                        if(this.projectiles[ii].type == 1)
                            this.projectiles[ii].health = 0;
                    }
                }
            }

            //ship loot collision
            for(var i = 0; i < this.loot.length; i++){
                if(this.collision(this.player.playerShip[this.player.activePlayerShip], this.loot[i])){
                    this.loot[i].takeLoot(this.player);
                    this.loot.splice(i, 1);
                }
            }
        }

        //shop
        else if(this.mode == 3){
            this.shop.change(controller, this);
        }

        //levels choice
        else if(this.mode == 4){
            this.levelChoice.change(controller, this);
        }
         
        if(this.mode == oldMode)
            this.view.viewLoop(this.mode, this);
    }
}