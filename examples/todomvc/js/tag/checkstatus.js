exports = module.exports = function(str,scope,element,repeatscope){

  var cbx = element.querySelector('[type=checkbox]');

  if(repeatscope.status === 'active'){
    element.className =  ''; 
    cbx.checked = false;
  }else{
    element.className =  'completed'; 
    cbx.checked = true;
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
    var menu = window.location.hash.replace(/\#\//,'') || 'all';
    logic[menu].call(element);
    scope.apply();
  }

  var logic = {
    all:all,
    active:active,
    completed:completed
  };

  function all(){}

  function active(){
    this.style.display = 'none';
  }

  function completed(){
    this.style.display = 'none';
  }
}
