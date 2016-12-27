/*
il cerchio viene creato in un gruppo dentro al canvas
*/
function circle (x,y) {}

circle.prototype.x = 0;
circle.prototype.y = 0;
circle.prototype.radius = 1;
circle.prototype.id = "";
circle.prototype.numberOfCircles = 0;
circle.prototype.id_group = 0;

circle.prototype.add = function(){

}

circle.prototype.draw = function(){
  
  this.svg.getElementById("group_"+this.id_group).add;
};

circle.prototype.svg = document.getElementById('svgpaper');
circle.prototype.setCenter = function(new_x,new_y){
  this.x = new_x;
  this.y = new_y;
  this.draw();
} 
circle.prototype.setRay = 
