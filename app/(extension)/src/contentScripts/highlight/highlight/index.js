// import highlightLegacy from './highlightLegacy.js';
// import highlightV3 from './highlightV3.js';
import highlightV4 from './highlight-v4.js';

function highlight(selectionString, container, selection, color, textColor, highlightIndex, version = null) {
    return highlightV4(selectionString, container, selection, color, textColor, highlightIndex);
}

export * from './constants.js';
export default highlight;
