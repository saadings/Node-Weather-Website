const WeatherForm = document.querySelector('form')
const Search = document.querySelector('input')
const Msg1 = document.querySelector('#Msg1')
const Msg2 = document.querySelector('#Msg2')
const Msg3 = document.querySelector('#Msg3')
const Msg4 = document.querySelector('#Msg4')
const Msg5 = document.querySelector('#Msg5')

// When button is clicked
WeatherForm.addEventListener('submit', (event) =>{

    event.preventDefault() //Don't refresh page on button click

    const location = Search.value

    Msg1.textContent = 'Loading Weather...'
    Msg2.textContent = ''
    Msg3.textContent = ''
    Msg4.textContent = ''
    Msg5.textContent = ''
    fetch('/weather?address=' + location).then((response)=>{
        response.json().then((Data) =>{
            if (Data.Error)
                Msg1.textContent = Data.Error
            else
            {
                Msg1.textContent = 'Temperature is: ' + Data.Temperature + ' degree celsius and Humidity is: ' + Data.Humidity + '%'
                Msg2.textContent = 'Chances of Rain are: ' + (Data.RainChance * 100) + '% and Cloud Cover is: ' + Data.CloudCover + '%'
                Msg3.textContent = 'Wind Speed is: ' + Data.WindSpeed + ' km/h and Wind Direction is: ' + Data.WindDirection
                Msg4.textContent = 'Feels Like: ' + Data.FeelsLike + ' degree celsius, Visibility is: ' + Data.Visibility + '% and UV Index is: ' + Data.UVIndex + '%'
                Msg5.textContent = 'Weather outside is: ' + Data.WeatherDescription + ', the Location is: ' + Data.Location + ' and Observation Time is: ' + Data.ObservationTime
            }
        })
    })
})
