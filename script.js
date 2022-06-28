 const formEl=document.querySelector("form");
 const result=document.querySelector(".result");
 const currentDay=document.querySelector(".currentDay");
 const load=document.querySelector(".loading");
 const place=document.querySelector(".place");
 const forecast=document.querySelector("#forecast");
 const temp=document.querySelector(".temp");
 const details=document.querySelector(".details");
 const desc=document.querySelector(".desc");
 const icons=document.querySelectorAll(".icons");
 const bgImg=document.querySelector("#bgImg");
 var data;
 var querry;

 function addDays(da,days){
  return new Date(da.getTime()+(days*24*60*60*1000));
} 

 formEl.addEventListener("submit",(e)=>{
     e.preventDefault();
     load.classList.remove("text-hidden");
     formEl.classList.add("text-hidden");
      querry=e.target.location.value;

     weatherApp(querry);
 
 });
 forecast.addEventListener("click",(e)=>{
    e.preventDefault();
    currentDay.classList.remove("text-hidden");
    load.classList.add("text-hidden");
    generate5DayForecast(data);

});
 async function weatherApp(querry){
     data=await fetchAPI(querry);
       generateHTML(data);
 }
 async function fetchAPI(querry){
     const appid="3cba49a6b36f45b95a37cc27d3eed392";
     const units="metric";
     const url="https://api.openweathermap.org/data/2.5/forecast?q="+querry+"&appid="+appid+"&units="+units;
     const res= await fetch(url);
     const data= await res.json();
     return data;
 }
 function generate5DayForecast(data){
    for(i=0;i<5;i++){
        document.querySelector("#day"+(i+1)).innerHTML=addDays(new Date,i).toDateString();
        document.querySelector("#day"+(i+1)+"min").innerHTML="Min : "+Number(data.list[i].main.temp_min)+"°C";
        document.querySelector("#day"+(i+1)+"max").innerHTML="Max : "+Number(data.list[i].main.temp_max)+"°C";
        document.querySelector("#img"+(i+1)).src ="http://openweathermap.org/img/wn/"+data.list[i].weather[0].icon+".png";
     }
     result.classList.remove("text-hidden");
     currentDay.classList.add("text-hidden");
 }
     function generateHTML(data){
         let main=data.list[0].weather[0].main;
         console.log(main);
         console.log(bgImg);
         switch(main){
             case "Snow":
                 bgImg.style.backgroundImage="url(gif/snow.gif)";
                 break;
            case "Rain":
                    bgImg.style.backgroundImage="url(gif/rain.gif)";
                    break;
           case "Clear":
                 bgImg.style.backgroundImage="url(gif/clear.gif)";
                 console.log("1");
                 break;
            case "Thunderstorm":
                 bgImg.style.backgroundImage="url(gif/thunderstorm.gif)";
                 break;
            case "Fog":
                 bgImg.style.backgroundImage="url(gif/fog.gif)";
                 break;     
             case "Clouds":
                    bgImg.style.backgroundImage="url(gif/clouds.gif)";
                    break;     
         }
         place.innerHTML=data.city.name;
       temp.innerHTML=Number(data.list[0].main.temp)+ "<sup> °C <sup>";
       desc.innerHTML=data.list[0].weather[0].description;
       details.innerHTML=`
                        <p>Humidity:<span class="value1">${data.list[0].main.humidity}%</span></p>
                        <p>Wind Speed:<span class="value2">${data.list[0].wind.speed}km/hrs</span></p>
                         <p>Pressure:<span class="value3">${data.list[0].main.pressure}MB</span></p> `
        currentDay.classList.remove("text-hidden");
        load.classList.add("text-hidden");
    
     console.log('p');
 
     }
 