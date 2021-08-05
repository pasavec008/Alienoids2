function main_loop(controller){
    controller.model.modelLoop(controller);
}

function main(){
//init
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

//change size of canvas for proper fullscreen
    canvas.width = 1920;
    canvas.height = 1080;

    var controller = new Controller(context);

//set event listeners
    window.onkeydown = function(event){
        controller.setKeyDown(event);
    }
    window.onkeyup = function(event){
        controller.setKeyUp(event);
    }
    window.onmousedown = function(event){
        controller.setMouseCoordinates(event, 1);
    }
    window.onmousemove = function(event){
        controller.setMouseCoordinates(event, 0);
    }
    window.onmouseup = function(){
        controller.setMouseUp();
    }

    setInterval(main_loop, 1000 / 60, controller);
}