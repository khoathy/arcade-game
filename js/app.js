/* Variable declarations and get DOM elements */

// For Congrats modal
const gameoverModal = document.getElementById('gameover');
const closeModal = document.querySelector('.modal-close'); 
const replayBtn = document.querySelector('.modal-replayBtn');
const gameoverScore = document.getElementById( 'gameover-score');
  
// For Info panel
const scoreDisplay = document.getElementById('score-display');
const lifeDisplay = document.getElementById('life-display');
let score = 0;
let life = 3;

/*
 * Initialize game 
 */
function initGame() {
    score = 0;
    life = 3;
    scoreDisplay.innerText = "0";
    lifeDisplay.innerText = " 3";
    enemyY = [];
    //set up event listener for buttons
    closeModal.addEventListener('click',hideModal);
    replayBtn.addEventListener('click',replayGame);
}

/*
 * Gameover Sound and popup Modal when Game Over 
 */


function gameOver(){
    setTimeout(gameOverSound,500);
    setTimeout(showModal,800);
}

// Winning sound after 2 lifes
function gameOverSound(){
    var audio = new Audio("sound/win.mp3");
    audio.play();
}

// Display, close the modal, replay btn
function showModal(){
    gameoverModal.style.display = "flex";
    summaryGame();
}

function hideModal() {
    gameoverModal.style.display = "none";
    initGame();
}

function replayGame() {
    hideModal();
    initGame();
}

function summaryGame(){
    gameoverScore.textContent = score;
}


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
            player.x = 200;
            player.y = 390;
            life -=1 ;
            lifeDisplay.textContent = life;
            console.log(life); 
            //check Life ended
            if (life == 0) {
                showModal();
            }
        }
    

//     // Change the value of score to 0.
//     score = 0;
//     document.getElementById("score-display").innerHTML = score;
//   }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        // console.log(this);
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

    // Update the player's position, required method for game
    update(dt) {
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

        if (move == "left" && this.x - horizontal > 0) {
            this.x -= horizontal;
        } else if (move == "right" && this.x + horizontal < ctx.canvas.width) {
            this.x += horizontal;
        } else if (move == "up" && this.y + this.height - vertical >= 0) {
            this.y -= vertical;
        } else if (move == "down" && this.y + 180 + vertical < ctx.canvas.height) {
            this.y += vertical;
        }
    }
};


// Instantiate objects.
// Place all enemy objects in an array called allEnemies
let enemyY = [60, 145, 225];
const allEnemies = enemyY.map((y, index) => {
    return new Enemy(-150 * (index + 1) ,y);
});


// Place the player object in a variable called player
const player = new Player(200,390,'images/char-boy.png');


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

initGame();