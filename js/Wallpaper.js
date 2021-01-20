class Wallpaper{
    texture = new Image();

    constructor(level){
        this.texture.src = "wallpapers/levels/" + level + ".jpg";
    }

    draw(context){
        context.drawImage(this.texture, 0, 0, screen.width, screen.height);
    }
    change(controller, model){

    }
}