document.querySelectorAll('.cardCustom').forEach(card => {
  const isRedBackground = card.classList.contains('redBackgound');

  const allColors = isRedBackground ? ['#ffffff'] : ['#DC2626', '#333333', '#FECACA', 'black'];
  const safeColors = isRedBackground ? ['#ffffff'] : ['#333333', '#FECACA', 'black'];
  
  const gridRows = 12;
  const gridCols = 12;
  const numBoxes = Math.floor(Math.random() * 3) + 2; // 3 a 5

  const grid = document.createElement('div');
  grid.classList.add('cardGridDecorativa');
  grid.style.backgroundColor = isRedBackground ? '#DC2626' : '#ffffff';

  const occupied = Array.from({ length: gridRows }, () =>
    Array(gridCols).fill(false)
  );

  const isFree = (row, col, h, w) => {
    for (let r = row - 1; r <= row + h; r++) {
      for (let c = col - 1; c <= col + w; c++) {
        if (
          r >= 0 && r < gridRows &&
          c >= 0 && c < gridCols &&
          r >= row && r < row + h &&
          c >= col && c < col + w
        ) {
          if (occupied[r][c]) return false;
        }

        // Evitar bordes contiguos
        if (
          r >= 0 && r < gridRows &&
          c >= 0 && c < gridCols &&
          (
            (r === row - 1 && c >= col && c < col + w) ||
            (r === row + h && c >= col && c < col + w) ||
            (c === col - 1 && r >= row && r < row + h) ||
            (c === col + w && r >= row && r < row + h)
          )
        ) {
          if (occupied[r][c]) return false;
        }
      }
    }
    return true;
  };

  const markOccupied = (row, col, h, w) => {
    for (let r = row; r < row + h; r++) {
      for (let c = col; c < col + w; c++) {
        occupied[r][c] = true;
      }
    }
  };

  const intersectsCenter = (row, col, h, w) => {
    const centerStartRow = 5, centerEndRow = 8;
    const centerStartCol = 5, centerEndCol = 8;
    return (
      row < centerEndRow &&
      row + h > centerStartRow &&
      col < centerEndCol &&
      col + w > centerStartCol
    );
  };

  let attempts = 0;

  for (let i = 0; i < numBoxes && attempts < 200; attempts++) {
    const isLarge = Math.random() < 0.1;
    const height = isLarge ? 4 : Math.floor(Math.random() * 2) + 1;
    const width = isLarge ? 3 : Math.floor(Math.random() * 2) + 1;

    const row = Math.floor(Math.random() * 5);
    const col = Math.floor(Math.random() * (gridCols - width + 1));

    if (isFree(row, col, height, width)) {
      const div = document.createElement('div');

      const useSafe = intersectsCenter(row, col, height, width);
      const palette = useSafe ? safeColors : allColors;

      div.style.gridArea = `${row + 1} / ${col + 1} / ${row + 1 + height} / ${col + 1 + width}`;
      div.style.backgroundColor = palette[Math.floor(Math.random() * palette.length)];
      div.style.opacity = '0.9';

      grid.appendChild(div);
      markOccupied(row, col, height, width);
      i++;
    }
  }

  card.prepend(grid);
});