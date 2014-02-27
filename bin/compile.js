/*
 * module dependence
 */
var $      = require('uglify-js')
  , has    = {}
  , hasNot = {};

exports.sourcemap = function(need){
  return need ? has : hasNot
}

has.parse = function(code){
  /*
  var ast = $.parse(code);
  var compressor = $.Compressor();
  ast.figure_out_scope();
  ast = ast.transform(compressor);
  return  ast.print_to_string();
  */
  return $.minify(code,{fromString: true}).code;
}

hasNot.parse = function(code,distname,root){
  var sourcemap = $.SourceMap({
    file:distname,
    root:root
  });
  var stream = $.OutputStream({ 
    beautify:true,
    source_map : sourcemap
  });
  var ast = $.parse(code);
  ast.print(stream);
  console.log(sourcemap.toString());
  return stream.toString() + '\n';
}
