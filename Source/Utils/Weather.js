const request = require('request')

const Weather = (Lat, Long, CallBack) =>
{
    const URL = 'http://api.weatherstack.com/current?access_key=32fe9d162c3064c24534af0b8ebbd6cf&query='+ Lat + ','+ Long +'&units=m'

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
                Location: body.location.name + ', ' + body.location.country,
                ObservationTime: body.current.observation_time,
                Temperature: body.current.temperature,
                Humidity: body.current.humidity,
                WeatherDescription: body.current.weather_descriptions[0],
                RainChance: body.current.precip,
                WindSpeed: body.current.wind_speed,
                WindDirection: body.current.wind_dir,
                CloudCover: body.current.cloudcover,
                FeelsLike: body.current.feelslike,
                Visibility: body.current.visibility,
                UVIndex: body.current.uv_index
            })
        }
    })

}

module.exports = Weather