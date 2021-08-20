class View{
    context;

    constructor(context){
        this.context = context;
    }

    clearCanvas(){
        this.context.clearRect(0, 0, 1920, 1080);
    }

    drawEnemies(enemies, maxEnemies){
        if(enemies != undefined){
            for(var i = 0; i < maxEnemies && i < enemies.length; i++)
                enemies[i].draw(this.context);
            for(var i = 0; i < maxEnemies && i < enemies.length; i++)
                enemies[i].drawHealth(this.context);
        }
    }

    drawObject(objectToDraw){
        if(objectToDraw != undefined)
            objectToDraw.draw(this.context);
    }

    drawObjects(objects_to_draw){
        if(objects_to_draw != undefined)
            for(var i = 0; i < objects_to_draw.length; i++)
                objects_to_draw[i].draw(this.context);
    }

    viewLoop(mode, model){
        this.clearCanvas();
        
        //start of the game
        if(mode == 1){
            this.drawObject(model.menu);
        }

        //level
        else if(mode == 2){
            this.drawObject(model.wallpaper);
            this.drawEnemies(model.enemies, model.maxEnemies);
            this.drawObjects(model.loot);
            this.drawObjects(model.projectiles); 
            this.drawObject(model.player.playerShip[model.player.activePlayerShip]);
            this.drawObject(model.hud);
        }

        //shop
        else if(mode == 3){
            this.drawObject(model.shop);
        }

        else if(mode == 4){
            this.drawObject(model.levelChoice);
        }
    }
}