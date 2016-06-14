/* eslint-disable semi */
"use strict";

const fdebug = require("../lib/fdebug");
const debug = fdebug("movies:controllers:movies");


function Movies(main) {
    debug("init.");
    return {

        'get': (req, res, next)=> {

            debug(".get called");

            var id = req.swagger.params.id ? req.swagger.params.id.value : null;

                main.libs.Movies.get(id)
                .then((movies)=>{
                        res.json(movies);
                    })
                .catch(next);

        },//end get

    };//end return
}

module.exports = Movies;