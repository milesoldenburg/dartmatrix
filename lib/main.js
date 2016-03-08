// Dependencies
var app = require('app');
var BrowserWindow = require('browser-window');
var Menu = require('menu');
var db = require('./db/db');

// Report crashes to our server
require('crash-reporter').start();

var mainWindow = null;

// Quit when all windows are closed
app.on('window-all-closed', function(){
    if (process.platform !== 'darwin') {
        db.shutdown();
        app.quit();
    }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function(){
    // Initialize db access
    db.init();

    var template = [
        {
            label : 'Edit',
            submenu : [
                {
                    label : 'Undo',
                    accelerator : 'CmdOrCtrl+Z',
                    role : 'undo'
                },
                {
                    label : 'Redo',
                    accelerator : 'Shift+CmdOrCtrl+Z',
                    role : 'redo'
                }
            ]
        },
        {
            label : 'View',
            submenu : [
                {
                    label : 'Reload',
                    accelerator : 'CmdOrCtrl+R',
                    click : function(item, focusedWindow){
                        if (focusedWindow) {
                            focusedWindow.reload();
                        }
                    }
                },
                {
                    label : 'Toggle Full Screen',
                    accelerator : (function(){
                        if (process.platform === 'darwin') {
                            return 'Ctrl+Command+F';
                        } else {
                            return 'F11';
                        }
                    })(),
                    click : function(item, focusedWindow){
                        if (focusedWindow) {
                            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                        }
                    }
                },
                {
                    label : 'Toggle Developer Tools',
                    accelerator : (function(){
                        if (process.platform === 'darwin') {
                            return 'Alt+Command+I';
                        } else {
                            return 'Ctrl+Shift+I';
                        }
                    })(),
                    click : function(item, focusedWindow){
                        if (focusedWindow) {
                            focusedWindow.toggleDevTools();
                        }
                    }
                }
            ]
        },
        {
            label : 'Window',
            role : 'window',
            submenu : [
                {
                    label : 'Minimize',
                    accelerator : 'CmdOrCtrl+M',
                    role : 'minimize'
                },
                {
                    label : 'Close',
                    accelerator : 'CmdOrCtrl+W',
                    role : 'close'
                }
            ]
        },
        {
            label : 'Help',
            role : 'help',
            submenu : [
                {
                    label : 'Learn More',
                    click : function(){
                        require('electron').shell.openExternal('https://github.com/milesoldenburg/dartmatrix');
                    }
                }
            ]
        }
    ];

    if (process.platform === 'darwin') {
        var name = require('electron').app.getName();
        template.unshift({
            label : name,
            submenu : [
                {
                    label : 'About DartMatrix',
                    role : 'about'
                },
                {
                    type : 'separator'
                },
                {
                    label : 'Services',
                    role : 'services',
                    submenu : []
                },
                {
                    type : 'separator'
                },
                {
                    label : 'Hide ' + name,
                    accelerator : 'Command+H',
                    role : 'hide'
                },
                {
                    label : 'Hide Others',
                    accelerator : 'Command+Alt+H',
                    role : 'hideothers'
                },
                {
                    label : 'Show All',
                    role : 'unhide'
                },
                {
                    type : 'separator'
                },
                {
                    label : 'Quit',
                    accelerator : 'Command+Q',
                    click : function(){
                        app.quit();
                    }
                }
            ]
        });
        // Window menu.
        template[3].submenu.push(
            {
                type : 'separator'
            },
            {
                label : 'Bring All to Front',
                role : 'front'
            }
        );
    }

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

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
