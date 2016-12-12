'use strict';
var Alexa = require('alexa-sdk'),
    http = require('http');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var languageStrings = {
    "en-US": {
        "translation": {
            "SKILL_NAME" : "Cat Facts",
            "GET_FACT_MESSAGE" : "Here's your fact: ",
            "HELP_MESSAGE" : "You can say tell me a cat fact, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!"
        }
}};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);//Alexa comes from the sdk
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        // var factArr = this.t('FACTS');
        // var factIndex = Math.floor(Math.random() * factArr.length);
        // var randomFact = factArr[factIndex];

        // Create speech output
        // var speechOutput = this.t("GET_FACT_MESSAGE") + randomFact;
        var getUrl= function(){
            return "http://catfacts-api.appspot.com/api/facts";
        };
        var getCatFacts = function(){
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
              console.log("the spoken text should be: ", text);
              return text;
            });

          }).on('error', function(e){
            console.log('Error: ' + e);
          });
        };


        console.log("inside GetFact itself");

        this.emit(':tell', getCatFacts());


    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        // this.emit(':tell', this.t("STOP_MESSAGE"));
        this.emit(':tell', "Goodbye.");
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', "Goodbye.");
    },
    'Unhandled': function() {
        this.emit(':ask', 'Sorry, I didn\'t get that.', 'Try asking for a fact.');
    }

};
