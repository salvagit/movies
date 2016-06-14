/* eslint-disable semi */
"use strict";

const fdebug = require("./fdebug");
const debug = fdebug("movies:lib:movies");

function Movies(main) {

    this.db = main.db;
    debug('init');
}


Movies.prototype.get = function (userId) {
    var self = this;
    debug(".get called: "+userId);

    return new Promise((resolve, reject)=> {
        self.db.movies.find({}, {}, (err, docs)=> {
            err ? reject(err) : resolve(docs);
        });

    });//end promise

}


module.exports = Movies;