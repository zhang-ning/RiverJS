define('ctl.father',function(){
  return function(){
    this.name = "Peter";
    this.where = "China";
  };
});


define('ctl.son',function(){
  return function(){
    this.name = "Tomas";
    this.skill = "dance";
  };
});
