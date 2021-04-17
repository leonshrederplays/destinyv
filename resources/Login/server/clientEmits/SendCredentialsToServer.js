/// <reference types="@altv/types-server" />
import alt from 'alt-server';
import chalk from 'chalk';

alt.onClient('SendCredentials:ToServer', (player, credentials) => {
    alt.log(credentials);
});