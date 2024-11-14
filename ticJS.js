let tiles = Array.from(document.querySelectorAll('.tile'));
let availableTiles = [...tiles];  // Track available tiles for AI to pick
let IndiaWin = false;

tiles.forEach(function(el) {
  el.onclick = function() {
    if (!this.classList.contains('India') && !this.classList.contains('Aus')) {
      this.classList.add('India'); // Player (India) move
      if (checkIfWin(tiles, 'India')) {
        alert('India wins!');
        IndiaWin = true;
        clearBoard();
      } else {
        // Remove clicked tile from available options
        availableTiles = availableTiles.filter(tile => tile !== this);
        setTimeout(AusAttacks, 500);  // AI turn
      }
    }
  };
});

function AusAttacks() {
  if (availableTiles.length === 0) {
    alert('It\'s a tie! Try again.');
    clearBoard();
    return;
  }

  // AI (Australia) chooses a random tile
  let idx = Math.floor(Math.random() * availableTiles.length);
  let tile = availableTiles[idx];
  tile.classList.add('Aus');

  // Check if AI wins
  if (checkIfWin(tiles, 'Aus')) {
    alert('Australia wins!');
    clearBoard();
  } else {
    // Remove AI's chosen tile from available options
    availableTiles = availableTiles.filter(t => t !== tile);
  }
}

function checkIfWin(tiles, player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  return winPatterns.some(pattern => {
    return pattern.every(index => tiles[index].classList.contains(player));
  });
}

function clearBoard() {
  tiles.forEach(function(el) {
    el.className = 'tile';  // Reset all tiles
  });
  availableTiles = [...tiles];  // Reset available tiles
  IndiaWin = false;  // Reset the win flag
}
