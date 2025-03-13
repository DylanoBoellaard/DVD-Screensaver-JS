/*
    TO DO:
    DONE - Force colour of logo to change to a different colour when the same colour has been selected (while statement)
    DONE - Add check to see if logo has perfectly hit a corner
        -> Then add an animation that plays on screen (confetti?), (maybe add rainbow effect for a few sec to the logo?)
    DONE - Allow logo to start from the center of the screen or a randomized position
        DONE -> Choose random starting direction for true DVD randomness
*/

// Defines variables for the section and SVG DVD logo
const section = document.querySelector("section");
const logo = document.querySelector("#DVDLogo");
let numberInput = document.querySelector("#FPSInput");

// Animation speed of the DVD logo
let FPS = 60;

// Defines colour array & previousColour variable
const logoColour = ["red", "orange", "yellow", "green", "blue", "purple"];
let previousColour = null;

// Get the current window height & width on the browser and adds 'px' for use in the stylesheet
section.style.height = window.innerHeight + "px";
section.style.width = window.innerWidth + "px";

/*
     -- RANDOM POSITION
*/

/*
  Random movement direction for the DVD logo on startup

  Math.Random checks if it's true or false.
  If true  > Speed =  4 (SE direction)
  If false > Speed = -4 (NW direction)
  Xspeed & Yspeed have separate calls, thus combined, all diagonal directions are possible (NE - SE - SW - NW)
*/
let xSpeed = Math.random() < 0.5 ? 4 : -4;
let ySpeed = Math.random() < 0.5 ? 4 : -4;

// Function to generate a random starting position within the window bounds
function getRandomPosition() {
  return {
    x: Math.random() * (window.innerWidth - logo.clientWidth),
    y: Math.random() * (window.innerHeight - logo.clientHeight),
  };
}

// Set initial random position
const initialPosition = getRandomPosition();
let xPosition = initialPosition.x;
let yPosition = initialPosition.y;

// Update the initial position before animation starts
update();

// Update function that will update the logo's position
function update() {
  logo.style.left = xPosition + "px";
  logo.style.top = yPosition + "px";
}


/*
      -- INTERVAL & ANIMATION SYSTEM
*/

// Stores the Id (and the function itself) of the current setInterval so that it can be cleared
let intervalId;

// Function to start the interval with the current FPS (DVD moving animation)
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
    const hitTopRight = xPosition + logo.clientWidth === window.innerWidth && yPosition === 0;
    const hitBottomLeft = xPosition === 0 && yPosition + logo.clientHeight === window.innerHeight;
    const hitBottomRight = xPosition + logo.clientWidth === window.innerWidth && yPosition + logo.clientHeight === window.innerHeight;

    if (hitTopLeft || hitTopRight || hitBottomLeft || hitBottomRight) {
      console.log("The logo hit a corner!");
      createCenterSpreadConfetti(); // Trigger the corner confetti
    }

    // Update the position of the DVD logo with the defined speed
    xPosition += xSpeed;
    yPosition += ySpeed;

    // Function to allow for the DVD logo to move to the new position
    update();
  }, 1000 / FPS);
}

// Start the animation initially on page load
startAnimation();

// Listen for changes in the FPS input and restarts the interval
numberInput.addEventListener("change", function (e) {
  // Makes sure the input is a number by parsing, and defaults to 60 if input is invalid
  FPS = parseInt(numberInput.value, 10) || 60;

  // Logs speed to console
  console.log(`Input: ${numberInput.value} FPS: ${FPS}`);

  // Restart the animation with the new FPS
  startAnimation();
});


/*
      -- COLOUR STUFF
*/

// Function to randomly choose a colour from a defined array
function switchColourFromArray() {
  let randomSelectedColour;

  // Do-While loop to force colour to re-generate indefinitely until a new different colour has been chosen, when previous colour is the same as newly generated one.
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


/*
      -- SET LOGO POSITION DEBUG STUFF
*/

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

  // Update the logo's position with the chosen corner
  update();
  console.log(`Logo moved to ${corner}`);
}


/*
      -- CONFETTI STUFF
*/

// Variables for the confetti
const confettiWrapper = document.querySelector('.confetti-wrapper');
let confettiEnabled = true; // Boolean to track confetti state

// Function to toggle confetti on or off
function toggleConfetti() {
  confettiEnabled = !confettiEnabled;
  confettiWrapper.style.display = confettiEnabled ? "block" : "none"; // Show or hide confetti wrapper
  console.log(`Confetti is now ${confettiEnabled ? "enabled" : "disabled"}.`);
  
}

// Generate 50 confetti and repeat those same 50 infinitely
for (let i = 0; i < 50; i++) {
  const confetti = document.createElement('div');
  confetti.classList.add('confetti-piece');
  confetti.style.left = `${Math.random() * 100}%`;
  confetti.style.setProperty('--fall-duration', `${Math.random() * 3 + 3}s`);
  confetti.style.setProperty('--confetti-color', switchColourFromRandom());
  confettiWrapper.appendChild(confetti);
}

// Confetti function to create spread confetti in the center of the screen
function createCenterSpreadConfetti() {
  const centerConfettiWrapper = document.createElement('div');
  centerConfettiWrapper.classList.add('center-confetti-wrapper');
  section.appendChild(centerConfettiWrapper);

  // Generate 50 confetti pieces
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('center-confetti-piece');

    // Set the starting position at the center of the screen
    confetti.style.left = `50%`;
    confetti.style.bottom = `50%`;

    // Randomize the animation duration
    confetti.style.setProperty('--spread-duration', `${Math.random() * 1.5 + 2}s`);

    // Assign a random angle and distance for the spread
    const angle = Math.random() * 360; // Random angle in degrees
    const distance = Math.random() * 300 + 100; // Spread distance (100px to 400px)
    const xOffset = Math.cos((angle * Math.PI) / 180) * distance;
    const yOffset = Math.sin((angle * Math.PI) / 180) * distance;

    // Set the spread offsets
    confetti.style.setProperty('--x-offset', `${xOffset}px`);
    confetti.style.setProperty('--y-offset', `${yOffset}px`);

    // Assign a random color
    confetti.style.setProperty('--confetti-color', switchColourFromRandom());

    centerConfettiWrapper.appendChild(confetti);
  }

  // Remove the wrapper after the confetti animation is complete
  setTimeout(() => {
    centerConfettiWrapper.remove();
  }, 4000); // Matches the maximum duration
}