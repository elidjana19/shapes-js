const btn = document.getElementById("btn");
const container = document.getElementById("container");
const selectedElements = document.getElementById("selectedElements");
const dialog = document.getElementById("editDialog");
const saveBtn = document.getElementById("save");
const cancelBtn = document.getElementById("cancel");
const shapeSelect = document.getElementById("shapeSelect");
const colorSelect = document.getElementById("colorSelect");

btn.addEventListener("click", () => {
  const shape = document.getElementById("shape").value;
  const rows = parseInt(document.getElementById("rows").value);
  const columns = parseInt(document.getElementById("columns").value);

  selectedElements.innerHTML = "";
  container.innerHTML = "";
  container.className = "grid";
  container.style.gridTemplateColumns = `repeat(${columns}, auto)`;
  container.style.gridTemplateRows = `repeat(${rows}, auto)`;

  for (let index = 0; index < rows * columns; index++) {
    const div = document.createElement("div");
    div.dataset.index = index;
    div.innerHTML = index;
    console.log(div);

    if (shape === "square") {
      div.classList.add("square");
    } else if (shape === "triangle") {
      div.classList.add("trianglee");
    } else if (shape === "ellipse") {
      div.classList.add("ellipse");
    }

    div.addEventListener("click", () => toggleSelect(div, index, shape));
    container.appendChild(div);
  }

  clearForm();
});

function toggleSelect(div, index, shape) {
  div.classList.toggle("selected");
  if (div.classList.contains("selected")) {
    addToSidebar(index, shape);
  } else {
    removeFromSidebar(index);
  }
}

function addToSidebar(index, shape) {
  const elementId = `element-${index}`;
  const element = document.createElement("div");
  element.classList.add("accordion-item");
  element.innerHTML = `
 <div id="accordion">
  <div class="card">
    <div class="card-header top">
      <a class="card-link" data-toggle="collapse" href="#collapse${index}">
        Element ${index}
      </a>
    </div>
    <div id="collapse${index}" class="collapse " data-parent="#accordion">
      <div class="card-body div-collapse">
        <p>Click edit to style element with ID: ${index} </p>
        <button class="btn btn-primary" onclick="openEditModal(${index})">Edit</button>
      </div>
    </div>
  </div>
  </div>
  `;
  element.id = elementId;

  selectedElements.appendChild(element);
}



function openEditModal(index) {
  const selectedElement = container.querySelector(`[data-index="${index}"]`);
  console.log(selectedElement);

  shapeSelect.value = selectedElement.classList[0];

  if (selectedElement.classList.contains("trianglee")) {
    colorSelect.value =
      rgbToHex(selectedElement.style.borderBottomColor) ||
      rgbToHex("rgb(215, 245, 250)");
  } else {
    colorSelect.value =
      rgbToHex(selectedElement.style.backgroundColor) ||
      rgbToHex("rgb(215, 245, 250)");
  }

  dialog.showModal();

  saveBtn.onclick = () => {
    selectedElement.style.backgroundColor = ""; //to remove previos background color important for triangle

    const shapeValue = shapeSelect.value;
    const colorValue = colorSelect.value;

    selectedElement.className = shapeValue;

    if (shapeValue === "trianglee") {
      selectedElement.style.borderBottomColor = colorValue;
    } else {
      selectedElement.style.backgroundColor = colorValue;
    }

    removeFromSidebar(index);
    dialog.close();
  };

  cancelBtn.onclick = () => {
    dialog.close();
  };
}

function removeFromSidebar(index) {
  const elementId = `element-${index}`;
  const element = document.getElementById(elementId);
  if (element) {
    selectedElements.removeChild(element);
  }
}

function clearForm() {
  document.getElementById("shape").value = "";
  document.getElementById("rows").value = "";
  document.getElementById("columns").value = "";
}

function rgbToHex(rgbString) {
  if (!rgbString) return null;
  // Convert rgb color string to hex because input type color uses hex
  const rgbArray = rgbString.match(/\d+/g).map(Number);
  const hex = `#${rgbArray
    .map((c) => c.toString(16).padStart(2, "0"))
    .join("")}`;

  return hex.toUpperCase();
}
