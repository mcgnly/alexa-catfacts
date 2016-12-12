'use strict';

var http = require('http');

var getUrl= function(){
    return "http://catfacts-api.appspot.com/api/facts";
};
var getCatFacts = function(callback){
    console.log("inside GetCatFact");
    http.get(getUrl(), function(res){
        var body = '';
        res.on('data', function(data){
            console.log("body is: ", data);
            body += data;
        });

        res.on('end', function(){
            var result = JSON.parse(body);
            console.log("data has ended, so result is: ", result);
            callback(result);
        });

    }).on('error', function(e){
        console.log('Error: ' + e);
    });
};

getCatFacts(function(data){
    console.log("inside the main fn call itself. Fact is: ", data.facts[0]);

});
// this.emit(':tell', getCatFacts(function(data){
//               var text = data
//                           .facts;
//                       })
//                   );//"this" is not correct here, the scope is weird
