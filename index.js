setInterval(function() {
  load();
}, 15*60*1000); 

function load(){
  $.get("https://api.openweathermap.org/data/2.5/onecall?lat=37.17823140510965&lon=-7.4497216680432174&units=metric&lang=pt&appid=12c1168f34c81c351be0582a533ebf58", function(data, status) {});
}


  $(document).ready(function() {
    $.get("https://api.openweathermap.org/data/2.5/onecall?lat=37.17823140510965&lon=-7.4497216680432174&units=metric&lang=pt&appid=12c1168f34c81c351be0582a533ebf58", function(data, status) {
  
  
      var img = data.current.weather[0].icon;
      console.log(data);
      var sunset=new Date(data.current.sunset*1000);
      var sunseth=sunset.getHours();
      var sunsetm=sunset.getMinutes();
      var sunrise=new Date(data.current.sunrise*1000);
      var sunriseh=sunrise.getHours();
      var sunrisem=sunrise.getMinutes();
   
      $("#temp").text(Math.round(data.current.temp) + `ºC`);
      $("#humidity").text(`Hr: ` + Math.round(data.current.humidity) + `%`);
      $('#current-icon').load(`animated/${img}.svg`);
      $("#vel").text( (data.current.wind_speed * 3.6).toFixed(1) + `km/h`);
      $("#dir").text( data.current.wind_deg + `º`);
      $("#sensation").text(`sens:` + Math.round(data.current.feels_like) + `ºC`);
      $("#description").text(data.current.weather[0].description);
      $("#sunset").text(`${sunseth}:${sunsetm}`);
      $("#sunrise").text(`${sunriseh}:${sunrisem}`);
  
  
      var hours = data.hourly;
      
  
      hours.forEach(hour => {
        var time = new Date(hour.dt * 1000);
  
        var element = $('<li>')
          .addClass('hr col text-center')
          .append(
            $('<h3>')
            .addClass('hour')
            .text(time.getHours() + ":00")
          )
          .append($('<div class="hr-icon">').load(`animated/${hour.weather[0].icon}.svg`))
          .append($('<div class="hr-temp">').text(Math.round(hour.temp) + `ºC`))
          .append($('<div style="display:flex; position:absolute;margin-left:15px;" class="hr-pop">').text(Math.round(hour.pop) + `%`)).append('<img style="height:20px;margin-left:30px;" src="animated/raindrop.png"/>'); 
  
        $('#hours .list').append(element);     
  
      });

     

      var days = data.daily;
      days.forEach(day=> {
        var date = new Date(day.dt * 1000);       
        var weekday = new Array(7);
        weekday[0] = "Domingo";
        weekday[1] = "Segunda";
        weekday[2] = "Terça";
        weekday[3] = "Quarta";
        weekday[4] = "Quinta";
        weekday[5] = "Sexta";
        weekday[6] = "Sábado";
        
        $('#day').append('<p style="font-weight:bold;height:64px;margin:0;">'+weekday[date.getDay()]+'</p>');
        $('#day-pop').append('<p style="height:64px;margin:0;">'+Math.round(day.pop)+'%</p>').append('<img style="height:20px;margin-left:30px;position:absolute;margin-top:-63px;" src="animated/raindrop.png"/>');
        $('#day-icon').append($('<div  class="day-icon">').load(`animated/${day.weather[0].icon}.svg`));       
        $('#day-temps').append('<p style="height:64px;margin:0;">'+Math.round(day.temp.max)+'º/'+Math.round(day.temp.min)+'º</p>');
      });
    });
  });

