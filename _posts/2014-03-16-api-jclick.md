---
layout: api
title:  "jclick"
author: jonathan
permalink: api/jclick.html
tag: api.grammer
---

# jclick

>tag jclick `<div jclick="method"></div>` is for trigger a specific method in current
scope when user click on the element


# useage

as attribute


{% highlight html linenos%}
<ANY
  jclick="fn">
...
</ANY>
{% endhighlight %}

# arguments

> @fn

Example  


{% raw %}
<div scope="spec.jclick">
  <button jclick="clickCtrl">click me</button> 
  <p>{{ msg }}</p> 
</div>
{% endraw %}

{% highlight html linenos%}
{% raw %}
<div scope="spec.jclick">
  <button jclick="clickCtrl"></button> 
  <p>{{ msg }}</p> 
</div>
{% endraw %}
{% endhighlight %}

{% highlight javascript linenos%}
define('spec.jclick',function(exports,require,module){
  var me = exports;
  exports.clickCtrl = function(){
    if(me.msg === 'hello'){
      me.msg = 'world';
    }else{
      me.msg = 'hello';
    }
  }
});
{% endhighlight %}
