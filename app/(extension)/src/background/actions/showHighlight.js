import { HIGHLIGHT_NAME } from '../../utils/constants.js';
import { trackEvent } from '../analytics.js';
import { executeInCurrentTab } from '../utils.js';

function showHighlight(highlightId) {
    function contentScriptShowHighlight(highlightId) {
        window.highlighterAPI.highlight.show(highlightId);
    }

    executeInCurrentTab({ func: contentScriptShowHighlight, args: [highlightId] });
}

export default showHighlight;
