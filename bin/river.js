#!/usr/bin/env node

var command = {}
  , fs = require('fs');

command.help = function(){
  console.log([
    "",
    "welcome to use riverjs build tool",
    "How to use ?",
    "riverjs [project path]",
    ""
  ].join('\n'));
};

function begin(path) {
  if(!path) return command.help();

  fs.readdir(path,function(err,value){
    console.log(value);
  });
  fs.ReadStream(path,function(err,value){
    console.log(value);
  });
}

begin(process.argv[2]);
