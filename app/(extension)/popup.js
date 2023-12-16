document.addEventListener("DOMContentLoaded", function () {
  var overlayContainer = document.getElementById("overlay-container");
  var selectedTextElement = document.getElementById("selected-text");
  var saveButton = document.getElementById("save-button");
  var cancelButton = document.getElementById("cancel-button");

  var bookmarkButton = document.getElementById("bookmark-btn");
  var noteButton = document.getElementById("note-btn");
  var bookmarkPannel = document.getElementById("bookmark-pannel");
  var notePannel = document.getElementById("note-pannel");

  var settingButton = document.getElementById("setting-btn");
  var menuPannel = document.getElementById("menu-pannel");

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var currentTab = tabs[0];

    saveButton.addEventListener("click", function () {
      // Xử lý lưu dữ liệu tại đây (ví dụ: lưu vào local storage)
      alert("Dữ liệu đã được lưu: " + selectedTextElement.innerText);
      overlayContainer.style.display = "none";
    });

    cancelButton.addEventListener("click", function () {
      overlayContainer.style.display = "none";
    });
  });

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.action === "showOverlay") {
      var selection = window.getSelection().toString().trim();

      if (selection) {
        selectedTextElement.innerText = selection;
        overlayContainer.style.display = "block";
      }
    } else if (request.action === "hideOverlay") {
      overlayContainer.style.display = "none";
    }
  });

  bookmarkButton.addEventListener("click", function () {
    if (!bookmarkButton.classList.contains("active")) {
      bookmarkButton.classList.add("active");
      bookmarkPannel.style.display = "block";
      notePannel.style.display = "none";
      noteButton.classList.remove("active");
    }
  });

  noteButton.addEventListener("click", function () {
    if (!noteButton.classList.contains("active")) {
      noteButton.classList.add("active");
      notePannel.style.display = "block";
      bookmarkPannel.style.display = "none";
      bookmarkButton.classList.remove("active");
    }
  });

  settingButton.addEventListener("click", function () {
    if (menuPannel.style.display !== "block") {
      menuPannel.style.display = "block";
    } else {
      menuPannel.style.display = "none";
    }
  });

  menuPannel.addEventListener("mouseleave", function () {
    console.log("lose focus");
    menuPannel.style.display = "none";
  });
});
