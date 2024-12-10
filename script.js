// Defines variables for the section and SVG DVD logo
const section = document.querySelector('section');
const logo = document.querySelector('#DVDLogo');

// Get the current window height & width on the browser and adds 'px' for use in the stylesheet
section.style.height = window.innerHeight + 'px';
section.style.width = window.innerWidth + 'px';

// Variables to define position & speed of the DVD logo
let xPosition = 10;
let yPosition = 10;
let xSpeed = 10;
let ySpeed = 10;

// Update function that will run ever 1 second.
function update() {
    logo.style.left = xPosition + 'px';
    logo.style.top = yPosition + 'px';
}

// Function to run code every 1 second.
setInterval(() => {
    xPosition += xSpeed;
    yPosition += ySpeed;

    update();
}, 1000);