$(document).ready(function(){
    $("#submit").click(function(){
        var username = $("#username").val();
        if('alt' in window){
            alt.emit('UsernameRegister:ToClient', username);
            }
        var email = $("#email").val();
        if('alt' in window){
            alt.emit('emailRegister:ToClient', email);
            }
        var password = $("#password").val();
        if('alt' in window){
            alt.emit('passwordRegister:ToClient', password);
            }
    });
});



