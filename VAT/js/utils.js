function find_index(str){
      		var res = [];
      		var re = new RegExp(str+"(\\d+)","g")
      		if(document.getElementById('svgpaper')){
      			var match_results = document.getElementById('svgpaper').outerHTML.match(re)
	      		if(match_results){
	      			match_results.forEach(function(str){
		      			res.push(str.match(/(\d+)/g)[1]);
		      		});	
	      		}else{
	      			return '';
	      		}
      		}else{
      			return '';
      		}
      			
      		
      		
      		return res;
      		
      	}

function matrixTransform(event,x,y){
		var uupos = document.getElementById('svgpaper').createSVGPoint();
	        uupos.x = x;
	        uupos.y = y;
	        var ctm = event.target.getScreenCTM();
	        if (ctm = ctm.inverse())
	            uupos = uupos.matrixTransform(ctm);
		return uupos;
	}

function json_parse(str){
      	return JSON.parse(str);
      }


function m_value(x1,y1,x2,y2){
	return (y2-y1)/(x2-x1);
}
function y_value(m,x,q){
	return m*x+q;
}
function q_value(x1,y1,x2,y2){
	return -x1*((y2-y1)/(x2-x1))+y1;
}
function increaseLength(increment, x1, y1, x2, y2){
	var newx = x2 + increment/Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))*(x2-x1);
	var newy = y2 + increment/Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))*(y2-y1);
	return {'x':newx,'y':newy};	
}
function increaseLength2(increment, x1, y1, x2, y2){
	var newx = x2 + increment/Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))*(x1-x2);
	var newy = y2 + increment/Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))*(y1-y2);
	return {'x':newx,'y':newy};	
}
