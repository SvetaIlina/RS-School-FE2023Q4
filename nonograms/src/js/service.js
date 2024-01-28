function createNode(element, ...classes) {
  const node = document.createElement(element);
  node.classList.add(...classes);
  return node;
}

function appendChild(node, child) {
  node.append(child);
}

function getZero(count) {
  if (count >= 0 && count < 10) {
    return `0${count}`;
  }
  return count;
}

export { createNode, appendChild, getZero };
