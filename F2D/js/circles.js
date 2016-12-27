/*
il cerchio viene creato in un gruppo dentro al canvas
Il gruppo è stato creato... quando?
*/
function circle (x,y) {}

circle.prototype.x = 0;
circle.prototype.y = 0;
circle.prototype.radius = 1;
circle.prototype.numberOfCircles = -1;
circle.prototype.id_group = "group_"+this.numberOfGroups;
circle.prototype.group = {};
circle.prototype.object = {};
circle.prototype.numberOfGroups = 0;

circle.prototype.setGroup = function(i){
  this.numberOfGroups = i;
}

circle.prototype.add = function(x,y){
  this.numberOfCircles++;
  this.svg.getElementById(this.id_group).appendChild('<circle id="cirlce_'+this.numberOfCircles+'" cx="'+x+'" cy="'+y+'" r="1" stroke="black" stroke-width="1" fill="red" />');
}

circle.prototype.update = function(radius){
  
  this.svg.getElementById("cirle_"+this.numberOfCircles).setAttribute('r',radius);
};

circle.prototype.svg = document.getElementById('svgpaper');
circle.prototype.setCenter = function(new_x,new_y){
  this.x = new_x;
  this.y = new_y;
  this.draw();
} 
circle.prototype.setRay = 
