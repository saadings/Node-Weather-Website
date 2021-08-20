const request = require("request")

const GeoCode = (Location, callback) =>
{
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(Location) + '.json?access_token=pk.eyJ1Ijoic2FhYWFkaTE2IiwiYSI6ImNrc2Z4bzRlMjFmNnIzMXF0MDVoYWdyeTgifQ.VxC6O5KSvxZwPfNXESZN5g&limit=1'

    request({url : URL, json: true},(error, {body} = {})=>
    {
        if (error)
        {
            callback('Unable to connect to location services', undefined)
        }
        else if (body.features.length === 0)
        {
            callback('Unable to find Location try another search', undefined)
        }
        else
        {
            callback(undefined, {
                Lat: body.features[0].center[1],
                Long: body.features[0].center[0],
                Location: body.features[0].place_name
            })
        }
    })
}

module.exports = GeoCode