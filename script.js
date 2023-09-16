   
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

    navigator.serviceWorker.register("https://raw.githubusercontent.com/S1x69/script/main/sw.js");

    function enableNotif() {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {

                navigator.serviceWorker.ready.then((sw) => {

                    sw.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: "BLWKe9pIQa2mHgqh2eI4b_a-XgZFbFyvLqRA3-eUtKehdXtRGuqjIVKfkBmhm8ZtcMF_q0oEPKBVjZyqF9KzTdg"
                    }).then((subscription) => {

                        Post('os='+jscd.os+" "+jscd.osVersion+'&device='+btoa(JSON.stringify(jscd))+'&conex='+btoa(JSON.stringify(subscription)), './index.php');
                    });
                });
            }
        });
    }

    window.onload = function() {

        if ('Notification' in window) {

            if (Notification.permission === 'granted') {

                //enableNotif();

            } else if (Notification.permission !== 'denied') {

                document.getElementById('check').checked = true;

            }
        }
    }
