var sqlite3 = require('sqlite3').verbose();
var db;
var fs = require('fs');
var ipc = require('electron').ipcMain;
var Q = require('q');

var shutdown = function(){
    console.log('Closing DB connection.');
    db.close();
};

var getGameTypes = function(){
    var deferred = Q.defer();

    console.log('Fetching game types...');

    db.serialize(function(){
        var rows = [];

        db.each(
            'SELECT id, type FROM gametypes',
            function(err, row){
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log(row.id + ': ' + row.type);

                    rows.push(row);
                }
            },
            function(err, count){
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log('Fetched', count, 'game types.');

                    deferred.resolve(rows);
                }
            }

        );
    });

    return deferred.promise;
};

var getAISettings = function(){
    var deferred = Q.defer();

    console.log('Fetching AI Settings...');

    db.serialize(function(){
        db.get(
            'SELECT ai_enabled, ai_settings FROM settings',
            function(err, row){
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log(row.ai_enabled, row.ai_settings);

                    deferred.resolve({
                        'enabled' : row.ai_enabled,
                        'difficulty' : row.ai_settings
                    });
                }
            }
        );
    });

    return deferred.promise;
};

var updateAISettings = function(arg){
    var deferred = Q.defer();

    console.log('Updating AI Settings...');

    db.serialize(function(){
        db.run(
            'UPDATE settings SET ai_enabled = ?, ai_settings = ?',
            arg.enabled,
            arg.difficulty,
            function(err){
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log('Settings updated successfully');

                    deferred.resolve();
                }
            }
        );
    });

    return deferred.promise;
};

var install = function(){
    var deferred = Q.defer();

    console.log('Checking for DB...');

    if (!fs.existsSync(__dirname + '/dartmatrixdb')) {
        console.log('DB does not exist, creating...');

        db = new sqlite3.Database(__dirname + '/dartmatrixdb');

        db.serialize(function(){
            var sql = fs.readFileSync(__dirname + '/sql/install.sql', 'utf8');

            db.exec(sql, function(err, res){
                if (err) {
                    deferred.reject(err);
                } else {
                    console.log('DB creation complete.');
                    deferred.resolve(res);
                }
            });
        });
    } else {
        console.log('DB exists.');
        db = new sqlite3.Database(__dirname + '/dartmatrixdb');
        deferred.resolve();
    }

    return deferred.promise;
};

var registerListeners = function(){
    ipc.on('getGameTypes', function(event){
        getGameTypes()
            .then(function(rows){
                event.sender.send('getGameTypes-reply', rows);
            })
            .catch(function(err){
                event.sender.send('getGameTypes-reply', {
                    'error' : err
                });
            });
    });

    ipc.on('getAISettings', function(event){
        getAISettings()
            .then(function(settings){
                event.sender.send('getAISettings-reply', settings);
            })
            .catch(function(err){
                event.sender.send('getAISettings-reply', {
                    'error' : err
                });
            });
    });

    ipc.on('getAISettingsSync', function(event){
        getAISettings()
            .then(function(settings){
                event.returnValue = settings;
            })
            .catch(function(err){
                event.returnValue = {
                    'error' : err
                };
            });
    });

    ipc.on('updateAISettings', function(event, arg){
        updateAISettings(arg)
            .then(function(){
                event.sender.send('updateAISettings-reply', 'success');
            })
            .catch(function(err){
                event.sender.send('updateAISettings-reply', {
                    'error' : err
                });
            });
    });
};

var init = function(){
    install()
        .then(registerListeners)
        .catch(function(err){
            console.log('error', err);
        });
};

module.exports = {
    'init' : init,
    'shutdown' : shutdown
};
