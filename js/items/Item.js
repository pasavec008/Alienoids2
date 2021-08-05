class Item{
    itemType;
    texture = new Image();
    toolTipTexture = new Image();

    drawToolTip(context, x, y){
        if(x + 370 > 1900)
            x -= 370;
        if(y + 470 > 1080)
            y -= 470;
        context.drawImage(this.toolTipTexture, x, y, 370, 470);
    }
}