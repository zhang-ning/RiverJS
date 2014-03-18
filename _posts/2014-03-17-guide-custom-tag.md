---
layout: guide
title:  "custom tag"
author: jonathan
permalink: guide/custom-tag.html
tag: guide
---


# Custom Tag

-------------------------

custome tag's concept is same with directive in Angular in essence,but the difference is that riverjs tag 
can olny be `attributes` of element and the declaration of tag must under `river.grammer` namespace, for example
I want to write a plugin for showing the correct date formate, you can do it like this;

example:

{% raw %}
<div scope="datetime.ctrl">
  <p>{{time}}</p>
  <p datetime="time"></p>
</div>
{% endraw %}

{% highlight html%}
{% raw %}
<div scope="datetime.ctrl">
  <p>{{time}}</p>
  <p datetime="time"></p>
</div>
{% endraw %}
{% endhighlight %}

{% highlight javascript%}
define('river.grammer.datetime',function(exports,require,module){
  //notic the namespace river.grammer, here is a typo, not grammar
  exports = module.exports = datetime;

  function datetime(str,scope,element){
    //str is the value of your custom attribute 
    //here we use it as parameters for searching data in scope
    var key = str;
    element.innerHTML = (new Date(scope[str])).toLocaleString();
  }
})
{% endhighlight %}

controller
{% highlight javascript%}
define('datetime.ctrl',function(exports,require,module){
  exports.time = '2014-03-18T07:19:20.047Z';
})
{% endhighlight %}


### pre-build process

* firt you need to install riverjs from npm

    ```
    npm install -g riverjs
    ```

* second switch path to your work home 

    ```
    cd myapp
    mkdir detatime grammar
    touch datatime/ctrl.js
    touch grammar/datetime.js
    ```

> riverjs ask directive must under `river.grammar` namespace,in pre-build process the alais `grammar`
replace it.so we make a grammar folder and all modules in `grammar` folder will be directive. you can change to 
other folers by edit `river.json` alais property

* write down source without `define` function

  datetime/ctrl.js

{% highlight javascript%}
//notic the namespace river.grammer, here is a typo, not grammar
exports = module.exports = datetime;

function datetime(str,scope,element){
  //str is the value of your custom attribute 
  //here we use it as parameters for searching data in scope
  var key = str;
  element.innerHTML = (new Date(scope[str])).toLocaleString();
}
{% endhighlight %}

    grammar/datetime.js

{% highlight javascript%}
  exports.time = '2014-03-18T07:19:20.047Z';
{% endhighlight %}

* build at root path

    ```
    cd myapp
    riverjs build .
    ```

