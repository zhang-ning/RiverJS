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
