var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        //scanear();
    }   
};
function scanear(){
    cordova.plugins.barcodeScanner.scan(
        function (result) {  
            var codigoQR= result.text;
            $('#resultado').html(codigoQR);
            $(".content").fadeIn();
        }, 
        function (error) {
            notificacion("Ha ocurrido un error al escanear.");
        }
    );
    return false;
};