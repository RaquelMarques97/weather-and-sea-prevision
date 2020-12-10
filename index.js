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
      $("#temp").text(Math.round(data.current.temp) + `ºC`);
      $("#humidity").text(`humidade: ` + Math.round(data.current.humidity) + `%`);
      $('#current-icon').load(`animated/${img}.svg`);
      $("#vel").text(`vento: ` + (data.current.wind_speed * 3.6).toFixed(1) + `km/h`);
      $("#dir").text(`direcção: ` + data.current.wind_deg + `º`);
      $("#sensation").text(`sensação:` + Math.round(data.current.feels_like) + `ºC`);
      $("#description").text(data.current.weather[0].description);
  
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
          .append($('<div class="hr-pop">').text(Math.round(hour.pop) + `%`));
  
        $('#hours .list').append(element);     
  
      });

      var days = data.daily;
      days.forEach(day=> {
        console.log(day);

        
      });


    });
  });

