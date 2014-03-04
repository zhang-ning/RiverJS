exports = module.exports = function(str,scope,element){

  var eom = this.eom;
  window.onhashchange = function(){
    navigate();
  }

  function navigate(){
    var menu = window.location.hash.replace(/\#\//,'') || 'all';
    var domlist = element.querySelectorAll('#filters a');
    clear(domlist);
    logic[menu].call(domlist,scope.todos,eom.todos);
  }

  function clear(domlist){
    for (var i = 0, len = domlist.length; i < len; i++) {
      domlist[i].className = '';
    }
  }

  var logic = {};

  logic.all = function(todos,eom){
    this[0].className = 'selected';
    for (var i = 0, len = todos.length; i < len; i++) {
      eom[i].repeat.style.display = "block";
    }
  }

  logic.active = function(todos,eom){
    this[1].className = 'selected';
    for (var i = 0, len = todos.length; i < len; i++) {
      if(todos[i].status == "active"){
        eom[i].repeat.style.display = "block";
      }else{
        eom[i].repeat.style.display = "none";
      }
    }
  }

  logic.completed = function(todos,eom){
    this[2].className = 'selected';
    for (var i = 0, len = todos.length; i < len; i++) {
      if(todos[i].status == "completed"){
        eom[i].repeat.style.display = "block";
      }else{
        eom[i].repeat.style.display = "none";
      }
    }
  }

  navigate();
}
