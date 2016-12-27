/*
il cerchio viene creato in un gruppo dentro all'svg
Il gruppo è creato a partire dal broup id
*/
function circle (x,y) {}

circle.prototype = {
  contructor: function(x,y){
    this.numberOfCircles++;
    this.svg.getElementById(this.id_group).appendChild('<circle id="cirlce_'+this.numberOfCircles+'" cx="'+x+'" cy="'+y+'" r="1" stroke="black" stroke-width="1" fill="red" />');
  },
  x: 0,
  y: 0,
  radius: 1,
  numberOfCircles: -1,
  numberOfGroups: 0,
  id_group: "group_"+this.numberOfGroups,
  group: {},
  object: {},

  setGroup: function(i){
    this.numberOfGroups = i;
  },

  add: function(x,y){
    this.numberOfCircles++;
    this.svg.getElementById(this.id_group).appendChild('<circle id="cirlce_'+this.numberOfCircles+'" cx="'+x+'" cy="'+y+'" r="'+radius+'" stroke="black" stroke-width="1" fill="red" />');
  },

  update: function(radius){
  
    this.svg.getElementById("cirle_"+this.numberOfCircles).setAttribute('r',radius);
  },

  svg: function(){ return document.getElementById('svgpaper');},
  setCenter: function(new_x,new_y){
    this.x = new_x;
    this.y = new_y;
    this.draw();
  },
  setRay: function(r){}
}
