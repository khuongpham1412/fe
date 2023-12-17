// chrome.runtime.onInstalled.addListener(function () {
//     console.log("Extension installed.");
//   });
  
//   // chrome.action.onClicked.addListener(function (tab) {
//   //   chrome.tabs.sendMessage(tab.id, { action: "togglePopup" });
//   // });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "callApi") {
    // Thực hiện cuộc gọi API ở đây
    fetch(request.url, {
        headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJraHVvbmcxQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiMTIzNDU2Iiwic3RhdHVzIjoxLCJpYXQiOjE3MDI3MTYwNDZ9.lgvzR6dX5w6_fz_ZsseayNbeTRm6Of0VC0HEo3j5QcA'}
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Gửi kết quả về cho content.js
        // sendResponse({ success: true, data: data });
      })
      .catch(error => {
        console.log(error);
        // sendResponse({ success: false, error: error.message });
      });

    // Trả về true để giữ kết nối với sendResponse
    return true;
  }
});

// import { initialize } from './src/background/index.js';

// NOTE: This file must be in the top-level directory of the extension according to the docs

// initialize();

  