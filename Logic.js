

const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear');

window.addEventListener('resize', resizeCanvas);

canvas.width = 712; 
canvas.height = 100;

minCanvasWidth = 480;
maxCanvasWidth = 1920;
minCanvasHeight = 100;
maxCanvasHeight = 110;

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
  const quantityDropdown = document.getElementById('quantityDropdown');
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
          <option value=" "> </option>
        `;
        break;
      case 'Multiple':
        quantityDropdown.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `;
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
          <option value="12780 QI Sensor">12780 QI Sensor</option>
          <option value="15163 LDU Scale Card">15163 LDU Scale Card</option>
          <option value="14090 CS25/325 DISPLAY/LCD ASY">14090 CS25/325 DISPLAY/LCD ASY</option>
          <option value="14129 CS25/325 HDMI 2FT Cable">14129 CS25/325 HDMI 2FT Cable</option>
          <option value="12844 CSx25 TX Board ">12844 CSx25 TX Board</option>
          <option value="12841 CSx25 RX Board  ">12841 CSx25 RX Board</option>
          <option value="13218 CSx25 PowerSupply">13218 CSx25 PowerSupply</option>
          <option value="14062 CS1x0 T PowerSupply Brick">14062 CS1x0 T PowerSupply Brick</option>
          <option value="13351 CSx25 1Amp Fuse">13351 CSx25 1Amp Fuse</option>
          <option value="15030 CS125 Display">15030 CS125 Display</option>
          <option value="15955 CS1x0 TOUCH Screen Display Asy">15955 CS1x0 TOUCH Screen Display Asy</option>
          <option value="14100 CS25/325 Controller ASY">14100 CS25/325 Controller ASY</option>
          <option value="14527 CS110 T Controller ASY">14527 CS110 T Controller ASY</option>
          <option value="15380 CS110 XT Controller ASY">15380 CS110 XT Controller ASY</option>
          <option value="14012 CS150 T Controller ASY">14012 CS150 T Controller ASY</option>
          <option value="14005 CS100 T Controller ASY">14005 CS100 T Controller ASY</option>
          <option value="14718 CS75 C PC/Combo Controller">14718 CS75 C PC/Combo Controller</option>
          <option value="13210 CSx25 Motherboard">13210 CSx25 Motherboard</option>
          <option value="14334 CS1x0 Motherboard">14334 CS1x0 Motherboard</option>
          <option value="13476 SDXC 32GB Memory Card">13476 SDXC 32GB Memory Card</option>
          <option value="16104 25/325 LDU Upgrade Kit">16104 25/325 LDU Upgrade Kit</option>
          <option value="14741 CS110 T Upgrade Kit">14741 CS110 T Upgrade Kit</option>
          <option value="14652 CS100 T Upgrade Kit ">14652 CS100 T Upgrade Kit </option>
          <option value="14742 CS150 T Upgrade KIT">14742 CS150 T Upgrade KIT</option>
          <option value="10083 AC Power Cord">10083 AC Power Cord</option>
          <option value="13411 USB to Ethernet Adapter">13411 USB to Ethernet Adapter</option>
          <option value="13413 Cat5e Patch 10ft Ethernet Cable">13413 Cat5e Patch 10ft Ethernet Cable</option>
          <option value="12997 USB To Serial Adapter">Se12997 USB To Serial Adapterlect</option>
          <option value="14540 USB A To B Cable">14540 USB A To B Cable</option>
          <option value="11493 Null Modem Serial Cable">11493 Null Modem Serial Cable</option>
          <option value="16152 CS325 DB25/DB9 HIGH FLEX Sleeved Cable For CHAIN">16152 CS325 DB25/DB9 HIGH FLEX Sleeved Cable For CHAIN</option>
          <option value="14736 4P 4P HIGH FLEX 44IN PowerCable For CHAIN">14736 4P 4P HIGH FLEX 44IN PowerCable For CHAIN</option>
          <option value="16074 CS325 Cable Chain ASY Kit">16074 CS325 Cable Chain ASY Kit</option>
          <option value="14155 CS325 Small Cable Ribbon">14155 CS325 Small Cable Ribbon</option>
          <option value="14156 CS325 Large Cable Ribbon">14156 CS325 Large Cable Ribbon</option>
          <option value="14157 CS325 Power Cable Chain">14157 CS325 Power Cable Chain</option>
          <option value="14159 CS325 Encoder">14159 CS325 Encoder</option>
          <option value="14920 CS125 Gate Ribbon Cable Kit">14920 CS125 Gate Ribbon Cable Kit</option>
          <option value="15200 CS325 Glass">15200 CS325 Glass</option>
          <option value="12890 CS125 Glass">12890 CS125 Glass</option>
          <option value="14119 CS25 Glass">14119 CS25 Glass</option>
          <option value="12344 CSx25 Ball Bearing">12344 CSx25 Ball Bearing</option>
          <option value="15023 CS100 T LoadCell 100KG">15023 CS100 T LoadCell 100KG</option>
          <option value="CS110 T LoadCell 100KG">CS110 T LoadCell 100KG</option>
          <option value="15370 CS110 XT LoadCell 50KG">15370 CS110 XT LoadCell 50KG</option>
          <option value="12271 CS150 T LoadCell 100KG">12271 CS150 T LoadCell 100KG</option>
          <option value="14675 CS325 LoadCell 20KG">14675 CS325 LoadCell 20KG</option>
          <option value="12982 CS125 LoadCell 20KG">12982 CS125 LoadCell 20KG</option>
          <option value="14309 CS25 LoadCell 10KG">14309 CS25 LoadCell 10KG</option>
          <option value="14620 Portable Power Kit">14620 Portable Power Kit</option>
          <option value="10440 25lb Calibration Weight">10440 25lb Calibration Weight</option>
          <option value="10273 Cal Cube 12x5x.36">10273 Cal Cube 12x5x.36</option>
          <option value="13624 Cal Cube 5x3x2">13624 Cal Cube 5x3x2</option>
          <option value="10275 Cal Cube 12x12x12">10275 Cal Cube 12x12x12</option>
          <option value="14450 Axis Camera Kit">14450 Axis Camera Kit</option>
          <option value="14449 SLR Rebel EOS Camera Kit">14449 SLR Rebel EOS Camera Kit</option>
          <option value="12118 Cable Tie / Zip Tie 11in">12118 Cable Tie / Zip Tie 11in</option>
          <option value="12700 Qbit DB">12700 Qbit DB</option>
          <option value="12701 Qbit EDT">12701 Qbit EDT</option>
          <option value="12703 Qbit WEB">12703 Qbit WEB</option>
          <option value="12708 Qbit Xfer">12708 Qbit Xfer</option>
          <option value="13092 KINGSTON 960GB SSD SATA 3">13092 KINGSTON 960GB SSD SATA 3</option>
          <option value="16416 Windows 10 IOT ENT 2021 LICENSE KEY">16416 Windows 10 IOT ENT 2021 LICENSE KEY</option>
          <option value="13814 AKL INDUST PC EMB AKL 84200 RED PC">13814 AKL INDUST PC EMB AKL 84200 RED PC</option>
          <option value="14536 AKL Cabinet Fan Filter">14536 AKL Cabinet Fan Filter</option>
          <option value="16789 Linear Bearing">16789 Linear Bearing</option>
          <option value="13884 LINEAR CARRIAGE CRADLE ASY">13884 LINEAR CARRIAGE CRADLE ASY</option>
          <option value="13829 FAN W/ Filter Assembly">13829 FAN W/ Filter Assembly</option>
          <option value="13834 24V Power Supply">13834 24V Power Supply</option>
          <option value="15885 POE Switch">15885 POE Switch</option>
          <option value="13824 1200 Encoder">13824 1200 Encoder</option>
          <option value="13822 VFD Inverter (Motor Controller">13822 VFD Inverter (Motor Controller)</option>
          <option value="13924 PULLEY ASY FREE SPIN ">13924 PULLEY ASY FREE SPIN</option>
          <option value="12595 Motor Slave Pulley ">12595 Motor Slave Pulley</option>
          <option value="13823 Motor Pulley">13823 Motor Pulley</option>
          <option value="13917 MOTOR">13917 MOTOR</option>
          <option value="13581 Main Power Switch Knob">13581 Main Power Switch Knob</option>
          <option value="13840 Shaft Coupling">13840 Shaft Coupling</option>
          <option value="13833 Chain W/Wire ASY">13833 Chain W/Wire ASY</option>
          <option value="13090 Chain W/O Wire">13090 Chain W/O Wire</option>
          <option value="13821 Touch Panel LCD Display">13821 Touch Panel LCD Display</option>
          <option value="13579 LMS500 LASER HEAD">13579 LMS500 LASER HEAD</option>
          <option value="13825 PROX Sensor">13825 PROX Sensor</option>
          <option value="15443 12 WIRE 30ft 20AWG">15443 12 WIRE 30ft 20AWG</option>
          <option value="15966 RJ45 LONG TYPE">15966 RJ45 LONG TYPE</option>
          <option value="13053 LMS Wire">13053 LMS Wire</option>
          <option value="13820 LMS Connector">13820 LMS Connector</option>
          <option value="16393 Laser Marking Kit">16393 Laser Marking Kit</option>
          <option value="16387 Laser (Single)">16387 Laser (Single)</option>
          <option value="13827 LED STACK LIGHT">13827 LED STACK LIGHT</option>
          <option value="13513 Axis CAMERA P3224 1080P">13513 Axis CAMERA P3224 1080P</option>
          <option value="12581 Axis CAMERA ASY W/Plate">12581 Axis CAMERA ASY W/Plate</option>
          <option value="13883 BELT 12ft">13883 BELT 12ft</option>
          <option value="14553 CAL BOX 60x20x20">14553 CAL BOX 60x20x20</option>
          <option value="15019 Zebra Barcode Cordless Kit Serial Only">15019 Zebra Barcode Cordless Kit Serial Only</option>
          <option value="NMISC AKL Cabinet Door Key">NMISC AKL Cabinet Door Key</option>
          <option value="13000 Motor Belt">13000 Motor Belt</option>
          <option value="13001 Emergency Stop Button, ES1">13001 Emergency Stop Button, ES1</option>
          <option value="13002 Emergency Stop Button, ES2">13002 Emergency Stop Button, ES2</option>
          <option value="13003 Circuit Breaker">13003 Circuit Breaker</option>
          <option value="13004 Conveyor Belt, Large">13004 Conveyor Belt, Large</option>
          <option value="13005 Conveyor Belt, Small">13005 Conveyor Belt, Small</option>
          <option value="13006 Emergency Drive Unit">13006 Emergency Drive Unit</option>
          <option value="13007 Encoder">13007 Encoder</option>
          <option value="13008 Noise Filter, NF1">13008 Noise Filter, NF1</option>
          <option value="13009 Noise Filter, NF2">13009 Noise Filter, NF2</option>
          <option value="13010 Motor Inverter">13010 Motor Inverter</option>
          <option value="13011 Motor Inverter, Option">13011 Motor Inverter, Option</option>
          <option value="13012 IR Sensor Pair">13012 IR Sensor Pair</option>
          <option value="13013 Signal Tower Light">13013 Signal Tower Light</option>
          <option value="13014 Load Cell, ASY, 75 kg">13014 Load Cell, ASY, 75 kg</option>
          <option value="13015 Display Membrane, Keys">13015 Display Membrane, Keys</option>
          <option value="13016 Display Membrane, Logo">13016 Display Membrane, Logo</option>
          <option value="13017 Display Membrane, Touch">13017 Display Membrane, Touch</option>
          <option value="13018 Geared Motor">13018 Geared Motor</option>
          <option value="13019 PCD ASY, A/D Connect">13019 PCD ASY, A/D Connect</option>
          <option value="13020 PCB ASY, A/D">13020 PCB ASY, A/D</option>
          <option value="13021 PCB ASY, Display I/F">13021 PCB ASY, Display I/F</option>
          <option value="13022 PCB ASY, Display, I/O 1">13022 PCB ASY, Display, I/O 1</option>
          <option value="13023 PCB ASY, Display, I/O 2">13023 PCB ASY, Display, I/O 2</option>
          <option value="13024 PCB ASY, Display, Main">13024 PCB ASY, Display, Main</option>
          <option value="13025 PCB ASY, Display, TFT Panel">13025 PCB ASY, Display, TFT Panel</option>
          <option value="13026 PCB ASY, Gate, RCV">13026 PCB ASY, Gate, RCV</option>
          <option value="13027 PCB ASY, Gate, XMIT">13027 PCB ASY, Gate, XMIT</option>
          <option value="13028 PCB ASY, Mother">13028 PCB ASY, Mother</option>
          <option value="13029 PCB ASY, Relay">13029 PCB ASY, Relay</option>
          <option value="13030 Power Supply, REG 1">13030 Power Supply, REG 1</option>
          <option value="13031 Power Supply, REG 2">13031 Power Supply, REG 2</option>
          <option value="13032 Power Supply, REG 3">13032 Power Supply, REG 3</option>
          <option value="13033 Drive Roller">13033 Drive Roller</option>
          <option value="13034 Tension Roller">13034 Tension Roller</option>
          <option value="13035 Magnetic Switch">13035 Magnetic Switch</option>
          <option value="13036 Main Power Switch">13036 Main Power Switch</option>
          <option value="13037 LCD Display Transformer">13037 LCD Display Transformer</option>
          <option value="16174 MID RANGE SENSOR">16174 MID RANGE SENSOR</option>
          <option value="16176 FULL RANGE SENSOR">16176 FULL RANGE SENSOR</option>
          <option value="16934 FULL RANGE NTEP SENSOR">16934 FULL RANGE NTEP SENSOR</option>
          <option value="16790 CS210-L CONTROL BOX">16790 CS210-L CONTROL BOX</option>
          <option value="15612 FRAMES, EXTRUDED ALUMINUM">15612 FRAMES, EXTRUDED ALUMINUM</option>
          <option value="16377 ENCODER MOUNT ASSEMBLY">16377 ENCODER MOUNT ASSEMBLY</option>
          <option value="14262 On/Off Switch Assembly">14262 On/Off Switch Assembly</option>
          <option value="13210 PCB Assembly, Mother Board">13210 PCB Assembly, Mother Board</option>
          <option value="14350 Relays (TE Connectivity, KUP-11d15-5)">14350 Relays (TE Connectivity, KUP-11d15-5)</option>
          <option value="13218 AC/DC Power Supply Single-Out 12 V 8.33A 150 W">13218 AC/DC Power Supply Single-Out 12 V 8.33A 150 W</option>
          <option value="13764 DC Motor Controller">13764 DC Motor Controller</option>
          <option value="13866 Window, Dust Cover">13866 Window, Dust Cover</option>
          <option value="14251 Roller 1.9 OD x 33L 7/16 HEX">14251 Roller 1.9 OD x 33L 7/16 HEX</option>
          <option value="14253 Roller 2.5 OD x 26L 11/16 HEX">14253 Roller 2.5 OD x 26L 11/16 HEX</option>
          <option value="14254 Roller 4 OD x 27L 11/16 HEX Flat">14254 Roller 4 OD x 27L 11/16 HEX Flat</option>
          <option value="14255 Drive Roller 4.5 OD x 27L">14255 Drive Roller 4.5 OD x 27L</option>
          <option value="14285 Bearing, 0.75ID Flange Mount">14285 Bearing, 0.75ID Flange Mount</option>
          <option value="14244 Conveyor Belt 24W x 132L">14244 Conveyor Belt 24W x 132L</option>
          <option value="14283 Timing Belt, 1'' W x 33'' L H Series">14283 Timing Belt, 1'' W x 33'' L H Series</option>
          <option value="14257 L Encoder TR1 Mounting Bracket">14257 L Encoder TR1 Mounting Bracket</option>
          <option value="14258 Trutrac-TR1 Encoder Assembly">14258 Trutrac-TR1 Encoder Assembly</option>
          <option value="14210 Nose Roller Assembly">14210 Nose Roller Assembly</option>
          <option value="14248 Bision 480DC Parallel Shaft DC Motor">14248 Bision 480DC Parallel Shaft DC Motor</option>
          <option value="10273 Cal Cube 12x5x.36">10273 Cal Cube 12x5x.36</option>
          <option value="13411 USB to Ethernet Adapter">13411 USB to Ethernet Adapter</option>
          <option value="13413 Ethernet Cable, 10 ft">13413 Ethernet Cable, 10 ft</option>
          <option value="14510 Acrylic Tray (24'' x 18'') (Optional)">14510 Acrylic Tray (24'' x 18'') (Optional)</option>
          <option value="14437 User Manual (PDF)">14437 User Manual (PDF)</option>
          <option value="15077 ROLLER, MOTOR 28BF PM486FE">15077 ROLLER, MOTOR 28BF PM486FE</option>
          <option value="15075 ROLLER, CONVYR 28BF x 1.9DIA">15075 ROLLER, CONVYR 28BF x 1.9DIA</option>
          <option value="15076 ROLLER, CONVYR 28BF x 1.9DIA X2GRV">15076 ROLLER, CONVYR 28BF x 1.9DIA X2GRV</option>
          <option value="14945 O-RING, 3/16DIAx9.5 HT BLU ITR">14945 O-RING, 3/16DIAx9.5" HT BLU ITR</option>
          <option value="15071 CONVEYOR BELT 26IN">15071 CONVEYOR BELT 26IN</option>
          <option value="15074 REFLECTOR, RL112G-1">15074 REFLECTOR, RL112G-1</option>
          <option value="15128 DRIVE, ITOH MDR CBM-105FP">15128 DRIVE, ITOH MDR CBM-105FP</option>
          <option value="14056 PHOTO EYE GRL18S, RT ANGLE">14056 PHOTO EYE GRL18S, RT ANGLE</option>
          <option value="15020 CONVEYOR JUNCTION PCB">15020 CONVEYOR JUNCTION PCB</option>
          <option value="15084 STACK LIGHT POST">15084 STACK LIGHT POST</option>
          <option value="13945 STACK LIGHT G/R/Y">13945 STACK LIGHT G/R/Y</option>
          <option value="14483 FUSE, 2.5A 125 VAC">14483 FUSE, 2.5A 125 VAC</option>
          <option value="14467 RELAY, SPDT, 16A 24DC COIL">14467 RELAY, SPDT, 16A 24DC COIL</option>
          <option value="14490 CIRCUIT BREAKER 1P 7A D CURVE">14490 CIRCUIT BREAKER 1P 7A D CURVE</option>
          <option value="14262 SWITCH ASY, ON-OFF">14262 SWITCH ASY, ON-OFF</option>
          <option value="14334 PCB ASY, MOTHERBOARD SCALE">14334 PCB ASY, MOTHERBOARD SCALE</option>
          <option value="15041 POWER SUPPLY, 12VDC 54W">15041 POWER SUPPLY, 12VDC 54W</option>
          <option value="13935 POWER SUPPLY, 24VDC 480W">13935 POWER SUPPLY, 24VDC 480W</option>
          <option value="15080 FOOT PEDAL WITH CABLE">15080 FOOT PEDAL WITH CABLE</option>
          <option value="15127 CS275 USER MANUAL">15127 CS275 USER MANUAL</option>
          <option value="10275 CALIBRATION CUBE 12x12x12">10275 CALIBRATION CUBE 12x12x12</option>
          <option value="13413 CAT 5e PATCH 10FT">13413 CAT 5e PATCH 10FT</option>
          <option value="13411 USB TO ETHERNET ADAPTER">13411 USB TO ETHERNET ADAPTER</option>
          <option value="14540 USB 2.0 CABLE 3M">14540 USB 2.0 CABLE 3M</option>
          <option value="15087 REFLECTOR, BRT-42D, M5 STUD">15087 REFLECTOR, BRT-42D, M5 STUD</option>
          <option value="10795 Motorized Roller, 50 m/min 800VP-GL, 120V, 57.50mm">10795 Motorized Roller, 50 m/min 800VP-GL, 120V, 57.50mm</option>
          <option value="10797 Slave Roller 800VP-GL, 57mm">10797 Slave Roller 800VP-GL, 57mm</option>
          <option value="12487 Pulley SS-41, 42mm">12487 Pulley SS-41, 42mm</option>
          <option value="10798 Horizontal lens cover (lens filter - upper)">10798 Horizontal lens cover (lens filter - upper)</option>
          <option value="10799 Horizontal lens cover (lens filter - lower)">10799 Horizontal lens cover (lens filter - lower)</option>
          <option value="10800 Vertical lens cover (lens filter - sides)">10800 Vertical lens cover (lens filter - sides)</option>
          <option value="10801 Fuse - 5A">10801 Fuse - 5A</option>
          <option value="10802 Fuse - 1A">10802 Fuse - 1A</option>
          <option value="10803 Serial Communication Cable">10803 Serial Communication Cable</option>
          <option value="10804 Acrylic Dust Cover (width)">10804 Acrylic Dust Cover (width)</option>
          <option value="10805 Roller Belt (6mm x 280 circumference)">10805 Roller Belt (6mm x 280 circumference)</option>
          <option value="10806 Roller Belt (6mm x 390 circumference)">10806 Roller Belt (6mm x 390 circumference)</option>
          <option value="10807 Roller Belt (6mm x 480 circumference)">10807 Roller Belt (6mm x 480 circumference)</option>
          <option value="10808 E-Stop Switch (remote)">10808 E-Stop Switch (remote)</option>
          <option value="10809 E-Stop Switch (control panel)">10809 E-Stop Switch (control panel)</option>
          <option value="10810 Rotary Encoder Asy">10810 Rotary Encoder Asy</option>
          <option value="Encoder Cable Asy">Encoder Cable Asy</option>
          <option value="10811 IR Sensor pairs / Photoelectric Switch">10811 IR Sensor pairs/Photoelectric Switch</option>
          <option value="10812 Error/Warning Light">10812 Error/Warning Light</option>
          <option value="10813 Toggle Switch Cover - Acrylic">10813 Toggle Switch Cover - Acrylic</option>
          <option value="10822 Toggle Switch Cover - Aluminum">10822 Toggle Switch Cover - Aluminum</option>
          <option value="10814 On/Off Switch (panel)">10814 On/Off Switch (panel)</option>
          <option value="10815 Sealable Cover for Load Cell Amp">10815 Sealable Cover for Load Cell Amp</option>
          <option value="10818 Toggle Switch - 2 position">10818 Toggle Switch - 2 position</option>
          <option value="10819 Toggle Switch - 3 position">10819 Toggle Switch - 3 position</option>
          <option value="10820 Toggle Switch - momentary">10820 Toggle Switch - momentary</option>
          <option value="12506 Length Sensor Mounting Bracket">12506 Length Sensor Mounting Bracket</option>
          <option value="11339 Error Clear Button">11339 Error Clear Button</option>
          <option value="10821 Plastic End Cap - Black">10821 Plastic End Cap - Black</option>
        `;
        break;

      case 'CS25':
        quantityDropdown.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `;
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
          <option value="14119 CS25 Glass">14119 CS25 Glass</option>
	        <option value="14309 CS25 LoadCell 10KG">14309 CS25 LoadCell 10KG</option>
	        <option value="14090 CS25/325 DISPLAY/LCD ASY">14090 CS25/325 DISPLAY/LCD ASY</option>
          <option value="14129 CS25/325 HDMI 2FT Cable">14129 CS25/325 HDMI 2FT Cable</option>
	        <option value="13624 Cal Cube 5x3x2">13624 Cal Cube 5x3x2</option>
	        <option value="12844 CSx25 TX Board ">12844 CSx25 TX Board</option>
          <option value="12841 CSx25 RX Board  ">12841 CSx25 RX Board</option>
          <option value="13218 CSx25 Power Supply">13218 CSx25 Power Supply</option>
	        <option value="13351 CSx25 1Amp Fuse">13351 CSx25 1Amp Fuse</option>
	        <option value="14100 CS25/325 Controller ASY">14100 CS25/325 Controller ASY</option>
	        <option value="13210 CSx25 Motherboard">13210 CSx25 Motherboard</option>
	        <option value="13476 SDXC 32GB Memory Card">13476 SDXC 32GB Memory Card</option>
	        <option value="16104 25/325 LDU Upgrade Kit">16104 25/325 LDU Upgrade Kit</option>
	        <option value="10083 AC Power Cord">10083 AC Power Cord</option>
	        <option value="13411 USB to Ethernet Adapter">13411 USB to Ethernet Adapter</option>
	        <option value="13413 Cat5e Patch 10ft Ethernet Cable">13413 Cat5e Patch 10ft Ethernet Cable</option>
	        <option value="12997 USB To Serial Adapter">Se12997 USB To Serial Adapterlect</option>
          <option value="14540 USB A To B Cable">14540 USB A To B Cable</option>
          <option value="11493 Null Modem Serial Cable">11493 Null Modem Serial Cable</option>
	        <option value="12344 CSx25 Ball Bearing">12344 CSx25 Ball Bearing</option>
	        <option value="14620 Portable Power Kit">14620 Portable Power Kit</option>
          <option value="10440 25lb Calibration Weight">10440 25lb Calibration Weight</option>
	        <option value="14450 Axis Camera Kit">14450 Axis Camera Kit</option>
          <option value="14449 SLR Rebel EOS Camera Kit">14449 SLR Rebel EOS Camera Kit</option>
	        <option value="12118 Cable Tie / Zip Tie 11in">12118 Cable Tie / Zip Tie 11in</option>
	        <option value="10273 Cal Cube 12x5x.36">10273 Cal Cube 12x5x.36</option>
          <option value="13624 Cal Cube 5x3x2">13624 Cal Cube 5x3x2</option>
	        <option value="12700 Qbit DB">12700 Qbit DB</option>
          <option value="12701 Qbit EDT">12701 Qbit EDT</option>
          <option value="12703 Qbit WEB">12703 Qbit WEB</option>
          <option value="12708 Qbit Xfer">12708 Qbit Xfer</option>
        `;
        break;

      case 'CS125':
        quantityDropdown.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `;
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
          <option value="15030 CS125 Display">15030 CS125 Display</option>
	        <option value="14920 CS125 Gate Ribbon Cable Kit">14920 CS125 Gate Ribbon Cable Kit</option>
	        <option value="12890 CS125 Glass">12890 CS125 Glass</option>
	        <option value="12982 CS125 LoadCell 20KG">12982 CS125 LoadCell 20KG</option>
	        <option value="10273 Cal Cube 12x5x.36">10273 Cal Cube 12x5x.36</option>
	        <option value="12844 CSx25 TX Board ">12844 CSx25 TX Board</option>
          <option value="12841 CSx25 RX Board  ">12841 CSx25 RX Board</option>
          <option value="13218 CSx25 Power Supply">13218 CSx25 Power Supply</option>
	        <option value="13351 CSx25 1Amp Fuse">13351 CSx25 1Amp Fuse</option>
	        <option value="14100 CS25/325 Controller ASY">14100 CS25/325 Controller ASY</option>
	        <option value="13210 CSx25 Motherboard">13210 CSx25 Motherboard</option>
	        <option value="13476 SDXC 32GB Memory Card">13476 SDXC 32GB Memory Card</option>
	        <option value="16104 25/325 LDU Upgrade Kit">16104 25/325 LDU Upgrade Kit</option>
	        <option value="10083 AC Power Cord">10083 AC Power Cord</option>
	        <option value="13411 USB to Ethernet Adapter">13411 USB to Ethernet Adapter</option>
	        <option value="13413 Cat5e Patch 10ft Ethernet Cable">13413 Cat5e Patch 10ft Ethernet Cable</option>
	        <option value="12997 USB To Serial Adapter">Se12997 USB To Serial Adapterlect</option>
          <option value="14540 USB A To B Cable">14540 USB A To B Cable</option>
          <option value="11493 Null Modem Serial Cable">11493 Null Modem Serial Cable</option>
	        <option value="12344 CSx25 Ball Bearing">12344 CSx25 Ball Bearing</option>
	        <option value="14620 Portable Power Kit">14620 Portable Power Kit</option>
          <option value="10440 25lb Calibration Weight">10440 25lb Calibration Weight</option>
	        <option value="14450 Axis Camera Kit">14450 Axis Camera Kit</option>
          <option value="14449 SLR Rebel EOS Camera Kit">14449 SLR Rebel EOS Camera Kit</option>
	        <option value="12118 Cable Tie / Zip Tie 11in">12118 Cable Tie / Zip Tie 11in</option>
	        <option value="10273 Cal Cube 12x5x.36">10273 Cal Cube 12x5x.36</option>
          <option value="13624 Cal Cube 5x3x2">13624 Cal Cube 5x3x2</option>
	        <option value="12700 Qbit DB">12700 Qbit DB</option>
          <option value="12701 Qbit EDT">12701 Qbit EDT</option>
          <option value="12703 Qbit WEB">12703 Qbit WEB</option>
          <option value="12708 Qbit Xfer">12708 Qbit Xfer</option>
        `;
        break;

      case 'CS325':
        quantityDropdown.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `;
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
          <option value="16152 CS325 DB25/DB9 HIGH FLEX Sleeved Cable For CHAIN">16152 CS325 DB25/DB9 HIGH FLEX Sleeved Cable For CHAIN</option>
          <option value="14736 4P 4P HIGH FLEX 44IN PowerCable For CHAIN">14736 4P 4P HIGH FLEX 44IN PowerCable For CHAIN</option
	        <option value="16074 CS325 Cable Chain ASY Kit">16074 CS325 Cable Chain ASY Kit</option>
          <option value="14155 CS325 Small Cable Ribbon">14155 CS325 Small Cable Ribbon</option>
          <option value="14156 CS325 Large Cable Ribbon">14156 CS325 Large Cable Ribbon</option>
          <option value="14157 CS325 Power Cable Chain">14157 CS325 Power Cable Chain</option>
          <option value="14159 CS325 Encoder">14159 CS325 Encoder</option>
          <option value="15200 CS325 Glass">15200 CS325 Glass</option>
          <option value="14675 CS325 LoadCell 20KG">14675 CS325 LoadCell 20KG</option>
          <option value="14090 CS25/325 DISPLAY/LCD ASY">14090 CS25/325 DISPLAY/LCD ASY</option>
          <option value="14129 CS25/325 HDMI 2FT Cable">14129 CS25/325 HDMI 2FT Cable</option>
          <option value="13624 Cal Cube 5x3x2">13624 Cal Cube 5x3x2</option>
          <option value="12844 CSx25 TX Board ">12844 CSx25 TX Board</option>
          <option value="12841 CSx25 RX Board  ">12841 CSx25 RX Board</option>
          <option value="13218 CSx25 Power Supply">13218 CSx25 Power Supply</option>
          <option value="13351 CSx25 1Amp Fuse">13351 CSx25 1Amp Fuse</option>
          <option value="14100 CS25/325 Controller ASY">14100 CS25/325 Controller ASY</option>
          <option value="13210 CSx25 Motherboard">13210 CSx25 Motherboard</option>
          <option value="13476 SDXC 32GB Memory Card">13476 SDXC 32GB Memory Card</option>
          <option value="16104 25/325 LDU Upgrade Kit">16104 25/325 LDU Upgrade Kit</option>
          <option value="10083 AC Power Cord">10083 AC Power Cord</option>
          <option value="13411 USB to Ethernet Adapter">13411 USB to Ethernet Adapter</option>
          <option value="13413 Cat5e Patch 10ft Ethernet Cable">13413 Cat5e Patch 10ft Ethernet Cable</option>
          <option value="12997 USB To Serial Adapter">Se12997 USB To Serial Adapterlect</option>
          <option value="14540 USB A To B Cable">14540 USB A To B Cable</option>
          <option value="11493 Null Modem Serial Cable">11493 Null Modem Serial Cable</option>
          <option value="12344 CSx25 Ball Bearing">12344 CSx25 Ball Bearing</option>
          <option value="14620 Portable Power Kit">14620 Portable Power Kit</option>
          <option value="10440 25lb Calibration Weight">10440 25lb Calibration Weight</option>
	        <option value="14450 Axis Camera Kit">14450 Axis Camera Kit</option>
          <option value="14449 SLR Rebel EOS Camera Kit">14449 SLR Rebel EOS Camera Kit</option>
          <option value="12118 Cable Tie / Zip Tie 11in">12118 Cable Tie / Zip Tie 11in</option>
          <option value="10273 Cal Cube 12x5x.36">10273 Cal Cube 12x5x.36</option>
          <option value="13624 Cal Cube 5x3x2">13624 Cal Cube 5x3x2</option>
          <option value="12700 Qbit DB">12700 Qbit DB</option>
          <option value="12701 Qbit EDT">12701 Qbit EDT</option>
          <option value="12703 Qbit WEB">12703 Qbit WEB</option>
          <option value="12708 Qbit Xfer">12708 Qbit Xfer</option>
        `;
        break;

      case 'CS100':
        quantityDropdown.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `;
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
          <option value="12780 QI Sensor">12780 QI Sensor</option>
          <option value="15163 LDU Scale Card">15163 LDU Scale Card</option>
          <option value="14005 CS100 T Controller ASY">14005 CS100 T Controller ASY</option>
          <option value="14652 CS100 T Upgrade Kit ">14652 CS100 T Upgrade Kit </option>
          <option value="15023 CS100 T LoadCell 100KG">15023 CS100 T LoadCell 100KG</option>
          <option value="10273 Cal Cube 12x5x.36">10273 Cal Cube 12x5x.36</option>
          <option value="12780 QI Sensor">12780 QI Sensor</option>
          <option value="15163 LDU Scale Card">15163 LDU Scale Card</option>
          <option value="14062 CS1x0 T PowerSupply Brick">14062 CS1x0 T PowerSupply Brick</option>
          <option value="15955 CS1x0 TOUCH Screen Display Asy">15955 CS1x0 TOUCH Screen Display Asy</option>
          <option value="14334 CS1x0 Motherboard">14334 CS1x0 Motherboard</option>
          <option value="13476 SDXC 32GB Memory Card">13476 SDXC 32GB Memory Card</option>
          <option value="12344 CSx25 Ball Bearing">12344 CSx25 Ball Bearing</option>
          <option value="10083 AC Power Cord">10083 AC Power Cord</option>
          <option value="13411 USB to Ethernet Adapter">13411 USB to Ethernet Adapter</option>
          <option value="13413 Cat5e Patch 10ft Ethernet Cable">13413 Cat5e Patch 10ft Ethernet Cable</option>
          <option value="12997 USB To Serial Adapter">Se12997 USB To Serial Adapterlect</option>
          <option value="14540 USB A To B Cable">14540 USB A To B Cable</option>
          <option value="11493 Null Modem Serial Cable">11493 Null Modem Serial Cable</option>
          <option value="10275 Cal Cube 12x12x12">10275 Cal Cube 12x12x12</option>
          <option value="10273 Cal Cube 12x5x.36">10273 Cal Cube 12x5x.36</option>
          <option value="14450 Axis Camera Kit">14450 Axis Camera Kit</option>
          <option value="12700 Qbit DB">12700 Qbit DB</option>
          <option value="12701 Qbit EDT">12701 Qbit EDT</option>
          <option value="12703 Qbit WEB">12703 Qbit WEB</option>
          <option value="12708 Qbit Xfer">12708 Qbit Xfer</option>
        `;
        break;
      
      case 'CS110':
        quantityDropdown.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `; 
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
          <option value="14527 CS110 T Controller ASY">14527 CS110 T Controller ASY</option>
          <option value="15380 CS110 XT Controller ASY">15380 CS110 XT Controller ASY</option>
          <option value="14741 CS110 T Upgrade Kit">14741 CS110 T Upgrade Kit</option>
          <option value="CS110 T LoadCell 100KG">CS110 T LoadCell 100KG</option>
          <option value="15370 CS110 XT LoadCell 50KG">15370 CS110 XT LoadCell 50KG</option>
	        <option value="12780 QI Sensor">12780 QI Sensor</option>
          <option value="15163 LDU Scale Card">15163 LDU Scale Card</option>
          <option value="14062 CS1x0 T PowerSupply Brick">14062 CS1x0 T PowerSupply Brick</option>
          <option value="15955 CS1x0 TOUCH Screen Display Asy">15955 CS1x0 TOUCH Screen Display Asy</option>
          <option value="14334 CS1x0 Motherboard">14334 CS1x0 Motherboard</option>
          <option value="13476 SDXC 32GB Memory Card">13476 SDXC 32GB Memory Card</option>
          <option value="10083 AC Power Cord">10083 AC Power Cord</option>
          <option value="13411 USB to Ethernet Adapter">13411 USB to Ethernet Adapter</option>
          <option value="13413 Cat5e Patch 10ft Ethernet Cable">13413 Cat5e Patch 10ft Ethernet Cable</option>
          <option value="12997 USB To Serial Adapter">Se12997 USB To Serial Adapterlect</option>
          <option value="14540 USB A To B Cable">14540 USB A To B Cable</option>
          <option value="11493 Null Modem Serial Cable">11493 Null Modem Serial Cable</option>
          <option value="10275 Cal Cube 12x12x12">10275 Cal Cube 12x12x12</option>
          <option value="10273 Cal Cube 12x5x.36">10273 Cal Cube 12x5x.36</option>
          <option value="14450 Axis Camera Kit">14450 Axis Camera Kit</option>
          <option value="12700 Qbit DB">12700 Qbit DB</option>
          <option value="12701 Qbit EDT">12701 Qbit EDT</option>
          <option value="12703 Qbit WEB">12703 Qbit WEB</option>
          <option value="12708 Qbit Xfer">12708 Qbit Xfer</option>
        `;
        break;

      case 'CS150':
        quantityDropdown.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `;
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
          <option value="14012 CS150 T Controller ASY">14012 CS150 T Controller ASY</option>
          <option value="14742 CS150 T Upgrade KIT">14742 CS150 T Upgrade KIT</option>
          <option value="12271 CS150 T LoadCell 100KG">12271 CS150 T LoadCell 100KG</option>
          <option value="12780 QI Sensor">12780 QI Sensor</option>
          <option value="15163 LDU Scale Card">15163 LDU Scale Card</option>
          <option value="14062 CS1x0 T PowerSupply Brick">14062 CS1x0 T PowerSupply Brick</option>
          <option value="15955 CS1x0 TOUCH Screen Display Asy">15955 CS1x0 TOUCH Screen Display Asy</option>
          <option value="14334 CS1x0 Motherboard">14334 CS1x0 Motherboard</option>
          <option value="13476 CSx25/1x0 SDXC 32GB Memory Card">13476 CSx25/1x0 SDXC 32GB Memory Card</option>
          <option value="13476 CSx25/1x0 SDXC 32GB Memory Card">13476 CSx25/1x0 SDXC 32GB Memory Card</option>
          <option value="10083 AC Power Cord">10083 AC Power Cord</option>
          <option value="12344 CSx25 Ball Bearing">12344 CSx25 Ball Bearing</option>
          <option value="13411 USB to Ethernet Adapter">13411 USB to Ethernet Adapter</option>
          <option value="13413 Cat5e Patch 10ft Ethernet Cable">13413 Cat5e Patch 10ft Ethernet Cable</option>
          <option value="12997 USB To Serial Adapter">Se12997 USB To Serial Adapterlect</option>
          <option value="14540 USB A To B Cable">14540 USB A To B Cable</option>
          <option value="11493 Null Modem Serial Cable">11493 Null Modem Serial Cable</option>
          <option value="10275 Cal Cube 12x12x12">10275 Cal Cube 12x12x12</option>
          <option value="10273 Cal Cube 12x5x.36">10273 Cal Cube 12x5x.36</option>
          <option value="14450 Axis Camera Kit">14450 Axis Camera Kit</option>
          <option value="12700 Qbit DB">12700 Qbit DB</option>
          <option value="12701 Qbit EDT">12701 Qbit EDT</option>
          <option value="12703 Qbit WEB">12703 Qbit WEB</option>
          <option value="12708 Qbit Xfer">12708 Qbit Xfer</option>

        `;
        break;

      case 'CS75':
      case 'CS75PRO':
        quantityDropdown.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `;
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
          <option value="14718 CS75 C PC/Combo Controller">14718 CS75 C PC/Combo Controller</option>
          <option value="10083 AC Power Cord">10083 AC Power Cord</option>
          <option value="13411 USB to Ethernet Adapter">13411 USB to Ethernet Adapter</option>
          <option value="13413 Cat5e Patch 10ft Ethernet Cable">13413 Cat5e Patch 10ft Ethernet Cable</option>
          <option value="12997 USB To Serial Adapter">Se12997 USB To Serial Adapterlect</option>
          <option value="14540 USB A To B Cable">14540 USB A To B Cable</option>
          <option value="11493 Null Modem Serial Cable">11493 Null Modem Serial Cable</option>
          <option value="12344 CSx25 Ball Bearing">12344 CSx25 Ball Bearing</option>
          <option value="14620 Portable Power Kit">14620 Portable Power Kit</option>
          <option value="10440 25lb Calibration Weight">10440 25lb Calibration Weight</option>
	        <option value="14450 Axis Camera Kit">14450 Axis Camera Kit</option>
          <option value="14449 SLR Rebel EOS Camera Kit">14449 SLR Rebel EOS Camera Kit</option>
          <option value="12118 Cable Tie / Zip Tie 11in">12118 Cable Tie / Zip Tie 11in</option>
          <option value="10273 Cal Cube 12x5x.36">10273 Cal Cube 12x5x.36</option>
          <option value="13624 Cal Cube 5x3x2">13624 Cal Cube 5x3x2</option>
	        <option value="12700 Qbit DB">12700 Qbit DB</option>
          <option value="12701 Qbit EDT">12701 Qbit EDT</option>
          <option value="12703 Qbit WEB">12703 Qbit WEB</option>
          <option value="12708 Qbit Xfer">12708 Qbit Xfer</option>
        `;
        break;

      case 'S9':
      case 'CS1100AKL':
      case 'CS1200AKL':
        quantityDropdown.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `;
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
          <option value="13092 KINGSTON 960GB SSD SATA 3">13092 KINGSTON 960GB SSD SATA 3</option>
          <option value="16416 Windows 10 IOT ENT 2021 LICENSE KEY">16416 Windows 10 IOT ENT 2021 LICENSE KEY</option>
          <option value="13814 AKL INDUST PC EMB AKL 84200 RED PC">13814 AKL INDUST PC EMB AKL 84200 RED PC</option>
          <option value="14536 AKL Cabinet Fan Filter">14536 AKL Cabinet Fan Filter</option>
          <option value="16789 Linear Bearing">16789 Linear Bearing</option>
          <option value="13884 LINEAR CARRIAGE CRADLE ASY">13884 LINEAR CARRIAGE CRADLE ASY</option>
          <option value="13829 FAN W/ Filter Assembly">13829 FAN W/ Filter Assembly</option>
          <option value="13834 24V Power Supply">13834 24V Power Supply</option>
          <option value="15885 POE Switch">15885 POE Switch</option>
          <option value="13824 1200 Encoder">13824 1200 Encoder</option>
          <option value="13822 VFD Inverter (Motor Controller">13822 VFD Inverter (Motor Controller)</option>
          <option value="13924 PULLEY ASY FREE SPIN ">13924 PULLEY ASY FREE SPIN</option>
          <option value="12595 Motor Slave Pulley ">12595 Motor Slave Pulley</option>
          <option value="13823 Motor Pulley">13823 Motor Pulley</option>
          <option value="13917 MOTOR">13917 MOTOR</option>
          <option value="13581 Main Power Switch Knob">13581 Main Power Switch Knob</option>
          <option value="13840 Shaft Coupling">13840 Shaft Coupling</option>
          <option value="13833 Chain W/Wire ASY">13833 Chain W/Wire ASY</option>
          <option value="13090 Chain W/O Wire">13090 Chain W/O Wire</option>
          <option value="13821 Touch Panel LCD Display">13821 Touch Panel LCD Display</option>
          <option value="13579 LMS500 LASER HEAD">13579 LMS500 LASER HEAD</option>
          <option value="13825 PROX Sensor">13825 PROX Sensor</option>
          <option value="15443 12 WIRE 30ft 20AWG">15443 12 WIRE 30ft 20AWG</option>
          <option value="15966 RJ45 LONG TYPE">15966 RJ45 LONG TYPE</option>
          <option value="13053 LMS Wire">13053 LMS Wire</option>
          <option value="13820 LMS Connector">13820 LMS Connector</option>
          <option value="16393 Laser Marking Kit">16393 Laser Marking Kit</option>
          <option value="16387 Laser (Single)">16387 Laser (Single)</option>
          <option value="13827 LED STACK LIGHT">13827 LED STACK LIGHT</option>
          <option value="13513 Axis CAMERA P3224 1080P">13513 Axis CAMERA P3224 1080P</option>
          <option value="12581 Axis CAMERA ASY W/Plate">12581 Axis CAMERA ASY W/Plate</option>
          <option value="13883 BELT 12ft">13883 BELT 12ft</option>
          <option value="14553 CAL BOX 60x20x20">14553 CAL BOX 60x20x20</option>
          <option value="15019 Zebra Barcode Cordless Kit Serial Only">15019 Zebra Barcode Cordless Kit Serial Only</option>
          <option value="NMISC AKL Cabinet Door Key">NMISC AKL Cabinet Door Key</option>
        `;
        break;

      case 'CS200-TS':
        quantityDropdown.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `;
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
          <option value="13000 Motor Belt">13000 Motor Belt</option>
          <option value="13001 Emergency Stop Button, ES1">13001 Emergency Stop Button, ES1</option>
          <option value="13002 Emergency Stop Button, ES2">13002 Emergency Stop Button, ES2</option>
          <option value="13003 Circuit Breaker">13003 Circuit Breaker</option>
          <option value="13004 Conveyor Belt, Large">13004 Conveyor Belt, Large</option>
          <option value="13005 Conveyor Belt, Small">13005 Conveyor Belt, Small</option>
          <option value="13006 Emergency Drive Unit">13006 Emergency Drive Unit</option>
          <option value="13007 Encoder">13007 Encoder</option>
          <option value="13008 Noise Filter, NF1">13008 Noise Filter, NF1</option>
          <option value="13009 Noise Filter, NF2">13009 Noise Filter, NF2</option>
          <option value="13010 Motor Inverter">13010 Motor Inverter</option>
          <option value="13011 Motor Inverter, Option">13011 Motor Inverter, Option</option>
          <option value="13012 IR Sensor Pair">13012 IR Sensor Pair</option>
          <option value="13013 Signal Tower Light">13013 Signal Tower Light</option>
          <option value="13014 Load Cell, ASY, 75 kg">13014 Load Cell, ASY, 75 kg</option>
          <option value="13015 Display Membrane, Keys">13015 Display Membrane, Keys</option>
          <option value="13016 Display Membrane, Logo">13016 Display Membrane, Logo</option>
          <option value="13017 Display Membrane, Touch">13017 Display Membrane, Touch</option>
          <option value="13018 Geared Motor">13018 Geared Motor</option>
          <option value="13019 PCD ASY, A/D Connect">13019 PCD ASY, A/D Connect</option>
          <option value="13020 PCB ASY, A/D">13020 PCB ASY, A/D</option>
          <option value="13021 PCB ASY, Display I/F">13021 PCB ASY, Display I/F</option>
          <option value="13022 PCB ASY, Display, I/O 1">13022 PCB ASY, Display, I/O 1</option>
          <option value="13023 PCB ASY, Display, I/O 2">13023 PCB ASY, Display, I/O 2</option>
          <option value="13024 PCB ASY, Display, Main">13024 PCB ASY, Display, Main</option>
          <option value="13025 PCB ASY, Display, TFT Panel">13025 PCB ASY, Display, TFT Panel</option>
          <option value="13026 PCB ASY, Gate, RCV">13026 PCB ASY, Gate, RCV</option>
          <option value="13027 PCB ASY, Gate, XMIT">13027 PCB ASY, Gate, XMIT</option>
          <option value="13028 PCB ASY, Mother">13028 PCB ASY, Mother</option>
          <option value="13029 PCB ASY, Relay">13029 PCB ASY, Relay</option>
          <option value="13030 Power Supply, REG 1">13030 Power Supply, REG 1</option>
          <option value="13031 Power Supply, REG 2">13031 Power Supply, REG 2</option>
          <option value="13032 Power Supply, REG 3">13032 Power Supply, REG 3</option>
          <option value="13033 Drive Roller">13033 Drive Roller</option>
          <option value="13034 Tension Roller">13034 Tension Roller</option>
          <option value="13035 Magnetic Switch">13035 Magnetic Switch</option>
          <option value="13036 Main Power Switch">13036 Main Power Switch</option>
          <option value="13037 LCD Display Transformer">13037 LCD Display Transformer</option>
        `;
        break;
      
      case 'CS210-L':
        quantityDropdown.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `;
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
          <option value="16174 MID RANGE SENSOR">16174 MID RANGE SENSOR</option>
          <option value="16176 FULL RANGE SENSOR">16176 FULL RANGE SENSOR</option>
          <option value="16934 FULL RANGE NTEP SENSOR">16934 FULL RANGE NTEP SENSOR</option>
          <option value="16790 CS210-L CONTROL BOX">16790 CS210-L CONTROL BOX</option>
          <option value="15612 FRAMES, EXTRUDED ALUMINUM">15612 FRAMES, EXTRUDED ALUMINUM</option>
          <option value="16377 ENCODER MOUNT ASSEMBLY">16377 ENCODER MOUNT ASSEMBLY</option>
        `;
        break;

      case 'CS225':
        quantityDropdown.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `;
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
          <option value="14262 On/Off Switch Assembly">14262 On/Off Switch Assembly</option>
          <option value="13210 PCB Assembly, Mother Board">13210 PCB Assembly, Mother Board</option>
          <option value="14350 Relays (TE Connectivity, KUP-11d15-5)">14350 Relays (TE Connectivity, KUP-11d15-5)</option>
          <option value="13218 AC/DC Power Supply Single-Out 12 V 8.33A 150 W">13218 AC/DC Power Supply Single-Out 12 V 8.33A 150 W</option>
          <option value="13764 DC Motor Controller">13764 DC Motor Controller</option>
          <option value="13866 Window, Dust Cover">13866 Window, Dust Cover</option>
          <option value="14251 Roller 1.9 OD x 33L 7/16 HEX">14251 Roller 1.9 OD x 33L 7/16 HEX</option>
          <option value="14253 Roller 2.5 OD x 26L 11/16 HEX">14253 Roller 2.5 OD x 26L 11/16 HEX</option>
          <option value="14254 Roller 4 OD x 27L 11/16 HEX Flat">14254 Roller 4 OD x 27L 11/16 HEX Flat</option>
          <option value="14255 Drive Roller 4.5 OD x 27L">14255 Drive Roller 4.5 OD x 27L</option>
          <option value="14285 Bearing, 0.75ID Flange Mount">14285 Bearing, 0.75ID Flange Mount</option>
          <option value="14244 Conveyor Belt 24W x 132L">14244 Conveyor Belt 24W x 132L</option>
          <option value="14283 Timing Belt, 1'' W x 33'' L H Series">14283 Timing Belt, 1'' W x 33'' L H Series</option>
          <option value="14257 L Encoder TR1 Mounting Bracket">14257 L Encoder TR1 Mounting Bracket</option>
          <option value="14258 Trutrac-TR1 Encoder Assembly">14258 Trutrac-TR1 Encoder Assembly</option>
          <option value="14210 Nose Roller Assembly">14210 Nose Roller Assembly</option>
          <option value="14248 Bision 480DC Parallel Shaft DC Motor">14248 Bision 480DC Parallel Shaft DC Motor</option>
          <option value="10273 Cal Cube 12x5x.36">10273 Cal Cube 12x5x.36</option>
          <option value="13411 USB to Ethernet Adapter">13411 USB to Ethernet Adapter</option>
          <option value="13413 Ethernet Cable, 10 ft">13413 Ethernet Cable, 10 ft</option>
          <option value="14510 Acrylic Tray (24'' x 18'') (Optional)">14510 Acrylic Tray (24'' x 18'') (Optional)</option>
          <option value="14437 User Manual (PDF)">14437 User Manual (PDF)</option>
        `;
        break;

      case 'CS275':
        quantityDropdown.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `;
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
          <option value="15077 ROLLER, MOTOR 28BF PM486FE">15077 ROLLER, MOTOR 28BF PM486FE</option>
          <option value="15075 ROLLER, CONVYR 28BF x 1.9DIA">15075 ROLLER, CONVYR 28BF x 1.9DIA</option>
          <option value="15076 ROLLER, CONVYR 28BF x 1.9DIA X2GRV">15076 ROLLER, CONVYR 28BF x 1.9DIA X2GRV</option>
          <option value="14945 O-RING, 3/16DIAx9.5 HT BLU ITR">14945 O-RING, 3/16DIAx9.5" HT BLU ITR</option>
          <option value="15071 CONVEYOR BELT 26IN">15071 CONVEYOR BELT 26IN</option>
          <option value="15074 REFLECTOR, RL112G-1">15074 REFLECTOR, RL112G-1</option>
          <option value="15128 DRIVE, ITOH MDR CBM-105FP">15128 DRIVE, ITOH MDR CBM-105FP</option>
          <option value="14056 PHOTO EYE GRL18S, RT ANGLE">14056 PHOTO EYE GRL18S, RT ANGLE</option>
          <option value="15020 CONVEYOR JUNCTION PCB">15020 CONVEYOR JUNCTION PCB</option>
          <option value="15084 STACK LIGHT POST">15084 STACK LIGHT POST</option>
          <option value="13945 STACK LIGHT G/R/Y">13945 STACK LIGHT G/R/Y</option>
          <option value="14483 FUSE, 2.5A 125 VAC">14483 FUSE, 2.5A 125 VAC</option>
          <option value="14467 RELAY, SPDT, 16A 24DC COIL">14467 RELAY, SPDT, 16A 24DC COIL</option>
          <option value="14490 CIRCUIT BREAKER 1P 7A D CURVE">14490 CIRCUIT BREAKER 1P 7A D CURVE</option>
          <option value="14262 SWITCH ASY, ON-OFF">14262 SWITCH ASY, ON-OFF</option>
          <option value="14334 PCB ASY, MOTHERBOARD SCALE">14334 PCB ASY, MOTHERBOARD SCALE</option>
          <option value="15041 POWER SUPPLY, 12VDC 54W">15041 POWER SUPPLY, 12VDC 54W</option>
          <option value="13935 POWER SUPPLY, 24VDC 480W">13935 POWER SUPPLY, 24VDC 480W</option>
          <option value="15080 FOOT PEDAL WITH CABLE">15080 FOOT PEDAL WITH CABLE</option>
          <option value="15127 CS275 USER MANUAL">15127 CS275 USER MANUAL</option>
          <option value="10275 CALIBRATION CUBE 12x12x12">10275 CALIBRATION CUBE 12x12x12</option>
          <option value="13413 CAT 5e PATCH 10FT">13413 CAT 5e PATCH 10FT</option>
          <option value="13411 USB TO ETHERNET ADAPTER">13411 USB TO ETHERNET ADAPTER</option>
          <option value="14540 USB 2.0 CABLE 3M">14540 USB 2.0 CABLE 3M</option>
          <option value="15087 REFLECTOR, BRT-42D, M5 STUD">15087 REFLECTOR, BRT-42D, M5 STUD</option>
        `;
        break;
        
      case 'CS200-B':
        quantityDropdown.innerHTML = `
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        `;
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
          <option value="10795 Motorized Roller, 50 m/min 800VP-GL, 120V, 57.50mm">10795 Motorized Roller, 50 m/min 800VP-GL, 120V, 57.50mm</option>
          <option value="10797 Slave Roller 800VP-GL, 57mm">10797 Slave Roller 800VP-GL, 57mm</option>
          <option value="12487 Pulley SS-41, 42mm">12487 Pulley SS-41, 42mm</option>
          <option value="10798 Horizontal lens cover (lens filter - upper)">10798 Horizontal lens cover (lens filter - upper)</option>
          <option value="10799 Horizontal lens cover (lens filter - lower)">10799 Horizontal lens cover (lens filter - lower)</option>
          <option value="10800 Vertical lens cover (lens filter - sides)">10800 Vertical lens cover (lens filter - sides)</option>
          <option value="10801 Fuse - 5A">10801 Fuse - 5A</option>
          <option value="10802 Fuse - 1A">10802 Fuse - 1A</option>
          <option value="10803 Serial Communication Cable">10803 Serial Communication Cable</option>
          <option value="10804 Acrylic Dust Cover (width)">10804 Acrylic Dust Cover (width)</option>
          <option value="10805 Roller Belt (6mm x 280 circumference)">10805 Roller Belt (6mm x 280 circumference)</option>
          <option value="10806 Roller Belt (6mm x 390 circumference)">10806 Roller Belt (6mm x 390 circumference)</option>
          <option value="10807 Roller Belt (6mm x 480 circumference)">10807 Roller Belt (6mm x 480 circumference)</option>
          <option value="10808 E-Stop Switch (remote)">10808 E-Stop Switch (remote)</option>
          <option value="10809 E-Stop Switch (control panel)">10809 E-Stop Switch (control panel)</option>
          <option value="10810 Rotary Encoder Asy">10810 Rotary Encoder Asy</option>
          <option value="Encoder Cable Asy">Encoder Cable Asy</option>
          <option value="10811 IR Sensor pairs / Photoelectric Switch">10811 IR Sensor pairs/Photoelectric Switch</option>
          <option value="10812 Error/Warning Light">10812 Error/Warning Light</option>
          <option value="10813 Toggle Switch Cover - Acrylic">10813 Toggle Switch Cover - Acrylic</option>
          <option value="10822 Toggle Switch Cover - Aluminum">10822 Toggle Switch Cover - Aluminum</option>
          <option value="10814 On/Off Switch (panel)">10814 On/Off Switch (panel)</option>
          <option value="10815 Sealable Cover for Load Cell Amp">10815 Sealable Cover for Load Cell Amp</option>
          <option value="10818 Toggle Switch - 2 position">10818 Toggle Switch - 2 position</option>
          <option value="10819 Toggle Switch - 3 position">10819 Toggle Switch - 3 position</option>
          <option value="10820 Toggle Switch - momentary">10820 Toggle Switch - momentary</option>
          <option value="12506 Length Sensor Mounting Bracket">12506 Length Sensor Mounting Bracket</option>
          <option value="11339 Error Clear Button">11339 Error Clear Button</option>
          <option value="10821 Plastic End Cap - Black">10821 Plastic End Cap - Black</option>
        `;
        break;
        
      default:
        quantityDropdown.innerHTML = `
          <option value="1">1</option>
        `;
        partsDropdown.innerHTML = `
          <option value="Select">Select</option>
        `;
        break;
    }
  }

  // Function to add selected part to the contenteditable div
  function addPart() {
    const selectedPart = partsDropdown.value;
    const selectedQuantity = quantityDropdown.value;

    if (selectedPart && selectedQuantity) {
      // Create a new div for the part with the quantity appended
      const partDiv = document.createElement('div');
      partDiv.textContent = `${selectedPart} - x ${selectedQuantity}`;
      partDiv.style.marginBottom = '5px';

      // Calculate the current column index
      const columnIndex = Math.floor(partCount / 3) + 1;

      // If it's time to add a new column (every 3 items), adjust the grid
      if (partCount % 3 === 0) {
        partsUsedDiv.style.gridTemplateColumns = `repeat(${columnIndex}, 1fr)`;
      }

      // Append the part to the appropriate column
      partsUsedDiv.appendChild(partDiv);

      partCount++; // Increment the part count

      partsDropdown.value = "Select";
      quantityDropdown.value = "1";
    }
  }

  // Initial population based on the current selection
  updatePartsDropdown();
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
        case 'CS210-L':
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
  const partButton = document.getElementById('addPartButton');
	var element = document.getElementById('pdfContent');

  // Hide the download and add part button
  downloadButton.style.display = 'none';
  partButton.style.display = 'none';

  var opt = {
    filename:     'Work_Order.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }

  html2pdf().set(opt).from(element).save() .then(() => {
    // Show the download button again after the PDF is generated
    downloadButton.style.display = 'block';
    partButton.style.display = 'block';
  });
};