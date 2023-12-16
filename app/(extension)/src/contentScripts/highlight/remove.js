import { HIGHLIGHT_CLASS, DELETED_CLASS } from './highlight/constants.js';

import { removeHighlightEventListeners } from '../hoverTools/index.js';
import { update as updateStorage } from '../utils/storageManager.js';

function remove(highlightId) {
    const highlights = $(`.highlighter--highlighted[data-highlight-id='${highlightId}']`);
    $('.highlighter--hovered').removeClass('highlighter--hovered');

    highlights.css('backgroundColor', 'inherit');
    highlights.css('color', 'inherit');
    highlights.removeClass(HIGHLIGHT_CLASS).addClass(DELETED_CLASS);
    updateStorage(highlightId, window.location.hostname + window.location.pathname, window.location.pathname, 'inherit', 'inherit'); // update the value in the local storage

    // Xóa các sự kiện đã được đăng ký cùng với text highlight
    // Khi người dùng highlight text đã được đăng ký sự kiện bên trong (nhận sự kiện khi hover vào text đã highlight)
    highlights.each((_, el) => {
        removeHighlightEventListeners(el);
    });
}

export default remove;
