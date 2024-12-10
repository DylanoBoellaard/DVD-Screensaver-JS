// Defines variables for the section and SVG DVD logo
const section = document.querySelector("section");
const logo = document.querySelector("#DVDLogo");
const FPS = 60;

const logoColour = ["red", "orange", "yellow", "green", "blue", "purple"];

// Get the current window height & width on the browser and adds 'px' for use in the stylesheet
section.style.height = window.innerHeight + "px";
section.style.width = window.innerWidth + "px";

// Variables to define position & speed of the DVD logo
let xPosition = 10;
let yPosition = 10;
let xSpeed = 4;
let ySpeed = 4;

// Update function that will run ever 1 second.
function update() {
  logo.style.left = xPosition + "px";
  logo.style.top = yPosition + "px";
}

// Function to run code every 1 second.
setInterval(() => {
  if (xPosition + logo.clientWidth >= window.innerWidth || xPosition <= 0) {
    xSpeed = -xSpeed;
    switchColour();
  }

  if (yPosition + logo.clientHeight >= window.innerHeight || yPosition <= 0) {
    ySpeed = -ySpeed;
    switchColour();
  }

  xPosition += xSpeed;
  yPosition += ySpeed;

  update();
}, 1000 / FPS);

// Function to randomly choose a colour from an array and then switch the colour when called
function switchColour() {
  let randomSelectedColour = Math.floor(Math.random() * logoColour.length);
  console.log(
    `Randomly selected colour: ${randomSelectedColour} - ${logoColour[randomSelectedColour]}`
  );
  logo.style.fill = logoColour[randomSelectedColour];
}
