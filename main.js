const canvas = document.querySelector('#canvas');
const canvasSize = document.querySelector('#control');

canvasSize.addEventListener('change', (e) => drawTiles(e.target));

function drawTiles(target) {
  const tileCount = target.value;
  const currentSize = canvas.offsetWidth;
  const calculatedTileSize = currentSize / tileCount;

  canvas.replaceChildren();

  console.time('redraw');
  for (let i = 0; i < tileCount * tileCount; i++) {
    const tile = document.createElement('div');
    tile.style.width = calculatedTileSize + 'px';
    tile.style.height = calculatedTileSize + 'px';
    tile.style.backgroundColor = 'white';
    canvas.appendChild(tile);
  }
  console.timeEnd('redraw');
}
