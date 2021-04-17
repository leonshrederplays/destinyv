import alt from 'alt-server';
import {
    registerCmd
} from '../systems/chat';

registerCmd('sethp', '/sethp | Sets the HP of the player.', handleSetHP);

function handleSetHP(player, arg) {
    if (!arg || arg.length <= 0) {
        player.send('/sethp (amount)');
        return;
    }
    const amount = parseInt(arg[0]);
    if (isNaN(amount)) {
        player.send(`{FF0000}The amount specified was not a number.`);
        return;
    }
    player.health = amount+100;
    player.send(`{00FF00}Succesfully set the HP to ${player.health/2}`);
}