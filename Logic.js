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
  const servicePerformedDropdown = document.getElementById('serviceperformed');
  const cubiscanModelDropdown = document.getElementById('cubiscanmodel');
  const tableContainer = document.getElementById('tableContainer');
  const table1 = document.getElementById('table1Data');
  const table2 = document.getElementById('table2Data');
  

  cubiscanModelDropdown.addEventListener('change', updateTable);
  servicePerformedDropdown.addEventListener('change', updateTable);


  function updateTable() {

  const selectedCubiscanModel = cubiscanModelDropdown.value;
  const selectedService = servicePerformedDropdown.value;

  tableContainer.innerHTML = ''; // Clear previous content

    tableContainer.innerHTML = '';
    if (selectedCubiscanModel === 'Select' && selectedService === 'Select') {
      tableContainer.style.display = 'none';
    }

    if (selectedCubiscanModel === 'Multiple' && selectedService === 'Select') {
      tableContainer.style.display = 'none';
    }
    else if (selectedCubiscanModel === 'Multiple' && selectedService !== 'Maintenance/CCA') {
      tableContainer.appendChild(table1);
      tableContainer.style.display = 'block';
    }

    if (selectedCubiscanModel === 'CS325' && selectedService === 'Select') {
      tableContainer.style.display = 'none';
    }
    else if (selectedCubiscanModel === 'CS325' && selectedService === 'Maintenance/CCA') {
      tableContainer.appendChild(table2);
      tableContainer.style.display = 'block';
    }
    else if (selectedCubiscanModel === 'CS325' && selectedService !== 'Maintenance/CCA') {
      tableContainer.appendChild(table1);
      tableContainer.style.display = 'block';
    
    }
    else {
      tableContainer.style.display = 'none';
    }
  };
});
// Print to PDF

document.getElementById("generate").onclick = function () {
	// Your html2pdf code here.
	var element = document.getElementById('pdfContent');

  var opt = {
    filename:     'Work_Order.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }

  html2pdf().set(opt).from(element).save();
};

/*document.getElementById('generate').addEventListener('click', function () {

  const form = document.getElementById('myForm');
  // Get the div where we'll put the content for the PDF
  const pdfContent = document.getElementById('pdfContent');
  pdfContent.innerHTML = ''; // Clear any previous content


  // Add title or any additional headers if needed
  const header = document.createElement('h3');
  header.innerText = 'Cubiscan Work Order';
  pdfContent.appendChild(header);
  

  // Handle Inputs: Add their content as plain text
  const inputs = document.querySelectorAll('input[type="technician"], input[type="date"], input[type="time onsite"], input[type="customer site"], input[type="SRO"], input[type="site representative"]');
    inputs.forEach(input => {
        const label = input.previousElementSibling ? input.previousElementSibling.innerText : 'Field';
        const section = document.createElement('div');
        section.innerHTML = `<strong>${label}</strong>: ${input.value}`;
        section.style.border = '1px solid #000'; // Example of border
        section.style.padding = '5px'; // Example of padding
        section.style.marginBottom = '10px'; // Example of margin
        pdfContent.appendChild(section);
    });

  // Handle Textareas: Convert their content to HTML with line breaks
  const textareas = document.querySelectorAll('textarea');
  textareas.forEach(textarea => {
      const section = document.createElement('div');
      section.innerHTML = `<strong>${textarea.previousElementSibling?.innerText}</strong>: ${textarea.value.replace(/\n/g, '<br>')}`;
      section.style.border = '1px solid #000'; // Example of border
      section.style.padding = '5px'; // Example of padding
      section.style.marginBottom = '10px'; // Example of margin
      pdfContent.appendChild(section);
  });
    
  // Handle Dropdowns: Add their selected value as plain text
  const selects = document.querySelectorAll('select');
  selects.forEach(select => {
      const section = document.createElement('div');
      section.innerHTML = `<strong>${select.previousElementSibling?.innerText}</strong>: ${select.options[select.selectedIndex].text}`;
      section.style.border = '1px solid #000'; // Example of border
      section.style.padding = '5px'; // Example of padding
      section.style.marginBottom = '10px'; // Example of margin
      pdfContent.appendChild(section);
  });

   // Handle Tables: Directly clone any tables into the pdfContent div
   const tables = document.querySelectorAll('table');
   tables.forEach(table => {
       const clonedTable = table.cloneNode(true); // Deep clone the table
       clonedTable.style.border = '1px solid #000'; // Ensure borders are preserved
       clonedTable.style.marginBottom = '10px'; // Example of margin
       pdfContent.appendChild(clonedTable);
   });


  // Handle Signature Canvas: Convert to image and add
  const canvas = document.getElementById('signature-pad');
  if (canvas) {
      const img = document.createElement('img');
      img.src = canvas.toDataURL('image/png');
      img.style.maxWidth = '98%';  // Ensure the image scales correctly
      img.style.border = '1px solid #000'; // Example of border
      img.style.padding = '5px'; // Example of padding
      pdfContent.appendChild(img);
  }

  // Generate the PDF from the content in the pdfContent div
  html2pdf()
      .from(pdfContent)
      .set({
          margin: 0.5,
          filename: 'work_order.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      })
      .save();
});*/
