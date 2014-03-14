---
layout: default
title: RiverJS CMD Two-way binding
---

<div class="row">
{% highlight html linenos%}
{% raw %}
<div scope>
  <label for="">name:</label>
  <input type="text" class="form-control" jbind="name">
  <hr>
  <p>Hello {{ name }} !</p>
  <p>the {{ name }} ?</p>
  <p>world {{ name }} !</p>
  <p>and {{ name }} .</p>
</div>
{% endraw %}
{% endhighlight %}
<span class="symble">=></span>
{% raw %}
<div class="example" scope>
  <label for="">name:</label>
  <input type="text" class="form-control" jbind="name" placeholder="Enter name here">
  <hr>
  <p>Hello  {{ name }}!</p>
  <p>the {{ name }} ?</p>
  <p>world {{ name }} !</p>
  <p>and {{ name }} .</p>
</div>
{% endraw %}
</div>

<div class="row">
<div class="group">
{% highlight html linenos%}
{% raw %}
<div scope="your.firstpage.controller">
  <p>{{ name }} </p>
  <button jclick="changeName()">change the name</button>
</div>
{% endraw %}
{% endhighlight %}
<span class="symble v">+</span>
{% highlight javascript linenos%}
//@sourcefile: your/firstpage/controller.js
exports.name = 'Jonathan';
exports.changeName = function(){
  if('Jonathan' === exports.name){
    exports.name = 'River';
  }else{
    exports.name = 'Jonathan';
  }
}
/*or
exports = module.exports = function(){
  var scope = this;
  scope.name = "Jonathan"

  scope.changeName = function(){
    if('Jonathan' === scope.name){
      scope.name = 'River';
    }else{
      scope.name = 'Jonathan'
    }
  }
}
*/
{% endhighlight %}
</div><span class="symble">=></span>
{% raw %}
<div scope="your.firstpage.controller" class="example">
  <p>{{ name }} </p>
  <button jclick="changeName()" class="btn">change the name</button>
</div>
{% endraw %}
</div>

