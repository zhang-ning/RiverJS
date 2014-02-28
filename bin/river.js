#!/usr/bin/env node

var command = {}
  , fs = require('fs')
  , $path = require('path')
  , es = require('riverjs-event-sequence')
  , serial = es.serial
  , parallel = es.parallel
  , package = require('../package')
  , exclude = /node_modules|build/
  , targetfile = /\.js\s*$/
  , rootPath
  , config = require('./config').get()
  , dist = config.dist
  , alias = config.alias
  , compile = require('./compile')
  , map = {};

command.help = function(){
  console.log([
    "",
    "welcome to use riverjs build tool",
    "riverjs version : " + package.version,
    "How to use ?",
    "Build ------------------ riverjs build [project path]",
    "Help ------------------- riverjs help",
    "Clean ------------------ riverjs clean [project path]",
    ""
  ].join('\n'));
};

command.clean = function () {
  clean(dist);
}

command.build = function (){
  begin(process.argv[3]);
}
var bin = command[process.argv[2]]
if(typeof bin === 'function'){
  bin.call(null);
}else{
  command.help();
}



function begin(path) {
  if(!path) return command.help();
  path = path.replace(/\/\s*$/,'');
  rootPath = path;
  clean(dist);
  buildFile(dist);

  //readPathSync(path);
  readPath(path).on('end',function(){
    var str="";
    if(config.sourcemap){ 
      fs.writeFile($path.join(dist,'app.map'),map.value); 
      str = "//# sourceMappingURL=app.map";
    }
    fs.writeFile($path.join(dist,'app.js'),map.data + str);
  });
}

function readPath(path){
  var me = this;
  var queue = me instanceof parallel ? me : new parallel();
  fs.stat(path,function(err,value){
    if(err) throw err;
    if(value.isFile()) queue.push(readFile,path);
    if(value.isDirectory()) queue.push(readDirectory,path);
    if(me instanceof parallel) queue.end();
  });
  return queue;
}



function readFile(path){
  var me = this;
  if(!targetfile.test(path)){ me.end(); return; }
  fs.readFile(path,'utf8',function(err,value){
    var namespace = path.replace(/^\.\/|\.js$/g,'').replace(/\//g,'.');
    var code = header(namespace)  + '\n' + value + '\n' + footer() + '\n';
    generateSourceMap(code,path);
    me.end();
  });
}

function readDirectory(path){
  var me = this;
  if(exclude.test(path)) {
    me.end();
    return;
  }
  fs.readdir(path,function(err,value){
    if(err) throw err;
    for (var i = 0, len = value.length; i < len; i++) {
      var childpath = $path.join(path,value[i]);
      me.push(readPath,childpath);
    }
    me.end();
  });
}

function clean(path){
  var stat; 
  try{
    stat = fs.statSync(path);
  }catch(err){
    return;
  }
  if(!stat) return;
  if(stat.isDirectory()){
    var subpath = fs.readdirSync(path);
    for (var i = 0, len = subpath.length; i < len; i++) {
      clean(path + '/' + subpath[i]);
    }
    fs.rmdir(path);
  }else if(stat.isFile()){
    fs.unlinkSync(path);
  }
}

function buildFile(path) {
  fs.mkdir(path,function(err){
    copyDist();
  });
}

function header(ns) {
  for(var x in alias){
    ns = ns.replace(alias[x],x);
  }
  return 'define("'+ ns +'",function(exports,require,module){';
}

function footer() {
  return '});';
}

function generateSourceMap(code,path) {
  if(config.minify){
    compile.minify(code,path,map); 
  }else{
    compile.parse(code,path,map); 
  }
}

/**
 * copy river.js river.min.js from dist folder
 * 
 */
function copyDist() {
  var src = ['river.js','river.min.js'];
  for (var i = 0, len = src.length; i < len; i++) {
    write(src[i]);
  }

  function write(name){
    fs.readFile($path.join(__dirname,'../dist',name),function(err,buf){
      fs.writeFile($path.join(dist,name),buf);
    });
  }
}


function readPathSync(path){
  var stat = fs.statSync(path);
  if(stat.isFile()) readFileSync(path);
  if(stat.isDirectory()) readDirectorySync(path);
}

function readFileSync(path){
  if(!targetfile.test(path)) return;
  var content = fs.readFileSync(path,'utf8');
  var namespace = path.replace(/^\.\/|\.js$/g,'').replace(/\//g,'.');
  var code = header(namespace)  + '\n' + content + '\n' + footer() + '\n';
  generateSourceMap(code,path);
}

function readDirectorySync(path){
  if(exclude.test(path)) return;
  var me = this;
  var value = fs.readdirSync(path);
  for (var i = 0, len = value.length; i < len; i++) {
    var childpath = path + '/' + value[i];
    readPathSync(childpath);
  }
}
