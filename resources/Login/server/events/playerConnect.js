import alt from 'alt-server';
import chalk from 'chalk';
import { randomPositionAround } from '../utility/vector';
import { DEFAULT_CONFIG } from '../configuration/config';
import { PedModels } from '../gamedata/playermodels';

alt.log(chalk.greenBright('Loaded: events/playerConnect'));
alt.on('playerConnect', playerConnect);

function playerConnect(player) {
    alt.log(`${player.name} has connected to the server.`);
    alt.emitClient(player, 'chat:Init');
    let standardRandomModel = false;
    let randomModel;
    const randomPosition = randomPositionAround(DEFAULT_CONFIG.SPAWN, DEFAULT_CONFIG.SPAWN_RANGE);
    if(standardRandomModel) {
        const randomModelNumber = Math.floor(Math.random() * DEFAULT_CONFIG.RANDOM_PLAYER_MODELS.length);
        randomModel = DEFAULT_CONFIG.RANDOM_PLAYER_MODELS[randomModelNumber];
    } else {
        var keys = Object.keys(PedModels);
        randomModel = PedModels[keys[ keys.length * Math.random() << 0]];
    }

    // Set Model, Set Spawn, Send Message
    player.model = randomModel;
    player.spawn(randomPosition.x, randomPosition.y, randomPosition.z, 0); 
    player.send(`{9000FF}Welcome to Destiny V!`);

    // LINK ../../client/panels/login.js:10
    alt.emitClient(player, 'Start:Login');
}