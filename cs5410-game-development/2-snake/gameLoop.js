let canvas = document.getElementById('id-canvas');
let context = canvas.getContext('2d');
let previous, move, direction, food, moveSnake, playTime, x, y; // 0U 1R 2D 3L
let playerScore = -1;
let xValues = [];
let yValues = [];
let obstacleArray = [];
let snakeArray = [];
let gameOver = false;
let scores = [0,0,0,0,0];
let grow = -1;
let positionCount = 16;
let a, b, tmp;

class GameEvent {
    constructor(name, interval) {
        this.name = name;
        this.interval = interval;
        this.report = false;
        this.elapsed = 0;
    }

    getName() { return this.name; }

    getInterval() { return this.interval; }

    getReport() { return this.report; }

    getElapsed() { return this.elapsed; }

    setReport(newReport) { this.report = newReport; }

    addTime(duration) {
        this.elapsed += duration;
        if (this.elapsed >= this.interval) {
            this.elapsed -= this.interval;
            this.setReport(true);
        }
    }
}

class Box { // 0 = Snake, 1 = Obstacle, 2 = Food
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    getX() { return this.x; }

    getY() { return this.y; }

    setX(x) { this.x = x; }

    setY(y) { this.y = y; }

    moveLeft() { this.x -= 10; }

    moveRight() { this.x += 10; }

    moveUp() { this.y -= 10; }

    moveDown() { this.y += 10; }

    getType() { return this.type; }
}

function onKeyDown(e) {
    if (e.keyCode === KeyEvent.DOM_VK_LEFT) {
        if (direction !== 1){
            direction = 3;
        }
    }
    else if (e.keyCode === KeyEvent.DOM_VK_UP) {
        if (direction !== 2) {
            direction = 0;
        }
    }
    else if (e.keyCode === KeyEvent.DOM_VK_RIGHT) {
        if (direction !== 3) {
            direction = 1;
        }
    }
    else if (e.keyCode === KeyEvent.DOM_VK_DOWN) {
        if (direction !== 0) {
            direction = 2;
        }
    }
}

function displayCredits() {
    let out = document.getElementById("message");
    out.innerHTML = "Created by CHASE MORTENSEN";
}

function displayHighScores() {
    let out = document.getElementById("message");
    out.innerHTML = "HIGH SCORES";
    for (let i = 0; i < 5; i++) {
        out.innerHTML += "<br/>" + scores[i];
    }
}

function insertScore() {
    for (let i = 0; i < scores.length; i++) {
        if (playerScore > scores[i]){
            scores.splice(i,0,playerScore);
            break;
        }
    }
}

function displayScore() {
    let out = document.getElementById("score");
    out.innerHTML = "Score: " + playerScore;
}

function displayTime() {
    let out = document.getElementById("time");
    let time = Math.floor((performance.now() - playTime) / 1000);
    out.innerHTML = "Time: " + time;
}

function gameOverMessage() {
    let out = document.getElementById("message");
    out.innerHTML = "GAME OVER";
}

function shuffle(a) { // taken from https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }   
    return a;
}

function drawBox(box) { // inspired by the demo code driver.js
    context.save(); 
    context.fillStyle = 'rgb(0, 0, 0)';
        context.fillRect(0,0,10,10);
    if (box.getType() === 0) {// snake
        context.fillStyle = 'rgb(255, 228, 181)';
    }
    else if (box.getType() === 1) {
        context.fillStyle = 'rgb(144, 238, 144)'; // obstacle
        //context.fillRect(2,2,8,8);
    }
    else if (box.getType() === 2) {
        context.fillStyle = 'rgb(255, 127, 80)'; // food
        //context.fillRect(0,0,10,10);
    }
    context.fillRect(0,0,8,8); 
    context.restore();
}

function generateStartingLocations() {
    for (let i = 0; i < 50; i++) {
        xValues.push(i * 10);
        yValues.push(i * 10);
    }
    x = shuffle(xValues);
    y = shuffle(yValues);

    for (let i = 0; i < 15; i++) {
        let tmp = new Box(x[i], y[i], 1); // Obstacles
        obstacleArray.push(tmp);
    }

    snakeArray.push(new Box(x[15], y[15], 0));
    food = new Box(x[positionCount], y[positionCount], 2);
}

function boxIsEmpty(x, y) {
    for (let i = 0; i < 15; i++) { // obstacles
        if (x === obstacleArray[i].getX() && 
            y === obstacleArray[i].getY()) {
                return false;
        }
    }

    for (let i = 0; i < snakeArray.length; i++) { // snake
        if (x === snakeArray[i].getX() && 
            y === snakeArray[i].getY()) {
                return false;
        }
    }

    return true;
}

function moveFood(){
    do {
        positionCount++;
        a = positionCount % 50;
        tmp = Math.floor(positionCount / 50);
        b = (positionCount + tmp) % 50;
    } while(!boxIsEmpty(x[a], y[b]))
    food = new Box(x[a], y[b], 2);
}

function shiftSnakeArray(){
    for (let i = snakeArray.length - 1; i > 0; i--) {
        snakeArray[i].setX(snakeArray[i - 1].getX());
        snakeArray[i].setY(snakeArray[i - 1].getY());
    }
}

function snakeOutsideBoundaries() {
    return (snakeArray[0].getX() < 0 || // check if inside boundaries
            snakeArray[0].getX() > 490 ||
            snakeArray[0].getY() < 0 ||
            snakeArray[0].getY() > 490)
}

function snakeHitObstacle() {
    let hit = false;
    for (let i = 0; i < 15; i++) {
        if (snakeArray[0].getX() === obstacleArray[i].getX() &&
            snakeArray[0].getY() === obstacleArray[i].getY()) {
                hit = true;
            }
    }
    return hit;
}

function snakeHitSelf() {
    let hit = false;
    for (let i = 1; i < snakeArray.length; i++) {
        if (snakeArray[0].getX() === snakeArray[i].getX() &&
            snakeArray[0].getY() === snakeArray[i].getY()) {
                hit = true;
            }
    }
    return hit;
}

function init() { 
    previous = performance.now();
    playTime = performance.now();
    
    obstacleArray = [];
    snakeArray = [];
    direction = -1;
    playerScore = 0;
    grow = 0;
    gameOver = false;
    generateStartingLocations();
    moveSnake = new GameEvent(moveSnake, 150);
    
    requestAnimationFrame(gameLoop)
}

function render() {
    if (!gameOver){
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        for (let i = 0; i < 15; i++) {
            context.translate(obstacleArray[i].getX(), obstacleArray[i].getY());
            drawBox(obstacleArray[i]);
            context.translate(-obstacleArray[i].getX(), -obstacleArray[i].getY());
        }
        context.translate(food.getX(), food.getY());
        drawBox(food);
        context.translate(-food.getX(), -food.getY());
        
        for (let i = 0; i < snakeArray.length; i++) {
            context.translate(snakeArray[i].getX(), snakeArray[i].getY());
            drawBox(snakeArray[i]);
            context.translate(-snakeArray[i].getX(), -snakeArray[i].getY())
        }
        context.restore();
    }
}

function update(elapsedTime) {
    moveSnake.addTime(elapsedTime);
    if (moveSnake.getReport()) {

        if (snakeArray[0].getX() === food.getX() &&
            snakeArray[0].getY() === food.getY()) {
                playerScore++;
                grow += 3;
                moveFood();
        }

        if (grow > 0) {
            let tmp = new Box(snakeArray[0].getX(),
                            snakeArray[0].getY(),
                            0);
            snakeArray.push(tmp);
            grow--;
        }

        shiftSnakeArray();

        if (direction === 0) {
            snakeArray[0].moveUp();
        }
        else if (direction === 1) {
            snakeArray[0].moveRight();
        }
        else if (direction === 2) {
            snakeArray[0].moveDown();
        }
        else if (direction === 3) {
            snakeArray[0].moveLeft();
        }
        
        if (snakeOutsideBoundaries() || snakeHitObstacle() ||
            snakeHitSelf()) {
                gameOver = true;
        }       
    }
    moveSnake.setReport(false);
}

function gameLoop() {
    let current = performance.now();
    let elapsedTime = current - previous;
    displayTime();
    displayScore();

    update(elapsedTime);
    render();
    
    previous = current;
    

    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    }
    else {
        insertScore();
        gameOverMessage();
    }    
}

window.addEventListener('keydown', onKeyDown);
