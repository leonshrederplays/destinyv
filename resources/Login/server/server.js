import * as alt from 'alt';
import chat from 'chat';
import readline from 'readline';
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

// Los Santos Customs
let spawnPos = {
    x: -365.425,
    y: -131.809,
    z: 37.873
}

import {
    weaponModel
} from './weaponHashes.js';
import {
    VehicleModel
} from './vehicleHashes';
import {
    log
} from 'console';


let players = [];

alt.on('playerConnect', (player) => {

    // Log to Console
    alt.log(`==> ${player.name} has connected.`);

    // Displays message to all players.
    chat.broadcast(`==> ${player.name} has joined.`);

    // Sets the player's model.
    player.model = 'mp_m_freemode_01';

    // Spawns the player at coordinates x, y, z, with a delay of 1000 Milliseconds.
    player.spawn(spawnPos.x, spawnPos.y, spawnPos.z, 1000);

    // Emit to the player passed, the event name, the argument to send.
    alt.emitClient(player, 'Server:Log', 'hello', 'world');

    players.push(player);
})

alt.on('playerDisconnect', handleDisconnect);

function handleDisconnect(player, reason) {
    if (!player || !player.valid) {
        console.log(`Looks like this player is already invalid. Can't save anything.`);
        return;
    }

    console.log(`${player.name} has disconnected.`);
}

rl.on('line', function (line) {
    let args = line.trim().toLowerCase().split(" ");

    if (args.length > 0) {
        if (args[0] === 'close') {
            console.log("Stopping Server...");
            process.kill(process.pid);
        } else if (args[0] === 'vehicle' && args.length > 1) {
            log(players);
            players.forEach((player, index, arr) => {
                spawnVehicle(player, args[1]);
            })
        } else if (args[0] === 'armour' && args.length > 1) {
            players.forEach((player, index, arr) => {
                player.armour = 100;
            })
        } else if (args[0] === 'cash') {
            players.forEach((player, index, arr) => {
                player.setMeta('cash', 999999999);
            })
        }
    }
});

function spawnVehicle(player, vehicleModel) {
    let vehicle;

    try {
        vehicle = new alt.Vehicle(vehicleModel, player.pos.x + 2, player.pos.y, player.pos.z + 2, 0, 0, 0);
        console.log(`Spawned a vehicle for: ${player.name}`);
        return vehicle;
    } catch (err) {
        console.error(`${vehicleModel} does not exist.`);
    }

    if (!vehicle) {
        console.error(`${vehicleModel} does not exist.`);
        return;
    }


}

alt.on('playerDeath', handleDeath);

export const deadPlayers = {};
const TimeBetweenRespawn = 1000; // 5 Seconds

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

        player.spawn(spawnPos.x, spawnPos.y, spawnPos.z, 0); // Respawn the player.
    }, TimeBetweenRespawn);
}

chat.registerCmd('vehicle', (player, modelName) => {
    if (!modelName) {
        chat.send(player, `/vehicle [vehicleName]`);
        return;
    }
    spawnVehicle(player, modelName.toString());
});

chat.registerCmd('weapon', (player, weaponName) => {
    if (!weaponName) {
        chat.send(player, `/weapon [weaponName]`);
        return;
    }

    try {
        player.giveWeapon(weaponModel[weaponName.toString().toLowerCase()], 999, true);
        log(`Spawned Weapon for ${player.name}`);
    } catch (err) {
        console.error(`${weaponName} does not exist.`);
        throw err;
    }

})

chat.registerCmd('giveall', (player, msg) => {
    for (let weaponHash of Object.values(weaponModel)) {
        player.giveWeapon(weaponHash, 9999, true);
    }
    log(`Gave all Weapons to ${player.name}`);
});

alt.on('weaponDamage', (attacker, victim, weaponHash, damage, offset, bodyPart) => {
    victim.health = victim.health - damage;
    return true;
    // Anything that is not a battle axe does damage.
});