// let isPopupVisible = false;

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.action === "togglePopup") {
//     isPopupVisible = !isPopupVisible;
//     togglePopup();
//   }
// });

// function togglePopup() {
//   const popupDiv = document.getElementById("note-container");

//   if (!popupDiv) {
//     createPopup();
//   } else {
//     popupDiv.style.display = isPopupVisible ? "block" : "none";
//   }
// }

// function createPopup() {
//   const popupDiv = document.createElement("div");
//   popupDiv.id = "note-container";
//   popupDiv.innerHTML = `
//     <textarea id="note"></textarea>
//     <button id="save-button">Lưu Ghi Chú</button>
//   `;

//   document.body.appendChild(popupDiv);

//   const noteTextarea = document.getElementById("note");
//   const saveButton = document.getElementById("save-button");

//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     const currentTab = tabs[0];
//     const tabUrl = currentTab.url;

//     noteTextarea.value = 'Ghi chú cho trang web: ' + tabUrl;
//   });

//   saveButton.addEventListener("click", function () {
//     const noteText = noteTextarea.value;
//     alert('Ghi chú đã được lưu!');
//   });
// }

// document.addEventListener('selectionchange', function () {
//     var selection = window.getSelection();

//     if (selection.rangeCount > 0) {
//       var selectedRange = selection.getRangeAt(0);
//       var selectedText = selectedRange.toString();
//       console.log(selectedText);
//       // Tìm vị trí của selectedText trong nội dung đầy đủ
//       // var fullText = document.getElementById('paragraph').innerText;
//       // var index = fullText.indexOf(selectedText, selectedRange.startOffset);

//       // if (index !== -1) {
//       //   // Chia nội dung thành ba phần
//       //   var part1 = fullText.substring(0, index);
//       //   var part2 = selectedText;
//       //   var part3 = fullText.substring(index + selectedText.length);
//       //   var spanTag = document.createElement('span');
//       //     spanTag.innerText = part2;

//       //     // Thay thế nội dung đầy đủ bằng phần 1 + spanTag.outerHTML + phần 3
//       //     var paragraph = document.getElementById('paragraph');
//       //     paragraph.innerHTML = part1 + spanTag.outerHTML + part3;
//       //   }
//       }
//     });
// const highlightIcon = document.querySelector('.highlight-icon');
// import axios from "axios";
// try {
//   const response = await axios.get('https://64ad35b7b470006a5ec58b33.mockapi.io/api/users/users')
//     .then(res => {
//       console.log(res);
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   console.log(response);
// } catch (error) {
//   console.error(error);
// }

chrome.runtime.sendMessage(
  {
    action: "callApi",
    url: "https://64ad35b7b470006a5ec58b33.mockapi.io/api/users/users",
  },
  function (response) {
    console.log(response);
  }
);

const rangeInfo = {
  startContainer: Object,
  startOffset: Object,
  endContainer: Object,
  endOffset: Object,
};

function getNodePath(node) {
  const path = [];
  while (node.parentNode) {
    const index = Array.from(node.parentNode.childNodes).indexOf(node);
    path.unshift(index);
    node = node.parentNode;
  }
  return path;
}

// Utility function to get a node by its path
function getNodeByPath(path) {
  let node = document;
  for (const index of path) {
    node = node.childNodes[index];
    if (!node) break;
  }
  return node;
}

function getCharacterAtOffset(container, offset) {
  if (container.nodeType === Node.TEXT_NODE) {
    return container.textContent.charAt(offset);
  } else if (container.nodeType === Node.ELEMENT_NODE) {
    var nodeAtIndex = container.childNodes[offset];
    if (nodeAtIndex && nodeAtIndex.nodeType === Node.TEXT_NODE) {
      return nodeAtIndex.textContent.charAt(0);
    }
  }
  return null;
}

let isHightLight = false;
let spanIdCounter = 1;
let lastSpanId;

// Create node use display icon when text selected
// Tạo node sử dụng để hiển thị icon khi bôi đen text
var displayIconWhenSelected = document.createElement("div");
displayIconWhenSelected.className = "highlight-icon";
document.body.appendChild(displayIconWhenSelected);

// Create node use display color board
// Tạo node để hiển thị thẻ cha bao bọc các thẻ màu để lựa chọn
var displayColorBoard = document.createElement("div");
displayColorBoard.className = "additional-info";

// Create node display edit and delete
// Tạo node để hiển thị icon xóa và sửa
const displayEditOrDelete = document.createElement("div");
displayEditOrDelete.className = "highlight-focus";
displayEditOrDelete.appendChild(displayColorBoard);

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
    handleEventSelectedColorToHighlight();
  } else {
    var colorNode = document.createElement("div");
    colorNode.classList.add("square");
    colorNode.style.width = "20px";
    colorNode.style.height = "20px";
    colorNode.style.background = "red";
    var colorNode1 = document.createElement("input");
    colorNode1.type = "color";
    colorNode1.id = "colorPicker";

    colorNode.addEventListener('click', () => {
      colorNode1.click();
      // colorNode1.addEventListener('input', (event) => {
      //   var selectedColor = event.target.value;
      //   console.log('Màu đã chọn:', selectedColor);
  
      // });
      colorNode1.addEventListener('mouseleave', function(event) {
        console.log('Chuột đã rời khỏi color picker');
        var selectedColor = event.target.value;
        let selection = JSON.parse(sessionStorage.getItem("item"));
        if (selection && selection.toString().length > 0) {
          // const savedRangeInfo = sessionStorage.getItem("range");
          // const rangeInfo = JSON.parse(savedRangeInfo);
          const range = document.createRange();
          const startContainer = getNodeByPath(rangeInfo.startContainer);
          const endContainer = getNodeByPath(rangeInfo.endContainer);
          range.setStart(startContainer, rangeInfo.startOffset);
          range.setEnd(endContainer, rangeInfo.endOffset);
    
          const spanTextHightlight = document.createElement("text-highlight");
          // const range = selection.getRangeAt(0);
          const textHighLight = selection.toString();
          let spanId = `highlighted-text-${spanIdCounter}`;
          spanTextHightlight.id = spanId;
          spanTextHightlight.appendChild(document.createTextNode(textHighLight));
          range.deleteContents();
          range.insertNode(spanTextHightlight);
          lastSpanId = spanId;
          spanIdCounter++;
          isHightLight = false;
    
          // Get the background color of the clicked div
          const highlightedSpan = document.getElementById(lastSpanId);
          highlightedSpan.style.backgroundColor = selectedColor;
          highlightedSpan.style.cursor = "pointer";
    
          handleEventWhenEditColorOrDeleteToHighlight(range, spanId);
          
          // console.log(displayColorBoard.length);
          // if(displayColorBoard.length > 11){
          //   var children = displayColorBoard.children;
          //   var indexToChange = 8;
    
          //   if (indexToChange >= 0 && indexToChange < children.length) {
          //     children[indexToChange].style.backgroundColor = selectedColor;
          //   }
          // }else{
          //   var colorNode = document.createElement("div");
          //   colorNode.classList.add("square");
          //   colorNode.style.backgroundColor = selectedColor;
          colorNode.appendChild(colorNode1)
            displayColorBoard.appendChild(colorNode);
            displayIconWhenSelected.style.display = 'none';
          // }
          
          sessionStorage.clear();
        }
      });
    });
  
    // let colorPicker = document.createElement("div");
    // colorPicker.classList.add("gg-add");
    // divChild.appendChild(colorPicker);
    // divChild.addEventListener("click", function (event) {
    //   // Get the background color of the clicked div
    //   const colorPicker = document.getElementById("colorPicker");
    //   colorPicker.addEventListener("input", function () {
    //     const highlightedSpan = document.getElementById(lastSpanId);
    //     if (highlightedSpan) {
    //       highlightedSpan.style.backgroundColor = colorPicker.value;
    //     }
    //   });
    // });
  }

  displayColorBoard.appendChild(colorNode);
  // Add a line break after every 3 squares to create rows
  if (i % 4 === 0) {
    displayColorBoard.appendChild(document.createElement("br"));
  }
}

displayIconWhenSelected.appendChild(displayColorBoard);

document.addEventListener("selectionchange", function () {
  // let a = document.querySelector(".additional-info");
  // if(a)
  //   a.style.display = "none";
  // let displayEditOrDelete = document.querySelector(".highlight-focus");
  // if(displayEditOrDelete)
  //   displayEditOrDelete.style.display = "none";
  // displayIconWhenSelected.style.display = "none";
});

function handleEventSelectedColorToHighlight() {
  colorNode.addEventListener("click", function (event) {
    let selection = JSON.parse(sessionStorage.getItem("item"));
    if (selection && selection.toString().length > 0) {
      // const savedRangeInfo = sessionStorage.getItem("range");
      // const rangeInfo = JSON.parse(savedRangeInfo);
      const range = document.createRange();
      const startContainer = getNodeByPath(rangeInfo.startContainer);
      const endContainer = getNodeByPath(rangeInfo.endContainer);
      range.setStart(startContainer, rangeInfo.startOffset);
      range.setEnd(endContainer, rangeInfo.endOffset);

      const spanTextHightlight = document.createElement("text-highlight");
      // const range = selection.getRangeAt(0);
      const textHighLight = selection.toString();
      let spanId = `highlighted-text-${spanIdCounter}`;
      spanTextHightlight.id = spanId;
      spanTextHightlight.appendChild(document.createTextNode(textHighLight));
      range.deleteContents();
      range.insertNode(spanTextHightlight);
      lastSpanId = spanId;
      spanIdCounter++;
      isHightLight = false;

      // Get the background color of the clicked div
      var clickedColor = event.target.style.backgroundColor;
      const highlightedSpan = document.getElementById(lastSpanId);
      highlightedSpan.style.backgroundColor = clickedColor;
      highlightedSpan.style.cursor = "pointer";

      handleEventWhenEditColorOrDeleteToHighlight(range, spanId);

      sessionStorage.clear();
    } else {
      var clickedColor = event.target.style.backgroundColor;
      const highlightedSpan = document.getElementById(
        sessionStorage.getItem("test")
      );
      highlightedSpan.style.backgroundColor = clickedColor;
      highlightedSpan.style.cursor = "pointer";
      // var newDiv1 = document.querySelector(".highlight-focus");
      // var a = document.querySelector(".additional-info");
      // if (newDiv1 && a) {
      //   newDiv1.style.display = "none";
      //   a.style.display = "none";
      // }
    }
  });
}

function handleEventWhenEditColorOrDeleteToHighlight(range, spanId) {
  const rect = range.getBoundingClientRect();
  var event1 = document.getElementById(spanId);
  event1.addEventListener("click", () => {
    sessionStorage.setItem("test", spanId.toString());

    for (var i = 1; i <= 3; i++) {
      //var a = document.querySelector(".edit-square");
      // if (a) {
      //   var length = a.length;
      //   if (length < 2) {
      //     divChild.classList.add("edit-square");
      //   }
      // } else {
      //   divChild.classList.add("edit-square");
      // }

      if (i == 1) {
        var divChild = document.createElement("div");
        divChild.classList.add("delete-square");
        divChild.textContent = "❌";
        divChild.style.paddingRight = "1ssr0px";
        divChild.addEventListener("click", function (event) {
          var spanText = document.getElementById(spanId);
          if (spanText) {
            console.log(range.endContainer);
            var nextCharacter = getCharacterAtOffset(range.endContainer, range.endOffset) ? "" : " ";
            var parentParagraph = spanText.parentNode;
            var spanContent = spanText.innerHTML;
            var spanIndex = Array.from(parentParagraph.childNodes).indexOf(
              spanText
            );
            parentParagraph.removeChild(spanText);
            parentParagraph.insertBefore(
              document.createTextNode(" " + spanContent + nextCharacter),
              parentParagraph.childNodes[spanIndex]
            );
            removeNodeEditAndDeleteTextSelected();
            displayEditOrDelete.style.display = "none";
          }
        });
      } else if (i == 2) {
        var divChild = document.createElement("div");
        divChild.classList.add("edit-square");
        divChild.textContent = "✏️";
        divChild.addEventListener("click", function (event) {
          displayColorBoard.style.display = "block";
          ///removeNodeEditAndDeleteTextSelected();
          //displayEditOrDelete.style.display = "none";
        });
      }else if(i == 3){
        // var divChild = document.createElement("div");
        // divChild.classList.add("copy-square");
        // divChild.textContent = "📋";
        // divChild.addEventListener("click", function (event) {
        //   var range = document.createRange();
        //   var spanText = document.getElementById(spanId);
        //   if (spanText) {
        //     window.getSelection().removeAllRanges(); // clear current selection
        //             window.getSelection().addRange(range); // to select text
        //             document.execCommand("copy");
        //             window.getSelection().removeAllRanges();// to deselect 
        //   }
        // });
      }
      // Append the new div to the parent div
      displayEditOrDelete.appendChild(divChild);
    }

    document.body.appendChild(displayEditOrDelete);
    displayEditOrDelete.style.top = rect.top + window.scrollY - 35 + "px";
    displayEditOrDelete.style.left = rect.right + window.scrollX - 150 + "px";
    displayEditOrDelete.style.display = "block";
  });
}

function removeNodeEditAndDeleteTextSelected() {
  var btnDelete = document.querySelector(".delete-square");
  var btnEdit = document.querySelector(".edit-square");
  if (btnDelete && btnEdit) {
    btnDelete.remove();
    btnEdit.remove();
  }
}

function handleEventSelectedTextToHighlight() {
  document.addEventListener("mouseup", function () {
    let selection = window.getSelection();
    if (selection.toString().length > 0) {
      // Get range selected
      const range = selection.getRangeAt(0);
      // console.log(range.endContainer, range.endOffset);
      // var nextCharacter = getCharacterAtOffset(range.endContainer.data, range.endOffset);
      //       console.log('Next character:', nextCharacter);
      console.log(range);
      // const rangeInfo = {
      //   startContainer: getNodePath(range.startContainer),
      //   startOffset: range.startOffset,
      //   endContainer: getNodePath(range.endContainer),
      //   endOffset: range.endOffset,
      // };

      rangeInfo.startContainer = getNodePath(range.startContainer);
      rangeInfo.startOffset = range.startOffset;
      rangeInfo.endContainer = getNodePath(range.endContainer);
      rangeInfo.endOffset = range.endOffset;

      // sessionStorage.setItem("range", JSON.stringify(rangeInfo));
      sessionStorage.setItem("item", JSON.stringify(selection.toString()));
      const rect = range.getBoundingClientRect();

      displayIconWhenSelected.style.display = "block";
      displayIconWhenSelected.style.top = rect.top + window.scrollY - 26 + "px";
      displayIconWhenSelected.style.left = rect.right + window.scrollX + "px";
    } else {
      displayIconWhenSelected.style.display = "none";
    }
  });
}
handleEventSelectedTextToHighlight();
// const colorPicker = document.getElementById("colorPicker");
// colorPicker.addEventListener("input", function () {
//   const highlightedSpan = document.getElementById(lastSpanId);

//   if (highlightedSpan) {
//     highlightedSpan.style.backgroundColor = colorPicker.value;
//   }
// });


function handleEventSelectedColorToHighlight() {
  colorNode.addEventListener("click", function (event) {
    let selection = JSON.parse(sessionStorage.getItem("item"));
    if (selection && selection.toString().length > 0) {
      const range = document.createRange();
      const startContainer = getNodeByPath(rangeInfo.startContainer);
      const endContainer = getNodeByPath(rangeInfo.endContainer);
      range.setStart(startContainer, rangeInfo.startOffset);
      range.setEnd(endContainer, rangeInfo.endOffset);

      var ran = range.commonAncestorContainer;
      var arr = ran.childNodes;
      var n = ran.childNodes.length;
      for(var i = 0 ; i < n ; i++){
        if(arr[i].innerText){
          console.log(arr[i].innerText);
        }
      }

      const spanTextHightlight = document.createElement("text-highlight");
      const textHighLight = selection.toString();
      let highlightId = `highlighted-text-${spanIdCounter}`;
      spanTextHightlight.id = highlightId;
      spanTextHightlight.appendChild(document.createTextNode(textHighLight));
      range.deleteContents();
      range.insertNode(spanTextHightlight);
      lastSpanId = highlightId;
      spanIdCounter++;

      // Get the background color of the clicked div
      var clickedColor = event.target.style.backgroundColor;
      const textHighLightId = document.getElementById(lastSpanId);
      textHighLightId.style.backgroundColor = clickedColor;
      textHighLightId.style.cursor = "pointer";

      handleEventWhenEditColorOrDeleteToHighlight(range, highlightId);

      sessionStorage.clear();
    } else {
      var clickedColor = event.target.style.backgroundColor;
      const textHighLightId = document.getElementById(
        sessionStorage.getItem("text-highlight-id")
      );
      textHighLightId.style.backgroundColor = clickedColor;
      textHighLightId.style.cursor = "pointer";
      // var newDiv1 = document.querySelector(".highlight-focus");
      // var a = document.querySelector(".additional-info");
      // if (newDiv1 && a) {
      //   newDiv1.style.display = "none";
      //   a.style.display = "none";
      // }
    }
  });
}



// {
//     "manifest_version": 3,
//     "name": "Ghi Chú",
//     "version": "1.0",
//     "description": "Một extension đơn giản để ghi chú trên trang web.",
//     "action": {
//       "default_icon": "icon.png",
//       "default_popup": "popup.html"
//     },
//     "icons": {
//       "48": "icon.png"
//     },
//     "permissions": [
//       "activeTab",
//       "storage"
//     ],
//     "background": {
//       "service_worker": "background.js"
//     },
//     "content_scripts": [
//       {
//         "matches": ["<all_urls>"],
//         "js": ["content.js"],
//         "css": ["content.css"]
//       }
//     ]
//   }