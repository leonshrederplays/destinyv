/// <reference types="@altv/types-client" />
import alt from 'alt-client';
import * as native from 'natives';

// SECTION Load Events

// !SECTION

// SECTION Panels
// Load Panels
import '/client/panels/login';
import '/client/panels/chat';

// !SECTION
// You won't see this unless you're in-game.
alt.log('The Client-Sided Scripts are now fully loaded');