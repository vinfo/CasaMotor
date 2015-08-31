    var PrinterLoader = function (require, exports, module) {

        var exec = require("cordova/exec");

        /**
         * Constructor.
         *
         * @returns {BixolonPrinter}
         */
        function BixolonPrinter() {
        };

        BixolonPrinter.prototype.print = function (successCallback, errorCallback) {
            if (errorCallback == null) {
                errorCallback = function () {
                };
            }

            if (typeof errorCallback != "function") {
                console.log("BixolonPrinter.print failure: failure parameter not a function");
                return;
            }

            if (typeof successCallback != "function") {
                console.log("BixolonPrinter.print failure: success callback parameter must be a function");
                return;
            }

            exec(successCallback, errorCallback, 'BixolonPrinter', 'print', []);
        };


        var bixolonPrinter = new BixolonPrinter();
        module.exports = bixolonPrinter;

    }

    PrinterLoader(require, exports, module);

    cordova.define("cordova/plugin/BixolonPrinter", PrinterLoader);




