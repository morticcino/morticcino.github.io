/*
il cerchio viene creato in un gruppo dentro all'svg
Il gruppo è creato a partire dal broup id
*/
function circle(x,y){
  this.contructor: function(x,y){
    this.numberOfCircles++;
    this.svg.getElementById(this.id_group).appendChild('<circle id="cirlce_'+this.numberOfCircles+'" cx="'+x+'" cy="'+y+'" r="1" stroke="black" stroke-width="1" fill="red" />');
  },
  this.x: 0,
  this.y: 0,
  this.radius: 1,
  this.numberOfCircles: -1,
  this.numberOfGroups: 0,
  this.id_group: "group_"+this.numberOfGroups,
  this.group: {},
  this.object: {},

  this.setGroup: function(i){
    this.numberOfGroups = i;
  },

  this.add: function(x,y){
    this.numberOfCircles++;
    this.svg().getElementById(this.id_group).appendChild('<circle id="cirlce_'+this.numberOfCircles+'" cx="'+x+'" cy="'+y+'" r="'+radius+'" stroke="black" stroke-width="1" fill="red" />');
  },

  this.update: function(radius){
  
    this.svg().getElementById("cirle_"+this.numberOfCircles).setAttribute('r',radius);
  },

  this.svg: function(){ return document.getElementById('svgpaper');},
  this.setCenter: function(new_x,new_y){
    this.x = new_x;
    this.y = new_y;
    this.draw();
  },
  this.setRay: function(r){}

}
