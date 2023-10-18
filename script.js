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
  TheLandOfOblaks = loadImage("thelandofoblaks.png");
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
  let centerX = width / 2;
  let centerY = height / 2;

  let aspectRatio = TheLandOfOblaks.width / TheLandOfOblaks.height;
  let bgWidth = height * aspectRatio;
  let bgHeight = height;
  image(
    TheLandOfOblaks,
    centerX - bgWidth / 2 - 5,
    centerY - bgHeight / 2,
    bgWidth,
    bgHeight
  );
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
  textAlign(CENTER);
  textSize(40);
  textFont("Pixelify Sans");
  fill(255);
  stroke(0);
  strokeWeight(4);
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
      movementVector.mult(4);
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
    color("#b09192"),
  ];
  shuffle(colors, true);
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
    let fromColor = this.fillColor;
    let toColor = color("#b09192");
    for (let i = 0; i < 3; i++) {
      let interColor = lerpColor(fromColor, toColor, i / 2);
      fill(interColor);
      rectMode(CENTER);
      rect(0, 0, this.bulletLength, this.bulletWidth, this.circleSize);
      fromColor = interColor;
    }

    fill(fromColor);
    ellipse(-this.bulletLength / 2, 0, this.circleSize);
    ellipse(this.bulletLength / 2, 0, this.circleSize);

    stroke("#5d4352");
    strokeWeight(2);

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
    let frameX = this.currentFrame * tileSize;
    let frameY = 0;
    if (this.animationState === "idle" || this.animationState === "moving") {
      let facingDirection = this.getFacingDirection();
      let flipped = false;
      if (facingDirection === "left") {
        facingDirection = "right";
        flipped = true;
      }
      if (this.animationState === "idle") {
        frameY =
          tileSize * ["down", "right", "up", "left"].indexOf(facingDirection);
      } else if (this.isMoving) {
        frameY =
          tileSize *
          (3 + ["down", "right", "up", "left"].indexOf(facingDirection));
      }
      if (flipped) {
        scale(-1, 1);
      }
    }
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
      return "up";
    } else if (angle >= -PI / 4 && angle < PI / 4) {
      return "right";
    } else if (angle >= (3 * PI) / 4 || angle < (-3 * PI) / 4) {
      return "left";
    } else {
      return "down";
    }
  }
  animate() {
    if (this.animationState === "idle" || this.animationState === "moving") {
      this.animationTimer += this.animationSpeed;
      if (this.animationTimer >= 1) {
        this.currentFrame = (this.currentFrame + 1) % this.spriteFrames;
        this.animationTimer = 0;
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
      this.isMoving = true;
    } else {
      this.isMoving = false;
    }
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
    let side = floor(random(4));
    if (side === 0) {
      spawnX = random(width);
      spawnY = -10;
    } else if (side === 1) {
      spawnX = random(width);
      spawnY = height + 10;
    } else if (side === 2) {
      spawnX = -10;
      spawnY = random(height);
    } else {
      spawnX = width + 10;
      spawnY = random(height);
    }

    return createVector(spawnX, spawnY);
  }

  draw() {
    push();
    imageMode(CENTER);
    translate(this.pos.x, this.pos.y);
    this.frameCounter++;
    if (this.frameCounter >= this.animationSpeed) {
      this.currentFrame = (this.currentFrame + 1) % this.spriteFrames;
      this.frameCounter = 0;
    }
    scale(this.scaleFactor);
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
