exports = module.exports = function(str,scope,element){

  var checkbox = element.querySelector('[type=checkbox]');

  var sta = {
    active:function(){
      element.className = '';
      checkbox.checked  = false;
    },
    completed:function(){
      element.className = 'completed';
      checkbox.checked  = true;
    }
  }
  sta[scope.todo.status]();

  //db click on li show input.edit
  element.ondblclick = function(event){
    var t = this.className;
    this.className = t + ' editing';
    element.querySelector('.edit').focus();
  }

  //blur on input.edit change back to read view
  var editinput = element.querySelector('.edit');
  editinput.addEventListener('blur',function(){
    var t = element.className;
    element.className = t.replace(/\sediting/,'');
  })
}
