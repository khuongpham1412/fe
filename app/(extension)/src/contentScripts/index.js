import * as api from './api.js';
import { initializeHighlighterCursor } from './event-start-selection/index.js';
// import { loadAll as loadAllHighlights } from './highlights/index.js';
import { initializeHoverTools, initializeSelectedTools} from './hoverTools/index.js';

function initialize() {
    initializeSelectedTools();
    initializeHoverTools();
    initializeHighlighterCursor();
    exposeAPI();
    // loadAllHighlights();
}

function exposeAPI() {
    window.highlighterAPI = api;
}

export {initialize};