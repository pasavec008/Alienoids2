class Controller{
    //variables for mouse event
    mouse_x;
    mouse_y;
    keys;
    click;
    model;
    context;
    
    constructor(context){
        this.mouse_x = 0;
        this.mouse_y = 0;
        this.keys = [];
        this.click = 0;
        this.model = new Model(context);
        this.context = context;
    }

    mouseCheck(leftX, leftY, rightX, rightY){
        if(this.mouse_x > leftX && this.mouse_y > leftY && this.mouse_x < rightX && this.mouse_y < rightY && this.click == 1){
            this.click = 0;
            return 1;
        }
        else
            return 0;
    }

    mouseHoverCheck(leftX, leftY, rightX, rightY){
        if(this.mouse_x > leftX && this.mouse_y > leftY && this.mouse_x < rightX && this.mouse_y < rightY){
            var array = [this.mouse_x, this.mouse_y];
            return array;
        }
        else
            return 0;
    }

    setMouseCoordinates(event, click){
        this.mouse_x = event.offsetX;
        this.mouse_y = event.offsetY;
        if(click)
            this.click = 1;
    }
    
    setMouseUp(){
        this.click = 0;
    }

    setKeyDown(event){
        this.keys[event.keyCode] = true;
    }

    setKeyUp(event){
        this.keys[event.keyCode] = false;
    }
};