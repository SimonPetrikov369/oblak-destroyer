const tileSize = 32;

let spiders = [];
let player;
let spiderSpawnTime = 300;
let spiderMaxSpeed = 1.2;
let frame = 0;
let score = 0;

// Preload images
let playerSprite;
let spiderSprite;

function preload() {
	TheLandOfOblaks = loadImage("thelandofoblaks.png")
	playerSprite = loadImage(
		"data:image/png;base64,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"
	);
	spiderSprite = loadImage(
		"data:image/png;base64,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"
	);
}

let touches = [];
let isMobileDevice = false;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.elt.setAttribute("style", "display: block");
	pixelDensity(1);
	player = new Player();

	for (let i = 0; i < 42; i++) {
		spiders.push(new Spider(random(spiderMaxSpeed)));
	}

	// Detect if it's a mobile device
	detectMobile();

	if (isMobileDevice) {
		// Add touch event listeners for player movement and shooting
		canvas.mousePressed(() => {
			// Trigger shooting on touch (for mobile devices)
			if (mouseButton === LEFT) {
				player.shoot();
			}
		});

		// Add touch event listeners for player movement
		canvas.touchStarted(handleTouch);
		canvas.touchMoved(handleTouch);
		canvas.touchEnded(handleTouch);
	}
}

function handleTouch(event) {
	touches = event.touches;
}

// Detect if it's a mobile device
function detectMobile() {
	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
	) {
		isMobileDevice = true;
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	  // Calculate the X and Y coordinates to center the background
		let centerX = width / 2;
		let centerY = height / 2;
	
		// Calculate the width and height needed to maintain the aspect ratio
		let aspectRatio = TheLandOfOblaks.width / TheLandOfOblaks.height;
		let bgWidth = height * aspectRatio;
		let bgHeight = height;
		image(TheLandOfOblaks, centerX - bgWidth / 2 -5, centerY - bgHeight / 2, bgWidth, bgHeight);
	
	// background(TheLandOfOblaks, centerX - bgWidth / 2, centerY - bgHeight / 2, bgWidth, bgHeight);
	rectMode(CENTER);
	player.draw();
	player.update();
	player.animate();

	for (let i = spiders.length - 1; i >= 0; i--) {
		spiders[i].draw();
		spiders[i].update();

		if (spiders[i].ateYou()) {
			restart();
			break;
		}

		if (player.hasShot(spiders[i])) {
			score++;
			spiders.splice(i, 1);
		}
	}

	if (frame >= random(spiderSpawnTime, spiderSpawnTime * 1.2)) {
		spiders.push(new Spider(random(spiderMaxSpeed)));
		spiderSpawnTime *= 0.95;
		frame = 0;
	}

	if (frameCount % 1000 == 0) {
		spiderMaxSpeed += 0.1;
	}

	frame++;

	// Draw the score text with a pixelated effect
	textAlign(CENTER);
	textSize(40);
	textFont("Pixelify Sans"); // Use a monospace font for a pixel-like appearance
	fill(255); // White text
	stroke(0); // Black outline
	strokeWeight(4); // Adjust the outline thickness
	text(score, width / 2, 100);

	if (touches.length === 1) {
		const touch = touches[0];
		let joystickCenterX = width / 6;
		let joystickCenterY = height - height / 6;
		let movementVector = createVector(
			touch.x - joystickCenterX,
			touch.y - joystickCenterY
		);
		let movementMagnitude = movementVector.mag();

		if (movementMagnitude > 20) {
			movementVector.normalize();
			movementVector.mult(4); // Adjust the movement speed
			player.pos.add(movementVector);
		}
	}
}

function restart() {
	player = new Player();
	spiders = [];
	spiderSpawnTime = 300;
	spiderMaxSpeed = 1.2;
	score = 0;
}

function mouseClicked() {
	player.shoot();
}

function randomGradient() {
	let colors = [
		color("#b6908d"),
		color("#eacec4"),
		color("#af8886"),
		color("#b09192")
	];
	shuffle(colors, true); // Randomize the colors
	return colors[0];
}

class Bullet {
	constructor(x, y, angle, playerSize) {
		this.pos = createVector(x, y);
		this.speed = 16;
		this.angle = angle;
		this.playerSize = playerSize;
		this.bulletLength = random(playerSize * 0.4, playerSize * 0.6);
		this.bulletWidth = random(playerSize * 0.04, playerSize * 0.06);
		this.circleSize = random(playerSize * 0.06, playerSize * 0.1);
		this.fillColor = randomGradient();
	}

	draw() {
		push();
		noStroke();
		translate(this.pos.x, this.pos.y);
		rotate(this.angle);

		// Gradient fill for the bone
		let fromColor = this.fillColor;
		let toColor = color("#b09192"); // Use the last color in the gradient as the end color
		for (let i = 0; i < 3; i++) {
			let interColor = lerpColor(fromColor, toColor, i / 2);
			fill(interColor);
			rectMode(CENTER);
			rect(0, 0, this.bulletLength, this.bulletWidth, this.circleSize);
			fromColor = interColor;
		}

		// Circles at the ends of the bone
		fill(fromColor);
		ellipse(-this.bulletLength / 2, 0, this.circleSize);
		ellipse(this.bulletLength / 2, 0, this.circleSize);

		stroke("#5d4352"); // Outline color
		strokeWeight(2); // Outline thickness

		pop();
	}

	update() {
		const cosAngle = cos(this.angle);
		const sinAngle = sin(this.angle);
		this.pos.x += this.speed * cosAngle;
		this.pos.y += this.speed * sinAngle;
	}
}

class Player {
	constructor() {
		this.pos = createVector(width / 2, height / 2);
		this.angle = 0;
		this.bullets = [];
		this.spriteSheet = playerSprite;
		this.spriteFrames = 4;
		this.animationSpeed = 0.15;
		this.currentFrame = 0;
		this.isMoving = false;
		this.animationState = "idle";
		this.animationTimer = 0;
		this.scaleFactor = 1.7;
	}

	draw() {
		push();
		translate(this.pos.x, this.pos.y);
		scale(this.scaleFactor);

		// Determine animation frame based on the animation state
		let frameX = this.currentFrame * tileSize;
		let frameY = 0;

		// Adjust sprite frame based on the player's facing direction
		if (this.animationState === "idle" || this.animationState === "moving") {
			let facingDirection = this.getFacingDirection();
			let flipped = false; // Check if the sprite needs flipping

			if (facingDirection === "left") {
				facingDirection = "right"; // Use the 'right' frame
				flipped = true; // Set the flipped flag
			}

			if (this.animationState === "idle") {
				frameY =
					tileSize * ["down", "right", "up", "left"].indexOf(facingDirection);
			} else if (this.isMoving) {
				frameY =
					tileSize * (3 + ["down", "right", "up", "left"].indexOf(facingDirection));
			}

			// Flip the sprite if necessary
			if (flipped) {
				scale(-1, 1);
			}
		}

		// Draw the sprite with the correct rotation
		imageMode(CENTER);
		let sprite = this.spriteSheet.get(frameX, frameY, tileSize, tileSize);
		image(sprite, 0, 0, tileSize, tileSize);
		pop();

		for (let bullet of this.bullets) {
			bullet.update();
			bullet.draw();
		}
	}

	getFacingDirection() {
		let angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);

		if (angle < -PI / 4 && angle >= (-3 * PI) / 4) {
			return "up"; // Facing up
		} else if (angle >= -PI / 4 && angle < PI / 4) {
			return "right"; // Facing right
		} else if (angle >= (3 * PI) / 4 || angle < (-3 * PI) / 4) {
			return "left"; // Facing left
		} else {
			return "down"; // Facing down
		}
	}

	animate() {
		if (this.animationState === "idle" || this.animationState === "moving") {
			// Increment the animation timer
			this.animationTimer += this.animationSpeed;

			// If the timer exceeds the threshold, update the frame
			if (this.animationTimer >= 1) {
				this.currentFrame = (this.currentFrame + 1) % this.spriteFrames;
				this.animationTimer = 0; // Reset the timer
			}
		}
	}

	update() {
		let xSpeed = 0;
		let ySpeed = 0;

		if (keyIsPressed) {
			if (keyIsDown(65)) {
				xSpeed = -2;
			}
			if (keyIsDown(68)) {
				xSpeed = 2;
			}
			if (keyIsDown(87)) {
				ySpeed = -2;
			}
			if (keyIsDown(83)) {
				ySpeed = 2;
			}
		}

		if (xSpeed !== 0 || ySpeed !== 0) {
			this.isMoving = true; // Set the movement flag to true
		} else {
			this.isMoving = false; // Set the movement flag to false
		}

		// Update the animation state based on the movement flag
		if (this.isMoving) {
			this.animationState = "moving";
		} else {
			this.animationState = "idle";
		}

		this.pos.add(xSpeed, ySpeed);
		this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
	}

	shoot() {
		this.bullets.push(new Bullet(this.pos.x, this.pos.y, this.angle, tileSize));
	}

	hasShot(zombie) {
		for (let i = this.bullets.length - 1; i >= 0; i--) {
			if (
				dist(
					this.bullets[i].pos.x,
					this.bullets[i].pos.y,
					zombie.pos.x,
					zombie.pos.y
				) < 15
			) {
				this.bullets.splice(i, 1);
				return true;
			}
		}
		return false;
	}
}

class Spider {
	constructor(speed) {
		this.speed = speed;
		this.pos = this.getOffscreenPosition();
		this.spriteSheet = spiderSprite;
		this.spriteFrames = 8;
		this.currentFrame = 0;
		this.frameWidth = 64;
		this.frameHeight = 64;
		this.animationSpeed = 4;
		this.frameCounter = 0;
		this.scaleFactor = random(0.5, 1);
	}

	getOffscreenPosition() {
		let spawnX, spawnY;

		// Randomly determine whether to spawn from the top, bottom, left, or right
		let side = floor(random(4));

		if (side === 0) {
			// Spawn from the top
			spawnX = random(width);
			spawnY = -10;
		} else if (side === 1) {
			// Spawn from the bottom
			spawnX = random(width);
			spawnY = height + 10;
		} else if (side === 2) {
			// Spawn from the left
			spawnX = -10;
			spawnY = random(height);
		} else {
			// Spawn from the right
			spawnX = width + 10;
			spawnY = random(height);
		}

		return createVector(spawnX, spawnY);
	}

	draw() {
		push();
		imageMode(CENTER);
		translate(this.pos.x, this.pos.y);

		// Increment the frame counter
		this.frameCounter++;

		// Check if it's time to change the frame
		if (this.frameCounter >= this.animationSpeed) {
			this.currentFrame = (this.currentFrame + 1) % this.spriteFrames;
			this.frameCounter = 0; // Reset the frame counter
		}

		// Scale the drawing with the random scale factor
		scale(this.scaleFactor);

		// Draw the appropriate frame
		let frameX = this.currentFrame * this.frameWidth;
		image(
			this.spriteSheet,
			0,
			0,
			this.frameWidth,
			this.frameHeight,
			frameX,
			0,
			this.frameWidth,
			this.frameHeight
		);
		pop();
	}

	getAnimationType() {
		// Determine animation type based on direction
		if (this.direction === "south") {
			return 0;
		} else if (this.direction === "east") {
			return 1;
		} else if (this.direction === "north") {
			return 2;
		} else if (this.direction === "west") {
			return 3;
		}
	}

	update() {
		let difference = p5.Vector.sub(player.pos, this.pos);
		difference.limit(this.speed);
		this.pos.add(difference);
	}

	ateYou() {
		return dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) < 20;
	}
}