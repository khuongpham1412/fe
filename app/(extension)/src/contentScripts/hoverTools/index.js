import {
  HIGHLIGHT_CLASS,
  updateColor as updateHighlightColor,
  remove as removeHighlight,
} from "../highlight/index.js";

let hoverToolEl = null;
let hoverToolTimeout = null;
let currentHighlightEl = null;
let highlightClicked = false;
let copyBtnEl = null;
let changeColorBtnEl = null;
let deleteBtnEl = null;
let translateBtnEl = null;
let addToCategoryBtnEl = null;

function initializeSelectedTools() {
  // Tạo node sử dụng để hiển thị icon khi bôi đen text
  var displayIconWhenSelected = document.createElement("div");
  displayIconWhenSelected.className = "highlight-icon";

  // Tạo node để hiển thị thẻ cha bao bọc các thẻ màu để lựa chọn
  var displayColorBoard = document.createElement("div");
  displayColorBoard.className = "additional-info";

  var colors = [
    "#ff5959", //red
    "#5983ff", //blue
    "#59ff72", //green
    "#ffba59", //orange
    "#c559ff", //pruple
    "#ff59f7", //pink
    "#fff959", //yellow
    "green",
    "black",
  ];
  // Bắt đầu tạo các thẻ màu trong thẻ cha
  for (var i = 1; i <= 10; i++) {
    // Create a new div element
    if (i != 10) {
      var colorNode = document.createElement("div");
      colorNode.classList.add("square");
      colorNode.style.backgroundColor = colors[i - 1];
      // Set sự kiện cho các thẻ màu khi click
      colorNode.addEventListener("click", async function (event) {
        let color = event.target.style.backgroundColor;
        chrome.runtime.sendMessage({
          action: "highlight",
          color: color,
        });
      });
    } else {
      // Tạo node
      var colorNode = document.createElement("div");
      var addNode = document.createElement("div");
      var uitlNode = document.createElement("div");
      var translateNode = document.createElement("div");
      var saveNode = document.createElement("div");

      // Node style
      uitlNode.classList.add("util-option");
      colorNode.classList.add("square");
      addNode.classList.add("gg-add");
      translateNode.textContent = "Translate";
      saveNode.textContent = "Save to new category";

      addNode.appendChild(uitlNode);
      colorNode.appendChild(addNode);
      uitlNode.appendChild(translateNode);
      uitlNode.appendChild(saveNode);

      // Bắt sự kiện
      colorNode.addEventListener("mouseenter", function () {
        uitlNode.style.display = "block";
      });
      colorNode.addEventListener("mouseleave", function () {
        uitlNode.style.display = "none";
      });

      uitlNode.addEventListener("mouseleave", function () {
        uitlNode.style.display = "none";
      });

      translateNode.addEventListener("click", function () {});

      saveNode.addEventListener("click", function () {});
    }

    displayColorBoard.appendChild(colorNode);
    // Add a line break after every 3 squares to create rows
    if (i % 4 === 0) {
      displayColorBoard.appendChild(document.createElement("br"));
    }
    displayIconWhenSelected.appendChild(displayColorBoard);
  }

  document.body.appendChild(displayIconWhenSelected);
}

function initializeHoverTools() {
  $.get(
    chrome.runtime.getURL("src/contentScripts/hoverTools/index.html"),
    (data) => {
      hoverToolEl = $(data);
      hoverToolEl.hide();
      // Lấy ra mã html hoverToolEl[0] và tạo sự kiện khi hover cho các nút đổi màu, xóa highlight text
      hoverToolEl[0].addEventListener("mouseenter", onHoverToolMouseEnter);
      hoverToolEl[0].addEventListener("mouseleave", onHighlightMouseLeave);

      // Lấy mã html button copy, đổi màu, xóa, dịch, thêm vào danh mục
      copyBtnEl = hoverToolEl.find(".highlighter--icon-copy")[0];
      changeColorBtnEl = hoverToolEl.find(".highlighter--icon-change-color")[0];
      deleteBtnEl = hoverToolEl.find(".highlighter--icon-delete")[0];
      translateBtnEl = hoverToolEl.find(".highlighter--icon-translate")[0];
      addToCategoryBtnEl = hoverToolEl.find(".highlighter--icon-add-to-category")[0];

      // Xét sự kiện cho 5 nút trên
      copyBtnEl.addEventListener("click", onCopyBtnClicked);
      deleteBtnEl.addEventListener("click", onDeleteBtnClicked);
      changeColorBtnEl.addEventListener("click", onChangeColorBtnClicked);
      translateBtnEl.addEventListener("click", function () {});
      addToCategoryBtnEl.addEventListener("click", function () {});
    }
  );
}

// Sự kiện copy text highlight
function onCopyBtnClicked() {
  const highlightId = currentHighlightEl.getAttribute("data-highlight-id");
  const highlights = document.querySelectorAll(
    `.${HIGHLIGHT_CLASS}[data-highlight-id='${highlightId}']`
  );
  const highlightText = Array.from(highlights)
    .map((el) => el.textContent.replace(/\s+/gmu, " "))
    .join(""); // clean up whitespace
  navigator.clipboard.writeText(highlightText);
  chrome.runtime.sendMessage({
    action: "track-event",
    trackCategory: "highlight-action",
    trackAction: "copy",
  });
}

// Sự kiện xóa text highlight
function onDeleteBtnClicked() {
  const highlightId = currentHighlightEl.getAttribute("data-highlight-id");
  removeHighlight(highlightId);

  getHoverToolEl()?.hide();
  hoverToolTimeout = null;
  chrome.runtime.sendMessage({
    action: "track-event",
    trackCategory: "highlight-action",
    trackAction: "delete",
  });
}

// Sự kiện đổi màu bg text highlight
function onChangeColorBtnClicked() {
  const highlightId = currentHighlightEl.getAttribute("data-highlight-id");
  updateHighlightColor(highlightId);
  chrome.runtime.sendMessage({
    action: "track-event",
    trackCategory: "highlight-action",
    trackAction: "change-color",
  });
}

function initializeHighlightEventListeners(highlightElement) {
  highlightElement.addEventListener("mouseenter", onHighlightMouseEnterOrClick);
  highlightElement.addEventListener("click", onHighlightMouseEnterOrClick);
  highlightElement.addEventListener("mouseleave", onHighlightMouseLeave);
}

// Khi bắt đầu hover hoặc click chuột vào text đã được highlight
function onHighlightMouseEnterOrClick(e) {
  const newHighlightEl = e.target;
  const newHighlightId = newHighlightEl.getAttribute("data-highlight-id");

  // nếu trước đó người dùng click chuột thì có thể di chuột ra bên ngoài
  if (highlightClicked && e.type !== "click") return;

  highlightClicked = e.type === "click";

  // Clear any previous timeout that would hide the toolbar, and
  if (hoverToolTimeout !== null) {
    clearTimeout(hoverToolTimeout);
    hoverToolTimeout = null;

    if (newHighlightId === currentHighlightEl.getAttribute("data-highlight-id"))
      return;
  }

  currentHighlightEl = newHighlightEl;

  // Hiển thị thanh công cụ gồm các icon copy, sửa màu, xóa
  displayToolbarToEditHighlight(newHighlightEl, e.clientX);

  // Remove any previous borders and add a border to the highlight (by id) to clearly see what was selected
  $(".highlighter--hovered").removeClass("highlighter--hovered");
  $(`.${HIGHLIGHT_CLASS}[data-highlight-id='${newHighlightId}']`).addClass(
    "highlighter--hovered"
  );
}
// Hiển thị thanh công cụ gồm các icon copy, sửa màu, xóa
function displayToolbarToEditHighlight(highlightEl, cursorX) {
  // cursorX is optional, in which case no change is made to the x position of the hover toolbar
  const boundingRect = highlightEl.getBoundingClientRect();
  const toolWidth = 180; // When changing this, also update the width in css #highlighter--hover-tools--container

  const hoverTop = boundingRect.top - 45;
  getHoverToolEl()?.css({ top: hoverTop });

  if (cursorX !== undefined) {
    let hoverLeft = null;
    if (boundingRect.width < toolWidth) {
      // center the toolbar if the highlight is smaller than the toolbar
      hoverLeft = boundingRect.left + boundingRect.width / 2 - toolWidth / 2;
    } else if (cursorX - boundingRect.left < toolWidth / 2) {
      // If the toolbar would overflow the highlight on the left, snap it to the left of the highlight
      hoverLeft = boundingRect.left;
    } else if (boundingRect.right - cursorX < toolWidth / 2) {
      // If the toolbar would overflow the highlight on the right, snap it to the right of the highlight
      hoverLeft = boundingRect.right - toolWidth;
    } else {
      // Else, center the toolbar above the cursor
      hoverLeft = cursorX - toolWidth / 2;
    }

    getHoverToolEl()?.css({ left: hoverLeft });
  }

  getHoverToolEl()?.show();
}

// Xóa các sự kiện lắng nghe khi người dùng hover vào text đã được highlight
// (Trường hợp text đó đã được xóa đi)
function removeHighlightEventListeners(highlightElement) {
  highlightElement.removeEventListener(
    "mouseenter",
    onHighlightMouseEnterOrClick
  );
  highlightElement.removeEventListener("click", onHighlightMouseEnterOrClick);
  highlightElement.removeEventListener("mouseleave", onHighlightMouseLeave);
}

function getHoverToolEl() {
  if (!hoverToolEl.isConnected) {
    // The first time we want to show this element, append it to the DOM.
    // It's also possible the webpage deleted this node from the DOM. In that case, simply re-attach it
    hoverToolEl.appendTo("body");
  }

  return hoverToolEl;
}

function hide() {
  $(".highlighter--hovered").removeClass("highlighter--hovered");
  getHoverToolEl()?.hide();
  hoverToolTimeout = null;
  highlightClicked = false;
}

// Khi hover vào popup (các icon copy, sửa, xóa) để bắt đầu copy, sửa màu, delete highlight
function onHoverToolMouseEnter() {
  if (hoverToolTimeout !== null) {
    clearTimeout(hoverToolTimeout);
    hoverToolTimeout = null;
  }
}

// Khi hover vào sau đó thoát khỏi text đã được highlight
function onHighlightMouseLeave() {
  if (!highlightClicked) {
    hoverToolTimeout = setTimeout(hide, 170);
  }
}

function displayHighlightIcon(rect) {
  // Tạo node sử dụng để hiển thị icon khi bôi đen text
  var displayIconWhenSelected = document.querySelector(".highlight-icon");
  displayIconWhenSelected.style.display = "block";
  displayIconWhenSelected.style.top = rect.top + window.scrollY - 26 + "px";
  displayIconWhenSelected.style.left = rect.right + window.scrollX + "px";
}

function removeHighlightIcon() {
  var displayIconWhenSelected = document.querySelector(".highlight-icon");
  displayIconWhenSelected.style.display = "none";
}

export {
  displayHighlightIcon,
  removeHighlightIcon,
  initializeSelectedTools,
  initializeHoverTools,
  initializeHighlightEventListeners,
  onHighlightMouseEnterOrClick,
  removeHighlightEventListeners,
};
