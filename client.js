/**
 * Created by ror on 10.10.14.
 */

(function (window, undefined) {
    window.AUTORESIZE = window.AUTORESIZE || {};

    var initialized = false,
        shop;

    var app = function (iframe) {
        shop = iframe;
        window.addEventListener("message", receiveMessage, false);
    };

    function receiveMessage(event) {
        if (event.data == 'ready') {
            initialized = true;
            sendMessage('initialized')
        } else {
            if (initialized) {
                data = JSON.parse(event.data);

                if (data.height) {
                    shop.height = data.height;
                }
            }
        }
    }

    function sendMessage(message) {
        shop.contentWindow.postMessage(message, shop.src);
    }

    AUTORESIZE.init = function (iframe) {
        var instance = app(iframe);
        return instance;
    }
})(window);