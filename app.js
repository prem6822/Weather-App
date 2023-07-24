
const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/weatherInfo", function(req, res){
  const city = req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="+city+"&appid=2a3cc95f2c2adee2a5626db8a2d65996";
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      console.log(JSON.stringify(weatherData));
      console.log(JSON.parse(JSON.stringify(weatherData)));
      try {
        const temp = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const windspeed = weatherData.wind.speed;
        const description = weatherData.weather[0].description;
        const name = weatherData.name;
        res.render("weatherReport",
        {
          description: description,
          temp: temp,
          humidity: humidity,
          windspeed: windspeed,
          name: name
        });
      } catch (error) {
        res.sendFile(__dirname+"/failure.html")
      }
    });
  });
});


app.listen(3000, function(){
  console.log("The server in running on port 3000.......");
});
