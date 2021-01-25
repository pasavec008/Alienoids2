class Model{
    view;
    mode = 1;
    levels;
    player;
    playerShip;
    objects_1 = []; //objects for main menu

    objects_2 = []; //objects for level, HUD, wallpaper
    objects_3 = []; //objects of enemies
    objects_4 = []; //objects of ammo

    constructor(context){
        this.view = new View(context);
        this.objects_1.push(new Menu());
        this.levels = new Levels();
        this.player = new Player();
    }

    modelLoop(controller){
        if(this.mode == 1){
            for(var i = 0; i < this.objects_1.length; i++){
                this.objects_1[i].change(controller, this);
            }
            this.view.viewLoop(this.objects_1);
        }
        else if(this.mode == 2){
            this.playerShip.change(controller, this);

            for(var i = 0; i < this.objects_2.length; i++){
                this.objects_2[i].change(controller, this);
            }

            this.view.viewLoop(this.objects_2, this.playerShip);
        }
            


        
    }
}