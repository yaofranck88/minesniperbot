const gridSize = 5;
let currentMode = 'tour';
let suggestedSequence = [];

function setMode(mode) {
  currentMode = mode;
  newRound();
}

function newRound() {
  suggestedSequence = generatePredictions(currentMode);
  renderGrid();
  displayOutput();
}

function generatePredictions(mode) {
  const totalCells = gridSize * gridSize;
  const cells = Array.from({ length: totalCells }, (_, i) => i);
  shuffleArray(cells);
  
  if (mode === 'tour') {
    return [cells[0]];
  } else if (mode === 'sequence') {
    return cells.slice(0, Math.floor(Math.random() * 4) + 6); // 6 à 9 cases
  }
}

function renderGrid() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  
  for (let i = 0; i < gridSize * gridSize; i++) {
    const btn = document.createElement('button');
    btn.innerText = i + 1;
    
    if (suggestedSequence.includes(i)) {
      btn.style.backgroundColor = '#00ff88';
    }

    btn.onclick = () => alert(`Case ${i + 1} cliquée`);
    grid.appendChild(btn);
  }
}

function displayOutput() {
  const output = document.getElementById('output');
  const readable = suggestedSequence.map(n => n + 1).join(', ');
  output.textContent = `Cases recommandées : ${readable}`;
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
