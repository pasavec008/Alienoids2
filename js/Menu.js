class Menu{
    texture = new Image();

    constructor(){
        this.texture.src = "wallpapers/1.jpg";
    }

    change(controller, model){
        if(controller.mouseCheck(0.4312, 0.5925, 0.5682, 0.6842)){
            canvas.requestFullscreen();
            model.levels.create_level_1(model);
            model.mode = 2;
        }
            
    }

    draw(context){
        context.drawImage(this.texture, 0, 0, screen.width, screen.height);
    }
}