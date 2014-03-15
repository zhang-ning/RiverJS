---
layout: guide
title:  "module"
author: jonathan
permalink: guide/module.html
tag: guide
---


# Module

-----------

#### CMD

>After linking `river.js` in html,there are two Global functions will be occupied,
one is `define` the other is `main`.


`define` function is for registting modules and waiting for invoked.

{% highlight javascript linenos%}
//module A
define('module.A',function(exports,require,module){
  //exports module.A.sing Api
  exports.sing = function(song){
    console.log(song + 'is playing');
  }
});
{% endhighlight %}

{% highlight javascript linenos%}
//module B
define('module.B',function(exports,require,module){
  //get module.A
  var A = require('module.A');
  //call sing api
  A.sing('Heal the world');
});
{% endhighlight %}


`main` function is for registting a anonymous modules and will be executed immediately.
It's the entrance of your programme ,this is influenced by other language's `main keyword`.

> Most of time you don't need to use `main` function.you can simplly use `scope` markup in `html` insteadof it for executing modules.
as It's easy to bind dom and data together.

{% highlight javascript linenos%}
//this anonymous module will be executed immediately
main(function(exports,require,module){
  //run module.B
  require('module.B');
});
{% endhighlight %}

#### Pre-build process

* if you like writing javascript with [node](http://nodejs.org/) style,it's available in riverjs.  
For example,here is a simple `person.js` wrote like below :

{% highlight javascript linenos%}
//Module dependence
var a = require('a')
  , b = require('b');

//property
var name='peter';
exports.getName = function(){
  return name;
}
exports.setName = function(value){
  name = value;
}
{% endhighlight %}


* then use command `riverjs build .` we will get the below folder structure:

```
     .                  .
     └── person.js =>   ├── build
                        │   ├── app.js
                        │   ├── river.js
                        │   └── river.min.js
                        ├── person.js
                        └── river.json
```

* at last link them in html

{% highlight html%}
<script src="build/river.js">
<script src="build/app.js">
{% endhighlight %}

>riverjs build tool will recursion the target foler to merge `*.js` into `build/app.js`,
the module name is based on the folder structure you definded,for example if you have a module A with 5 level
folder structure `a/b/c/d/e/moduleA` , then you can `require('a.b.c.d.e.moduleA')` to call it in any modules.
another thing is that you can minify the `build/app.js` or add sourceMap support by changing `river.json` 

```
      {
        "version": "1.0.82",//current riverjs version
        "dist": "./build",  //default dist folder
        "alias": {
          "river.grammer": "grammar"
        },
        "sourcemap": false, //true, build with sourceMap
        "minify": false     //true, build with minified
      }
```



