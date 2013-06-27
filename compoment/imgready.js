'use strict';

(function(){

	Array.prototype.forEach.call(document.querySelectorAll('img'),function(v){
		//console.log([v]);
		(function(ele){
			var width = ele.width;
			var height = ele.height;

			function onready (){
				if(ele.width > 0 || ele.height > 0 ){

				}
			}
			onready = function(){
				console.log(ele.width);
				console.log(ele.height);
			}
		})(v)
	});
})();