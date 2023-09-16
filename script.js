
function Post(data, urlapi) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var json = this.response;
        }
    };
    xhttp.open("POST", urlapi, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.responseType = 'json';
    xhttp.send(data);

    return false;
}

navigator.serviceWorker.register("sw.js");

function enableNotif() {
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {

            navigator.serviceWorker.ready.then((sw) => {

                sw.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: "BLWKe9pIQa2mHgqh2eI4b_a-XgZFbFyvLqRA3-eUtKehdXtRGuqjIVKfkBmhm8ZtcMF_q0oEPKBVjZyqF9KzTdg"
                }).then((subscription) => {

                    Post('reference='+reference+'&os=' + jscd.os + " " + jscd.osVersion + '&device=' + btoa(JSON.stringify(jscd)) + '&conex=' + btoa(JSON.stringify(subscription)), './Ativar.php');
                });
            });
        }
    });
}

window.onload = function() {

    var as = document.createElement('div');
    as.id = 'base';
    document.body.appendChild(as);

    document.getElementById('base').innerHTML = '<div id="container" class="container"><input type="checkbox" id="check"><div class="background"></div><div class="modal-content alert_box"><div class="icon"><i class="fas fa-exclamation"></i></div><header>'+Informativo.title+'</header><p>'+Informativo.body+'</p><div class="btns"><label for="check" onclick="enableNotif()">'+Informativo.yes+'</label><label onclick="location.reload()"  for="check">'+Informativo.no+'</label></div></div></div>';

    if ('Notification' in window) {

        if (Notification.permission === 'granted') {

            document.getElementById('container').style = 'display:none;';

        } else if (Notification.permission !== 'denied') {
            
            document.getElementById('check').checked = true;

        }
    }
}
