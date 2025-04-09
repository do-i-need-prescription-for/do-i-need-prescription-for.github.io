esbuild-minify:
	npm --prefix=client i
	MINIFY=true npm run --prefix=client esbuild
	tree -h ./docs/assets/js

esbuild:
	MINIFY=false npm run --prefix=client esbuild
	tree -h ./docs/assets/js
