setInterval(function() {
  reloadPage();  
}, 15*60*1000); 

function reloadPage(){
  location.reload();
}

$(document).ready(function() {
  loadMeteo();
  loadTides();
 });

function loadMeteo(){
  $.get("https://api.openweathermap.org/data/2.5/onecall?lat=37.17823140510965&lon=-7.4497216680432174&units=metric&lang=pt&appid=12c1168f34c81c351be0582a533ebf58", function(data, status) {
  console.log(data);
      var img = data.current.weather[0].icon;
      var sunset=new Date(data.current.sunset*1000);
      var sunseth=sunset.getHours();
      var sunsetm=sunset.getMinutes();
      var sunrise=new Date(data.current.sunrise*1000);
      var sunriseh=sunrise.getHours();
      var sunrisem=sunrise.getMinutes();
   
      $("#temp").text(Math.round(data.current.temp) + `ºC`);
      $("#humidity").text(`Hr: ` + Math.round(data.current.humidity) + `%`);
      $("#uv").text(`UV: ` + Math.round(data.current.uvi) + ``);
      $('#current-icon').load(`animated/${img}.svg`);
      $("#vel").text( (data.current.wind_speed * 3.6).toFixed(1) + `km/h`);
      $("#dir").text( data.current.wind_deg + `º`);
      $("#sensation").text(`sens: ` + Math.round(data.current.feels_like) + `º`);
      $("#description").text(data.current.weather[0].description);
      $("#sunset").text(`${sunseth}:${sunsetm}`);
      $("#sunrise").text(`${sunriseh}:${sunrisem}`);
      $('#wind-dir').css({'transform' : 'rotate('+ data.current.wind_deg +'deg)'});
  
  
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
          .append($('<div class="hr-temp">').text(Math.round(hour.temp) + `º`))
          .append($('<div style="display:flex; position:absolute;margin-left:15px;" class="hr-pop">').text(Math.round(hour.pop*100) + `%`)).append('<img style="height:20px;margin-left:40px;" src="animated/raindrop.png"/>'); 
  
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
        $('#day-pop').append('<p style="height:64px;margin:0;">'+Math.round(day.pop*100)+'%</p>').append('<img style="height:20px;margin-left:40px;position:absolute;margin-top:-63px;z-index:20;" src="animated/raindrop.png"/>');
        $('#day-icon').append($('<div  class="day-icon">').load(`animated/${day.weather[0].icon}.svg`));       
        $('#day-temps').append('<p style="height:64px;margin:0;">'+Math.round(day.temp.max)+'º/'+Math.round(day.temp.min)+'º</p>');
      });
    });
}

function loadTides(){
  $.getJSON('mares.json', function (data) {  
    
  var mares=data.mares;
  mares.forEach(fen=>{
    if(fen.fenomeno==="Quarto minguante"||fen.fenomeno==="Quarto crescente"||fen.fenomeno==="Lua nova" ||fen.fenomeno==="Lua cheia"){
      $('#moon-time').append('<p>'+fen.data+'</p>');
    $('#moon').append('<p>'+fen.fenomeno+'</p>');    
    }
  
  })
  console.log(mares);
  var newarray=new Array(mares[0],mares[1],mares[2],mares[3]); 

  newarray.forEach((mare)=>{  
    $('#mares').append('<p>'+mare.data+'</p>');
    $('#time').append('<p>'+mare.fenomeno+'</p>');    
    });    
  });
  

  


  }

