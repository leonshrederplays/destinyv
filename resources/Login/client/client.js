import * as alt from "alt";
import { everyTick } from "alt-client";
import * as native from "natives";

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
