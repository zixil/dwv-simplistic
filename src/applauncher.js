/**
 * Application launcher.
 */
// main application (global to be accessed from html)
var dwvApp = new dwv.App();

// Image decoders (for web workers)
dwv.image.decoderScripts = {
    "jpeg2000": "node_modules/dwv/decoders/pdfjs/decode-jpeg2000.js",
    "jpeg-lossless": "node_modules/dwv/decoders/rii-mango/decode-jpegloss.js",
    "jpeg-baseline": "node_modules/dwv/decoders/pdfjs/decode-jpegbaseline.js"
};

// check browser support
dwv.browser.check();

// initialise service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./service-worker.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// DOM ready?
document.addEventListener("DOMContentLoaded", function (/*event*/) {

    // initialise the application
    dwvApp.init({
        "containerDivId": "dwv",
        "fitToWindow": true,
        "gui":["tool"],
        "tools": ["Scroll", "ZoomAndPan", "WindowLevel"],
        "isMobile": true
    });
    dwv.gui.appendResetHtml(dwvApp);
    // activate tools on load end
    // dwvApp.addEventListener('load-end', function (/*event*/) {
    //     document.getElementById('tools').disabled = false;
    //     document.getElementById('reset').disabled = false;
    // });
});
