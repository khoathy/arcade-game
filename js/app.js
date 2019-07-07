/* Variable declarations and get DOM elements */

// For Instruction modal
const instructionModal = document.getElementById('modal-instruction');
const closeInstruction = document.getElementById('instruction-close');

// For Gameover modal
const gameoverModal = document.getElementById('modal-gameover');
const closeGameover = document.getElementById('gameover-close'); 
const replayBtn = document.querySelector('.modal-replayBtn');
const gameoverScore = document.getElementById('gameover-score');
const gameoverGrade = document.getElementById('gameover-grade');
  
// For Info panel
const scoreDisplay = document.getElementById('score-display');
const instructionBtn = document.getElementById('instruction-btn');
const lifeDisplay = document.getElementById('life-display');
let score = 0;
let life = 3;
let enemyY = [60, 145, 225];

/*
 * Initialize game 
 */
function initGame() {
    score = 0;
    life = 3;
    scoreDisplay.innerText = "0";
    lifeDisplay.innerText = " 3";
    enemyY = [60, 145, 225];
    //set up event listener for buttons
    instructionBtn.addEventListener('click',showInstruction);
    closeInstruction.addEventListener('click',hideInstruction);
    closeGameover.addEventListener('click',hideGameover);
    replayBtn.addEventListener('click',replayGame);
    // Keyboard shortcut to control player
    document.addEventListener('keyup', movePlayer);
    // Keyboard shortcut to close instruction modal
    document.addEventListener('keydown', hideInstruction);
    // Keyboard shortcut to replay 
    document.addEventListener('keydown', replayShortcut);
}


/*
 * Keyboard shortcut 
 */

// Keyboard shortcuts (press space or enter) to replay
function closeModalShortcut(e) {
    if(e.keyCode == 32 || e.keyCode == 13) {
        hideInstruction();  
    } 
}

// Keyboard shortcuts (press space or enter) to replay
function replayShortcut(e) {
    if(e.keyCode == 32 || e.keyCode == 13) {
        replayGame();  
    } 
}

// Send the keys pressed to Player.handleInput() method to move player
function movePlayer(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
}


/*
 * Instruction Modal  
 */
function showInstruction(){
    instructionModal.style.display = "flex";
}

function hideInstruction() {
    instructionModal.style.display = "none";
}


/*
 * Game Sounds 
 */
// Make sound from a given audio file
function makeSound(audioFile){
    var audio = new Audio(audioFile);
    audio.play();
}

// Sound when reach water
function winSound(){
    makeSound("sound/success.mp3");
}

// Sound when enemy and player collide
function collideSound(){
    makeSound("sound/collide.mp3");
}

// Gameover sound 
function gameOverSound(){
    // if low score
    if (score <= 20) { 
        makeSound("sound/gameover.mp3");
    }
    // if high score
    if (score > 20) { 
        makeSound("sound/congrats.mp3");
    }
}


/*
 * Music and popup Modal when Game Over 
 */

function gameOver(){
    setTimeout(gameOverSound,350);
    setTimeout(showGameover,200);
    document.removeEventListener('keyup', movePlayer);
}

// Display, close the modal, replay btn
function showGameover(){
    gameoverModal.style.display = "flex";
    summaryGame();
}

function hideGameover() {
    gameoverModal.style.display = "none";
    initGame();
}

function replayGame() {
    hideGameover();
    initGame();
}

// Display score and grade
function summaryGame(){
    gameoverScore.textContent = score;
    grade();
}

// Show grade based on scores
function grade() {
	if (score <= 20) {
		gameoverGrade.textContent = 'Beginner';
	}
	if (score > 20 && score <= 40) {
		gameoverGrade.textContent = 'Average';
	}
	if (score > 40 && score <= 60) {
        gameoverGrade.textContent = 'Great';	
    }
	if(score > 60) {
		gameoverGrade.textContent = 'Expert';
	}
};


/*
 * Reset player position
 */
function restartPlayer(){
    player.x = 200;
    player.y = 390;
}


/*
 * Classes
 */
// Class for Enemies that our player must avoid
class Enemy {
    constructor (x,y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.width = 96;
        this.height = 65;
        this.speed = 250;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        if (this.x - this.width > ctx.canvas.width) {
            this.x = -150 * Math.floor(Math.random() * 5) + 1 ;
        } else {
            this.x += (Math.floor(Math.random()) + 1) * this.speed * dt;
        }

        //collision detection. If collided, reset player's position
        let enemyLeftMax = this.x - this.width + 20;
        let enemyRightMax = this.x + this.width - 20;
        let enemyTopMax = this.y - this.height;
        let enemyBottomMax = this.y + this.height;
        if (player.x > enemyLeftMax && player.x < enemyRightMax && player.y > enemyTopMax && player.y < enemyBottomMax){
            // Return player to initial position
            collideSound();
            restartPlayer();
            life -=1 ;
            lifeDisplay.textContent = life;
            
            //check if Game ends
            if (life == 0) {
                gameOver();
            }
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


// Class for player 
class Player {
    constructor (x,y,sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.width = 66;
        this.height = 75;
    }

    // Update the player's position
    update(dt) {
        if (this.y < 50) {
            // sound when win
            winSound();
            // restart player, update score when win
            restartPlayer();
            score += 10;
            scoreDisplay.textContent = score;
        }
    }

    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
    }

    // Player can move around but only inside canvas
    handleInput(move) {
        // Space between each step
        const horizontal = 100;
        const vertical = 83;

        if (move == "left" && this.x - horizontal >= 0) {
            this.x -= horizontal;
        } else if (move == "right" && this.x + horizontal < ctx.canvas.width -10) {
            this.x += horizontal;
        } else if (move == "up" && this.y + this.height - vertical >= 0) {
            this.y -= vertical;
        } else if (move == "down" && this.y + vertical < ctx.canvas.height - 180) {
            this.y += vertical;
        }
    }
};


// Instantiate objects.
// Place all enemy objects in an array called allEnemies

let allEnemies = enemyY.map((y, index) => {
    return new Enemy(-150 * (index + 1) ,y);
});


// Place the player object in a variable called player
const player = new Player(200,390,'images/char-boy.png');

initGame();