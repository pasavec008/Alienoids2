class Menu{
    texture = new Image();

    constructor(){
        this.texture.src = "wallpapers/1.jpg";
    }

    change(controller, model){
        if(controller.mouseCheck(0, 0, 1920, 1080)){
            document.body.requestFullscreen();
            model.levels.createLevel1(model);
            model.mode = 2;
            canvas.style.cursor = "none";
        }   
    }

    draw(context){
        context.drawImage(this.texture, 0, 0, 1920, 1080);
    }
}