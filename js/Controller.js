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

    mouseCheck(leftX, leftY, rightX, RightY){
        if(this.mouse_x > screen.width * leftX && this.mouse_y > screen.height * leftY &&
            this.mouse_x < screen.width * rightX && this.mouse_y < screen.height * RightY &&
            this.click == 1){
                this.click = 0;
                return 1;
            }
        else
            return 0;
    }

    setMouseCoordinates(event){
        this.mouse_x = event.offsetX;
        this.mouse_y = event.offsetY;
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
}