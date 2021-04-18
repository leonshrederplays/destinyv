import alt from 'alt-server';
import { PedModels } from '../gamedata/playermodels';
import {
    registerCmd
} from '../systems/chat';

registerCmd('setmodel', '/setmodel | Sets the Model of the player.', handleSetModel);

function handleSetModel(player, args) {
    if (!args || args.length <= 0) {
        player.send('/setmodel (playermodel)');
        player.send(`Current model is: ${Object.keys(PedModels).find(key => PedModels[key] === player.model)}`)
        return;
    }

    let modelName = args[0];
    
    if(args[0] == "random") {
        var keys = Object.keys(PedModels);
        modelName = PedModels[keys[ keys.length * Math.random() << 0]];
    } else {
        if (!Object.keys(PedModels).includes(modelName)) {
            player.send(`{FF0000}${args[0]} is not a valid model.`);
            return;
        }
    }

    player.model = modelName;
    player.send(`{00FF00}Succesfully set the Playermodel to ${Object.keys(PedModels).find(key => PedModels[key] === player.model)}`);
}