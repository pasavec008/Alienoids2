class Wallpaper{
    texture = new Image();

    constructor(level){
        this.texture.src = "wallpapers/levels/" + level + ".jpg";
    }

    draw(context){
        context.drawImage(this.texture, 0, 0, 1920, 1080);
    }
    change(controller, model){

    }
}