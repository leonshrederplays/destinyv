$(document).ready(function(){
    $("#submit").click(function(){
        
        var username = $("#username").val();
        if('alt' in window){
        alt.emit('StuffLogin:ToClient', username);
        }
        var password = $("#password").val();
        if('alt' in window){
            alt.emit('StuffLogin:ToClient', password);
            }
    });
});





