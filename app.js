const express = require("express");
const https= require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res) {
  const query=req.body.cityName;
   const url="https://community-open-weather-map.p.rapidapi.com/weather?q="+query+"&units=metric&rapidapi-key=53c201490dmsh2ba548f9e251f5dp19386cjsn89483fe565c3";
   https.get(url,function(response) {
     console.log(response);
 response.on("data",function(data) {
   const weatherData=JSON.parse(data);
  const temper=weatherData.main.temp;
   const id=weatherData.weather[0].icon;
 const weatherDescription=weatherData.weather[0].description;
 const img="http://openweathermap.org/img/wn/"+ id +"@2x.png";
 res.write("<p>The weather is currently "+weatherDescription+"</p>");
 res.write("<h1>Temperature in "+query+" is "+temper+".C</h1>");
 res.write("<img src=" + img +">");
 res.send();
});
   });
});
app.listen(3000);
