var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties.config');

var client = require('graphql-client')({
    url: properties.get('adobe.aem.graphqlendpoint')
})

var actions = {

handle: async function (activityType) {
    console.log("*** Handler: ACTIVITY REQUEST for " + activityType );
      
    let announcement = "WKND";
    let speakOutput = "WKND";
    let reprompt = "WKND";
    let imagePath = "";
    let graphresult = [];
    let content = [];
    let variables = {
      "activity": activityType
    }

    await client.query(`
    query GetAdventureList($activity: String!) {
      activityList(
        filter: {activity: {_expressions: [{value: $activity, _ignoreCase: true}]}}
      ) {
        items {
          activity
          description {
            plaintext
          }
          featureImage {
            ... on ImageRef {
              _publishUrl
            }
          }
        }
      }
      adventureList(
        filter: {adventureActivity: {_expressions: [{value: $activity, _ignoreCase: true}]}}
      ) {
        items {
          primaryText: adventureTitle
          secondaryText: adventurePrice
          adventurePrimaryImage {
            ... on ImageRef {
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
        graphresult = body.data      

        if (graphresult.activityList.items[0]){

          content.speakOutput = "Yes, " + graphresult.activityList.items[0].description.plaintext;
          content.imagePath = graphresult.activityList.items[0].featureImage._publishUrl;

          for(var k in graphresult.adventureList.items) {
            graphresult.adventureList.items[k].imageSource = graphresult.adventureList.items[k].adventurePrimaryImage._publishUrl
            delete graphresult.adventureList.items[k].adventurePrimaryImage
          }
          
          content.adventureList = graphresult
          content.adventureList.screen = {backgroundImage: content.imagePath,displayTitle: "WKND Options for " + activityType}            

        } else 
        {
          console.log("Not found");
          content.speakOutput = "Sorry, we dont offer that activity. Maybe we should."
        }

    })
    .catch(function(err) {
        console.log(err.message)
    })

    return content
}
}


module.exports = actions