define('river.grammer.jcompile',function(){
  return function(){
    //jcompile should never be used when sub tag structutor contain any other grammer tag,cause it will be totally replace by innnerHTML.

    var element = this.node;
    var scope = this.scope;
    var reg = this.reg;

    var key = element.textContent.replace(reg,'');
    element.innerHTML = scope[key];
  };
});
