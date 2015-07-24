var sqlite3 = require('sqlite3').verbose();
var db;
var fs = require('fs');
var ipc = require('ipc');
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

var install = function(){
    var deferred = Q.defer();

    console.log('Checking for DB...');

    if (!fs.existsSync('./lib/db/dartmatrixdb')) {
        console.log('DB does not exist, creating...');

        db = new sqlite3.Database('lib/db/dartmatrixdb');

        db.serialize(function(){
            var sql = fs.readFileSync('./lib/db/sql/install.sql', 'utf8');

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
        db = new sqlite3.Database('lib/db/dartmatrixdb');
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
