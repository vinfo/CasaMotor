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
	           if(res.MANIFIESTO){
	           	var msg='Nit: '+res.NIT;
	           	msg+='<br/>Placa: '+res.PLACA;
	           	msg+='<br/>Valor: $'+res.VALOR;
           	   localStorage.setItem("MANIFIESTO",res.MANIFIESTO);
           	   localStorage.setItem("PLACA",res.PLACA);
           	   localStorage.setItem("VALOR",res.VALOR);	           	
	           	$("#resultado").html(msg).show();
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
	alert(2);
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