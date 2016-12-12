'use strict';

var http = require('http');

var getUrl= function(){
    return "http://catfacts-api.appspot.com/api/facts";
};
var getCatFacts = function(callback){
            console.log("inside GetCatFact");
          http.get(getUrl(), function(res){
              console.log("1");
            var body = '';

            res.on('data', function(data){
                console.log("2");
              body += data;
            });

            res.on('end', function(){
                console.log("3");
              var result = JSON.parse(body);
              var text = result.facts[0];
              // console.log("the spoken text should be: ", text);
            callback(text);
            });

          }).on('error', function(e){
            console.log('Error: ' + e);
          });
        };



var theEnd = getCatFacts(function(data){
    console.log("this should be said:", data);
    return data;

});

console.log("the actual end: ", theEnd);
// this.emit(':tell', getCatFacts(function(data){
//               var text = data
//                           .facts;
//                       })
//                   );//"this" is not correct here, the scope is weird
