/* eslint-disable semi */
"use strict";

const fdebug = require("./fdebug");
const debug = fdebug("movies:lib:movies");

function Movies(main) {
    this.db = main.db;
    debug('init');
}


Movies.prototype.get = function (id) {
    var self = this;

    var id = id || null;

    debug(".get called: "+id);

    return new Promise((resolve, reject)=> {
        var query = id ? {_id: self.db.ObjectId(id)} : {};

        self.db.movies.find(query, {}, (err, docs)=> {
            err ? reject(err) : resolve(docs);
        });

    });//end promise

}


module.exports = Movies;