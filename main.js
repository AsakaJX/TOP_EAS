const canvas = document.querySelector('#canvas');
canvas.addEventListener('dragstart', (e) => e.preventDefault());

const settings = {
  selectedTool: 'brush',
  selectedColor: 'black',
};

const canvasSize = document.querySelector('#control');

// BUILD TILES

buildTiles({ value: 16 });
canvasSize.addEventListener('change', (e) => buildTiles(e.target));

function buildTiles(target) {
  const tileCount = target.value;
  const currentSize = canvas.offsetWidth;
  const calculatedTileSize = currentSize / tileCount;

  canvas.replaceChildren();

  for (let i = 0; i < tileCount * tileCount; i++) {
    const tile = document.createElement('div');
    tile.style.width = calculatedTileSize + 'px';
    tile.style.height = calculatedTileSize + 'px';
    tile.style.backgroundColor = 'white';
    tile.draggable = false;
    tile.addEventListener('dragstart', (e) => e.preventDefault());
    canvas.appendChild(tile);
  }
}

// GET COLOR

function getColor(target) {
  return window.getComputedStyle(target).backgroundColor;
}

// UPDATE ALPHA

function updateAlpha(target, updatedAlpha) {
  const currentColor = getColor(target);
  const delta = Math.round(255 * updatedAlpha);
  const colorsArr = currentColor
    .substring(4, currentColor.indexOf(')'))
    .split(', ');
  const r = Math.min(255, Math.max(0, +colorsArr[0] + delta));
  const g = Math.min(255, Math.max(0, +colorsArr[1] + delta));
  const b = Math.min(255, Math.max(0, +colorsArr[2] + delta));
  return `rgb(${r}, ${g}, ${b})`;
}

// DRAW

canvas.addEventListener('mouseover', draw);

function draw(event) {
  const target = event.target;
  if (event.buttons !== 0) {
    switch (settings.selectedTool) {
      case 'brush':
        target.style.backgroundColor = settings.selectedColor;
        break;

      case 'eraser':
        target.style.backgroundColor = 'white';
        break;

      case 'shade':
        target.style.backgroundColor = updateAlpha(target, -0.1);
        break;
      case 'highlight':
        target.style.backgroundColor = updateAlpha(target, 0.1);
        break;

      case 'rainbow':
        const r = Math.random() * 255;
        const g = Math.random() * 255;
        const b = Math.random() * 255;
        target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        break;

      default:
        break;
    }
  }
}

// COLOR PICKER

const picker = document.querySelector('#current-color');
picker.addEventListener('change', handleColorPicker);

function handleColorPicker(event) {
  settings.selectedColor = event.target.value;
}

// TOOLS

const tools = document.querySelector('.menu');
tools.addEventListener('click', switchTool);

function switchTool(event) {
  const target = event.target;
  const allTools = document.querySelectorAll('.tool button');
  if (target.parentNode.getAttribute('class') === 'tool') {
    Array.from(allTools).forEach((item) => item.setAttribute('class', ''));
    target.setAttribute('class', 'clicked');

    settings.selectedTool = target.parentNode.id;
  }
}

// CLEAR

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearCanvas);

function clearCanvas() {
  canvas.childNodes.forEach((item) => {
    item.style.backgroundColor = 'white';
  });
}
