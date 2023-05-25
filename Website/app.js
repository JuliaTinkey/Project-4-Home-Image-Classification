// Get references to the box element
const box = document.getElementById('box');

// Add event listeners for drag and drop events
box.addEventListener('dragenter', handleDragEnter);
box.addEventListener('dragleave', handleDragLeave);
box.addEventListener('dragover', handleDragOver);
box.addEventListener('drop', handleDrop);

// Function to handle dragenter event
function handleDragEnter(event) {
  event.preventDefault();
  box.classList.add('dragover');
}

// Function to handle dragleave event
function handleDragLeave(event) {
  event.preventDefault();
  box.classList.remove('dragover');
}

// Function to handle dragover event
function handleDragOver(event) {
  event.preventDefault();
}

// Function to handle drop event
function handleDrop(event) {
  event.preventDefault();
  box.classList.remove('dragover');

  // Access the dropped file
  const droppedFile = event.dataTransfer.files[0];

  // Check if the dropped file is an image
  if (droppedFile.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function (e) {
      // Create an image element and set the source
      const image = document.createElement('img');
      image.src = e.target.result;
      image.style.width = '100px'; // Adjust the width as desired

      // Append the image to the box
      box.appendChild(image);
    };
    reader.readAsDataURL(droppedFile);
  }
}

let model;
async function loadModel() {
  model = await tf.loadLayersModel('model.json');
}
loadModel();
