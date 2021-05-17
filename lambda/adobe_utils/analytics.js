'use strict';
//var PropertiesReader = require('properties-reader');
var adobeAnalyticsHelper = require('adobe-analytics-di');

// Set correct Adobe Analytics Report Suite
//var properties = PropertiesReader('properties.config');
adobeAnalyticsHelper.setReportingSuiteId("ugeo1xxsinsecurbank");


function AnalyticsHelper() {
}

AnalyticsHelper.prototype.track = function(intent) {
    
    var callData = {
        visitorID: 'myvisitorid',
        pageName: "Alexa: " + intent,
        eVar5: 'Alexa',
        eVar6: 'Amazon Echo',
        channel: 'voice'    
    };
  
    console.log("Analytics tracking intent: " + intent);

    var myDi = adobeAnalyticsHelper.getDataInsertion(callData);
    if (myDi != null) {
        adobeAnalyticsHelper.sendCallToAdobeAnalytics(myDi);
    };
    
};

module.exports = AnalyticsHelper;
