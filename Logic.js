
//Canvas

const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear');

window.addEventListener('resize', resizeCanvas);

canvas.width = 712; 
canvas.height = 90;

minCanvasWidth = 480;
maxCanvasWidth = 1920;
minCanvasHeight = 90;
maxCanvasHeight = 102;

function resizeCanvas() {
  const canvasContainer = canvas.parentElement;
  let newWidth = Math.min(Math.max(canvasContainer.clientWidth, minCanvasWidth), maxCanvasWidth);
  let newHeight = Math.min(Math.max(canvasContainer.clientHeight, minCanvasHeight), maxCanvasHeight);

  canvas.width = newWidth;
  canvas.height = newHeight;
}

resizeCanvas();

let isDrawing = false;
let x = 0;
let y = 0;

//Draw Event

function handleMove(event) {
  event.preventDefault();
  if (isDrawing) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    drawLine(x, y);
  }
}

canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  x = event.offsetX;
  y = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
  if (isDrawing) {
    drawLine(event.offsetX, event.offsetY);
  }
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});


function drawLine(x1, y1) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x1, y1);
  ctx.stroke();
  x = x1;
  y = y1;
}

canvas.addEventListener('touchstart', (event) => {
  event.preventDefault();
  isDrawing = true;
  const touch = event.touches[0];
  x = touch.clientX - canvas.offsetLeft;
  y = touch.clientY - canvas.offsetTop;
});

canvas.addEventListener('touchmove', (event) => {
  event.preventDefault();
  if (isDrawing) {
    const touch = event.touches[0];
    drawLine(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
  }
});

canvas.addEventListener('touchend', () => {
  isDrawing = false;
});

function printPage() {
  window.print();
}

//Change Table
document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.getElementById('service performed');
  const tableContainer = document.getElementById('tableContainer');
  const table1 = document.getElementById('table1Data');
  const table2 = document.getElementById('table2Data');
  

  dropdown.addEventListener('change', () => {
    const selectedValue = dropdown.value;

    tableContainer.innerHTML = '';
    if (selectedValue === 'Select') {
      tableContainer.style.display = 'none';
    }
    if (selectedValue === 'Installation') {
      tableContainer.appendChild(table1);
      tableContainer.style.display = 'block';
    }
    else if (selectedValue === 'Service') {
      tableContainer.appendChild(table1);
      tableContainer.style.display = 'block'; // Show the table container
    }
    else if (selectedValue === 'Maintenance/CCA') {
      tableContainer.appendChild(table2);
      tableContainer.style.display = 'block';
    }
    else if (selectedValue === 'Service/Maintenance') {
      tableContainer.appendChild(table2);
      tableContainer.style.display = 'block';
    } 
    else {
      tableContainer.style.display = 'none';
    }
  });
});

// Print to PDF

document.getElementById("generate").onclick = function () {
	// Your html2pdf code here.
	var element = document.getElementById('myForm');
	html2pdf(element);
};
