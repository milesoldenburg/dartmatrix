# DartMatrix
An open source darts scoring and statistics app. DartMatrix is an OSX app built using [Electron](http://electron.atom.io/).

## Building
Install proper dependencies

	npm install
	
Prepare CSS

	gulp less
	
Watch for changes to the LESS file and automatically build the CSS

	gulp watch

## Testing
Lint all code

	gulp lint
	
## Running
	npm start
	
## Building for Distribution
	gulp

App and DMG containing app will be built to /dist.