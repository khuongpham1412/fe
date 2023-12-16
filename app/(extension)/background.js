// chrome.runtime.onInstalled.addListener(function () {
//     console.log("Extension installed.");
//   });
  
//   // chrome.action.onClicked.addListener(function (tab) {
//   //   chrome.tabs.sendMessage(tab.id, { action: "togglePopup" });
//   // });

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === "callApi") {
//     // Thực hiện cuộc gọi API ở đây
//     fetch(request.url)
//       .then(response => response.json())
//       .then(data => {
//         // Gửi kết quả về cho content.js
//         sendResponse({ success: true, data: data });
//       })
//       .catch(error => {
//         sendResponse({ success: false, error: error.message });
//       });

//     // Trả về true để giữ kết nối với sendResponse
//     return true;
//   }
// });

import { initialize } from './src/background/index.js';

// NOTE: This file must be in the top-level directory of the extension according to the docs

initialize();

  