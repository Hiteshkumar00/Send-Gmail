

let add = document.getElementById("add");

add.addEventListener("click", addInputFile);

function addInputFile(){
  let file = document.getElementById("file");
  let newFile = file.cloneNode()
  newFile.id = "";
  newFile.value = "";
  let fileDiv = document.getElementById('files');
  fileDiv.appendChild(newFile);
};


// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }else{
        const loader = document.getElementById('loader');
        loader.style.display = 'block';
      }

      form.classList.add('was-validated')
    }, false)
  })
})();
