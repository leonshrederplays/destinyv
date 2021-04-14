

function handleDisconnect(player, reason) {
    if (!player || !player.valid) {
        console.log(`Looks like this player is already invalid. Can't save anything.`);
        return;
    }

    console.log(`${player.name} has disconnected.`);
}