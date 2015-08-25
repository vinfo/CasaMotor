//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        $("#nav").removeClass("in");
        event.preventDefault();
    });
    $('a.scan').bind('click', function(event) {        
        scan();
        event.preventDefault();
    });    
});
function scan() {
    alert("Escanear código");
    cordova.plugins.barcodeScanner.scan(function(result) {
        alert("We got a barcode\n" +
          "Result: " + result.text + "\n" +
          "Format: " + result.format); 
    }, function(error) {
        alert("Scanning failed: " + error);
    });
}
