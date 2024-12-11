/*
    TO DO:
    DONE --- Force colour of logo to change to a different colour when the same colour has been selected
    Add check to see if logo has perfectly hit a corner
        -> Then add an animation that plays on screen (confetti?), (maybe add rainbow effect for a few sec to the logo?)
*/

// Defines variables for the section and SVG DVD logo
const section = document.querySelector("section");
const logo = document.querySelector("#DVDLogo");
const FPS = 60;

// Defines colour array & previousColour variable
const logoColour = ["red", "orange", "yellow", "green", "blue", "purple"];
let previousColour = null;

// Get the current window height & width on the browser and adds 'px' for use in the stylesheet
section.style.height = window.innerHeight + "px";
section.style.width = window.innerWidth + "px";

// Variables to define starting position & speed of the DVD logo
let xPosition = 10;
let yPosition = 10;
let xSpeed = 4;
let ySpeed = 4;

// Update function that will update the logo's position
function update() {
  logo.style.left = xPosition + "px";
  logo.style.top = yPosition + "px";
}

// Function to run code every (calculated) milliseconds
setInterval(() => {
  // If the logo hits left or right of browser window, change direction
  if (xPosition + logo.clientWidth >= window.innerWidth || xPosition <= 0) {
    xSpeed = -xSpeed;

    // !! Only enable 1 function! !!
    //logo.style.fill = switchColourFromArray();
    logo.style.fill = switchColourFromRandom();
  }

  // If the logo hits the bottom or top of browser window, change direction
  if (yPosition + logo.clientHeight >= window.innerHeight || yPosition <= 0) {
    ySpeed = -ySpeed;

    // !! Only enable 1 function! !!
    //logo.style.fill = switchColourFromArray();
    logo.style.fill = switchColourFromRandom();
  }

  xPosition += xSpeed;
  yPosition += ySpeed;

  update();
}, 1000 / FPS);

// Function to randomly choose a colour from a defined array
function switchColourFromArray() {
  let randomSelectedColour;

  // Do-While loop to force colour to re-generate indefinitely until a new different colour, when previous colour is the same as newly generated one.
  do {
    // Generate a new random index / colour from the colour array
    randomSelectedColour = Math.floor(Math.random() * logoColour.length);
  } while (randomSelectedColour === previousColour);

  // Update the previous colour index
  previousColour = randomSelectedColour;

  // Log the new colour for debugging
  console.log(
    `Randomly selected colour: ${randomSelectedColour} - ${logoColour[randomSelectedColour]}`
  );

  // Return the randomly selected colour
  return logoColour[randomSelectedColour];
}

// Function to generate a true random colour
function switchColourFromRandom() {
  let colour = "#";

  // Do-While loop to force colour to re-generate indefinitely until a new different colour, when previous colour is the same as newly generated one.
  do {
    // Generate random 16 length "hex" code. Then slice it to keep characters from the 2nd and before 8th position (2nd - 7th char) (and convert to uppercase)
    colour += Math.random().toString(16).slice(2, 8).toUpperCase();
  } while (colour === previousColour);

  // Update the previous colour index
  previousColour = colour;

  // Log colour code to console
  console.log(`Randomly selected colour: ${colour}`);

  // Return the randomly generated colour code
  return colour;
}
