/*
    TO DO:
    DONE - Force colour of logo to change to a different colour when the same colour has been selected (while statement)
    DONE - Add check to see if logo has perfectly hit a corner
        -> Then add an animation that plays on screen (confetti?), (maybe add rainbow effect for a few sec to the logo?)
    Allow logo to start from the center of the screen or a randomized position
        -> Choose random starting direction for true DVD randomness
*/

// Defines variables for the section and SVG DVD logo
const section = document.querySelector("section");
const logo = document.querySelector("#DVDLogo");
let numberInput = document.querySelector("#FPSInput");
let FPS = 60;

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

// Stores the Id (and the function itself) of the current setInterval so that it can be cleared
let intervalId;

// Function to start the interval with the current FPS
function startAnimation() {
  if (intervalId) clearInterval(intervalId); // Clear any existing interval

  intervalId = setInterval(() => {
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

    // Check if the logo hits any of the four corners
    const hitTopLeft = xPosition === 0 && yPosition === 0;
    const hitTopRight =
      xPosition + logo.clientWidth === window.innerWidth && yPosition === 0;
    const hitBottomLeft =
      xPosition === 0 && yPosition + logo.clientHeight === window.innerHeight;
    const hitBottomRight =
      xPosition + logo.clientWidth === window.innerWidth &&
      yPosition + logo.clientHeight === window.innerHeight;

    if (hitTopLeft || hitTopRight || hitBottomLeft || hitBottomRight) {
      console.log("The logo hit a corner!");
    }

    xPosition += xSpeed;
    yPosition += ySpeed;

    update();
  }, 1000 / FPS);
}

// Start the animation initially on page load
startAnimation();

// Listen for changes in the FPS input and restarts the interval
numberInput.addEventListener("change", function (e) {
  // Makes sure input is number by parsing and defaults to 60 if input is invalid
  FPS = parseInt(numberInput.value, 10) || 60;

  // Logs speed to console
  console.log(`Input: ${numberInput.value} FPS: ${FPS}`);

  // Restart the animation with the new FPS
  startAnimation();
});

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

// Function to set the logo's position to any of the corners
function setLogoPosition(corner) {
  switch (corner) {
    case "topLeft":
      xPosition = 0;
      yPosition = 0;
      break;

    case "topRight":
      xPosition = window.innerWidth - logo.clientWidth;
      yPosition = 0;
      break;

    case "bottomLeft":
      xPosition = 0;
      yPosition = window.innerHeight - logo.clientHeight;
      break;

    case "bottomRight":
      xPosition = window.innerWidth - logo.clientWidth;
      yPosition = window.innerHeight - logo.clientHeight;
      break;

    default:
      console.error("Invalid corner specified.");
      return;
  }

  update();
  console.log(`Logo moved to ${corner}`);
}

const confettiWrapper = document.querySelector('.confetti-wrapper');
// Generate 50 confetti and repeat those same 50 infinitely
for (let i = 0; i < 50; i++) {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti-piece');
  confetti.style.left = `${Math.random() * 100}%`;
  confetti.style.setProperty('--fall-duration', `${Math.random() * 3 + 3}s`);
  // confetti.style.setProperty('--confetti-color', getRandomColor()); ORIGINAL CODE
  confetti.style.setProperty('--confetti-color', switchColourFromRandom());
  confettiWrapper.appendChild(confetti);
}