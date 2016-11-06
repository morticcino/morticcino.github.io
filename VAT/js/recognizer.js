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
        var center = {'x':minx+(maxx-minx)/2,'y':miny+(maxy-miny)/2};
        var r = 0;
        if(maxx-minx > maxy-miny)
          r = (maxy-miny)/2;
        else
          r = (maxx-minx)/2;
        return {'name':matched.Name, 'center': center, 'r':r};
        break;

    }
  }
}
F2D.r = new DollarRecognizer();
