const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear');

canvas.width = 712; 
canvas.height = 90;

const minCanvasWidth = 712;
const maxCanvasWidth = 1920;
const minCanvasHeight = 90;
const maxCanvasHeight = 100;

function resizeCanvas() {
  const canvasContainer = canvas.parentElement;
  let newWidth = Math.min(Math.max(canvasContainer.clientWidth, minCanvasWidth), maxCanvasWidth);
  let newHeight = Math.min(Math.max(canvasContainer.clientHeight, minCanvasHeight), maxCanvasHeight);

  canvas.width = newWidth;
  canvas.height = newHeight;
}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();

let isDrawing = false;
let x = 0;
let y = 0;



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

// Print to PDF

document.getElementById("generate").onclick = function () {
	// Your html2pdf code here.
	var element = document.getElementById('myForm');
	html2pdf(element);
};
