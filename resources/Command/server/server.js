import * as alt from 'alt';
import chat from 'chat';

alt.on('playerDeath', handleDeath);

export const deadPlayers = {};
const TimeBetweenRespawn = 5000; // 5 Seconds

/**
 * @param {alt.Player} player
 */
function handleDeath(player) {
    if (deadPlayers[player.id]) {
        return;
    }

    deadPlayers[player.id] = alt.setTimeout(() => {
        // Check if the player still has an entry.
        if (deadPlayers[player.id]) {
            delete deadPlayers[player.id];
        }

        // Check if the player hasn't just left the server yet.
        if (!player || !player.valid) {
            return;
        }

        player.spawn(0, 0, 0, 0); // Respawn the player.
    }, TimeBetweenRespawn);
}

chat.registerCmd('sethp', (player, arg) => {
    if (!arg || arg.length <= 0){
        chat.send(player, '/sethp (amount)');
        return;
    }
    const amount = parseInt(arg[0]);
    if(isNaN(amount)){
        chat.send(player, 'The amount specified was not a number.');
        return;
    }
    player.health = amount;
});

chat.registerCmd('veh', (player, arg) => {
    if (!arg || arg.length <= 0){
        chat.send(player, '/veh (model)');
        return;
    }
    try{
    let newVehicle = new alt.Vehicle(arg[0], player.pos.x + 3, player.pos.y, player.pos.z, 0, 0, 0);
    alt.emitClient(player, 'vehicle:SetInto', newVehicle);
    }
    catch(err){
        chat.send(player, 'Model existiert nicht du Gottloser, Hund!');
        alt.log(err);
    }
});


chat.registerCmd('setmodel', (player, arg) => {
    
    if (!arg || arg.length <= 0){
        chat.send(player, '/setmodel (playermodel)');
        return;
    }
    else{
        player.model = arg;
    }
});