$(function() {
    $("#submit").on('click', (event) => {
        event.preventDefault();
        let username = $("#username").val().trim();
        let email = $("#email").val().trim();
        let password = $("#password").val().trim();
        console.log(validateEmail(email));
        if(username != '' && email != '' && password != '' && validateEmail(email)) {
            console.log(`${username} | ${email} | ${password} is valid`);
        } else {
            console.log(`${username} | ${email} | ${password} is invalid`);
        }
        var credentials = [];

/*         if('alt' in window){
            alt.emit('SendCredentials:ToClient', credentials);
            console.log("Submited Credentials to Client");
        } */
    });
});

var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
// Thanks to:
// http://fightingforalostcause.net/misc/2006/compare-email-regex.php
// http://thedailywtf.com/Articles/Validating_Email_Addresses.aspx
// http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378
function validateEmail(email)
{
	if (!email)
		return false;
		
	if(email.length>254)
		return false;

	var valid = tester.test(email);
	if(!valid)
		return false;

	// Further checking of some things regex can't handle
	var parts = email.split("@");
	if(parts[0].length>64)
		return false;

	var domainParts = parts[1].split(".");
	if(domainParts.some(function(part) { return part.length>63; }))
		return false;

	return true;
}