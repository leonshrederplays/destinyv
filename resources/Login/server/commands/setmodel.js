import alt from 'alt-server';
import { PedModels } from '../gamedata/playermodels';
import {
    registerCmd
} from '../systems/chat';

registerCmd('setmodel', '/setmodel | Sets the Model of the player.', handleSetModel);

function handleSetModel(player, args) {
    if (!args || args.length <= 0) {
        player.send('/setmodel (playermodel)');
        return;
    }

    const modelName = args[0];
    if (!Object.keys(PedModels).includes(modelName)) {
        player.send(`{FF0000}${args[0]} is not a valid model.`);
        return;
    }

    player.model = args[0];
    player.send(`{00FF00}Succesfully set the Playermodel to ${args[0]}`);
}