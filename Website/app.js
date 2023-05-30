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
    uploadImage(droppedFile);
  }
}

// Function to upload an image to the server
fetch('http://localhost:5000', {
  method: 'POST',
  body: data
})
.then(response => response.json())
.then(data => {
  // Get the result element
  const resultElement = document.getElementById('result');

  // Update the result element with the classification
  resultElement.textContent = 'Result: ' + data.result;
})
.catch(error => {
  console.error('Error:', error);
});
