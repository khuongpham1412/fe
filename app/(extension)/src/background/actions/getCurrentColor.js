import getColorOptions from './getColorOptions.js';

import { DEFAULT_COLOR_TITLE } from '../constants.js';

// Lấy màu hiện tại đang highlight trên text, màu khi highlight được lưu vào storage
async function getCurrentColor() {
    const { color } = await chrome.storage.sync.get("color");
    const colorTitle = color || DEFAULT_COLOR_TITLE;
    // Lấy tất cả những màu có trong storage
    const colorOptions = await getColorOptions();
    return colorOptions.find((colorOption) => colorOption.title === colorTitle) || colorOptions[0];
}

export default getCurrentColor;
