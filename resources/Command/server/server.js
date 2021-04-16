import * as alt from 'alt';
import chat from 'chat';


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