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
  alert("imprimir");
  // compose text
  cordova.plugins.bixolonPrint.addLine({
      text: "hello cordova!"
      textAlign: cordova.plugins.bixolonPrint.TextAlign.CENTER,
      fontStyle: cordova.plugins.bixolonPrint.FontStyle.BOLD
  });
  cordova.plugins.bixolonPrint.addHr();
  cordova.plugins.bixolonPrint.addLine("#@*èòçìàé€");
  // finally print
  cordova.plugins.bixolonPrint.printText(
      function (response) {
          alert("print success!")
      },
      function (error) {
          alert("print failure: " + error)
      },
      {
          codePage: cordova.plugins.bixolonPrint.CodePage.CP_1252_LATIN1
      }
  );
  alert("Sale");
}