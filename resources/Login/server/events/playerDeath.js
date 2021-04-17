import alt from 'alt-server';
import chalk from 'chalk';
import {
    randomPositionAround
} from '../utility/vector';
import {
    DEFAULT_CONFIG
} from '../configuration/config';
import {
    WEAPON_BY_HASH
} from '../gamedata/weapons';

export const deadPlayers = {};
const TimeBetweenRespawn = 5000; // 5 Seconds

alt.log(chalk.greenBright('Loaded: events/playerDeath'));
alt.on('playerDeath', playerDeath);

function playerDeath(victim, killer, weaponHash) {
    if (!victim || !victim.valid) {
        return;
    }

    if (deadPlayers[victim.id]) {
        return;
    }

    if (killer && WEAPON_BY_HASH[weaponHash]) {
        alt.emitClient(
            null,
            'chat:Send',
            `${victim.name} was killed by ${killer.name} with ${WEAPON_BY_HASH[weaponHash]}`
        );
    }

    if (deadPlayers[victim.id]) {
        return;
    }

    victim.send(`You have died and you will be respawned in ${TimeBetweenRespawn/1000} seconds.`);
    deadPlayers[victim.id] = alt.setTimeout(() => {
        // Check if the player still has an entry.
        if (deadPlayers[victim.id]) {
            delete deadPlayers[victim.id];
        }

        // Check if the player hasn't just left the server yet.
        if (!victim || !victim.valid) {
            return;
        }

        const randomPosition = randomPositionAround(DEFAULT_CONFIG.SPAWN, DEFAULT_CONFIG.SPAWN_RANGE);
        victim.spawn(randomPosition.x, randomPosition.y, randomPosition.z, 0);
    }, TimeBetweenRespawn);
}