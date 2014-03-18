---
layout: api
title:  "jchange"
author: jonathan
permalink: api/jchange.html
tag: api.grammer
---

# jchange

>tag jchange `<slecte jchange="method"></select>` is for trigger a specific method of current
scope when user changed  the `select` element option.


# useage

as attribute


{% highlight html linenos%}
<select
  jchange="fn">
...
</select>
{% endhighlight %}

# arguments

> @fn

Example  


{% raw %}
<div scope="spec.jchange">
  <select jchange="changeCtrl">
    <option value="f">first</option>
    <option value="s">second</option>
  </select>
  <p>{{ msg }}</p>
</div>
{% endraw %}

{% highlight html linenos%}
{% raw %}
<div scope="spec.jchange">
  <select jchange="changeCtrl">
    <option value="f">first</option>
    <option value="s">second</option>
  </select>
  <p>{{ msg }}</p>
</div>
{% endraw %}
{% endhighlight %}

{% highlight javascript linenos%}
define('spec.jchange',function(exports,require,module){
  var me = exports;
  exports.changeCtrl = function(str){
    me.msg = str;
  }
});
{% endhighlight %}
