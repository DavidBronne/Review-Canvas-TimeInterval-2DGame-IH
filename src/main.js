'use strict';

function buildDom(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.children[0];
  };
  


// Runs on initial start and contains calls of all other functions that manage the game

function main() {
    var splashScreen; // Start Screen
    var game; // instance of the Game
    var gameOverScreen;

    // -- Create DOM -- Splash screen
    function createSplashScreen() {
        splashScreen = buildDom(`
            <main>
            <h1>Eternal Enemies</h1>
            <button>Start</button>
            </main>
        `);
        document.body.appendChild(splashScreen);

        // Start button
        var startButton = splashScreen.querySelector('button')
        // startButton.addEventListener('click', function () {
        //     console.log('You clicked start'); 
        // Start the game here
        startButton.addEventListener('click', startGame);
    };

    // -- Remove DOM -- Splash screen
    function removeSplashScreen() {
        // remove() is the DOM element that removes the Node from the page
        splashScreen.remove();
    };

    // -- Create DOM -- Game screen
    function createGameScreen() {
        var gameScreen = buildDom(`
    <main class="game container">
      <header>
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="canvas-container">
        <canvas></canvas>
      </div>
    </main>
  `);

    document.body.appendChild(gameScreen);
    return gameScreen;
    };

    // -- Remove DOM -- Game screen
    function removeGameScreen() {
        game.removeGameScreen();
    };

    // -- Create DOM -- Game over screen
    function createGameOverScreen() {
        gameOverScreen = buildDom(`
    <main>
      <h1>Game over</h1>
      <p>Your score: <span></span></p>
      <button>Restart</button>
  	</main>
  `);

  var button = gameOverScreen.querySelector('button');
  button.addEventListener('click', startGame);

  var span = gameOverScreen.querySelector('span');
  span.innerText = game.score;

  document.body.appendChild(gameOverScreen);
    };

    // -- Remove DOM -- Game over screen
    function removeGameOverScreen() {
        if (gameOverScreen !== undefined) {
            gameOverScreen.remove();
          }
    };

    // -- Setting the Game state 
    function startGame() {
        removeSplashScreen();
        // we also need to add clearing of the gameOverScreen
        removeGameOverScreen();	//		<--  UPDATE

        // var gameScreen = createGameScreen();    <-- Remove
        game = new Game();                      // <-- Add
        game.gameScreen = createGameScreen();

        // Start the game 
        game.start();
        // End the game
        // In order to get access to the function [gameOver()] declared in the main.js 
        //we will pass it as a callback to our game object when new game is created.
        // game.passGameOverCallback(gameOver);    // gameOver has no () --> not fired
                                                // game.passGameOverCallback has () --> listening
        game.passGameOverCallback(function() {		// <-- UPDATE     function is declared, NOT fired yet
           debugger
            gameOver(game.score);					// <-- UPDATE

          });

        // David: Instead of callBack, why not: ??? it works
        // if (game.gameIsOver === true) { gameOver(game.score)}
    };
s
    

    function gameOver(score) {
                      
        removeGameScreen();
        createGameOverScreen(score);
      }


    // -- initialize Splash screen on initial start
    createSplashScreen();
}

// Runs the function `main` once all resources are loaded

window.addEventListener('load', main);