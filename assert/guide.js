define('river.grammer.datetime',function(exports,require,module){
  //notic the namespace river.grammer, here is a typo, not grammar
  exports = module.exports = datetime;

  function datetime(str,scope,element){
    //str is the value of your custom attribute 
    //here we use it as parameters for searching data in scope
    var key = str;
    element.innerHTML = (new Date(scope[key])).toLocaleString();
  }
})


define('datetime.ctrl',function(exports,require,module){
  exports.time = '2014-03-18T07:19:20.047Z';
})
