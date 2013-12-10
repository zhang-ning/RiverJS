define('river.grammer.ele-example',function(){
  return function(str){
    //this.node is the current dom reference
    //this.scope is the current scope reference
    //str is the data you marked in html 
    this.node.textContent = str;
  };
});
