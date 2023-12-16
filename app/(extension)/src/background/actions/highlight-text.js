import { executeInCurrentTab } from '../utils.js';

// Truyền color để bắt đầu tạo một text highlight với color truyền vào
// Hàm 'create' được viết trong 'contentScript/highlight/create.js'
async function highlightText(color) {
    function contentScriptHighlightText(color) {
        window.highlighterAPI.highlight.createHighlight(color);
    }

    executeInCurrentTab({ func: contentScriptHighlightText, args: [color] });
}

export default highlightText;
