import { DELETED_CLASS, HIGHLIGHT_CLASS } from "./constants.js";
import { separatorClassName } from '../../utils/helper.js';

import {
  initializeHighlightEventListeners,
  removeHighlightIcon,
} from "../../hoverTools/index.js";

function highlight(
  selectionString,
  container,
  selection,
  color,
  textColor,
  highlightIndex
) {
  console.log(selection);
  const highlightInfo = {
    color: color ? color : "yellow",
    textColor: textColor ? textColor : "inherit",
    highlightIndex: highlightIndex,
    selectionString: selectionString,
    anchor: $(selection.anchor),
    anchorOffset: selection.anchorOffset,
    focus: $(selection.focus),
    focusOffset: selection.focusOffset,
  };

  /**
   * STEPS:
   * 1 - Use the offset of the anchor/focus to find the start of the selected text in the anchor/focus element
   *     - Use the first of the anchor of the focus elements to appear
   * 2 - From there, go through the elements and find all Text Nodes until the selected text is all found.
   *     - Wrap all the text nodes (or parts of them) in a span DOM element with special highlight class name and bg color
   * 3 - Deselect text
   * 4 - Attach mouse hover event listeners to display tools when hovering a highlight
   */

  // Step 1 + 2:
  try {
    recursiveWrapper($(container), highlightInfo);
  } catch (e) {
    return false;
  }

  // Step 3:
  if (selection.removeAllRanges) selection.removeAllRanges();

  // Step 4:
  const parent = $(container).parent();
  parent.find(`.${HIGHLIGHT_CLASS}`).each((_i, el) => {
    initializeHighlightEventListeners(el);
  });

  // Trả về true khi không có error
  return true;
}

function recursiveWrapper(container, highlightInfo) {
  return _recursiveWrapper(container, highlightInfo, false, 0); // Initialize the values of 'startFound' and 'charsHighlighted'
}

var dem = 0;

function _recursiveWrapper(
  container,
  highlightInfo,
  startFound,
  charsHighlighted
) {
  dem++;
  console.log("dem: ", dem);
  console.log("highlightInfo: ", highlightInfo);
  const {
    anchor,
    focus,
    anchorOffset,
    focusOffset,
    color,
    textColor,
    highlightIndex,
    selectionString,
  } = highlightInfo;
  const selectionLength = selectionString.length;

  container.contents().each((_index, element) => {
    if (charsHighlighted >= selectionLength) return;

    console.log("element: ", element.innerText);
    console.log("element.nodeType: ", element.nodeType);
    if (element.nodeType !== Node.TEXT_NODE) {
      // Các Node bị ẩn sẽ bỏ qua
      const jqElement = $(element);
      if (
        jqElement.is(":visible") &&
        getComputedStyle(element).visibility !== "hidden"
      ) {
        console.log("Nếu không phải là TEXT: ", jqElement);
        console.log(
          "Đã tìm thấy?: ",
          startFound,
          " : kí tự highlight: ",
          charsHighlighted
        );
        console.log("%cBẮT ĐẦU ĐỆ QUY", "color: red");
        console.log("anchor: ", anchor);
        console.log("focus: ", focus);
        if (anchor.is(element)) {
          console.log("anchor LÀ ELEMENT");
        } // If the element is not the anchor or focus, continue
        if (focus.is(element)) {
          console.log("focus LÀ ELEMENT");
        }

        [startFound, charsHighlighted] = _recursiveWrapper(
          jqElement,
          highlightInfo,
          startFound,
          charsHighlighted
        );
      }
      return;
    }
    console.log("%cKHÔNG ĐỆ QUY VÀ TIẾP TỤC VÒNG LẶP", "color: red");
    console.log(
      "Đã tìm thấy?: ",
      startFound,
      " : kí tự highlight: ",
      charsHighlighted
    );
    // console.log(startFound);

    // Step 1:
    // The first element to appear could be the anchor OR the focus node,
    // since you can highlight from left to right or right to left
    let startIndex = 0;
    if (!startFound) {
      // Nếu element này không phải là node bắt đầu chọn và node kết thúc thì return
      if (!anchor.is(element) && !focus.is(element)) {
        console.log("%cKHÔNG PHẢI LÀ ELEMENT", "color: red");
        console.log("============================");
        return;
      } // If the element is not the anchor or focus, continue
      console.log("%cLÀ ELEMENT", "color: red");
      startFound = true;
      startIndex = Math.min(
        ...[
          ...(anchor.is(element) ? [anchorOffset] : []),
          ...(focus.is(element) ? [focusOffset] : []),
        ]
      );
      console.log("startIndex: ", startIndex);
    }

    // Step 2:
    // If we get here, we are in a text node, the start was found and we are not done highlighting
    const { nodeValue, parentElement: parent } = element;

    var nextNode = parent.firstChild;
    // Kiểm tra loại của child node tiếp theo
    if (nextNode.nodeType === Node.ELEMENT_NODE) {
      console.log("Next Node is an Element Node:", nextNode);
    } else if (nextNode.nodeType === Node.TEXT_NODE) {
      console.log("Next Node is a Text Node:", nextNode);
      if (nextNode.nodeValue.trim() === "") {
        console.log("KHONG");
      } else {
        // let arr = [];
        // let className = parent.className;
        // arr.push(className)
        // let parentNd1 = parent;
        // // console.log("CLASS NAME: ", className);
        // for (let j = 0; j < 2; j++) {
        //   let parentNd = parentNd1.parentNode;
        //   let className = parentNd.className;
        //   parentNd1 = parentNd;
        //   arr.push(className)
          // console.log("CLASS NAME: ", className);
        // }
        // console.log(
        //   "CLASS NAMEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE:",
        //   className
        // );
        // var selector = separatorClassName(arr[2]);
        // var elementByQuerySelector = document.querySelector(selector);
        // for(let j = arr.length - 2 ; j >=0 ; j --){
        //     var selector1 = elementByQuerySelector;
        //     // console.log(selector1);
        //     selector = separatorClassName(arr[j]);
        //     elementByQuerySelector = selector1.querySelector(selector);
        // }
        // arr = [];
        // console.log(elementByQuerySelector);

        // // Sử dụng querySelector
        // 
        
        // // In ra phần tử được tìm thấy
        // console.log("Element by Query Selector:", elementByQuerySelector.querySelector(".my-3"));
      }
    } else {
      console.log("Next Node is of type:", nextNode.nodeType);
    }
    console.log("==============================");

    if (startIndex > nodeValue.length) {
      // Start index is beyond the length of the text node, can't find the highlight
      // NOTE: we allow the start index to be equal to the length of the text node here just in case
      throw new Error(
        `No match found for highlight string '${selectionString}'`
      );
    }

    // Split the text content into three parts, the part before the highlight, the highlight and the part after the highlight:
    const highlightTextEl = element.splitText(startIndex);

    // Instead of simply blindly highlighting the text by counting characters,
    // we check if the text is the same as the selection string.
    let i = startIndex;
    for (; i < nodeValue.length; i++) {
      // Skip any whitespace characters in the selection string as there can
      // be more than in the text node:
      while (
        charsHighlighted < selectionLength &&
        selectionString[charsHighlighted].match(/\s/u)
      )
        charsHighlighted++;

      if (charsHighlighted >= selectionLength) break;

      const char = nodeValue[i];
      if (char === selectionString[charsHighlighted]) {
        charsHighlighted++;
      } else if (!char.match(/\s/u)) {
        // FIXME: Here, this is where the issue happens
        // Similarly, if the char in the text node is a whitespace, ignore any differences
        // Otherwise, we can't find the highlight text; throw an error
        throw new Error(
          `No match found for highlight string '${selectionString}'`
        );
      }
    }

    // If textElement is wrapped in a .highlighter--highlighted span, do not add this highlight
    // as it is already highlighted, but still count the number of charsHighlighted
    if (parent.classList.contains(HIGHLIGHT_CLASS)) return;

    const elementCharCount = i - startIndex; // Number of chars to highlight in this particular element
    const insertBeforeElement = highlightTextEl.splitText(elementCharCount);
    const highlightText = highlightTextEl.nodeValue;

    // If the text is all whitespace, ignore it
    if (highlightText.match(/^\s*$/u)) {
      parent.normalize(); // Undo any 'splitText' operations
      return;
    }

    // If we get here, highlight!
    // Wrap the highlighted text in a span with the highlight class name
    const highlightNode = document.createElement("span");
    highlightNode.classList.add(
      color === "inherit" ? DELETED_CLASS : HIGHLIGHT_CLASS
    );
    highlightNode.style.backgroundColor = color;
    highlightNode.style.color = textColor;
    highlightNode.dataset.highlightId = highlightIndex;
    highlightNode.textContent = highlightTextEl.nodeValue;
    highlightTextEl.remove();
    parent.insertBefore(highlightNode, insertBeforeElement);
  });
  removeHighlightIcon();
  return [startFound, charsHighlighted];
}

export default highlight;
