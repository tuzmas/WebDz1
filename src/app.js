const express = require('express');
const req = require('express/lib/request');
const weatherData = require('../weatherData')

const app = express();

const port = process.env.PORT || 3000;


const hbs = require('hbs');
const path = require('path');

// specifying the path to our public folder having static assets
const publicStaticDirPath = path.join(__dirname,'../public')

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.use(express.static(publicStaticDirPath))

// create a default route for our server
app.get('/', (req,res)=>{
    // res.send('This is the default Route...')
    res.render('index',{
        title: 'Weather App'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port: ', port)
});
// This is the Route to get the weather data
// localhost:3000/weather?address=chicago
app.get('/weather', (req,res) => {
    const address = req.query.address

    if(!address){
        return res.send({
            error: "Please enter a location to search weather"
        })
    }
   weatherData(address,(error, {temperature, description,cityName}) => {
       if(error){
           return res.send({
               error
           })
       } 
       console.log('temperature,description,cityName:',temperature,description,cityName)
       res.send({
           temperature,
           description,
           cityName,
           
       })
   })
})
