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

function checkSound() {
  const soundTrigger = document.querySelector('.sound-btn');
  return soundTrigger.classList.contains('crossed');
}

export { createNode, appendChild, getZero, checkSound };
