class View{
    context;

    constructor(context){
        this.context = context;
    }

    viewLoop(objects_to_draw, playerShip){
        this.context.clearRect(0, 0, screen.width, screen.height);

        for(var i = 0; i < objects_to_draw.length; i++){
            objects_to_draw[i].draw(this.context);
        }

        if(playerShip != undefined)
            playerShip.draw(this.context);
    }
}