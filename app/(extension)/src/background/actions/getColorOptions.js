import { DEFAULT_COLORS } from '../constants.js';

// Lấy ra tất cả các màu
function getColorOptions() {
    return new Promise((resolve, _reject) => {
        chrome.storage.sync.get({
            colors: DEFAULT_COLORS, // Default value
        }, ({ colors }) => resolve(colors));
    });
}

export default getColorOptions;
