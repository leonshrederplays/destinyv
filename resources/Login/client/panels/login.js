import alt from 'alt-client';
import { SendCredentialsToServer } from '../clientEmits/SendCredentialsToServer';
alt.log(`Loaded: panels/login`);

let loaded = false;
let opened = false;
let view;

alt.onServer('Start:Login', initializeLogin);
function initializeLogin() {
    if (!view) {
        view = new alt.WebView('http://resource/client/html/login/register.html');
        view.on('close:WebView', closeWebview);
        view.on('SendCredentials:ToClient', SendCredentialsToServer);
        view.focus();
        alt.showCursor(true);
    }
}

function closeWebview() {
    view.unfocus();
    alt.showCursor(true);
    view.destroy();
    view = undefined;
}