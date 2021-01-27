class View{
    context;

    constructor(context){
        this.context = context;
    }

    viewLoop(objects_to_draw_2, objects_to_draw_3, objects_to_draw_4, objects_to_draw_5, playerShip, maxEnemies){
        this.context.clearRect(0, 0, screen.width, screen.height);

        for(var i = 0; i < objects_to_draw_2.length; i++)
            objects_to_draw_2[i].draw(this.context);

        if(objects_to_draw_3 != undefined)
            for(var i = 0; i < maxEnemies && i < objects_to_draw_3.length; i++)
                objects_to_draw_3[i].draw(this.context);

        if(objects_to_draw_4 != undefined)
            for(var i = 0; i < objects_to_draw_4.length; i++)
               objects_to_draw_4[i].draw(this.context);

        if(objects_to_draw_5 != undefined)
            for(var i = 0; i < objects_to_draw_5.length; i++)
               objects_to_draw_5[i].draw(this.context);


        if(playerShip != undefined)
            playerShip.draw(this.context);
    }
}