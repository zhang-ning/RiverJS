src = \
      lib/*.js \
      lib/core/*.js\
      lib/grammer/*.js\
      lib/main/*.js
rp = $(realpath $(src))

dist = dist/river.js
minified = $(dist:.js=.min.js)
sourcemap = $(dist:.js=.map)
#minify = uglifyjs
minify = node_modules/uglify-js/bin/uglifyjs
#appfolder = ../riverjs-website
jsdoc = node_modules/.bin/jsdoc
karma = node_modules/karma/bin/karma
doc = doc
doctemplate = node_modules/jsdoc/templates/haruki

all:$(dist) $(minified)

$(dist):$(src)
	@cat $^ >$@
	@echo build $@ success

$(minified):$(src) 
	$(minify) $^ -o $@  \
		--source-map-url river.map \
		--source-map $(sourcemap) -c -m
	@echo minify $@ success
#@cp  $@ $(sourcemap) src -rf $(appfolder) 

clean:
	@rm -f $(dist) $(minified) $(sourcemap)
	@echo  clean success

test:
	$(karma) start

report:
	$(plato) -r -d report -l .jshintrc -t "RiverJS" -x .json lib

doc:
	@rm $(doc)/ -rf
	$(jsdoc) $(src) -d $(doc)
	.PHONY: clean test doc

.PHONY: clean test
