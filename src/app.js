const geocode = require('./utils/geocode')
const getWeather = require('./utils/weather')
const port = process.env.PORT || 3000;
var express = require("express");
const hbs = require('hbs')
const path = require('path')

var app = express();

var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('../public'));


const partialsPath = path.join(__dirname,'../views/partials')
const viewPath = path.join(__dirname , '../views/')

app.set('view engine','hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

var outputs =[];

app.get('', (req, res) => {
    res.render('index', {
        pageTitle: 'Weather API using expressjs',
        title: 'Weather-app',
        name: 'Ali Morakabi'
    })
})


app.get('/about',(req,res) =>{
    res.render('about.hbs', {
        pageTitle: 'Weather API using expressjs - about ',
        title: 'Weather-app',
        name: 'Ali Morakabi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        pageTitle: 'Weather API using expressjs - help',
        title: 'Weather-app',
        name: 'Ali Morakabi'
    })
})

app.get('*',(req,res) =>{
    res.render('404')
})




app.post("/api/customers/save", function (req, res) {
    console.log('Post a Weather: ' + JSON.stringify(req.body));
    var cityAddress = req.body.cityname;
    
    //
      geocode(cityAddress, (errorMessage, results) => {
          if (errorMessage) {
              console.log(errorMessage);
             return res.status(400).send(errorMessage);
          } else {
              var add = results.address;
              
              //Get Weather 
              getWeather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
                  if (errorMessage) {
                      console.log(errorMessage);
                      return res.status(400).send(errorMessage);
                  } else {
                      var TempCel = weatherResults.Temp - 273.15;
                      var Temperature = TempCel.toFixed(0);
                      var output = {};
                      output.main = weatherResults.main;
                      output.feels = (weatherResults.feels- 273.15).toFixed(0);
                      output.temp = Temperature;
                      output.description = weatherResults.description;
                      output.humidity = weatherResults.humidity;
                      output.addname = add;
                      outputs.push(output);
                    
                      return res.status(200).send(output);
                  }
              });

          }
      });
});



app.listen(port, function () {
    console.log(`Server is run on port : ${port} `);
})