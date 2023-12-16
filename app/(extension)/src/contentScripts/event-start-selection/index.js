import { displayHighlightIcon } from "../hoverTools/index.js";
// import {rangeInfo, selectionInfo} from '../../models/model.js'
import {getNodePath} from '../utils/helper.js'
let rangeInfo = {
  startContainer: Object,
  startOffset: Object,
  endContainer: Object,
  endOffset: Object,
};

let selectionInfo = {
  anchor: Object,
  anchorOffset: Object,
  focus: Object,
  focusOffset: Object,
  selectionString: Object,
};

function initializeHighlighterCursor() {
  document.addEventListener("mouseup", eventHighlightOnSelection);
}

function eventHighlightOnSelection() {
  const selection = window.getSelection();
  if (selection.toString()) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    console.log(selection);
    // Tạo node sử dụng để hiển thị icon khi bôi đen text
    displayHighlightIcon(rect);
    const selectionString = selection.toString();

    rangeInfo = {
      startContainer: getNodePath(range.startContainer),
      startOffset: range.startOffset,
      endContainer: getNodePath(range.endContainer),
      endOffset: range.endOffset,
    };
    selectionInfo = {
      anchor: getNodePath(selection.anchorNode),
      anchorOffset: selection.anchorOffset,
      focus: getNodePath(selection.focusNode),
      focusOffset: selection.focusOffset,
      selectionString: selectionString,
    };
    sessionStorage.setItem("range-info", JSON.stringify(rangeInfo));
    sessionStorage.setItem("selection-info", JSON.stringify(selectionInfo));
    // const test = {
    //   selection: selection,
    //   // range: JSON.stringify(getNodePath(range))
    // }
  }
}

export { initializeHighlighterCursor };
