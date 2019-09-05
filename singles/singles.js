"use strict";

(function () {

    let twitterInterval;
    let which = false;
    let stingerDelay = 3400;

    window.onload = function () {
        setTimeout(() => {
            anime({
                targets: "#middle-bar",
                top: 0,
                delay: 125,
                opacity: [0, 1],
                duration: 1500,
                easing: "easeOutExpo"
            });
            anime({
                targets: "#bottom-bar",
                top: 0,
                scaleX: {
                    value: [0.6, 1],
                    duration: 1500,
                    easing: "easeOutExpo"
                },
                easing: 'easeOutExpo',
                duration: 1000
            });
            anime({
                targets: "#logo",
                top: 0,
                duration: 1500,
                easing: "easeOutExpo"
            });
            anime({
                targets: "#top-bar",
                top: 0,
                duration: 1500,
                easing: "easeOutExpo"
            });
        }, stingerDelay);
        var socket = io.connect('http://localhost:8889', { reconnection: true, reconnectionDelay: 1000 });
        socket.on('update', function (data) {
            setTimeout(() => {
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
            }, stingerDelay);
        });
        if (window.obsstudio) {
            window.obsstudio.onActiveChange = function(active) {
                if (!active) {
                    $("body").hide();     
                }
            };
        }
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