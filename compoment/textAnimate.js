'use strict';

(function(r,win){

	r.compoment('textAnimate',function(){

		var target = this[0];
		var data = [];

		this.forEach(function(v,i){
			if(0 !== i){
				v.style('display','none');
			}
			data.push(v.text());
		});


		function _next(){
			if(!this.index || this.length === this.index){
				this.index = 0;
			}
			return this[this.index++];
		}

		

		function _animation(type){
			var en = ['ux','wiled','girl','boy','greate','programmer', 'developer','friends','UX','U.S.A','Japan','Korea','Britain','China'];
			var cn = ['用户体验','狂野','男孩','女孩','伟大','开发者','英国','程序员','朋友','美国','80`s 后'];
			var lang = {
				en : en,
				cn : cn
			};
			var times = 0;
			var deffer = getInstanceOf(Deffer);

			function loop(){
				target.text(_next.call(lang[type]));
				if(times <= (lang[type].length-1) ){
					setTimeout(function() {
						loop();
					}, 100);
					times++;
				}else{
					times = 0;
					deffer.resolve();
				}
			}
			loop(target);
			return deffer;
		}

		_next.call(data);

		function languare(obj){
			return /.*[\u4e00-\u9fa5]+.*$/.test(obj) ? 'cn' : 'en' 
		}

		var able = true;

		function query(){
			if(able){
				able = false;
				var txt = _next.call(data);
				_animation(languare(txt)).done(function(){
					target.text(txt);
					able = true;
				});
			}
		}
		//console.log(data);

		return {
			execute : query
		};

	});

})(River,window);