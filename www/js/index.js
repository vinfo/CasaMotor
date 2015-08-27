var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
      navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
          destinationType: Camera.DestinationType.DATA_URL
      });
    }   
};

function onSuccess(imageData) {
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
}

function onFail(message) {
    alert('Failed because: ' + message);
}
$( document ).ready(function() {
    $( document ).ajaxStart(function() {
      $(".load").show();
    });

    if(localStorage.getItem("IP")!=""){
      $("#IP").val(localStorage.getItem("IP"));
      $("em").html(localStorage.getItem("IP"));
    } 
    $(".config").click(function() {
      $(".pass").fadeIn();
    });
    $(".btn_submit").click(function() {
      var id=$("#ID_USUARIO").val();
      var pass=$("#PASSWORD").val();      
    if(id!=""){      
      if(id!="" && pass!=""){
        $.getJSON( "config.json", function( json ) {          
          if(json.user==id && json.pass==pass){            
            $(".divconfig").fadeIn();
          }
        });
        $(".load").hide();
      }
      if(id!=""&&pass==""){
        var IP= localStorage.getItem("IP");
        var data= "action=login&ID_USUARIO="+$("#ID_USUARIO").val();
        jQuery.ajax({
           type: 'POST',
           url: "http://"+IP+"/casamotor/services.php",
           crossDomain: true,
           data: data,
           dataType: 'json',
           async: false, 
           timeout: 10000, // 10 seconds
           success: function(res) {
             if(res.msg){
               window.location.href = "internal.html";
             }else{
              $(".load").hide();
              $(".msg").show();
             }            
           },
           error:function(request, status, error){
             alert("Sistema no disponible en estos momentos.");
             $(".load").hide();
           }
         });
      }
    }else{
      $("#ID_USUARIO").css("background-color","#FBD5D0");
    }
    });    
    $("#IP").change(function() {
      localStorage.setItem("IP", $("#IP").val());
      $("#IP").val(localStorage.getItem("IP")).css("background-color","#CFC");
      location.reload();
      $("#PASSWORD").val(''); 
    });
  });