const request =require('request');


const getWeather = (latitude,longitude,callback) => {
    
    const url= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=YOUR_Id`

    request ({url,json: true},(error,response,body)=>
    {
        
        if(!error && response.statusCode === 200)
        {
          
           callback(undefined,{

            Temp: body.main.temp,
            feels: body.main.feels_like,
            maxTemp : body.main.temp_max,
            minTemp: body.main.temp_min,
            main: body.weather[0].main,
            description : body.weather[0].description,
            humidity: body.main.humidity

           });
        }
        else {
            callback('unable to fetch weather');
        }
    
    });
};

module.exports.getWeather = getWeather;
////