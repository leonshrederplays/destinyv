$(function() {
    $("#submit").on('click', (event) => {
        event.preventDefault();
        var credentials = [$("#username").val(), $("#email").val(), $("#password").val()];
        if('alt' in window){
            alt.emit('SendRegisterCredentials:ToClient', credentials);
            console.log("Submited Credentials to Client");
        }
    });
});