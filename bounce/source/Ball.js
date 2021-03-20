/**
 * Ball Manager
 */
class Ball {

    /**
     * Ball Manager constructor
     * @param {Number} boardWidth
     * @param {Number} boardHeight
     */
    constructor(boardWidth, boardHeight) {
        this.minSpeed    = 8;
        this.maxSpeed    = 16;
        this.minAngle    = 25;
        this.maxAngle    = 75;
        this.speedInc    = 0.1;

        this.element     = document.querySelector(".ball");
        this.angle       = Utils.rand(50, 70);
        this.dirTop      = -1;
        this.dirLeft     = -1;
        this.speed       = this.minSpeed;
        this.size        = this.element.offsetWidth;
        this.top         = 0;
        this.left        = 0;
        this.boardWidth  = boardWidth;
        this.boardHeight = boardHeight;
    }

    /**
     * Set the top start position
     * @param {Ship} ship
     * @returns {Void}
     */
    setStartTop(ship) {
        this.top = Math.round(ship.getPosition().top - this.size);
        Utils.setPosition(this.element, this.top, this.left);
    }

    /**
     * Set the left start position
     * @param {Ship} ship
     * @returns {Void}
     */
    setStartLeft(ship) {
        this.left = Math.round(ship.getPosition().left + (ship.getWidth() - this.size) / 2);
        Utils.setPosition(this.element, this.top, this.left);
    }

    /**
     * Move the ball when starting
     * @returns {Void}
     */
    start() {
        this.top -= 1;
    }


    /**
     * Move after starting
     * @param {Number} speed
     * @returns {Void}
     */
    move(speed) {
        const movey = this.angle / 90;

        this.top  += this.speed * this.dirTop * movey * speed;
        this.left += this.speed * this.dirLeft * (1 - movey) * speed;

        Utils.setPosition(this.element, this.top, this.left);
    }

    /**
     * If the ball crashed the top wall, change the direction, angle and speed
     * @returns {Boolean} True if the ball crashed the top wall
     */
    topCrash() {
        if (this.top <= 0) {
            this.dirTop = 1;
            return true;
        }
        return false;
    }

    /**
     * If the ball crashed the left wall, change the direction, angle and speed
     * @returns {Boolean} True if the ball crashed the left wall
     */
    leftCrash() {
        if (this.left <= 0) {
            this.dirLeft = 1;
            return true;
        }
        return false;
    }

    /**
     * If the ball crashed the right wall, change the direction, angle and speed
     * @returns {Boolean} True if the ball crashed the right wall
     */
    rightCrash() {
        if (this.left + this.size >= this.boardWidth) {
            this.dirLeft = -1;
            return true;
        }
        return false;
    }

    /**
     * If the ball went through the bottom wall, game over
     * @returns {Boolean} True if the ball went through the bottom wall
     */
    bottomCrash() {
        if (this.top + this.size >= this.boardHeight) {
            return true;
        }
        return false;
    }

    /**
     * If the ball crashed the ship, perform the required actions
     * @param {Ship} ship
     * @returns {Void}
     */
    shipCrash(ship) {
        if (this.onShip(ship)) {
            this.dirTop = -1;
            return true;
        }
        return false;
    }

    /**
     * Check if the ball is touching the ship
     * @param {{top: Number, left: Number}} shipPos
     * @returns {Boolean}
     */
    onShip(ship) {
        const pos    = ship.getPosition();
        const sTop   = pos.top;
        const sLeft  = pos.left;
        const sWidth = ship.getWidth();
        const bTop   = this.top + this.size;
        const bLeft  = this.left + this.size / 2;

        return (bTop >= sTop && bLeft >= sLeft && bLeft <= sLeft + sWidth);
    }


    /**
     * Change the angle
     * @param {Ship} ship
     * @returns {Void}
     */
    changeAngle(ship) {
        const pos   = this.left + this.size / 2 - ship.getPosition().left;
        const width = ship.getWidth();

        this.angle = Math.floor(pos * 180 / width);
        if (this.angle > 90) {
            this.angle = 180 - this.angle;
        }
        this.angle = Utils.clamp(this.angle, this.minAngle, this.maxAngle);

        if (this.dirLeft === 1 && pos < width / 2) {
            this.dirLeft = -1;
        } else if (this.dirLeft === -1 && pos > width / 2) {
            this.dirLeft = 1;
        }
    }

    /**
     * Increase the speed
     * @returns {Void}
     */
    accelerate() {
        this.speed += this.speedInc;
    }

    /**
     * Randomly change the angle and speed
     * @returns {Void}
     */
    randomChange() {
        this.angle = Utils.rand(this.minAngle, this.maxAngle);
        this.speed = Utils.rand(this.minSpeed, this.maxSpeed);
    }


    /**
     * Sets the top direction of the ball
     * @param {Number} dir
     * @returns {Void}
     */
    setDirTop(dir) {
        this.dirTop  = dir;
    }

    /**
     * Sets the left direction of the ball
     * @param {Number} dir
     * @returns {Void}
     */
    setDirLeft(dir) {
        this.dirLeft = dir;
    }


    /**
     * Returns the position of the ball
     * @returns {{top: Number, left: Number}}
     */
    getPosition() {
        return { top : this.top, left : this.left };
    }

    /**
     * Returns the direction of the ball
     * @returns {{top: Number, left: Number}}
     */
    getDirection() {
        return { top : this.dirTop, left : this.dirLeft };
    }

    /**
     * Returns the size of the ball
     * @returns {Number}
     */
    getSize() {
        return this.size;
    }
}
