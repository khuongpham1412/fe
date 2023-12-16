function getNodePath(node) {
  const path = [];
  while (node.parentNode) {
    const index = Array.from(node.parentNode.childNodes).indexOf(node);
    path.unshift(index);
    node = node.parentNode;
  }
  return path;
}

function getNodeByPath(path) {
  let node = document;
  for (const index of path) {
    node = node.childNodes[index];
    if (!node) break;
  }
  return node;
}

function separatorClassName(classNamesVariable) {
  // Chia nhỏ chuỗi thành mảng các tên lớp
  var classArray = classNamesVariable.split(" ");

  // Sử dụng mỗi tên lớp để tạo selector và kết hợp chúng
  return classArray.map((className) => "." + className).join("");
}

export { getNodePath, getNodeByPath, separatorClassName };
