import alt from 'alt-client';
import { SendCredentialsToServer } from '../clientEmits/SendCredentialsToServer';
alt.log(`Loaded: panels/login`);

let loaded = false;
let opened = false;
let view;

// SECTION Login

// NOTE Listen to login Event.
alt.onServer('Start:Login', initializeLogin);

// NOTE Start Webview.
function initializeLogin() {
    if (!view) {
        //view = new alt.WebView('http://resource/client/html/auth/pages/register/register.html');
        view = new alt.WebView('http://resource/client/html/auth/pages/test/app.html');
        view.on('close:WebView', closeWebview);
        view.on('SendCredentials:ToClient', SendCredentialsToServer);
        view.focus();
        alt.showCursor(true);
    }
}

// NOTE Close Webview.
function closeWebview() {
    view.unfocus();
    alt.showCursor(true);
    view.destroy();
    view = undefined;
}

// !SECTION