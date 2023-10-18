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
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAFgCAYAAABzDXH9AAAAAXNSR0IArs4c6QAAEOpJREFUeJztnbFuG0cXhQ9/prcpAdYDJIUCV3mBQC5ZBgjyCoEqQYAqVaxcESBcEX4HAylZSvAL2I0QF0kdyIBMqzexf0Fe8nI0S86M5+5wyfMBgkWK1p2duTszu9pzLkAIIYQQQgghhBBCDoJOyn+6ASrf+2dVtfb7Op2kX/+EqloPd9vpNBp/n/kh9j/cAFVvOJidvHzW1e/f3z3Objudyh2E3Nx2Oo3HL52AlvGDEkAaUNf5AHDy8lkXw4FpEpSOv6kNbT0B/pe3efvNtgTsLRKwTfGTEuBT/xKf+pe1r60pHX+f4AyQQOkEzBk/ahN4VlUd3zR0Ohnh/u5xNr0adC3XwNLx95GoGeC206nGi+8v+pe4v3uc3d89zi4W2TdG/Q41B6XjA8D0atDtDQez08lo+d7pZITecDCbXg2erM05Oauqzrb4JidAVVWoqgo3QPVxOPj2B1D9NxlVfwCV/v7jcPDtBqjk8znj3yzibIv/32RUSRss4v+h+uDjcPBNfy9tsYgvbdgWP7b/g7KlqircdjqVTLXA4rJLod//1L/EWVV1cl0Hy70HYHUG+uLLz+RzrxJvdG2KDwCvrwbdN5MRZOaR76/VZ3LGd/t/U/zY/g9qoDsAOhEECWwxANIB8npTfCFnApaOb9n/QZtA2Xy5AX2flXXwrKo6yHgrVtY2aUddfKtNYMn4xfvf3QPIWniz+JK1z3IPwPg28aP/FiCZdw6V7eqsmMb+QsZvVXxCCCGEEEIIIYQQQgghhBBCCCGEEELILhP81KBWCNd9Rh5RstDll46/r0Q9EyiyLHmtn0xtQh5dMn7pBLSKH5wAmzpfXls+kFg6/rY2tPUEoDo4kJAEbGP85ATwSZSbpHT8fYEzQCKlEzBX/OAEEGmyvPZJlC0pHX9fSb4MHGOlSn3jGDQ0sQsuEX/bOpxbFb1L8df0af9NRmv6fPnKrYvf1fhaj+fT5bUpftIMIFnoXoY0cQbWeRSIbv4cQC5Z+rb4rz2OIJbxgfX+d+OLXtDkPoAEX6y1XQBrGvWTl8+6rwERKmbvADnw+7tHr0a+qcswHf/amY4vjDeCbv9740f2f/SNIOkA16XDehfsauTv7x6fxF8qZg1moNLxS/f/2voj67Bej24aWoP1PsCNn1uXv2vxLfo/6j6A3Gb0XXKNn7xjg5oGn8S3dggrHX8X+p8QQgghhBBCCCGEEEIIIYQQQgghhBCyywSXjdPsU/n0Qye6ZtC+lU8PoXQCWsZPMoioK1+ORflyqyQoHX9TG9p6AlAdHMG2BOwtErBN8ZkAB05SArhlS+ves6J0/H0iag8g8qiFROlJh5uVL9+R+IIrC5P3rONaxE+aAXyqWN97uRFVTl3808nIXJ0jJhX3d48z/aV/ZoU2yaiLH3sCRN0HcEuY68+4pcuBvJdB26TZ10qyntsowVe+XStzpT0p5dtD4wPz/hcJmC8+sF5SNlv5+G3afABr7+fuALd8et1lkPxMPpdLp6/jC3UJKOSMb3kCBDXQsn59CNIB8npTfMFiBigV37L/gzaBxevXYzWtSTvq4lttAkvGt+z/6D2Atic5X/x8jNUUpDciFmsg4+eNH/23AMFXv75JGL9sfEIIIYQQQgghhBBCCCGEEEIIIYQQQsguEl02DtguT95XXf62Eu76gdC29EFr/AFiEhCwG4DSx79J+ZTyKLqJPwAM6gZua0MT+vzS/gSbSsfK8SOy71slDy+tzy/JtrrBqYUzkxLAV7q86fLpJdmn42/VDCDs0wCk4uuDFJL9AfSUc+qUb7conboLBB9/i4iaAbQ8+aJ/udSoS9Fk6+qZoo/vDQczXT3zdDJCbzgwH4CSx6+9AQDA1wemSL3aj8PBN127Xn8vNewt4kvtXIkj/+rvdQ1fC25UnLrjl5q+uWPrusU3TlwZl5S4wWeLTyMv06CWKueUhbvxtUHDm8kIcubJ99qgwaoNvp24K9W26IMQk45zIPq4oxNAmzC4yBTVZOcLTSUhAGw6fukjiwRwTSKAVT9cLMrXx8YN3gRqjfrJy2dd2fQA6x1itQnU8TeZRDXVBh1PNoVTKHm20UZYW9TIOADAOZAUN+kqAJgnwdR5z3oHvGkA9GeaaoN8r2ejJlzSzrE688UnIDVusj+A27Acvyc0lptwTSWgbkMTcepiu1caYwBowKaWEEIIIYQQQgghhBBCCCGEEEIIIYQQsutE+wPklie3hdLHbyWPT5KHy+sc8uRQSg+AxC51/G4bcsnjgxMgRJ48jYmcQMkB2KXjz+lP0Bp1sJU+/tBJToBc8uS2si/H35oZwGVfBiAFnyrKvHx8cXlyYXbh+C3Kx0fNANKA6dWgK8pUUeimZmBsbHldcgBKHL/GVQXXvZcVrU/XPgH6y8obwI2fUx+fEr/U8W+Krb0JYvwRom4EufJkvfNOlSfHxAfy6+Nj4pc8fu2P4MYGsPZ+jD9CtDhUB9LTXqo8OQZ3AK7VNfFFQ5tAbVDhTPvml6EiyXc9AoDVwGN+qRzcliR5uKy3Ogutb4IIufXxMbjKXH38S4m2Ufy62J/6lxDfonPE+xMkLQHAKhuBuTxZOsD6Xrh0whhzaxhg3gnWPsVy/GP13vni39PJaNmGJo7/1Dlunzw+tB1J9wF8lmjWDmGCjiln/+lk1EhsjWvKUKINwllVdegNQAghhBBCCCGEEEIIIYQQQgghhBBCABgrWUke3Me8Q+ThQNhjYVlKxjTBrpSPL81tp1N1/rpB7/j52vvTh68wlYfvygCUKh+/C8dfN/gA0Dt+julfN9FJED0DlBqATbGBdH18rjY0cfwWRNcO3jQAvcUA5GvebrGPx9+aPQBZ8c/f/wIAfvr5x7XXxy+Oo39XK/0Bcurj28RZVXWq317h+MXxcvCBeSIcvzhG9dur6JqGycKQkPdyY6GPT6HU8d92OtWXt+8AzM/66cNXTB++LmeAL2/fRYtTkmziNhVPtpJo6fhjzIWh+uduCVXL+E0fv8jSOn/dAAAePj/gp59/XFsK/vn73+USIDNBSBuSEmDTAAA2GkFXnu1Kw3XpeKv4QJkEvAGqo/cfAMyv9wF47wPo97/8+kuQRDzZH6DpAbDSx4dS8vgltrw+ev9hOeBC7/g5vvz6y/J1aBuifAL1ALxxLFnu7x5xf/c4O52MulZ+fRb6+FBKH78ulD19+Fo7A5jdCQTKDoCWQS/MILrneOoNFKuPj6Hk8Wt6x8/9M0DC74peAgCsGRL4XluuwcB6uXifXh6w2QSWOn69/5Bbwf/8/S+O/vwdwHz3/9PPP2L68HXtUjD7H4OW04trSOAxKLCk1O3WXTh+mfqP/vx9bVnA+w/JswAhhBBCCCGEEEIIOQCKP8AYY21uwb4+Ph5KKx8JI/lgAhw4TIADhwlw4DABDhwmwIHDBDhwgp4IstSnk7K0Sh1citDS9fK9pSYhd/yoBNgFeXYptDIHWBdmpJozxMavq57+PScf9wABbBp832uL+HWD73sdQ1IC+Cp3H1L17n2CM0AL8Z2AqSRVDnX3AaKUaUqeXRqfQcNRyQZ9B9EWMaKCuehfLjX6Ure3qeKRTSPGDILPoME6/lSJUXvDwUxL4lx5XAxR4tDecDC7xlwK/WYywkX/sgvMhZIX/cuuSKb38UpAaxO/vH23lGeJJKvJ+FI296J/CVXEOmkjGDRIIs0GECTPBubrUohEuw0PhLi6xKP3H5bLgCA6vSZ0kaeLwdek6hKDPunq0zeqYyMb0qYEkMH3mTRMH77i4fMDjv783cSbQOLXeSSIZ8E5EBU/eAnQQsT7u0fvnUBICfc9RAYfWFm06Km/d/wcD58fTOPLLCxLsD4JU+8FJNnEnbx81vXNANOUX9YS9Bp8BGDqOHZ++fUXHC0+Z+FNoOOfY37C6UH/1L9cVTS3vhUMoKs9gWRT0tvjW8HAahBkJhBLli9v360Gv4H4i5lgueSO8bScfSjRM4Bk3VrARWbu+yzgG3xBLNqs/x6gzTA0YwBIiF/8TG3DJnCf4a3gA4cJcOAwAQ4cJsCBwwQ4cJgABw4T4MBhAhBCCCGEEEIIIYfDYf8xPJJtKt02Vi9vhT9A6fhu7H2Sxyf5A+SsX58S/5Crl+cm+qHQ3PXrY+Pv2wCE4iua5ZKyBLF6eALyQKb7gGZvODCPnXsG5B+DWsS2GVAey4/5nUkzwKbKlU2wQZlkyj7K46NmAC2TltLl8gUgqX59bPxdKB8P+OXxTZHToSXaH+Do/QevBu7h8wOO3n8w9QcQYYRbuBmY6+VOJyNzfwJJwvNFTFFItfHsByLVwbqEuZsExy+O10qX55RJ68rdwEoJqz9zraZl6xLygi5h637W0iqubhOokzDrVYAriwaeumLopUDNBFl6wZVFA/XVuwHAsoK5Rg/8pmSw4KJ/CTHkeH016F4nXoEk+QPkrF+fEj+nP0FsOwD/dbjYuMlZ2ETxbF/RavlM9vsAVvXrU+KX9CfwzUbAPAHlrGxi9ukNB7PzxTLYGw5mU8++KITvuhHkc8pokjq7miYoERNYUwh3T1Z7omRpfvASIMG1Y6ZcErrvxW5EYuJrx8ypOgP0e7njCzfAcgN2sTBkAFb+CHojZrEE6I2woGfDlPjJM4AeaDcxmkAPtJsYlpTyRxCLvmvPDS9xCwOAXkNLECGEEEIIIYQQQgghhBBCCCGEEEJ2Fz40EEhMBe+2eAMAFIdGYVXBuyQUhwZiWcG7JEyAA4dLQCJ1HgEWhJhDAGl7ECZAi7DYg7Rqw1ISLU+TQXDXfUtR6rY9SGp87gEiOKuqjsjDRZ0s3gBNGFRY0JolwMokKYVFedZKBn/x77KSahPk2oMEJ8CuDMCu+PRJEjx5r2UEN9gtYe5D1iDAxiBhk0kSkKaNi4kfirUsPeceJNoiZpMGL8Wlqm3cdjqVfDUd22IP0po9gKaUT59rU+MmQZNLwDlWg/89e5BWJkAJZPa7v3vEdG5I1YVzWdaEVS2wckg5d0whGikfD5R1ypxeDbqbfPqs4opHoLx2XUru7x5nY6ALI2m2O/sA8yVXt8HUKVT06RJ4jJVX3xgrmxKrfYCOD9T79FnuQ6RzdeJ/6l/ion8JsYuzmAHU7DO76F/i5OWzrjaFkL4YY/OtYkIIIYQQQgghhBBCCCGEEEIIIYQcBq17jLkUMY/F0x9gj9kVXUIumAARhJavR4tmViZAS7BSZjEBWkbuJYjq4AR8Kpwm1MHblqCUJ6I5A0Qg2gB5RNv9+bKUXYuuAjgDJFBXvr5EW76XVswAsR45gN21uMjC3QG3EoX42FA7OZqgBNiVAdgVn75S3gDBS1AEUTOAHgDfRsRyAEJ8+qzKtrrtAMqaQby+GnSvHZm+SNNiCU6AJuvz7iq6D0pJw3MvQa3YA/ho0qcPWA3+66tB981kBDgnQ9O3gXP5EbU2AUrzZAmajBpJgk3LsJlPoPjziDz7eiEFB/xnYG6PHl983+ekTU149ek1d6zaNL0adF8Z/C3A55EkVwOyITx5+awb6xMUdB9AAkuN+tdXg654AmhtOjDvjNwadV98WQPdf5vSyMuae1ZVnSbs4dw9mM8biB4BhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQQshh0Rori10pX79vBGsDd2UA9s2nrzTR4lBdw9b3M+viySE+fUyCcKI8grZ5BFjW7SU20CTqwGECHDhJCVDKKBGY6+/r4k9batVWkmiPoOnVoFvnUrX0rTEwTNbxgfqEGxvFJ4QQQgghhBBCCCGk1fwfAgS4yDsHalgAAAAASUVORK5CYII="
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