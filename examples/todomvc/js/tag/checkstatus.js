exports = module.exports = function(str,scope,element,repeatscope){

  var cbx = element.querySelector('[type=checkbox]');

  var logic = {
    all:all,
    active:active,
    completed:completed
  };
  function all(status){
    if(status === 'active'){
      element.className =  ''; 
      cbx.checked = false;
    }else{
      element.className =  'completed'; 
      cbx.checked = true;
    }
  }
  function active(status){ 
    all(status);
    this.style.display = status == 'active' ? 'block' : 'none'; 
  }
  function completed(status){
    all(status);
    this.style.display = status == 'completed' ? 'block' : 'none'; 
  }

  function route(){
    var menu = window.location.hash.replace(/\#\//,'') || 'all';
    logic[menu].call(element,repeatscope.status);
  }

  cbx.onclick = function(event){
    if(repeatscope.status == 'active'){
      repeatscope.status = 'completed';
      element.className = 'completed';
      scope.activenum--;
      scope.completednum++;
    }else{
      repeatscope.status = 'active';
      element.className = 'active';
      scope.activenum++;
      scope.completednum--;
    }
    route();
    scope.apply();
  }

  route();


}