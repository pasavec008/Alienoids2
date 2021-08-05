class LevelChoice{
    texture = new Image();
    focusedFrameID;
    player;
    shopButton = new Button(125, 852, 200, 100, "textures/levels/button2.png");
    startButton = new Button(1592, 852, 200, 100, "textures/levels/button.png");
    levelChoiceFrames = [];

    frameBaseX = 215;
    frameBaseY = 215;
    frameChange = 60;

    constructor(player, model){
        this.player = player;
        this.texture.src = "textures/levels/1.png";

        for(var i = 0; i < 10; i++){
            for(var j = 0; j < 20; j++){
                this.levelChoiceFrames.push(new LevelChoiceFrame(this.frameBaseX + j * this.frameChange, this.frameBaseY + i * this.frameChange, 50, 1 + j + i * 20));
            }
        }
    }

    init(model){
        if(this.focusedFrameID != undefined){
            this.levelChoiceFrames[this.focusedFrameID - 1].focus = -1;
        }
        this.focusedFrameID = model.player.maxLevel;
        this.levelChoiceFrames[this.focusedFrameID - 1].focus = 1;

        for(var i = 0; i < this.player.maxLevel; i++){
            this.levelChoiceFrames[i].unlocked = 1;
            if(i > 0)
                this.levelChoiceFrames[i - 1].done = 1;
        }
    }

    changeFocus(whichLevel){
        this.levelChoiceFrames[this.focusedFrameID - 1].focus = -1;
        this.focusedFrameID = whichLevel;
        this.levelChoiceFrames[this.focusedFrameID - 1].focus = 1;
    }

    change(controller, model){
        //frames
        for(var i = 0; i < this.levelChoiceFrames.length && i < this.player.maxLevel + 3; i++){
            this.levelChoiceFrames[i].change(controller, model, this);
        }

        //levels screen button
        if(this.focusedFrameID <= this.player.maxLevel){
            if(this.startButton.change(controller, model)){
                eval("model.levels.createLevel" + this.focusedFrameID + "(model);");
                model.mode = 2;
                canvas.style.cursor = "none";
            }
        }
        //shop button
        if(this.shopButton.change(controller, model)){
            model.mode = 3;
        }
    }

    draw(context){
        context.drawImage(this.texture, 0, 0, 1920, 1080);

        //frames
        for(var i = 0; i < this.levelChoiceFrames.length && i < this.player.maxLevel + 3; i++){
            this.levelChoiceFrames[i].draw(context);
        }

        //button
        if(this.focusedFrameID <= this.player.maxLevel){
            this.startButton.draw(context); 
        }

        //shopbutton
        this.shopButton.draw(context); 
    }

}