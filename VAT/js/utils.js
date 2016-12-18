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
