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
}