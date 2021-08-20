const WeatherForm = document.querySelector('form')
const Search = document.querySelector('input')
const Msg1 = document.querySelector('#Msg1')
const Msg2 = document.querySelector('#Msg2')

// When button is clicked
WeatherForm.addEventListener('submit', (event) =>{

    event.preventDefault() //Don't refresh page on button click

    const location = Search.value

    Msg2.textContent = 'Loading Weather...'
    Msg1.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
        response.json().then((Data) =>{
            if (Data.Error)
                Msg2.textContent = Data.Error
            else
            {
                Msg1.textContent = 'Weather outside is: ' + Data.WeatherDescription + ' and the location is: ' + Data.Location
                Msg2.textContent = 'Temperature is: ' + Data.Temperature + ' degrees and Humidity is: ' + Data.Humidity + '%'
            }
        })
    })
})
