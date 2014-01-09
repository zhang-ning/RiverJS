#RiverJS
[![Build Status](https://travis-ci.org/zhang-ning/RiverJS.png?branch=master)](https://travis-ci.org/zhang-ning/RiverJS)

###Description
RiverJS is a simple framework fellow part of CMD standard and contains a extendable two-way binding template-enginee.

###Tutorials
[RiverJS](http://besideriver.com/RiverJS)


###How to setup dev environment
1 you need to install nodejs 

2 install karma 

```javascript
npm install -g karam
```

3 install the dev dependence

```javascript
cd RiverJS
npm install
```

4 download [PhantomJS](http://phantomjs.org) and put the bin file into 

```
mv /your/path/phantomjs /usr/bin/
```

or you can change the `karma.conf.js` 

```
browsers: ['Chrome']
```



###How to make a distrucbute

```
make
```


###How to test
```
make test
```

###Lisense
 one line to give the program's name and a brief description
 Copyright (C) 2014 copyright holder

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the "Software"),
 to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense,
 and/or sell copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included
 in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


