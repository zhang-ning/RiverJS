---
layout: default
title: RiverJS CMD Two-way binding
---

# Less Rule,More Arbitrary

<div class="why">

## Less Markup

As we know ,html is a manifest not programming,you can't debugging in html and when errors there is no exception throws out,the way of makrup data binding is convenient when you
developing a feature,but in some day of future , when you come back to face many custom tag/directive , you will lost, not working and without error alert,so riverjs only wrapped 5
build-in tag,and encourage programmer use less makrup when wrapping a tag/directive to handle dom interactive. 


----------


## Easy to config

riverjs one important mission is for handling module defination,why not reuse [node](http://nodejs.org/) and [component](http://component.io/) ? As when we creat a app there is no need to
publish it as a Module,app is app , module is module. so too many manifest files is no necessary.riverjs focus on app's module defination not for sharing.



----------


## More Freewheeling Pattern 
MVC,MVVM,NBA,ABC,XXYY ...  

As riverjs fellow the CommonJS module standard,whatever controller,module or tag/directive use same style to wrap.It's easy to communicate between them each other.
Less rules more freedom.


--------------

## Minimized Data Refresh

There are so many data binding libary in the word, like AngularJS,Knockout,Vue.js etc,all of them include riverjs is try to pursue minimized data refreshing.For achiving
this goal,after scaning or compiling(whatever you call it) a dom node, riverjs doesn't use `innerHtml` to replace value , riverjs use `textNode` to handle it.And there is no
`setTimeout` or `setInnerval` in riverjs for checking data change.Behind riverjs data-binding is simple native function call. 


-------------

## Following The Trend Of The Times

Currently [node](http://nodejs.org/) and [component](http://component.io/) is quite popular,so there is no need to create a another module define style,
we just want to make things become easier, so it's time to unify everthing to achive the goal. Less mainfest,less markup,less api,all these is service for one thing,the easiest one
is the best one.



