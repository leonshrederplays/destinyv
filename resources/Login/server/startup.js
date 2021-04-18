  /// <reference types="@altv/types-server" />
  import alt from 'alt-server';
  import chalk from 'chalk';

  // SECTION Load Database Stuff
  import './database/connection/connect';

  // !SECTION

  // SECTION Load Client emits.
  import './clientEmits/SendCredentialsToServer';

  // !SECTION

  // SECTION Load Alt:V Files

  // SECTION Commands
  // Commands
  import './commands/respawn';
  import './commands/sethp';
  import './commands/utility';
  import './commands/vehicle';
  import './commands/weapon';
  import './commands/setmodel';

  // !SECTION


  // SECTION Configuration Files
  import './configuration/config';

  // !SECTION


  // SECTION Events
  import './events/playerConnect';
  import './events/playerDeath';
  import './events/playerDisconnect';

  // !SECTION


  // SECTION Prototypes
  import './prototypes/player';

  // !SECTION

  // SECTION Systems
  import './systems/chat';

  // !SECTION

  // SECTION Utility
  import './utility/array';
  import './utility/vector';


  // !SECTION
  // NOTE Add Help-Command after all Server-Side is loaded.
  import { registerCmd, commands } from './systems/chat';
  registerCmd('help', '/help | Show all commands', handleHelp);
  function handleHelp(player) {
    for (const [key, value] of Object.entries(commands)) {
      player.send(`${value.description}`);
    }
  }
  // !SECTION


