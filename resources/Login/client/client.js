/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from "alt";
import {
  everyTick
} from "alt-client";
import * as native from "natives";
import * as chat from 'chat';


alt.onServer('Start:Login', startLogin);


function startLogin() {
  let webview;

  if (!webview) {
    webview = new alt.WebView('http://resource/client/html/index.html');
    webview.on('close:WebView', closeWebview);
    webview.on('SendRegisterCredentials:ToClient', SendCredentialsToServer);
    webview.focus();
    alt.showCursor(true);
  }
}

function SendCredentialsToServer(credentials) {
  alt.emitServer('SendRegisterCredentials:ToServer', credentials);
  console.log("Submited Credentials to Server");
}

function closeWebview() {
  webview.unfocus();
  alt.showCursor(true);
  webview.destroy();
  webview = undefined;
}