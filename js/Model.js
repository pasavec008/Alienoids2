class Model{
    view;
    mode = 1;
    levels;
    player;
    playerShip;
    maxEnemies;
    objects_1 = []; //objects for main menu

    objects_2 = []; //objects for level, wallpaper and wallpaper effects
    objects_3 = []; //objects of enemies
    objects_4 = []; //objects of ammo
    objects_5 = []; //objects of hud and effects

    music = new Audio();

    constructor(context){
        this.view = new View(context);
        this.objects_1.push(new Menu());
        this.levels = new Levels();
        this.player = new Player();
    }

    collision(object1, object2){
        var centre1X = object1.x + object1.xSize / 2;
        var centre1Y = object1.y + object1.ySize / 2;
        var centre2X = object2.x + object2.xSize / 2;
        var centre2Y = object2.y + object2.ySize / 2;

        var distance = Math.sqrt((centre1X - centre2X) * (centre1X - centre2X) + (centre1Y - centre2Y) * (centre1Y - centre2Y));
    
        if (distance <= object1.collisionSize / 2 + object2.collisionSize / 2)
            return 1;
        return 0;
    }

    modelLoop(controller){
        if(this.mode == 1){
            for(var i = 0; i < this.objects_1.length; i++){
                this.objects_1[i].change(controller, this);
            }
            this.view.viewLoop(this.objects_1);
        }
        else if(this.mode == 2){
            if(this.playerShip.health <= 0 || this.objects_3.length == 0){
                this.mode = 1;
                return;
            }

            this.playerShip.change(controller, this);

            for(var i = 0; i < this.objects_2.length; i++){
                this.objects_2[i].change(controller, this);
            }

            for(var i = 0; i < this.maxEnemies && i < this.objects_3.length; i++){
                this.objects_3[i].change(controller, this);
                if(this.objects_3[i].health <= 0)
                    this.objects_3.splice(i, 1);
            }

            for(var i = 0; i < this.objects_4.length; i++){
                this.objects_4[i].change(controller, this);
                if(this.objects_4[i].health <= 0)
                    this.objects_4.splice(i, 1);
            }

            for(var i = 0; i < this.objects_5.length; i++){
                this.objects_5[i].change(controller, this);
            }

            for(var i = 0; i < this.maxEnemies && i < this.objects_3.length; i++){
                if(this.collision(this.playerShip, this.objects_3[i])){
                    this.playerShip.takeDamage(this.objects_3[i].collisionDamage);
                    this.objects_3[i].takeDamage(this.playerShip.collisionDamage);
                }
            }

            //enemies3 + ammo4 collision
            for(var i = 0; i < this.maxEnemies && i < this.objects_3.length; i++){
                for(var ii = 0; ii < this.objects_4.length; ii++){
                    if(this.collision(this.objects_4[ii], this.objects_3[i])){
                        this.objects_3[i].takeDamage(this.objects_4[ii].collisionDamage);
                        if(this.objects_4[ii].type == 1)
                            this.objects_4[ii].health = 0;
                    }
                }
            }

            this.view.viewLoop(this.objects_2, this.objects_3, this.objects_4, this.objects_5, this.playerShip, this.maxEnemies);
        }
            
    }
}