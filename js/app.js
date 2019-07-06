
// Class for Enemies that our player must avoid
class Enemy {
    constructor (x,y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        console.log('update enemy');
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        console.log('render enemy');
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

    // a handleInput() method
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



const enemy = new Enemy(100,200);
const player = new Player(5,380,'images/char-boy.png');

const allEnemies = [];

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
