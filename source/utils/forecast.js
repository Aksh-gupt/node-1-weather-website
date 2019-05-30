const request = require('request')

const forecast = (latitude , longitude , callback) => {
    const foreURL = 'https://api.darksky.net/forecast/ec3f96bee62438e1d0ba05d7c91b0ed4/' + latitude + ',' + longitude
    request({url : foreURL , json : true},(error,{body}) => {
        if(error){
            callback('check your internet connection',undefined)
        }
        else if(body.error){
            callback('check your latitude and longitude,it is not correct',undefined)
        }
        else{
            const data = "there is currently " + body.currently.temperature + "F outside. There is "+body.currently.precipProbability + " chance of raining and humidity is " + body.currently.humidity
            callback(undefined,data)
        }
    })
}

module.exports = forecast