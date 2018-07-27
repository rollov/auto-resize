/**
 * Created by ror on 10.10.14.
 */
(function (window, undefined) {

    window.addEventListener("message", receiveMessage, false);
    sendMessage('ready');

    var cache = [];

    function receiveMessage(event) {
        if (event.data == 'initialized') {

            //document.getElementsByTagName('body')[0].style.minHeight = 'auto';

            setInterval(function () {
                var body = document.body,
                    html = document.documentElement;

                var calculatedHeight = Math.ceil(document.getElementsByTagName('html')[0]
                    .getBoundingClientRect().height + 10);

                /*var calculatedHeight = Math.max(body.scrollHeight, body.offsetHeight,
                 html.clientHeight, html.scrollHeight, html.offsetHeight); */

                var message = {
                    height: calculatedHeight
                };


                if (cache['height'] == undefined || calculatedHeight != cache['height']) {
                    sendMessage(JSON.stringify(message));
                    cache['height'] = calculatedHeight;
                }

            }, 800);
        }
    }

    function sendMessage(message) {
        parent.postMessage(message, "*");
    }

})(window);
