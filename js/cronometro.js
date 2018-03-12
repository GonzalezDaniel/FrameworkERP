
var hr = checkTime(0);
var min = checkTime(0);
var sec = checkTime(0);

var crono;
var started = false;

function reset(){
    hr = checkTime(0);
    min = checkTime(0);
    sec = checkTime(0);
    document.getElementById("cronometro").innerHTML = hr + ":" + min + ":" + sec;
    setHours(hr);
    setMinutes(min);
    setSeconds(sec);
}

function start(){
    if(!started){
        started = true;
        crono = setInterval(update,100);
        document.getElementById("iniciar").disabled = true;
        document.getElementById("parar").disabled = false;
        setState("running");
    }  
}

function stop(){
    clearInterval(crono);
    started = false;
    document.getElementById("iniciar").disabled = false;
    document.getElementById("parar").disabled = true;
    setState("stopped");
}

function update(){
    sec++;
    sec = checkTime(sec);
    setSeconds(sec);
    if(sec >=60){
        min++;
        min = checkTime(min);
        sec = checkTime(0);
        setMinutes(min);
    }
    if(min >= 60){
        hr++;
        hr = checkTime(hr);
        min = checkTime(0);
        setHours(hr);
    }
    document.getElementById("cronometro").innerHTML = hr + ":" + min + ":" + sec;
}

function checkTime(i) {
    if (i < 10) {i = "0" + i}; 
    return i;
}

function setState(state){
    localStorage.setItem("estado",state);
}

function setSeconds(seconds){
    localStorage.setItem("segundos",seconds);
}

function setMinutes(minutes){
    localStorage.setItem("minutos",minutes);
}

function setHours(hours){
    localStorage.setItem("horas",hours);
}

window.onload = function(){
    var state = localStorage.getItem("estado");
     sec = localStorage.getItem("segundos") != null ? localStorage.getItem("segundos") : checkTime(0);
     min = localStorage.getItem("minutos") != null ? localStorage.getItem("minutos") : checkTime(0);
     hr = localStorage.getItem("horas") != null ? localStorage.getItem("horas") : checkTime(0);

    document.getElementById("cronometro").innerHTML = hr + ":" + min + ":" + sec;
    console.log(state);
    if(state == "running"){
        start();
    }
}