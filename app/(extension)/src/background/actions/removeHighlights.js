import { HIGHLIGHT_NAME } from '../../utils/constants.js';
import { trackEvent } from '../analytics.js';
import { executeInCurrentTab } from '../utils.js';

function removeHighlights() {
    function contentScriptRemoveHighlights() {
        window.highlighterAPI.highlights.deleteAll();
    }

    executeInCurrentTab({ func: contentScriptRemoveHighlights });
}

export default removeHighlights;
