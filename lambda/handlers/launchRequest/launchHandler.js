var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties.config');

var client = require('graphql-client')({
    url: properties.get('adobe.aem.graphqlendpoint')
})

  var variables = {
    query: "Search Query"
}


var actions = {

handle: async function (endpoint) {
    console.log("*** Handler: LAUNCH REQUEST");
    
        
    let announcement = "WKND";
    let speakOutput = "WKND";
    let reprompt = "WKND";
    let imagePath = "";
    let content = [];

    await client.query(`
        {
            announcementsByPath(_path: "/content/dam/wknd/en/announcements/greeting") {
            item {
                announcement
                spokenMessage
                reprompt
                featureImage {
                ... on ImageRef {
                    _path
                    _publishUrl
                }
                }
            }
            }
        }
    `, variables, function(req, res) {
        if(res.status === 401) {
        throw new Error('Not authorized')
        }
    })
    .then(function(body) {
        content.announcement = body.data.announcementsByPath.item.announcement
        content.speakOutput = body.data.announcementsByPath.item.spokenMessage
        content.reprompt = body.data.announcementsByPath.item.reprompt
        content.imagePath = body.data.announcementsByPath.item.featureImage._publishUrl
    })
    .catch(function(err) {
        console.log(err.message)
    })

    return content

}
}


module.exports = actions