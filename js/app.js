
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
        this.width = 67;
        this.height = 75;
    }

    // Update the player's position, required method for game
    update(dt) {
    }

    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
    }

    // Move player around but only inside canvas
    handleInput(move) {
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



const player = new Player(5,380,'images/char-boy.png');

const enemyY = [55, 140, 230];
const allEnemies = enemyY.map((y, index) => {
    return new Enemy(-150 * (index + 1) ,y);
});

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
