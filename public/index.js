

let add = document.getElementById("add");

add.addEventListener("click", addInputFile);

function addInputFile(){
  let file = document.getElementById("file");
  let newFile = file.cloneNode()
  newFile.id = "";
  newFile.value = "";
  let fileDiv = document.getElementById('files');
  fileDiv.appendChild(newFile);
}