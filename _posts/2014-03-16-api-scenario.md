---
layout: api
title:  "scenario"
author: jonathan
permalink: api/scenario.html
tag: api
---

# require('river.scenario')

### trigger(type,element)

simulate mouse event,for example trigger mouse click , hover,mouseover event  

> @type is for event type   
> @element is for the dom reference

### key(type,keycode,charCode,element)

simulate keyboard event, like esc,enter,any other keys in your keyboard.  

>@type keydown,keyup event  
>@keycode number , enter is 13  
>@charCode character , 'a,b,c'  
>@element dom reference  
