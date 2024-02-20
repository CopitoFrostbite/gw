$(document).ready(function() {
    console.log('Listo')    
    
    $("#js").hover(
        function() {
            $(this).css({"background-color": "lightgreen"});
        },
        function() {
            $(this).css({"background-color": "initial"});
        }
    );
    
    $(".jQuery").hover(
        function() {
            $(this).css({"background-color": "lightblue"});
        },
        function() {
            $(this).css({"background-color": "initial"});
        }
    );

    $("#js, .jQuery").mouseout(function() {
        $(this).css({"background-color": "initial"});
    });
    
});