function getManifiesto(manifiesto){
	var IP= localStorage.getItem("IP");
	var data= "action=getManifiesto&manifiesto="+manifiesto;
	jQuery.ajax({
		type: 'POST',
		url: "http://"+IP+"/casamotor/services.php",
		crossDomain: true,
		data: data,
		dataType: 'json',
		async: false, 
           timeout: 10000, // 10 seconds
           success: function(res) {
           	   localStorage.setItem("MANIFIESTO","");
           	   localStorage.setItem("PLACA","");
           	   localStorage.setItem("VALOR","");
               localStorage.setItem("MSG","");
	           if(res.MANIFIESTO){
	           	var msg='Nit: '+res.NIT;
	           	msg+='<br/>Placa: '+res.PLACA;
	           	msg+='<br/>Valor: $'+res.VALOR;
           	   localStorage.setItem("MANIFIESTO",res.MANIFIESTO);
           	   localStorage.setItem("PLACA",res.PLACA);
           	   localStorage.setItem("VALOR",res.VALOR);	  
               localStorage.setItem("MSG",msg);
	           }else{
	           	$("#resultado").html("No existen manifiestos con este código").show();
	           }       
           },
           error:function(request, status, error){
           	alert("Sistema no disponible en estos momentos.");
           	$(".load").hide();
           }
       }); 
}
function scanear(){
    cordova.plugins.barcodeScanner.scan(
        function (result) {  
            var codigoQR= result.text;
            $('#manifiesto').val(codigoQR);
            getManifiesto(codigoQR);
        }, 
        function (error) {
            notificacion("Ha ocurrido un error al escanear.");
        }
    );	
}
function photo(){
  navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
  });
}

function onSuccess(imageData) {
    $(".img").attr("src","data:image/jpeg;base64," + imageData) ;
}

function onFail(message) {
    alert('Problemas inicializando la camara: ' + message);
}

function printer(){
  cordova.plugins.bixolonPrint.addLine({
      text       : "Prueba de Impresion",    // text to print
      textAlign  : "center",    // text align, default left
      textWidth  : 200,       // text width, default 0
      textHeight : 100,       // text height, default 0
      fontType   : "A",    // font type, A or B
      fontStyle  : "bold"     // font style, bold or underlined or reversed
  });
  cordova.plugins.bixolonPrint.cutPaper(successCallback, errorCallback, 4);
}
function successCallback(imageData) {
    alert("Imprimiendo");
}

function errorCallback(message) {
    alert('Problemas inicializando impresora: ' + message);
}