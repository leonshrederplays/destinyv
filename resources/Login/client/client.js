/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from "alt";
import { everyTick } from "alt-client";
import * as native from "natives";
import * as chat from 'chat';


alt.onServer('Start:Login', startLogin);


function startLogin(){
    let webview;

    if (!webview){
        webview = new alt.WebView('../html/index.html');
        webview.on('close:WebView', closeWebview);
      }
    
      webview.focus();
      alt.showCursor(true);}



      function closeWebview(){
        alt.showCursor(true);
        webview.destroy();
        webview = undefined;
      }






// This event fires when the chat is opened.
alt.on('chatOpened', () => {
    alt.log('Chat was opened!');
});

// This event fires when the chat is closed.
alt.on('chatClosed', () => {
    alt.log('Chat was closed!');
});

// This event is fired when the player presses enter or the chat message is longer than 1.
alt.on('messageSent', (msg) => {
    alt.log(msg);
});

chat.pushMessage('tacoGuy', 'hello');
chat.pushLine('hello there!');

var chatHiddenStatus = chat.isChatHidden();
var chatOpenStatus = chat.isChatOpen();