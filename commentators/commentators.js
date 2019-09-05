"use strict";

(function () {


    window.onload = function () {
        anime({
            targets: ".overlay",
            duration: 3000,
            easing: "easeOutExpo",
            opacity: [0, 1],
            top: 0
        });
        var socket = io.connect('http://localhost:8889', { reconnection: true, reconnectionDelay: 1000 });
        socket.on('update', function (data) {
            setTimeout(() => {
                let commInfo = data.commInfo;
                setContent(commInfo);
            }, 1000);
        });
        if (window.obsstudio) {
            window.obsstudio.onActiveChange = function (active) {
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
                $(`#${key}`).fadeOut(400, () => {
                    $(`#${key}`).text(key.includes("Twitter") ? `@${value}` : value);
                });
                setTimeout(() => {
                    $(`#${key}`).fadeIn();
                }, 700);
            }
        });
    }


})();
