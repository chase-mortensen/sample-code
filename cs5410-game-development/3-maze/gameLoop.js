let canvas = document.getElementById('id-canvas');
let context = canvas.getContext('2d');
let previous, move, direction, playTime, x, y; // 0U 1R 2D 3L
let playerScore = -1;
let gameOver = false;
let scores = [0,0,0,0,0];
let a, b, boardSize, currentBox, breadCrumbs, toggleCrumbs;
let grid = [];
let inputBuffer = {}; // DEMO CODE
let currentX, currentY;
let scoreTime;

let imgBackground = new Image();
imgBackground.isReady = false;
imgBackground.onload = function() {
    this.isReady = true;
};
imgBackground.src = 'background.jpg';

let imgCharacter = new Image();
imgCharacter.isReady = false;
imgCharacter.onload = function() {
    this.isReady = true;
};
imgCharacter.src = 'character.png';

let imgFinish = new Image();
imgFinish.isReady = false;
imgFinish.onload = function() {
    this.isReady = true;
};
imgFinish.src = 'goldenApple.png';

let imgCrumbs = new Image();
imgCrumbs.isReady = false;
imgCrumbs.onload = function() {
    this.isReady = true;
};
imgCrumbs.src = 'apple.png';

class Box { 
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.north = true;
        this.east = true;
        this.south = true;
        this.west = true;
        this.hasChar = false;
        this.hasFinish = false;
        this.inMaze = false;
        this.inFrontier = false;
        this.visited = false;
    }

    setVisited() { this.visited = true; }
    wasVisited() { return this.visited; }

    getMaze() { return this.inMaze; }
    getFrontier() {return this.inFrontier; }
    setInMaze() { this.inMaze = true; }
    setInFrontier() { this.inFrontier = true; }
    removeFromFrontier() { this.inFrontier = false; }

    hasChar() { return this.hasChar; }
    hasFinish() { return this.hasFinish; }

    setChar() { this.hasChar = true; }
    removeChar() { this.hasChar = false; }

    getX() { return this.x; }
    getY() { return this.y; }

    setX(x) { this.x = x; }
    setY(y) { this.y = y; }

    hasNorth() { return this.north; }
    hasEast() { return this.east; }
    hasSouth() { return this.south; }
    hasWest() { return this.west; }

    removeNorth() { this.north = false; }
    removeEast() { this.east = false; }
    removeSouth() { this.south = false; }
    removeWest() { this.west = false; }
}

function onKeyDown(e) {
    if (e.keyCode === KeyEvent.DOM_VK_LEFT) {
        direction = 'w';
    }
    else if (e.keyCode === KeyEvent.DOM_VK_UP) {
        direction = 'n';      
    }
    else if (e.keyCode === KeyEvent.DOM_VK_RIGHT) {
        direction = 'e';
    }
    else if (e.keyCode === KeyEvent.DOM_VK_DOWN) {
        direction = 's';
    }

    if (e.keyCode === KeyEvent.DOM_VK_B) {
        toggleCrumbs = true;
    }
}

function moveCharacter(direction) {
    console.log("currentX: " + currentX + " currentY: " + currentY);

    grid[currentX][currentY].setVisited();

    if (direction === 'w' && !grid[currentX][currentY].hasWest()) {
        grid[currentX][currentY].removeChar();
        currentX--;
        grid[currentX][currentY].setChar();
    }
    else if (direction === 'n' && !grid[currentX][currentY].hasNorth()) {
        grid[currentX][currentY].removeChar();
        currentY--;
        grid[currentX][currentY].setChar();
    }
    else if (direction === 'e' && !grid[currentX][currentY].hasEast()) {
        grid[currentX][currentY].removeChar();
        currentX++;
        grid[currentX][currentY].setChar();
    }
    else if (direction === 's' && !grid[currentX][currentY].hasSouth()) {
        grid[currentX][currentY].removeChar();
        currentY++;
        grid[currentX][currentY].setChar();
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
    out.innerHTML = "YOU WIN!";
}

function drawBox(box) { // inspired by the demo code driver.js
    context.save(); 
    while (!imgBackground.isReady || !imgCharacter.isReady || 
        !imgFinish.isReady || !imgCrumbs.isReady){}
    if (imgBackground.isReady) {
        context.drawImage(imgBackground, 0, 0, 25, 25);
    }

    context.fillStyle = 'black';
    if (box.hasNorth()){
        context.fillRect(0,0,25,2);
    }
    if (box.hasEast()){
        context.fillRect(23,0,2,25);
    }
    if (box.hasSouth()){
        context.fillRect(0,23,25,2);
    }
    if (box.hasWest()){
        context.fillRect(0,0,2,25);
    }
    
    if (box.hasChar){
        context.drawImage(imgCharacter, 3, 3, 19, 19);
    }
    else if (box.hasFinish){
        context.drawImage(imgFinish, 3, 3, 19, 19);
    }
    else if (box.wasVisited() && breadCrumbs) {
        context.drawImage(imgCrumbs, 3, 3, 19, 19);
    }
    
    context.restore();
}

function init(size) { 
    previous = performance.now();
    playTime = performance.now();
    
    grid = [];
    boardSize = size;
    canvas.width = boardSize * 25;
    canvas.height = boardSize * 25;

    breadCrumbs = false;
    toggleCrumbs = false;
    direction = -1;
    playerScore = 0;
    gameOver = false;
    currentX = 0;
    currentY = 0;
    initGrid();
    generateMaze();    
    requestAnimationFrame(gameLoop)
}

function initGrid() {
    for (let i = 0; i < boardSize; i++) {
        grid.push([]);
        for (let j = 0; j < boardSize; j++) {
            grid[i].push( new Box(i * 25, j * 25));
            context.translate(grid[i][j].getX(), grid[i][j].getY());
            console.log("drawing grid[" + i + "][" + j + "]");
            console.log(" ^ x:" + grid[i][j].getX() + " y:" + grid[i][j].getY());
            if (i === 0 && j === 0) { 
                grid[i][j].hasChar = true;
             }
            if (i === boardSize - 1 && j === boardSize - 1) { grid[i][j].hasFinish = true; }
            context.translate(-grid[i][j].getX(), -grid[i][j].getY());
        }
    }

}

function generateMaze() {
    grid[0][0].setInMaze();
    let boardFilled = false;
    let frontier = [];
    let randomBox, r_x, r_y;
    let mazeTotal = 1;
    let wallOptions = [];

    while (!boardFilled) {
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (grid[i][j].getMaze() === true) { // add nesw to frontier (if not border or in maze)
                    if (i > 0) {
                        if (!grid[i-1][j].getMaze() && !grid[i-1][j].getFrontier()) {
                            grid[i-1][j].setInFrontier();
                            frontier.push(grid[i-1][j]);
                        }
                    }
                    if (j > 0) {
                        if (!grid[i][j-1].getMaze() && !grid[i][j-1].getFrontier()) {
                            grid[i][j-1].setInFrontier();
                            frontier.push(grid[i][j-1]);
                        }
                    }
                    if (i < boardSize - 1) {
                        if (!grid[i+1][j].getMaze() && !grid[i+1][j].getFrontier()) {
                            grid[i+1][j].setInFrontier();
                            frontier.push(grid[i+1][j]);
                        }
                    }
                    if (j < boardSize - 1) {
                        if (!grid[i][j+1].getMaze() && !grid[i][j+1].getFrontier()) {
                            grid[i][j+1].setInFrontier();
                            frontier.push(grid[i][j+1]);
                        }
                    }
                }

            }
        }

        // choose random box from frontier
        let index = Math.floor(Math.random() * frontier.length);

        randomBox = frontier[index];

        let r_x = randomBox.getX() / 25;
        let r_y = randomBox.getY() / 25;
        
        console.log("r_x: " + r_x + " r_y: " + r_y);
        // scan possible connections, choose random wall if multiple available

        wallOptions = [];
        
        if (r_x > 0) {
            if (grid[r_x - 1][r_y].getMaze()) {
                wallOptions.push('w');                  
            }
        }
        if (r_y > 0) {
            if (grid[r_x][r_y - 1].getMaze()) {
                wallOptions.push('n');                
            }
        }
        if (r_x < boardSize - 1) {
            if (grid[r_x + 1][r_y].getMaze()) {
                wallOptions.push('e');               
            }
        }
        if (r_y < boardSize - 1) {
            if (grid[r_x][r_y + 1].getMaze()) {
                wallOptions.push('s');         
            }
        }

        let wallIndex = Math.floor(Math.random() * wallOptions.length);
        let wall = wallOptions[wallIndex];

        // remove walls

        if (wall === 'n') {
            grid[r_x][r_y].removeNorth();
            grid[r_x][r_y - 1].removeSouth();   
        }
        else if (wall === 'e') {
            grid[r_x][r_y].removeEast();
            grid[r_x + 1][r_y].removeWest();
        }
        else if (wall === 's') {
            grid[r_x][r_y].removeSouth();
            grid[r_x][r_y + 1].removeNorth();   
        }
        else if (wall === 'w') {
            grid[r_x][r_y].removeWest();
            grid[r_x - 1][r_y].removeEast();
        }
        
        // remove added box from frontier
        frontier.splice(index,1);
        randomBox.setInMaze();
        randomBox.removeFromFrontier;
        mazeTotal++;
        if (mazeTotal === boardSize * boardSize) {
            boardFilled = true;
        }
    }

}

function drawMaze() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            context.translate(grid[i][j].getX(), grid[i][j].getY());
            drawBox(grid[i][j]);
            context.translate(-grid[i][j].getX(), -grid[i][j].getY());
        }
    }

}

function render() {
    drawMaze();
    moveCharacter(direction);
    direction = '';
    if (toggleCrumbs){
        breadCrumbs = !breadCrumbs;
        toggleCrumbs = false;
    }

    context.restore();
}

function update(elapsedTime) {
    scoreTime = performance.now();
    playerScore = Math.floor(boardSize * boardSize - scoreTime / 1000);
    if (currentX === boardSize - 1 &&
        currentY === boardSize - 1) {
            gameOver = true;
        }
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
