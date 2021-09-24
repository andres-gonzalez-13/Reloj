//colocar una direccion si se esta en otro PC
const socketClient = io();

let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');
let timeScreen = document.getElementById('timeScreen');
let timeHour = document.getElementById('timeHour');

let datenow = new Date();
let newtime = '';

var vetHours = 0;
var vetMinutes = 0;

var newHours = 0;
var newMinutes = 0;

setInterval(function(){
    console.log('test');
}, 60 * 60 * 1000);

btn.addEventListener('click', function (){
    datenow = new Date();
    newtime = timeHour.value;
    vetHours = 0;
    vetMinutes = 0;
    newHours = newtime.split(":")[0];
    newMinutes = newtime.split(":")[1];

    vetHours = datenow.getHours() - newHours;
    vetMinutes = datenow.getMinutes() - newMinutes;

    var restH = datenow.getHours() - vetHours;
    var restM = datenow.getMinutes() - vetMinutes;
    datenow.setHours(restH);
    datenow.setMinutes(restM);

    socketClient.emit('time:output', {
        hours: datenow.getHours(),
        minutes: datenow.getMinutes(),
        seconds: datenow.getSeconds()
    });

    socketClient.emit('chat:message',{
        username: 'cambio de hora',
        message: '----' + datenow + '-----'
    });
});



socketClient.on('chat:message', function (data){
    //esto quita el mensaje de typíng
    actions.innerHTML = '';
    //esto envia el mensaje
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socketClient.on('time:output', function (info){
    timeScreen.innerHTML = `<p>
        la hora es: ${info.hours} : ${info.minutes} : ${info.seconds}
    </p>`
});