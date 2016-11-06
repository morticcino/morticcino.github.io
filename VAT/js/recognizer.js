var F2D = {
  r: {},
  recognizer: function(segments){
    
    var points = [];
    var maxy, maxx, miny, minx = 0;
    for (var i = 0, prev, l = segments.length; i < l; i++) {
        var point = new Point(segments[i].point.x,segments[i].point.y);
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
    var matched = F2D.r.Recognize(points);
    console.log(matched);  
    switch(matched.Name){
      case "circle":
        return matched.Name+' '+maxx+' '+minx+' '+maxy+' '+miny;
        break;

    }
  }
}
F2D.r = new DollarRecognizer();
