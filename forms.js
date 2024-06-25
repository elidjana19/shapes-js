const btn = document.getElementById("btn");
const container = document.getElementById("container");

btn.addEventListener("click", () => {
  const shape = document.getElementById("shape").value;
  const rows = parseInt(document.getElementById("rows").value);
  const columns = parseInt(document.getElementById("columns").value);
  console.log(shape);
  console.log(rows);
  console.log(columns);

  container.innerHTML = ''; 
  container.className = '';  


  if (shape === 'katerkendesh') {
    container.classList.add("grid")
    container.style.gridTemplateColumns = `repeat(${columns}, auto)`;
    container.style.gridTemplateRows = `repeat(${rows}, auto)`;
    for (let i = 0; i < rows * columns; i++) {
        const div = document.createElement('div');
        div.classList.add("square")
        container.appendChild(div);
    }
} else if (shape === 'trekendesh') {

    container.classList.add("grid")
    container.style.gridTemplateColumns = `repeat(${columns}, auto)`;
    container.style.gridTemplateRows = `repeat(${rows}, auto)`;
    for (let i = 0; i < rows * columns; i++) {
        const div = document.createElement('div');
        div.classList.add("trianglee")
        container.appendChild(div);
    }
} else if (shape === 'elipse') {
    container.classList.add("grid")
    container.style.gridTemplateColumns = `repeat(${columns}, auto)`;
    container.style.gridTemplateRows = `repeat(${rows}, auto)`;
    for (let i = 0; i < rows * columns; i++) {
        const div = document.createElement('div');
        div.classList.add("ellipse")
        container.appendChild(div);
    }
}

clearForm()
});


function clearForm(){
    document.getElementById("shape").value = ""
  document.getElementById("rows").value= ""
    document.getElementById("columns").value=""
}


