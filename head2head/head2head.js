"use strict";

(function () {

    let twitterInterval;
    let which = false;

    window.onload = function () {
        $("#scroll-text").text("PORT PRIORITY 5 | SEATTLE, WA | ".repeat(5));
        var socket = io.connect('http://localhost:8889', { reconnection: true, reconnectionDelay: 1000 });
        socket.on('update', function (data) {
            let overlayContent = data.gameInfo;
            if (overlayContent.useTwitters) {
                $("#twitter1").text(`@${overlayContent.twitter1}`);
                $("#twitter2").text(`@${overlayContent.twitter2}`);
                alternate();
            } else {
                if (twitterInterval) {
                    clearInterval(twitterInterval);
                }
            }
            setContent(overlayContent);
        });
    };

    function setContent(obj) {
        let keys = Object.keys(obj);
        keys.forEach((key) => {
            let value = obj[key];
            let currentVal = $(`#${key}`).text();
            if (currentVal !== value) {
                if (key !== "twitter1" && key !== "twitter2") {
                    $(`#${key}`).fadeOut(400, () => {
                        $(`#${key}`).text(value);
                    });
                    setTimeout(() => {
                        $(`#${key}`).fadeIn();
                    }, 700);
                }
            }
        });
    }

    function alternate() {
        twitterInterval = setInterval(() => {
            if (which) {
                $("#name1").fadeOut(400);
                setTimeout(() => {
                    $("#twitter1").fadeIn();
                }, 500);
                $("#name2").fadeOut(400);
                setTimeout(() => {
                    $("#twitter2").fadeIn();
                }, 500);
            } else {
                $("#twitter1").fadeOut(400);
                setTimeout(() => {
                    $("#name1").fadeIn();
                }, 500);
                $("#twitter2").fadeOut(400);
                setTimeout(() => {
                    $("#name2").fadeIn();
                }, 500);
            }
            which = !which;
        }, 8000);
    }

})();