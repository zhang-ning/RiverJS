---
layout: guide
title:  "scope"
author: jonathan
permalink: guide/scope.html
tag: guide
---


# scope

-----------


## Two-way binding

Most templating systems bind data in only one direction: they merge template and model components together into a view, but Two-way binding template really works in different way.It's clear to understand both of them through the below diagrams(The diagrams are from [angularjs.org](http://angularjs.org/),thanks :)).

![one-way-binding](http://docs.angularjs.org/img/One_Way_Data_Binding.png)
![two-way-binding](http://docs.angularjs.org/img/Two_Way_Data_Binding.png)


{% raw %}
<div my-time class="example" style="padding-top:20px">
    <span>Beijing :</span>
    <p>{{Beijing}}</p>
    <span>PaloAuto:</span>
    <p>{{PaloAuto}}</p>
</div>
{% endraw %}

{% highlight html linenos%}
{% raw %}
<div my-time class="example">
    <span>Beijing :</span>
    <p>{{Beijing}}</p>
    <span>PaloAuto:</span>
    <p>{{PaloAuto}}</p>
</div>
{% endraw %}
{% endhighlight %}

{% highlight javascript linenos%}
define('river.grammer.my-time', function(exports,require,module) {
  var $Date = require('river.core.Date');

  exports = module.exports = function(str,scope,element) {

    var timezone = {
      bj: '+8',
      pa: '-7'
    };

    function update() {
      var format = 'yyyy-MM-dd h:mm:ss';
      scope.Beijing = $Date.getDateByCity(timezone.bj).toString(format);
      scope.PaloAuto = $Date.getDateByCity(timezone.pa).toString(format);
      scope.apply();
    }

    var timeID = setInterval(function() {
      update();
    }, 1000);

    update();

    scope.stop = function() {
      clearInterval(timeID);
    };
  };
});
{% endhighlight %}

>Notic:call scope.apply() will make the changes affet.It's a very useful api,
expecially when you intergrate 3rd-party compoments into riverjs,for example jquery-ui ,etc.

### what's the Magic behind RiverJS

After using two-way binding framework like AngularJS(by google) or RiverJS(by Jonathan),or some lib else.Maybe you are interest in the mechanism behind it,such as how it works or how it makes？In AngularJS,there are many concepts need to learn,it 's a sharp weapon for front-end developing.And
RiverJS is very easy to use and it's very small,but it also contains powerful feature like a smart fish in big river.Let's have a look how the magic power works in RiverJS and AngularJS.

### what's RiverJS did when Startup

{% raw %}
At startup RiverJS one main job is to transform DOM to EOM via `river.grammer` system.The EOM Expression Object Model is a dom reference cache which is constructed by the map you marked in html via the `{{ expression }}`.And then RiverjS use the internal Model object to bind scope and view togather,it's
like a bridge for syncing data when any changes happed at each view side and scope side.AngularJS worked as right diagram.
{% endraw %}

![riverjs](https://dl.dropboxusercontent.com/u/236290402/riverjs/riverjs-startup.svg)
![angularjs](http://docs.angularjs.org/img/guide/concepts-startup.png)


### How Riverjs works at Runtime


Riverjs use native Dom event ,network event or developer customize event to response changing.There is no infinity data loop check.The simple life circle is still driven by event.Once the `scope.apply` is called,RiverJS `compare system` will be wake up,and then it will deside whether to sync data or
sync to which side.The right diagram is the AngularJS's work way.

![riverjs](https://dl.dropboxusercontent.com/u/236290402/riverjs/riverjs-runtime.svg)
![AngularJS](http://docs.angularjs.org/img/guide/concepts-runtime.png)
