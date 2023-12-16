const host = "http://localhost:8000";

async function createHighlightRepo(data = {}) {
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    fetch(`${host}/highlights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Gửi kết quả về cho content.js
        sendResponse({ success: true, data: data });
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });

    // Trả về true để giữ kết nối với sendResponse
    return true;
  });
}

export { createHighlightRepo };
