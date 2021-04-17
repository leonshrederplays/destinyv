import * as alt from 'alt';
import chat from 'chat';

export const deadPlayers = {};

    const TimeBetweenRespawn = 5000; // 5 Seconds
    alt.on('playerDeath', handleDeath);

    /**
     * @param {alt.Player} player
     */
    function handleDeath(player) {
        //Spawning the Player at the Weed Farm
        let spawnPos = {
            x: 2208.777,
            y: 5578.235,
            z: 53.735
        }

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

            player.spawn(spawnPos.x, spawnPos.y, spawnPos.z, 1000); // Respawn the player.
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