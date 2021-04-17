/// <reference types="@altv/types-client" />
/// <reference types="@altv/types-natives" />
import * as alt from "alt";
export const SendCredentialsToServer = (credentials) => {
    alt.emitServer('SendCredentials:ToServer', credentials);
    console.log("Submited Credentials to Server");
}