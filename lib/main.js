// Dependencies
var app = require('app');
var BrowserWindow = require('browser-window');
var db = require('./db/db');

// Report crashes to our server
require('crash-reporter').start();

var mainWindow = null;

// Quit when all windows are closed
app.on('window-all-closed', function(){
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function(){
    // Initialize db access
    db.init();

    // Create the browser window.
    mainWindow = new BrowserWindow({width : 800, height : 600});

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/static/index.html');

    // Open the devtools.
    mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function(){
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});
