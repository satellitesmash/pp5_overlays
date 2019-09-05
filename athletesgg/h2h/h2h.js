"use strict";

(function () {

    window.onload = function () {
        var socket = io.connect('http://localhost:8889', { reconnection: true, reconnectionDelay: 1000 });
        socket.on('update', function (data) {
            let { player1, player2 } = data.smashGGIds;
            if (player1 && player2) {
                $('#card').attr('src', `https://agg-h2h.netlify.com/?smashggId1=${player1}&smashggId2=${player2}`);
                $("#frame").show();
            }
        });
    }

})();