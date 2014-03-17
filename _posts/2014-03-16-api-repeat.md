---
layout: api
title:  "repeat"
author: jonathan
permalink: api/repeat.html
tag: api.grammer
---

# repeat

>tag repeat `<div repeat="user in users"></div>` is used to iterate
item of array to view , and each dom iterm create by `repeat` will auto create a sub scope for current data.


#Usage
as attribute:


{% highlight html linenos%}
<ANY
  repeat="user in users">
...
</ANY>
{% endhighlight %}


#Arguments

>@expression xx in yy

Example

[JSFiddle](http://jsfiddle.net/zhning/XLVD3/)

{% raw %}
<div scope="spec.repeat" class="example">
  <ul>
    <li repeat="lib in frameworks" class="lib"> <span>{{ lib.name }}</span>
      <ul>
        <li repeat="user in lib.users" class="user"> <span>{{ user.comp }}</span>
          <ol>
            <li repeat="ep in user.emp">{{ep.name}}</li>
          </ol>
        </li>
      </ul>
    </li>
  </ul>
</div>
{% endraw %}

{% highlight html linenos%}
{% raw %}
<div scope="spec.repeat">
  <ul>
    <li repeat="lib in frameworks" class="lib"> <span>{{ lib.name }}</span>
      <ul>
        <li repeat="user in lib.users" class="user"> <span>{{ user.comp }}</span>
          <ol>
            <li repeat="ep in user.emp">{{ep.name}}</li>
          </ol>
        </li>
      </ul>
    </li>
  </ul>
</div>
{% endraw %}
{% endhighlight %}


{% highlight javascript linenos%}
define('spec.repeat', function (exports,require,module) {
  exports = module.exports = function () {
    var m = {
      frameworks: [{
        name: "jquery",
        users: [{
          comp: "compA",
          emp: [{
            name: "a"
          }, {
            name: "b"
          }]
        }]
      }, {
        name: "angularj",
        users: [{
          comp: "compB",
          emp:
            [{
            name:
              "c"
          },
          {
            name:
              "d"
          }]
        }]
      }]
    };
    this.inject(m);
  };
});
{% endhighlight %}
