class Hud{
    texture = new Image();
    numbers = new Image();
    xSizeNumber = screen.width / 1920 * 34;
    ySizeNumber = screen.height / 1080 * 40;
    money = 0;
    timer = 0; //once a second will update money count

    constructor(){
        this.texture.src = "textures/hud/hud1.png";
        this.numbers.src = "textures/numbers.png";
    }

    draw_money(context, x, y){
        var pom = this.money;
        var pom2 = this.money;
        var numberOfNumbers = 1;


        //how many numbers
        while(Math.floor(pom / 10) != 0){
            numberOfNumbers++;
            pom = Math.floor(pom / 10);
        }


        for(var i = 1; i <= numberOfNumbers; i++){
            pom = Math.floor(pom2 / Math.pow(10, numberOfNumbers - i));
            pom2 = Math.floor(pom2 % Math.pow(10, numberOfNumbers - i));


            context.drawImage(this.numbers, pom * 17, 0, 17, 20, x, y, this.xSizeNumber, this.ySizeNumber);
            x += this.xSizeNumber * 1.1;
        }

    }

    draw(context){
        context.drawImage(this.texture, 0, screen.height * 0.85, screen.width, screen.height * 0.15);

        this.draw_money(context, screen.width * 0.09, screen.height * 0.91);
    }

    change(controller, model){
        this.timer++;
        if(this.timer > 59){
            this.money = model.player.money;
            this.timer = 0;
        } 
        
        
    }
}