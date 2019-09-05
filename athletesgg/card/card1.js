"use strict";

(function () {

    let athletesGGUrl = "https://agg-card.netlify.com/?smashggId="

    window.onload = function () {
        var socket = io.connect('http://localhost:8889', { reconnection: true, reconnectionDelay: 1000 });
        socket.on('update', function (data) {
            let { player1 } = data.smashGGIds;
            if (player1) {
                $('#card').attr('src', athletesGGUrl + player1);
                $("#frame").show();
            }
        });
    }

})();