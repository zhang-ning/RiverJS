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

>There are 7 build-in markup commands(or we call it directive in AngularJS) in RiverJS, they are `scope`,`repeat`,`jbind`,
`jclick`,`jon`,`jchange`,'jcompile'. RiverJS encourage programmer use less markup commands when build app to reduce
complexit.



### Markup 

> `scope` and `repeat` can be nested

##### Nest repeat
{% raw %}
<div class="example">
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

{% highlight javascript linenos%}
define('your.class.music',function(exports,require,module){
  var myMusicfromDB = {
    title: 'Welcome to my Music zone',
    singers: [{
      name: 'Michael Jackson',
      songs:[{
        url:'http://some.mp3',
        name:'heal the world'
      },{
        url:'http://beatit.mp3',
        name:'black and white'
      }]
    }, {
      name: 'Avril Lavigne',
      songs:[{
        url:'http://some.mp3',
        name:'Smile'
      },{
        url:'http://some.mp3',
        name:'Girl friend'
      }]
    },{
      name: 'Lady Gaga',
      songs:[{
        url:'http://some.mp3',
        name:'Pock face'
      },{
        url:'http://some.mp3',
        name:'Bad romance'
      }]
    },{
      name: 'Rihanna',
      songs:[{
        url:'http://some.mp3',
        name:'umbrella'
      }]
    }]
  }
  return myMusicfromDB

  //or inject to exports
  //exports.myMusicfromDB = myMusicfromDB;

  //or inject to this
  //exports = module.exports = function(){
  //  this.myMusicfromDB = myMusicfromDB;
  //}
})
{% endhighlight %}

##### Nest scope

{% raw %}
<div scope="ctl.father" class="example">
  <p>Name: {{ name }}</p>
  <div scope ="ctl.son">
    <p>Name : {{ name }}</p> <!-- cover father's pro -->
    <p>Skill : {{ skill }}</p> 
    <p>Where : {{ where }}</p> <!-- inherit from father -->
  </div>
</div>
{% endraw %}


{% highlight html linenos%}
{% raw %}
<div scope="ctl.father">
  <p>Name: {{ name }}</p>
  <div scope ="ctl.son">
    <p>Name : {{ name }}</p> <!-- cover father's pro -->
    <p>Skill : {{ skill }}</p> 
    <p>Where : {{ where }}</p> <!-- inherit from father -->
  </div>
</div>
{% endraw %}
{% endhighlight %}

{% highlight javascript linenos%}
define('ctl.father',function(exports,require,module){
  return function(){
    this.name = "Peter";
    this.where = "China";
  };
});


define('ctl.son',function(){
  return function(){
    this.name = "Tomas";
    this.skill = "dance";
  };
});
{% endhighlight %}

