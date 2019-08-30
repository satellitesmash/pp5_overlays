"use strict";

(function () {


    window.onload = function () {
        anime({
            targets: "#middle-bar",
            top: 0,
            duration: 1500,
            easing: "linear"
        });
        anime({
            targets: "#bottom-bar",
            scaleX: {
                value: [0.6, 1],
                duration: 1500,
                easing: "linear"
            }
        });
        anime({
            targets: "#logo",
            top: 0,
            duration: 1500,
            easing: "linear"
        });
        anime({
            targets: "#top-bar",
            top: 0,
            duration: 1500,
            easing: "linear"
        });
        var socket = io.connect('http://localhost:8889', { reconnection: true, reconnectionDelay: 1000 });
        socket.on('update', function (data) {
            setTimeout(() => {
                let overlayContent = data.gameInfo;
                setContent(overlayContent);
            }, 1300);
        });
    };

    function setContent(obj) {
        let keys = Object.keys(obj);
        keys.forEach((key) => {
            let value = obj[key];
            let currentVal = $(`#${key}`).text();
            if (currentVal !== value) {
                $(`#${key}`).fadeOut(400, () => {
                    $(`#${key}`).text(value);
                });
                setTimeout(() => {
                    $(`#${key}`).fadeIn();
                }, 500);
            }
        });
    }

    function testSponsor(number) {
        let sponsor = $(`#sponsor${number}`);
        return sponsor;
    }

    function compareSponsorAndTag(number, newValue) {
        let sponsor = $(`#sponsor${number}`);
        let tag = $(`#player${number}`);
        return (`${sponsor} | ${tag}` === newValue);
    }

})();