"use strict";

(function () {

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
                setContent(overlayContent);
                setTimeout(() => {
                    $(`.divider`).fadeIn();
                }, 700);
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

})();