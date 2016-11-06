var F2D = {
  r: {},
  recognizer: function(segments){
    
    var points = [];
    var maxy = maxx = segments[0].point.x, miny = minx = segments[0].point.y;
    for (var i = 0, prev, l = segments.length; i < l; i++) {
        var point = new Point(segments[i].point.x,segments[i].point.y);
        if(maxx < point.X)
          maxx = point.X;
        if(minx > point.X)
          minx = point.X;
      
        if(maxy < point.Y)
          maxy = point.Y;
        if(miny > point.Y)
          miny = point.Y;
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
