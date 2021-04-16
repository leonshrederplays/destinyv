/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from "alt";
import { everyTick } from "alt-client";
import * as native from "natives";
import * as chat from 'chat';

alt.on('UsernameRegister:ToClient', username);

alt.on('emailRegister:ToClient', email);

alt.on('passwordRegister:ToClient', password);


function username(username) {

    alt.emitServer('UsernameRegister:ToServer', username);

};


function email(email){

    alt.emitServer('emailRegister:ToServer', email);
};


function password(password){

    alt.emitServer('passwordRegister:ToServer', password);

};

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