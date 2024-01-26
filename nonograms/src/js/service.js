function createNode(element, ...classes) {
  const node = document.createElement(element);
  node.classList.add(...classes);
  return node;
}

function appendChild(node, child) {
  node.append(child);
}

export { createNode, appendChild };
