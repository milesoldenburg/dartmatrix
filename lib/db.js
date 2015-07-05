var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(':memory:');

var init = function(){
    db.serialize(function(){
        db.run('CREATE TABLE gametypes (id INT PRIMARY KEY, type TEXT)');

        var stmt = db.prepare('INSERT INTO gametypes (id, type) VALUES (1, "Cricket")').run();
        stmt.finalize();

        stmt = db.prepare('INSERT INTO gametypes (id, type) VALUES (2, "x01")').run();
        stmt.finalize();

        db.each('SELECT id, type FROM gametypes', function(err, row){
            console.log(row.id + ': ' + row.type);
        });
    });

    db.close();
};

module.exports = {
    'init' : init
};
