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

document.addEventListener('DOMContentLoaded', () => {
  const cubiscanModelDropdown = document.getElementById('cubiscanmodel');
  const partsDropdown = document.getElementById('partsDropdown');
  const addPartButton = document.getElementById('addPartButton');
  const partsUsedDiv = document.getElementById('textAreaParts');

  let partCount = 0; // Counter to track the number of parts added

  cubiscanModelDropdown.addEventListener('change', updatePartsDropdown);
  addPartButton.addEventListener('click', addPart);
    //addPart.preventDefault();  // Prevent form submission
  // Function to update parts dropdown based on the selected Cubiscan model
  function updatePartsDropdown() {
    const selectedCubiscanModel = cubiscanModelDropdown.value;

    // Clear the current dropdown options
    partsDropdown.innerHTML = '';

    switch (selectedCubiscanModel) {
      case 'Select':
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
        `;
        break;
      case 'CS325':
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
          <option value="CS325 Part A">CS325 Part A</option>
          <option value="CS325 Part B">CS325 Part B</option>
          <option value="CS325 Part C">CS325 Part C</option>
        `;
        break;

      case 'CS200':
        partsDropdown.innerHTML = `
          <option value="CS200 Part A">CS200 Part A</option>
          <option value="CS200 Part B">CS200 Part B</option>
          <option value="CS200 Part C">CS200 Part C</option>
        `;
        break;

      case 'CS150':
        partsDropdown.innerHTML = `
          <option value="CS150 Part A">CS150 Part A</option>
          <option value="CS150 Part B">CS150 Part B</option>
          <option value="CS150 Part C">CS150 Part C</option>
        `;
        break;

      default:
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
        `;
        break;
    }
  }

  // Function to add selected part to the contenteditable div
  function addPart() {
    const selectedPart = partsDropdown.value;
    if (selectedPart) {
      // Create a new div for the part
      const partDiv = document.createElement('div');
      partDiv.textContent = selectedPart;
      partDiv.style.marginBottom = '5px';

      // Calculate the current column index
      const columnIndex = Math.floor(partCount / 3) + 1;

      // If it's time to add a new column (every 4 items), adjust the grid
      if (partCount % 4 === 0) {
        partsUsedDiv.style.gridTemplateColumns = `repeat(${columnIndex}, 1fr)`;
      }

      // Append the part to the appropriate column
      partsUsedDiv.appendChild(partDiv);
      
      partCount++; // Increment the part count
    }
  }
});



//Change Table
document.addEventListener('DOMContentLoaded', () => {
  const servicePerformedDropdown = document.getElementById('serviceperformed');
  const cubiscanModelDropdown = document.getElementById('cubiscanmodel');
  const tableContainer = document.getElementById('tableContainer');
  const table1 = document.getElementById('table1Data');
  const table2 = document.getElementById('table2Data');
  const table3 = document.getElementById('table3Data');
  const table4 = document.getElementById('table4Data');
  const table5 = document.getElementById('table5Data');
  const table6 = document.getElementById('table6Data');
  const table7 = document.getElementById('table7Data');

  cubiscanModelDropdown.addEventListener('change', updateTable);
  servicePerformedDropdown.addEventListener('change', updateTable);

  function updateTable() {
    const selectedCubiscanModel = cubiscanModelDropdown.value;
    const selectedService = servicePerformedDropdown.value;

    tableContainer.innerHTML = ''; // Clear previous content
    tableContainer.style.display = 'none'; // Default to hide the table

    switch (selectedCubiscanModel) {
      case 'Select':
        // No table shown
        break;

      case 'Multiple':
        switch (selectedService) { 
          default:
          tableContainer.appendChild(table1);
          tableContainer.style.display = 'block';
        }
        break;
      case 'CS25':
      case 'CS125':
      case 'CS325':
        switch (selectedService) {
          case 'Select':
            // No table shown
            break;

          case 'Maintenance/CCA':
            tableContainer.appendChild(table2);
            tableContainer.style.display = 'block';
            break;

          default:
            tableContainer.appendChild(table1);
            tableContainer.style.display = 'block';
            break;
        }
        break;

        case 'CS150':
        case 'CS110':
        case 'CS100':
          switch (selectedService) {
            case 'Select':
              // No table shown
              break;
      
            case 'Maintenance/CCA':
              tableContainer.appendChild(table3);
              tableContainer.style.display = 'block';
              break;
      
            default:
              tableContainer.appendChild(table1);
              tableContainer.style.display = 'block';
              break;
          }
          break;

        case 'CS1100AKL':
        case 'CS1200AKL':
          switch (selectedService) {
            case 'Select':
              // No table shown
              break;
      
            case 'Maintenance/CCA':
              tableContainer.appendChild(table4);
              tableContainer.style.display = 'block';
              break;
      
            default:
              tableContainer.appendChild(table1);
              tableContainer.style.display = 'block';
              break;
          }
          break; 

          
        case 'S9':
          switch (selectedService) {
            case 'Select':
              // No table shown
              break;
          
            case 'Maintenance/CCA':
              tableContainer.appendChild(table7);
              tableContainer.style.display = 'block';
              break;
          
            default:
              tableContainer.appendChild(table1);
              tableContainer.style.display = 'block';
              break;
          }
          break;  

        case 'CS75':
        case 'CS75PRO':
          switch (selectedService) {
            case 'Select':
              // No table shown
              break;
          
            case 'Maintenance/CCA':
              tableContainer.appendChild(table5);
              tableContainer.style.display = 'block';
              break;
          
            default:
              tableContainer.appendChild(table1);
              tableContainer.style.display = 'block';
              break;
          }
          break;
        
        case 'CS200-TS':
        case 'CS200-B':
        case 'CS210':
        case 'CS225':
        case 'CS275':
          switch (selectedService) {
            case 'Select':
              // No table shown
              break;
          
            case 'Maintenance/CCA':
              tableContainer.appendChild(table6);
              tableContainer.style.display = 'block';
              break;
          
            default:
              tableContainer.appendChild(table1);
              tableContainer.style.display = 'block';
              break;
          }
          break;
      default:
        // No matching model; hide table
        break;
    }
  }
});
// Print to PDF

document.getElementById("generate").onclick = function () {
	// Your html2pdf code here.
  const downloadButton = document.getElementById('generate');
	var element = document.getElementById('pdfContent');

  // Hide the download button
  downloadButton.style.display = 'none';

  var opt = {
    filename:     'Work_Order.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }

  html2pdf().set(opt).from(element).save() .then(() => {
    // Show the download button again after the PDF is generated
    downloadButton.style.display = 'block';
  });
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
