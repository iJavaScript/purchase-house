site:
	rm -rf _site
	grunt clean build
	mkdir _site/
	cp -r dist/scripts dist/styles dist/views _site/
	cp dist/favicon.ico dist/index.html dist/robots.txt dist/404.html _site/
	mkdir -p _site/bower_components/es5-shim/
	cp dist/bower_components/es5-shim/es5-shim.js _site/bower_components/es5-shim/es5-shim.js
	mkdir -p ../freizl.github.com/purchase-house/
	cp -r _site/* ../freizl.github.com/purchase-house/
