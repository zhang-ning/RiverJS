---
layout: guide
title:  "get start"
author: jonathan
permalink: guide/getstart.html
tag: guide
---


# Get Start from MVVM pattern

### Controller

controller is response for mainpulating data ,like CRUD operations ,etc.
>riverjs is a data binding front-end library,data binding means the the `dom` and `scope` of module are merged
together.In mvc or mvvm pattern , we call this module as `controller`. for example the module `a` and dom `#wrapper`.

{% highlight javascript%}
define('a',function(exports,require,module){
  //the module inner scope

  exports.name = 'a';
  exports.status = 'finished';

})
{% endhighlight %}

### View Interface 

{% raw %}
html and css is response for configing user interface, the template language expression `{{ }}` will help to attach the 
correspond data to correct position of the view.
{% endraw %}

>the `#wrapper` dom element is bound to the module `a`,the `scope` attribute tells the target
module and bound range.

{% highlight html%}
{% raw %}
<div scope="a" id="wrapper" myview> 
  <p>{{ name }}</p>
</div>
{% endraw %}
{% endhighlight %}


### View controller

It's a custom html attributes , response for rendering view with the correspond `scope`,and handl dom event,animation.

>in riverjs , all view-controller modules must exports a function and regiest under `river.grammer` namespace
for example , `river.grammer.myview`


{% highlight javascript%}
define('river.grammer.myview',function(exports,require,module){

  exports = module.exports = myview;

  function myview(str,scope,element){
    //str is the attribute's  value
    //scope is the correspond data controler scope
    //element is the marked dom reference 
  }
})
{% endhighlight %}


### A Quick Example

[JSFiddle](http://jsfiddle.net/zhning/a7eD7/1/);


{% raw %}
<div class="example">
  <div scope="a" myview="5" >
    <p>Module Name : {{ name }}</p>
    <p>PV Click : <strong> {{ pv }} </strong></p>
    <button jclick="add">add</button>
    <button jclick="reset">reset</button>
  </div>
</div>
{% endraw %}

Controller
{% highlight javascript%}
define('a', function (exports, require, module) {
    exports.name = 'a';
    exports.pv = 0;
    exports.add = function () {
      exports.pv++;
    }
    exports.reset = function () {
      exports.pv=0;
    }
});
{% endhighlight %}

View 

{% highlight html%}
{% raw %}
<div scope="a" myview="5">
  <p>Module Name : {{ name }}</p>
  <p>PV Click : <strong> {{ pv }} </strong></p>
  <button jclick="add">add</button>
  <button jclick="reset">reset</button>
</div>
{% endraw %}
{% endhighlight %}

{% highlight javascript%}
define('river.grammer.myview', function (exports, require, module) {
    exports = module.exports = myview;

    function myview(max, scope, element) {
      scope.onchange('pv', function (newvalue) {
        var warning = Number(newvalue) >= Number(max);
        render(element,warning)
      })
    }

    function render(element,warning) {
      var p = element.querySelector('strong')
      p.className = warning ? 'warning' : '';
    }
})
{% endhighlight %}

Css
{% highlight css%}
.warning{
  color : red;
  font-size:1.2em;
}
{% endhighlight %}
