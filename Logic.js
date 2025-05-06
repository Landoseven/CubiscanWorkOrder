const canvas = document.getElementById("signature-pad")
const ctx = canvas.getContext("2d")

// Set initial canvas properties
let isDrawing = false
let x = 0
let y = 0

// Improved canvas resize function
function resizeCanvas() {
  const canvasContainer = canvas.parentElement
  const containerWidth = canvasContainer.clientWidth

  // Set canvas dimensions based on container width
  canvas.width = containerWidth
  canvas.height = 120

  // Preserve drawing after resize
  ctx.lineJoin = "round"
  ctx.lineCap = "round"
  ctx.lineWidth = 2
  ctx.strokeStyle = "#000"
}

// Call resize on page load and window resize
window.addEventListener("resize", resizeCanvas)
document.addEventListener("DOMContentLoaded", resizeCanvas)

// Drawing functions
function handleMove(event) {
  event.preventDefault()
  if (isDrawing) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    drawLine(x, y)
  }
}

canvas.addEventListener("mousedown", (event) => {
  isDrawing = true
  const rect = canvas.getBoundingClientRect()
  x = event.clientX - rect.left
  y = event.clientY - rect.top
})

canvas.addEventListener("mousemove", (event) => {
  if (isDrawing) {
    const rect = canvas.getBoundingClientRect()
    drawLine(event.clientX - rect.left, event.clientY - rect.top)
  }
})

canvas.addEventListener("mouseup", () => {
  isDrawing = false
})

function drawLine(x1, y1) {
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x1, y1)
  ctx.stroke()
  x = x1
  y = y1
}

// Touch events for mobile/tablet
canvas.addEventListener("touchstart", (event) => {
  event.preventDefault()
  isDrawing = true
  const touch = event.touches[0]
  const rect = canvas.getBoundingClientRect()
  x = touch.clientX - rect.left
  y = touch.clientY - rect.top
})

canvas.addEventListener("touchmove", (event) => {
  event.preventDefault()
  if (isDrawing) {
    const touch = event.touches[0]
    const rect = canvas.getBoundingClientRect()
    drawLine(touch.clientX - rect.left, touch.clientY - rect.top)
  }
})

canvas.addEventListener("touchend", () => {
  isDrawing = false
})

// Parts dropdown and model selection
document.addEventListener("DOMContentLoaded", () => {
  const cubiscanModelDropdown = document.getElementById("cubiscanmodel")
  const partsDropdown = document.getElementById("partsDropdown")
  const quantityDropdown = document.getElementById("quantityDropdown")
  const addPartButton = document.getElementById("addPartButton")
  const partsUsedDiv = document.getElementById("textAreaParts")

  const partCount = 0 // Counter to track the number of parts added

  cubiscanModelDropdown.addEventListener("change", updatePartsDropdown)
  addPartButton.addEventListener("click", addPart)

  // Function to update parts dropdown based on the selected Cubiscan model
  function updatePartsDropdown() {
    const selectedCubiscanModel = cubiscanModelDropdown.value

    // Clear the current dropdown options
    partsDropdown.innerHTML = ""

    // Default option
    const defaultOption = document.createElement("option")
    defaultOption.value = "Select"
    defaultOption.textContent = "Select"
    partsDropdown.appendChild(defaultOption)

    // Add model-specific parts
    switch (selectedCubiscanModel) {
      case "Select":
        break
      case "CS25":
        addPartsForCS25()
        break
      case "CS125":
        addPartsForCS125()
        break
      case "CS325":
        addPartsForCS325()
        break
      case "CS100":
      case "CS110":
      case "CS150":
        addPartsForCS100Series()
        break
      case "CS75":
      case "CS75PRO":
        addPartsForCS75()
        break
      case "CS1100AKL":
      case "CS1200AKL":
        addPartsForAKL()
        break
      case "CS200-TS":
        addPartsForCS200TS()
        break
      case "CS200-B":
        addPartsForCS200B()
        break
      case "CS210-L":
        addPartsForCS210L()
        break
      case "CS225":
        addPartsForCS225()
        break
      case "CS275":
        addPartsForCS275()
        break
      case "Multiple":
        addAllParts()
        break
      default:
        addCommonParts()
        break
    }
  }

  // Update the parts dropdown functions with the complete list of parts for each model
  function addPartsForCS25() {
    const parts = [
      "14119 CS25 Glass",
      "14309 CS25 LoadCell 10KG",
      "14090 CS25/325 DISPLAY/LCD ASY",
      "14129 CS25/325 HDMI 2FT Cable",
      "12844 CSx25 TX Board",
      "12841 CSx25 RX Board",
      "13218 CSx25 PowerSupply",
      "13351 CSx25 1Amp Fuse",
      "14100 CS25/325 Controller ASY",
      "13210 CSx25 Motherboard",
      "13476 SDXC 32GB Memory Card",
      "16104 25/325 LDU Upgrade Kit",
      "10083 AC Power Cord",
      "13411 USB to Ethernet Adapter",
      "13413 Cat5e Patch 10ft Ethernet Cable",
      "12997 USB To Serial Adapter",
      "14540 USB A To B Cable",
      "11493 Null Modem Serial Cable",
      "12344 CSx25 Ball Bearing",
      "14620 Portable Power Kit",
      "10440 25lb Calibration Weight",
      "14450 Axis Camera Kit",
      "14449 SLR Rebel EOS Camera Kit",
      "12118 Cable Tie / Zip Tie 11in",
      "10273 Cal Cube 12x5x.36",
      "13624 Cal Cube 5x3x2",
      "12700 Qbit DB",
      "12701 Qbit EDT",
      "12703 Qbit WEB",
      "12708 Qbit Xfer",
    ]

    parts.forEach((part) => {
      const option = document.createElement("option")
      option.value = part
      option.textContent = part
      partsDropdown.appendChild(option)
    })
  }

  function addPartsForCS125() {
    const parts = [
      "15030 CS125 Display",
      "14920 CS125 Gate Ribbon Cable Kit",
      "12890 CS125 Glass",
      "12982 CS125 LoadCell 20KG",
      "12844 CSx25 TX Board",
      "12841 CSx25 RX Board",
      "13218 CSx25 PowerSupply",
      "13351 CSx25 1Amp Fuse",
      "14100 CS25/325 Controller ASY",
      "13210 CSx25 Motherboard",
      "13476 SDXC 32GB Memory Card",
      "16104 25/325 LDU Upgrade Kit",
      "10083 AC Power Cord",
      "13411 USB to Ethernet Adapter",
      "13413 Cat5e Patch 10ft Ethernet Cable",
      "12997 USB To Serial Adapter",
      "14540 USB A To B Cable",
      "11493 Null Modem Serial Cable",
      "12344 CSx25 Ball Bearing",
      "14620 Portable Power Kit",
      "10440 25lb Calibration Weight",
      "14450 Axis Camera Kit",
      "14449 SLR Rebel EOS Camera Kit",
      "12118 Cable Tie / Zip Tie 11in",
      "10273 Cal Cube 12x5x.36",
      "13624 Cal Cube 5x3x2",
      "12700 Qbit DB",
      "12701 Qbit EDT",
      "12703 Qbit WEB",
      "12708 Qbit Xfer",
    ]

    parts.forEach((part) => {
      const option = document.createElement("option")
      option.value = part
      option.textContent = part
      partsDropdown.appendChild(option)
    })
  }

  function addPartsForCS325() {
    const parts = [
      "16152 DB25/DB9 HIGH FLEX Sleeved Cable For CHAIN",
      "14736 4P 4P HIGH FLEX 44IN PowerCable For CHAIN",
      "16074 Cable Chain ASY Kit",
      "14155 Small Cable Ribbon",
      "14156 Large Cable Ribbon",
      "14157 Power Cable Chain",
      "14159 Encoder",
      "15200 Glass",
      "14675 LoadCell 20KG",
      "14090 CS25/325 DISPLAY/LCD ASY",
      "14129 CS25/325 HDMI 2FT Cable",
      "12844 CSx25 TX Board",
      "12841 CSx25 RX Board",
      "13218 CSx25 PowerSupply",
      "13351 CSx25 1Amp Fuse",
      "14100 CS25/325 Controller ASY",
      "13210 CSx25 Motherboard",
      "13476 SDXC 32GB Memory Card",
      "16104 25/325 LDU Upgrade Kit",
      "10083 AC Power Cord",
      "13411 USB to Ethernet Adapter",
      "13413 Cat5e Patch 10ft Ethernet Cable",
      "12997 USB To Serial Adapter",
      "14540 USB A To B Cable",
      "11493 Null Modem Serial Cable",
      "12344 CSx25 Ball Bearing",
      "14620 Portable Power Kit",
      "10440 25lb Calibration Weight",
      "14450 Axis Camera Kit",
      "14449 SLR Rebel EOS Camera Kit",
      "12118 Cable Tie / Zip Tie 11in",
      "10273 Cal Cube 12x5x.36",
      "13624 Cal Cube 5x3x2",
      "12700 Qbit DB",
      "12701 Qbit EDT",
      "12703 Qbit WEB",
      "12708 Qbit Xfer",
    ]

    parts.forEach((part) => {
      const option = document.createElement("option")
      option.value = part
      option.textContent = part
      partsDropdown.appendChild(option)
    })
  }

  function addPartsForCS100Series() {
    const parts = [
      "12780 QI Sensor",
      "15163 LDU Scale Card",
      "14062 PowerSupply Brick",
      "15955 CS1x0 TOUCH Screen Display Asy",
      "14527 CS110 T Controller ASY",
      "15380 CS110 XT Controller ASY",
      "14012 CS150 T Controller ASY",
      "14005 CS100 T Controller ASY",
      "14334 CS1x0 Motherboard",
      "13476 SDXC 32GB Memory Card",
      "14741 CS110 T Upgrade Kit",
      "14652 CS100 T Upgrade Kit",
      "14742 CS150 T Upgrade KIT",
      "15023 CS100 T LoadCell 100KG",
      "15370 CS110 XT LoadCell 50KG",
      "12271 CS150 T LoadCell 100KG",
      "10083 AC Power Cord",
      "13411 USB to Ethernet Adapter",
      "13413 Cat5e Patch 10ft Ethernet Cable",
      "12997 USB To Serial Adapter",
      "14540 USB A To B Cable",
      "11493 Null Modem Serial Cable",
      "10275 Cal Cube 12x12x12",
      "10273 Cal Cube 12x5x.36",
      "14450 Axis Camera Kit",
      "12700 Qbit DB",
      "12701 Qbit EDT",
      "12703 Qbit WEB",
      "12708 Qbit Xfer",
    ]

    parts.forEach((part) => {
      const option = document.createElement("option")
      option.value = part
      option.textContent = part
      partsDropdown.appendChild(option)
    })
  }

  function addPartsForCS75() {
    const parts = [
      "14718 CS75 C PC/Combo Controller",
      "10083 AC Power Cord",
      "13411 USB to Ethernet Adapter",
      "13413 Cat5e Patch 10ft Ethernet Cable",
      "12997 USB To Serial Adapter",
      "14540 USB A To B Cable",
      "11493 Null Modem Serial Cable",
      "12344 CSx25 Ball Bearing",
      "14620 Portable Power Kit",
      "10440 25lb Calibration Weight",
      "14450 Axis Camera Kit",
      "14449 SLR Rebel EOS Camera Kit",
      "12118 Cable Tie / Zip Tie 11in",
      "10273 Cal Cube 12x5x.36",
      "13624 Cal Cube 5x3x2",
      "12700 Qbit DB",
      "12701 Qbit EDT",
      "12703 Qbit WEB",
      "12708 Qbit Xfer",
    ]

    parts.forEach((part) => {
      const option = document.createElement("option")
      option.value = part
      option.textContent = part
      partsDropdown.appendChild(option)
    })
  }

  function addPartsForAKL() {
    const parts = [
      "13092 KINGSTON 960GB SSD SATA 3",
      "16416 Windows 10 IOT ENT 2021 LICENSE KEY",
      "13814 AKL INDUST PC EMB AKL 84200 RED PC",
      "14536 AKL Cabinet Fan Filter",
      "16789 Linear Bearing",
      "13884 LINEAR CARRIAGE CRADLE ASY",
      "13829 FAN W/ Filter Assembly",
      "13834 24V Power Supply",
      "15885 POE Switch",
      "13824 1200 Encoder",
      "13822 VFD Inverter (Motor Controller)",
      "13924 PULLEY ASY FREE SPIN",
      "12595 Motor Slave Pulley",
      "13823 Motor Pulley",
      "13917 MOTOR",
      "13581 Main Power Switch Knob",
      "13840 Shaft Coupling",
      "13833 Chain W/Wire ASY",
      "13090 Chain W/O Wire",
      "13821 Touch Panel LCD Display",
      "13579 LMS500 LASER HEAD",
      "13825 PROX Sensor",
      "15443 12 WIRE 30ft 20AWG",
      "15966 RJ45 LONG TYPE",
      "13053 LMS Wire",
      "13820 LMS Connector",
      "16393 Laser Marking Kit",
      "16387 Laser (Single)",
      "13827 LED STACK LIGHT",
      "13513 Axis CAMERA P3224 1080P",
      "12581 Axis CAMERA ASY W/Plate",
      "13883 BELT 12ft",
      "14553 CAL BOX 60x20x20",
      "15019 Zebra Barcode Cordless Kit Serial Only",
      "NMISC AKL Cabinet Door Key",
    ]

    parts.forEach((part) => {
      const option = document.createElement("option")
      option.value = part
      option.textContent = part
      partsDropdown.appendChild(option)
    })
  }

  function addPartsForCS200TS() {
    const parts = [
      "13000 Motor Belt",
      "13001 Emergency Stop Button, ES1",
      "13002 Emergency Stop Button, ES2",
      "13003 Circuit Breaker",
      "13004 Conveyor Belt, Large",
      "13005 Conveyor Belt, Small",
      "13006 Emergency Drive Unit",
      "13007 Encoder",
      "13008 Noise Filter, NF1",
      "13009 Noise Filter, NF2",
      "13010 Motor Inverter",
      "13011 Motor Inverter, Option",
      "13012 IR Sensor Pair",
      "13013 Signal Tower Light",
      "13014 Load Cell, ASY, 75 kg",
      "13015 Display Membrane, Keys",
      "13016 Display Membrane, Logo",
      "13017 Display Membrane, Touch",
      "13018 Geared Motor",
      "13019 PCD ASY, A/D Connect",
      "13020 PCB ASY, A/D",
      "13021 PCB ASY, Display I/F",
      "13022 PCB ASY, Display, I/O 1",
      "13023 PCB ASY, Display, I/O 2",
      "13024 PCB ASY, Display, Main",
      "13025 PCB ASY, Display, TFT Panel",
      "13026 PCB ASY, Gate, RCV",
      "13027 PCB ASY, Gate, XMIT",
      "13028 PCB ASY, Mother",
      "13029 PCB ASY, Relay",
      "13030 Power Supply, REG 1",
      "13031 Power Supply, REG 2",
      "13032 Power Supply, REG 3",
      "13033 Drive Roller",
      "13034 Tension Roller",
      "13035 Magnetic Switch",
      "13036 Main Power Switch",
      "13037 LCD Display Transformer",
    ]

    parts.forEach((part) => {
      const option = document.createElement("option")
      option.value = part
      option.textContent = part
      partsDropdown.appendChild(option)
    })
  }

  function addPartsForCS210L() {
    const parts = [
      "16174 MID RANGE SENSOR",
      "16176 FULL RANGE SENSOR",
      "16934 FULL RANGE NTEP SENSOR",
      "16790 CS210-L CONTROL BOX",
      "15612 FRAMES, EXTRUDED ALUMINUM",
      "16377 ENCODER MOUNT ASSEMBLY",
    ]

    parts.forEach((part) => {
      const option = document.createElement("option")
      option.value = part
      option.textContent = part
      partsDropdown.appendChild(option)
    })
  }

  function addPartsForCS225() {
    const parts = [
      "14262 On/Off Switch Assembly",
      "13210 PCB Assembly, Mother Board",
      "14350 Relays (TE Connectivity, KUP-11d15-5)",
      "13218 AC/DC Power Supply Single-Out 12 V 8.33A 150 W",
      "13764 DC Motor Controller",
      "13866 Window, Dust Cover",
      "14251 Roller 1.9 OD x 33L 7/16 HEX",
      "14253 Roller 2.5 OD x 26L 11/16 HEX",
      "14254 Roller 4 OD x 27L 11/16 HEX Flat",
      "14255 Drive Roller 4.5 OD x 27L",
      "14285 Bearing, 0.75ID Flange Mount",
      "14244 Conveyor Belt 24W x 132L",
      "14283 Timing Belt, 1'' W x 33'' L H Series",
      "14257 L Encoder TR1 Mounting Bracket",
      "14258 Trutrac-TR1 Encoder Assembly",
      "14210 Nose Roller Assembly",
      "14248 Bision 480DC Parallel Shaft DC Motor",
      "10273 Cal Cube 12x5x.36",
      "13411 USB to Ethernet Adapter",
      "13413 Ethernet Cable, 10 ft",
      "14510 Acrylic Tray (24'' x 18'') (Optional)",
      "14437 User Manual (PDF)",
    ]

    parts.forEach((part) => {
      const option = document.createElement("option")
      option.value = part
      option.textContent = part
      partsDropdown.appendChild(option)
    })
  }

  function addPartsForCS275() {
    const parts = [
      "15077 ROLLER, MOTOR 28BF PM486FE",
      "15075 ROLLER, CONVYR 28BF x 1.9DIA",
      "15076 ROLLER, CONVYR 28BF x 1.9DIA X2GRV",
      "14945 O-RING, 3/16DIAx9.5 HT BLU ITR",
      "15071 CONVEYOR BELT 26IN",
      "15074 REFLECTOR, RL112G-1",
      "15128 DRIVE, ITOH MDR CBM-105FP",
      "14056 PHOTO EYE GRL18S, RT ANGLE",
      "15020 CONVEYOR JUNCTION PCB",
      "15084 STACK LIGHT POST",
      "13945 STACK LIGHT G/R/Y",
      "14483 FUSE, 2.5A 125 VAC",
      "14467 RELAY, SPDT, 16A 24DC COIL",
      "14490 CIRCUIT BREAKER 1P 7A D CURVE",
      "14262 SWITCH ASY, ON-OFF",
      "14334 PCB ASY, MOTHERBOARD SCALE",
      "15041 POWER SUPPLY, 12VDC 54W",
      "13935 POWER SUPPLY, 24VDC 480W",
      "15080 FOOT PEDAL WITH CABLE",
      "15127 CS275 USER MANUAL",
      "10275 CALIBRATION CUBE 12x12x12",
      "13413 CAT 5e PATCH 10FT",
      "13411 USB TO ETHERNET ADAPTER",
      "14540 USB 2.0 CABLE 3M",
      "15087 REFLECTOR, BRT-42D, M5 STUD",
    ]

    parts.forEach((part) => {
      const option = document.createElement("option")
      option.value = part
      option.textContent = part
      partsDropdown.appendChild(option)
    })
  }

  function addPartsForCS200B() {
    const parts = [
      "10795 Motorized Roller, 50 m/min 800VP-GL, 120V, 57.50mm",
      "10797 Slave Roller 800VP-GL, 57mm",
      "12487 Pulley SS-41, 42mm",
      "10798 Horizontal lens cover (lens filter - upper)",
      "10799 Horizontal lens cover (lens filter - lower)",
      "10800 Vertical lens cover (lens filter - sides)",
      "10801 Fuse - 5A",
      "10802 Fuse - 1A",
      "10803 Serial Communication Cable",
      "10804 Acrylic Dust Cover (width)",
      "10805 Roller Belt (6mm x 280 circumference)",
      "10806 Roller Belt (6mm x 390 circumference)",
      "10807 Roller Belt (6mm x 480 circumference)",
      "10808 E-Stop Switch (remote)",
      "10809 E-Stop Switch (control panel)",
      "10810 Rotary Encoder Asy",
      "Encoder Cable Asy",
      "10811 IR Sensor pairs / Photoelectric Switch",
      "10812 Error/Warning Light",
      "10813 Toggle Switch Cover - Acrylic",
      "10822 Toggle Switch Cover - Aluminum",
      "10814 On/Off Switch (panel)",
      "10815 Sealable Cover for Load Cell Amp",
      "10818 Toggle Switch - 2 position",
      "10819 Toggle Switch - 3 position",
      "10820 Toggle Switch - momentary",
      "12506 Length Sensor Mounting Bracket",
      "11339 Error Clear Button",
      "10821 Plastic End Cap - Black",
    ]

    parts.forEach((part) => {
      const option = document.createElement("option")
      option.value = part
      option.textContent = part
      partsDropdown.appendChild(option)
    })
  }

  // Update the addAllParts function to include all model parts
  function addAllParts() {
    // Add all parts from all models
    addPartsForCS25()
    addPartsForCS125()
    addPartsForCS325()
    addPartsForCS100Series()
    addPartsForCS75()
    addPartsForAKL()
    addPartsForCS200TS()
    addPartsForCS200B()
    addPartsForCS210L()
    addPartsForCS225()
    addPartsForCS275()
    addCommonParts()
  }

  // Function to add selected part to the contenteditable div
  function addPart() {
    const selectedPart = partsDropdown.value
    const selectedQuantity = quantityDropdown.value

    if (selectedPart && selectedPart !== "Select" && selectedQuantity) {
      // Create a new div for the part with the quantity appended
      const partDiv = document.createElement("div")
      partDiv.textContent = `${selectedPart} - x ${selectedQuantity}`

      // Append the part to the div
      partsUsedDiv.appendChild(partDiv)

      // Save the updated partsUsedDiv content to session storage
      sessionStorage.setItem("textAreaParts", partsUsedDiv.innerHTML)

      // Reset dropdowns
      partsDropdown.value = "Select"
      quantityDropdown.value = "1"
    }
  }

  // Initial population based on the current selection
  updatePartsDropdown()
})

// Change Maintenance Table based on model and service
document.addEventListener("DOMContentLoaded", () => {
  const servicePerformedDropdown = document.getElementById("serviceperformed")
  const cubiscanModelDropdown = document.getElementById("cubiscanmodel")
  const maintenanceContainer = document.getElementById("maintenanceContainer")
  const maintenanceCS25 = document.getElementById("maintenanceCS25")
  const maintenanceCS100 = document.getElementById("maintenanceCS100")

  cubiscanModelDropdown.addEventListener("change", updateMaintenanceTable)
  servicePerformedDropdown.addEventListener("change", updateMaintenanceTable)

  // Update the maintenance table function to show Summary of Service for Service and Installation
  // Update the updateMaintenanceTable function to show Summary of Service for Service/Maintenance option
  function updateMaintenanceTable() {
    const selectedCubiscanModel = cubiscanModelDropdown.value
    const selectedService = servicePerformedDropdown.value

    // Clear previous content
    maintenanceContainer.innerHTML = ""
    maintenanceContainer.style.display = "none"

    // For Service, Installation, or Service/Maintenance, show Summary of Service
    if (
      selectedService === "Service" ||
      selectedService === "Installation" ||
      selectedService === "Service/Maintenance"
    ) {
      const summaryDiv = document.createElement("div")
      summaryDiv.id = "table1Data"

      const summaryLabel = document.createElement("label")
      summaryLabel.setAttribute("for", "textAreaSumm")
      summaryLabel.textContent = "Summary of Service"

      const summaryTextArea = document.createElement("div")
      summaryTextArea.id = "textAreaSumm"
      summaryTextArea.setAttribute("contenteditable", "true")
      summaryTextArea.setAttribute("name", "summary")

      summaryDiv.appendChild(summaryLabel)
      summaryDiv.appendChild(summaryTextArea)

      maintenanceContainer.appendChild(summaryDiv)
      maintenanceContainer.style.display = "block"
      return
    }

    // Only show maintenance tables for Maintenance/CCA service
    if (selectedService !== "Maintenance/CCA") {
      return
    }

    // Show the appropriate maintenance table based on the model
    switch (selectedCubiscanModel) {
      case "CS25":
      case "CS125":
      case "CS325":
        maintenanceContainer.appendChild(maintenanceCS25)
        maintenanceContainer.style.display = "block"
        break
      case "CS100":
      case "CS110":
      case "CS150":
        maintenanceContainer.appendChild(maintenanceCS100)
        maintenanceContainer.style.display = "block"
        break
      case "CS1100AKL":
      case "CS1200AKL":
        // Create and append the AKL maintenance table
        const aklTable = createMaintenanceTable("AKL", [
          "Checked proper tension of belts",
          "Software calibration",
          "Mechanical calibration",
          "Checked prox sensor height",
          "Cleaned Cubiscan and cameras",
          "Tigthened motor bolt",
          "Inspected Chain Assemby",
          "Tightened linear bearings",
          "Calibrated touchscreen",
          "Checked arm alignment",
          "Checked pulley tracking",
          "Verified measurement trigger",
        ])
        maintenanceContainer.appendChild(aklTable)
        maintenanceContainer.style.display = "block"
        break
      case "S9":
        // Create and append the S9 maintenance table
        const s9Table = createMaintenanceTable("S9", [
          "Software calibration",
          "Mechanical calibration",
          "Cleaned Cubiscan",
          "Cleaned LMS Sensor Head",
          "Calibrated touchscreen",
          "Checked tower is level",
          "Verified measurement trigger",
        ])
        maintenanceContainer.appendChild(s9Table)
        maintenanceContainer.style.display = "block"
        break
      case "CS75":
      case "CS75PRO":
        // Create and append the CS75 maintenance table
        const cs75Table = createMaintenanceTable("CS75", [
          "Calibrated sensor head/camera",
          "Calibrated scale (if applicable)",
          "Checked wiring",
          "Checked data transfer",
          "Checked base plate secured",
          "Cleaned base plate",
          "cleaned sensor/camera",
          "Cubiscan tested and fully fuctional",
        ])
        maintenanceContainer.appendChild(cs75Table)
        maintenanceContainer.style.display = "block"
        break
      case "CS200-TS":
      case "CS200-B":
      case "CS210-L":
      case "CS225":
      case "CS275":
        // Create and append the CS200 series maintenance table
        const cs200Table = createMaintenanceTable("CS200", [
          "Checked proper tension of belts",
          "Checked/Cleaned rollers or belts",
          "Scale calibrated",
          "Cleaned Cubiscan and gate tray",
          "Checked E-Stops",
          "Cleaned and checked photo eyes",
          "Checked gate LEDs/Masking",
          "Checked data transfer",
          "Checked rotary encoder",
          "Verified gate/sensor measurment",
          "Checked/cleaned print and apply",
          "Verified system flow and functionality",
        ])
        maintenanceContainer.appendChild(cs200Table)
        maintenanceContainer.style.display = "block"
        break
      default:
        // No matching model; hide maintenance tables
        break
    }
  }

  // Helper function to create maintenance tables
  function createMaintenanceTable(id, items) {
    const table = document.createElement("div")
    table.className = "maintenance-table"

    items.forEach((item, index) => {
      const cell = document.createElement("div")
      cell.className = "maintenance-table-cell"

      const checkbox = document.createElement("input")
      checkbox.type = "checkbox"
      checkbox.id = `${id.toLowerCase()}_check_${index}`

      const label = document.createElement("label")
      label.htmlFor = checkbox.id
      label.textContent = item

      cell.appendChild(checkbox)
      cell.appendChild(label)
      table.appendChild(cell)
    })

    return table
  }

  // Initial check on page load
  updateMaintenanceTable()
})

// Save data on reload
document.addEventListener("DOMContentLoaded", () => {
  // List of all input and textarea field IDs that need to be saved
  const fields = [
    "technician",
    "customerSite",
    "date",
    "textAreaSerial",
    "timeOnsite",
    "SRO",
    "cubiscanmodel",
    "serviceperformed",
    "postcheck",
    "siteRepresentative",
    "email",
    "phone",
  ]
  const editableDivs = ["textAreaSerial", "textAreaParts", "tracking", "textAreaNotes"] // IDs of your contenteditable divs

  // Restore data from Session Storage on page load
  fields.forEach((field) => {
    const element = document.getElementById(field)
    if (element) {
      const savedValue = sessionStorage.getItem(field)
      if (savedValue) {
        element.value = savedValue
      }
    }
  })

  editableDivs.forEach((divId) => {
    const element = document.getElementById(divId)
    if (element) {
      const savedContent = sessionStorage.getItem(divId)
      if (savedContent) {
        element.innerHTML = savedContent
      }
    }
  })

  // Save data to Session Storage when input or textarea changes
  fields.forEach((field) => {
    const element = document.getElementById(field)
    if (element) {
      element.addEventListener("input", () => {
        sessionStorage.setItem(field, element.value)
      })
    }
  })

  // Save content from contenteditable divs to Session Storage
  editableDivs.forEach((divId) => {
    const element = document.getElementById(divId)
    if (element) {
      element.addEventListener("input", () => {
        sessionStorage.setItem(divId, element.innerHTML)
      })
    }
  })
})

// Clear Form Button
document.addEventListener("DOMContentLoaded", () => {
  // Function to clear the form and session storage
  const clearForm = () => {
    // Clear input and textarea fields
    const fields = [
      "technician",
      "customerSite",
      "date",
      "textAreaSerial",
      "timeOnsite",
      "SRO",
      "cubiscanmodel",
      "serviceperformed",
      "postcheck",
      "siteRepresentative",
      "email",
      "phone",
    ]

    fields.forEach((field) => {
      const element = document.getElementById(field)
      if (element) {
        element.value = "" // Clear input and textarea fields
      }
    })

    // Clear contenteditable divs
    const editableDivs = ["textAreaSerial", "textAreaParts", "tracking", "textAreaNotes"]
    editableDivs.forEach((divId) => {
      const element = document.getElementById(divId)
      if (element) {
        element.innerHTML = "" // Clear contenteditable divs
      }
    })

    // Clear maintenance checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]')
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false
    })

    // Clear signature canvas
    const canvas = document.getElementById("signature-pad")
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Hide maintenance tables
    const maintenanceContainer = document.getElementById("maintenanceContainer")
    if (maintenanceContainer) {
      maintenanceContainer.style.display = "none"
    }

    // Clear session storage
    sessionStorage.clear()
  }

  // Add event listener to the Clear button
  const clearButton = document.getElementById("formClear")
  if (clearButton) {
    clearButton.addEventListener("click", clearForm)
  }
})

// Update the addPart function to handle the 3-column layout
document.addEventListener("DOMContentLoaded", () => {
  const partsDropdown = document.getElementById("partsDropdown")
  const quantityDropdown = document.getElementById("quantityDropdown")
  const partsUsedDiv = document.getElementById("textAreaParts")

  function addPart() {
    const selectedPart = partsDropdown.value
    const selectedQuantity = quantityDropdown.value

    if (selectedPart && selectedPart !== "Select" && selectedQuantity) {
      // Create a new div for the part with the quantity appended
      const partDiv = document.createElement("div")
      partDiv.textContent = `${selectedPart} - x ${selectedQuantity}`

      // Append the part to the div
      partsUsedDiv.appendChild(partDiv)

      // Save the updated partsUsedDiv content to session storage
      sessionStorage.setItem("textAreaParts", partsUsedDiv.innerHTML)

      // Reset dropdowns
      partsDropdown.value = "Select"
      quantityDropdown.value = "1"
    }
  }
})

function addCommonParts() {
  // Add common parts that are used across multiple models
  const parts = [
    "Screws",
    "Washers",
    "Nuts",
    "Bolts",
    "Adhesive",
    "Grease",
    "Lubricant",
    "Cleaning Solution",
    "Rags",
    "Gloves",
    "Safety Glasses",
    "Cable Ties",
    "Heat Shrink Tubing",
    "Electrical Tape",
    "WD-40",
    "Zip Ties",
  ]

  parts.forEach((part) => {
    const option = document.createElement("option")
    option.value = part
    option.textContent = part
    const partsDropdown = document.getElementById("partsDropdown")
    if (partsDropdown) {
      partsDropdown.appendChild(option)
    }
  })
}

// Print to PDF

document.getElementById("generate").onclick = function () {
	// Your html2pdf code here.
  const downloadButton = document.getElementById('generate');
  const partButton = document.getElementById('addPartButton');
  const formClearButton = document.getElementById('formClear')
	var element = document.getElementById('pdfContent');

  // Hide the download pdf and add part button
  downloadButton.style.display = 'none';
  partButton.style.display = 'none';
  formClearButton.style.display = 'none';
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
    formClearButton.style.display = 'block';
  });
};