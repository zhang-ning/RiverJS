---
layout: guide
title:  "template engine"
author: jonathan
permalink: guide/template-engine.html
tag: guide
---


# Template Engine

-----------

{% raw %}
riverjs use `{{ }}` as the exprssion symbol,and don't support `eval` caculation only solved 
variable and function executing according the nearest `scope`,for example when you try to do
this `{{ 1 + 2 }}` ,riverjs don't understand what you want to do.But when you try to do this
`<div scope="your.ctrl"> {{ name }} </div>` riverjs will got to the `your.ctrl` module to find 
the variable `name` and apply it to the current element text node.
{% endraw %}

>There are only 5 build-in markup commands you need know, they are `scope`,`repeat`,`jbind`,
`jclick`,`jon` ,and that's all. RiverJS encourage programmer use less buildin ,customized or extended markup 
commands when build app with riverjs. For example , when I wrote todoMVC example with riverjs, there are only 2 extended
markup commands,the html is clean,the source is easy for human to read. It's quite different with AngularJS or anyother data binding library have strong dependence
on markup commands(AngularJS call it directive).Too much mockup project will be a disaster for people maintaining,
as html is not programming.If you ever developed a project with many customized markup, you will fully understand
what I'm talking about. 


### Let's know `scope` and `repeat` first.

{% highlight html linenos%}
{% raw %}
<div class="col-md-4 well">
  <div scope="your.class.music">
    <p>{{ title }} </p>
    <ul>
      <li repeat="singer in singers">
      <span>{{singer.name}}</span> 
        <ul>
          <li repeat="song in singer.songs">
            <span>{{song.name}}</span>
            <a href="{{song.url}}">{{song.url}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
{% endraw %}
{% endhighlight %}
