const path = require('path')
const express = require('express')
const hbs = require('hbs')
const GeoCode = require('./Utils/GeoCode')
const Forecast = require('./Utils/Weather')


console.log(__dirname)
const PublicDir = path.join(__dirname, '../Public')
const viewDir = path.join(__dirname, '../template/views')
const PartialDir = path.join(__dirname, '../template/partials')


const app = express()

// Set up handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(PartialDir)

// Set up static directory to serve
app.use(express.static(PublicDir))

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'Saad Nauman'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Saad Nauman'
    })
})

app.get('/help', (req, res)=>
{
    res.render('help', {
        name: 'Saad Nauman',
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address)
    {
        return res.send({
            Error: 'Please provide an address'
        })
    }

    GeoCode(req.query.address, (Error, {Lat, Long, Location} = {})=>{

        if (Error) {
            return res.send({
                Error
            })
        }

        Forecast(Lat, Long, (Error, {Temperature, Humidity, WeatherDescription, Location} = {}) =>{
            if (Error)
            {
                return res.send({Error})
            }

            res.send({
                Temperature,
                Humidity,
                WeatherDescription,
                Location
            })
        })
    })
})

app.get('/products', (req, res)=>{
    if  (!req.query.search)
    {
       return res.send({
            Error: 'Please provide with a search title'
       })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        name: 'Saad Nauman',
        Error: 'Help Article not Found',
        title: 'Help Error'
    })
})

// Match (*) anything that hasn't be defined
app.get('*', (req, res) =>{
    res.render('404', {
        title: '404 Not Found',
        name: 'Saad Nauman',
        Error: 'Error Message'
    })
})

// Common dev port = 3000
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

