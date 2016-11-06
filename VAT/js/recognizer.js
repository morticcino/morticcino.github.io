var F2D = {
  r: function(){ 
    return new DollarRecognizer()
  },
  recognizer: function(segments){
    
    var points = [];
    var maxy, maxx, miny, minx = 0;
    for (var i = 0, prev, l = segments.length; i < l; i++) {
        var point = {x: segments[i].point.x, y: segments[i].points.y};
        if(maxx < point.x)
          maxx = point.x;
        if(minx > point.x)
          minx = point.x;
      
        if(maxy < point.y)
          maxy = point.y;
        if(miny > point.y)
          miny = point.y;
        points.push(point);
    }
    var matched = r().Recognize(points);
    console.log(matched);  
    switch(matched.Name){
      case "circle":
        return matched.Name+' '+maxx+' '+minx+' '+maxy+' '+miny;
        break;

    }
  }
}
