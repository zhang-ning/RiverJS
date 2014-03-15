---
layout: guide
title:  "installation"
author: jonathan
permalink: guide/installation.html
tag: guide
---

# Installation

Compatibility Note: river.js doesn't test low version ie yet,
all others is fine.


## Standalone

---------


Simply download and include with a script tag. `define` and `main` will be registered as a global variable.  

[river.js (26 kb)](http://besideriver.com/RiverJS/1.0.8/river.js)  
[river.min.js (11.6 kb)](http://besideriver.com/RiverJS/1.0.8/river.min.js)


## NPM

---------


```
npm install -g riverjs
cd your/app/folder
riverjs build .
```

{% highlight html%}
<script src="your/app/folder/build/river.js">
{% endhighlight %}


## Bower

------------


{% highlight html html%}
bower install riverjs
{% endhighlight %}

{% highlight html html%}
<script src="bower_components/riverjs/dist/river.js">
{% endhighlight %}
