var item = {
    x: 0,
    y: 0,
    old_x: 0,
    old_y: 0,
    drawbool: false,
    selectable: false,
    startDrawLine: function(canvas,evt){
        item.old_x = evt.clientX - rect.left;
        item.old_y = evt.clientY - rect.top;
        item.drawbool = true;
        
    },
    continueDrawLine:  function(canvas,evt){
        item.x = evt.clientX - rect.left;
        item.y = evt.clientY - rect.top;
        if(item.drawbool){
          context.beginPath();
          context.moveTo(item.old_x, item.old_y);
          context.lineTo(item.x, item.y);
          context.stroke();
          item.old_x = item.x;
          item.old_y = item.y;
        }
        
    },
    stopDrawLine:  function(canvas,evt){
        item.drawbool = false;
        
    },
    isSelected: function(){}
};
