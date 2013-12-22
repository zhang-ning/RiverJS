#RiverJS


###Description
RiverJS is a simple framework fello part of CMD standard and contains a extendable two-way binding template-enginee.

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
