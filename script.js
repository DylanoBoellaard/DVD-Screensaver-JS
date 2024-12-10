/*
    TO DO:
    Force colour of logo to change to a different colour when the same colour has been selected
    Add check to see if logo has perfectly hit a corner
        -> Then add an animation that plays on screen (confetti?), (maybe add rainbow effect for a few sec to the logo?)
*/

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

    // Only enable 1 function!
    //logo.style.fill = switchColourFromArray();
    logo.style.fill = switchColourFromRandom();
  }

  if (yPosition + logo.clientHeight >= window.innerHeight || yPosition <= 0) {
    ySpeed = -ySpeed;

    // Only enable 1 function!
    //logo.style.fill = switchColourFromArray();
    logo.style.fill = switchColourFromRandom();
  }

  xPosition += xSpeed;
  yPosition += ySpeed;

  update();
}, 1000 / FPS);

// Function to randomly choose a colour from a defined array
function switchColourFromArray() {
  let randomSelectedColour = Math.floor(Math.random() * logoColour.length);

  // Log colour to console
  console.log(
    `Randomly selected colour: ${randomSelectedColour} - ${logoColour[randomSelectedColour]}`
  );

  // Return the randomly selected colour
  return logoColour[randomSelectedColour];
}

// Function to generate a true random colour
function switchColourFromRandom() {
  let colour = "#";

  // Generate random 16 length "hex" code. Then slice it to keep characters after 2nd and before 8th position (and convert to uppercase)
  colour += Math.random().toString(16).slice(2, 8).toUpperCase();

  // Log colour code to console
  console.log(
    `Randomly selected colour: ${colour}`
  );

  // Return the randomly generated colour code
  return colour;
}
