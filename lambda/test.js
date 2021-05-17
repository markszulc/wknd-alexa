const launchRequest = require('./handlers/launchRequest/launchHandler');
const activityRequest = require('./handlers/activityRequest/activityHandler');
const dm = require('./adobe_utils/dynamicmedia');

const AnalyticsHelper = require('./adobe_utils/analytics');
const adobeanalytics = new AnalyticsHelper();


async function init() {
    
    adobeanalytics.track('Test');
    
    let content = await launchRequest.handle();
    
        console.log("announcement: " + content.announcement);
        console.log("speakOutput: " + content.speakOutput);
        console.log("reprompt: " + content.reprompt);
        console.log("imagePath: " + content.imagePath);
        console.log("dmimagePath: " + await dm.getSmartCrop(content.imagePath));
    
    content = await activityRequest.handle("surfing");
          
        console.log("speakOutput: " + content.speakOutput);
        console.log("imagePath: " + content.imagePath);
        console.log("dmimagePath: " + await dm.getSmartCrop(content.imagePath));
        
        console.log(JSON.stringify(content.adventureList,null,2));

        
}

init();