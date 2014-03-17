---
layout: api
title:  "jcompile"
author: jonathan
permalink: api/jcompile.html
tag: api.grammer
---

# jcompile

>tag jcompile `<div jcompile></div>` is used to compile msg into dom element

# usage
as attribute

{% highlight html linenos%}
<ANY
  jcompile>
...
</ANY>
{% endhighlight %}


# arguments

>null

example

>please try to input `<a>hello</a>` or `<h1>hello</h1>`

{% raw %}
<div scope>
  <input jbind="msg"/>
  <p jcompile>{{ msg }}</p>
</div>
{% endraw %}


{% highlight html linenos%}
{% raw %}
<div scope>
  <input jbind="msg"/>
  <p jcompile>{{ msg }}</p>
</div>
{% endraw %}
{% endhighlight %}
