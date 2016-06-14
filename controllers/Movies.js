/* eslint-disable semi */
"use strict";

const fdebug = require("../lib/fdebug");
const debug = fdebug("movies:controllers:movies");


function Movies(main) {
    debug("init.");
    return {

        'get': (req, res, next)=> {
            debug(".get called");

                main.libs.Movies.get()
                .then((questions)=>{
                        res.json(questions);
                    })
                .catch(next);

        },//end get

    };//end return
}

module.exports = Movies;