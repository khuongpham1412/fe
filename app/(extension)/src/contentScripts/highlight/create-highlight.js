import highlight from "./highlight/index.js";
import { store } from "../utils/storageManager.js";
import { getNodeByPath } from "../utils/helper.js";
import { createHighlightRepo } from "../repositoties/highlight-repo.js";

async function createHighlight(color) {
  // const selectionString = selection.toString();
  let selectionInfo = JSON.parse(sessionStorage.getItem("selection-info"));
  if (selectionInfo) {
    let selectionString = selectionInfo.selectionString;
    const selection = {
      anchor: getNodeByPath(selectionInfo.anchor),
      anchorOffset: selectionInfo.anchorOffset,
      focus: getNodeByPath(selectionInfo.focus),
      focusOffset: selectionInfo.focusOffset,
    };

    // const { text } = await chrome.storage.local.get({ text: {} });
    // console.log();
    // JSON.parse(sessionStorage.getItem("item"))
    if (!selectionString) return;

    let rangeInfo = JSON.parse(sessionStorage.getItem("range-info"));
    const range = document.createRange();
    const startContainer = getNodeByPath(rangeInfo.startContainer);
    const endContainer = getNodeByPath(rangeInfo.endContainer);
    range.setStart(startContainer, rangeInfo.startOffset);
    range.setEnd(endContainer, rangeInfo.endOffset);

    let container = range.commonAncestorContainer;
    while (!container.innerHTML) {
      container = container.parentNode;
    }

    // await createHighlightRepo({test: "test", ji:"b"});

    const highlightIndex = await store(
      selection,
      container,
      location.hostname + location.pathname,
      location.href,
      color,
      ""
    );
    highlight(selectionString, container, selection, color, "", highlightIndex);
  }
}

export default createHighlight;
