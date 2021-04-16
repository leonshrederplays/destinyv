import * as alt from 'alt';

import readline from 'readline';
// Config for Command line reading.
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function (line) {
    let args = line.trim().toLowerCase().split(" ");

    if (args.length > 0) {
        if (args[0] === 'close') {
            console.log("Stopping Server...");
            process.kill(process.pid);
        } else if (args[0] === 'vehicle' && args.length > 1) {
            console.log(players);
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