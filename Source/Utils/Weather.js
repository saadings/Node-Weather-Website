const request = require('request')

const Weather = (Lat, Long, CallBack) =>
{
    const URL = 'http://api.weatherstack.com/current?access_key=32fe9d162c3064c24534af0b8ebbd6cf&query='+ Lat + ','+ Long +'&units=f'

    request({url: URL, json: true}, (error, {body} = {})=>
    {
        if (error)
        {
            CallBack('Unable to connect to weather services', undefined)
        }
        else if (body.error)
        {
            CallBack('Unable to find Location', undefined)
        }
        else
        {
            CallBack(undefined, {
                Temperature: body.current.temperature,
                Humidity: body.current.humidity,
                WeatherDescription: body.current.weather_descriptions[0],
                Location: body.location.name + ', ' + body.location.country
            })
        }
    })

}

module.exports = Weather