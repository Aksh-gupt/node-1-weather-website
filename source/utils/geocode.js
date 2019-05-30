const request = require('request')

const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWtzaDIwMDAiLCJhIjoiY2p2Z3h5Z2FlMDR2OTQ0cDB5aTQ3dmpuYSJ9.haxe4Vnqc3RwMUdFkEK3AA&limit=1';
    request({url , json : true} , (error,{body}) => {
        if(error){
            callback('check your internet connection',undefined)
        }
        else if(body.features.length === 0){
            callback('unable to find the location',undefined)
        }
        else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode