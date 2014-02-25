
var cwd = process.cwd()
  , dir = __dirname
  , fs = require('fs')
  , path = require('path')
  , config = path.join(cwd,'/river.json')
  , app = path.basename(process.argv[3]);


exports.get = function (){
  return fs.existsSync(config) ? read() : write()
}  


function read(){
  return JSON.parse(fs.readFileSync(config,'utf8'));
}


function write(){
  var defaultConfig = {
    dist : app + '/build',
    alias : {
      'river.grammer' : app+'.grammar' 
    }
  };
  fs.writeFile(config,JSON.stringify(defaultConfig,null," "),function(err){
    if(err) throw err;
  });
  return defaultConfig;
}
