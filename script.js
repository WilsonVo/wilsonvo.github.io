const gridContainer = document.getElementById('grid-container');
const rows = 8;
const cols = 10;
let grid = Array.from({ length: rows }, () => Array(cols).fill(0)); // 8x10 grid initialized to 0

// Initialize the grid UI
function initializeGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item');
      gridItem.setAttribute('id', `cell-${i}-${j}`);
      gridItem.textContent = grid[i][j];
      gridContainer.appendChild(gridItem);
    }
  }
}

// Update the grid UI based on the grid array
function updateGrid() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = document.getElementById(`cell-${i}-${j}`);
      cell.textContent = grid[i][j];
      if (grid[i][j] === 1) {
        cell.classList.add('active');
      } else {
        cell.classList.remove('active');
      }
    }
  }
}

// Convert mouse position to a 10-bit binary string
function toBinary(value, maxValue, bits = 10) {
  let binary = Math.floor((value / maxValue) * (Math.pow(2, bits) - 1)).toString(2);
  while (binary.length < bits) {
    binary = '0' + binary; // pad with leading zeros
  }
  return binary;
}

// Handle mouse move event
function handleMouseMove(event) {
  const maxX = window.innerWidth;  // The width of the viewport
  const maxY = window.innerHeight; // The height of the viewport
  
  const x = event.clientX; // Get mouse X position
  const y = event.clientY; // Get mouse Y position

  // Convert X and Y to binary representations
  const xBinary = toBinary(x, maxX); // Map X to binary based on screen width
  const yBinary = toBinary(y, maxY); // Map Y to binary based on screen height

  // Add the new rows at the top of the grid
  grid.unshift([...yBinary.split('').map(Number)]);  // Add Y (binary) as the first row
  grid.unshift([...xBinary.split('').map(Number)]);  // Add X (binary) as the second row

  // Remove the bottom two rows (FIFO)
  grid.pop();  // Remove the last row
  grid.pop();  // Remove the second last row

  // Update the grid display
  updateGrid();
}

// Initialize the grid and add event listener for mouse movement
initializeGrid();
document.addEventListener('mousemove', handleMouseMove);
