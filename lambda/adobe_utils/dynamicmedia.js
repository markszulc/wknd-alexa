const fetch = require('node-fetch');

var actions = {
   
    getSmartCrop: async function (sourcepath) {
        
        let metadatapath = "/jcr%3Acontent/metadata.json"
        let url = sourcepath + metadatapath
        
        let settings = { method: "Get" };

        try {
            await fetch(url, settings)
            .then(res => res.json())
            .then((json) => {
                dmDomain = json['dam:scene7Domain'] + 'is/image/' + json['dam:scene7File'] + ":Amazon-Echo-Show"
            });
        } catch (error) {
            console.log(error)
        }
        
        //console.log(dmDomain)
        return dmDomain
    }
}

module.exports = actions