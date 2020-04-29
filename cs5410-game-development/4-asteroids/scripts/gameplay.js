MyGame.screens['game-play'] = (function(game, objects, renderer, graphics, input) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    let myKeyboard = input.Keyboard();
    let myMouse = input.Mouse();
    let asteroids = [];
    let bullets = [], ufoBullets = [];
    let lives = 3;
    let points = 0;
    let shootTime = 0, hyperspaceTime = 0, ufo1Time = 0;
    let ufo2Time = 0, ufo2ShootTime = 0;
    let ufo1 = null, ufo2 = null;
    let scores = [0,0,0,0,0];
    let level = 1;
    let x = 0, y = 0;
    // let highScores = {};
    // let previousScores = localStorage.getItem('highScores');

    let gameOverText = objects.Text({
        text: 'Game Over', 
        font: '32pt Arial',
        fillStyle: 'rgba(255, 0, 0, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: 250, y: 100 }
    });

    let livesText = objects.Text({
        text: 'lives: ' + lives,
        font: '24pt Arial',
        fillStyle: 'rgba(255, 255, 255, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: 10, y: 650 }
    });

    let levelText = objects.Text({
        text: 'level: ' + lives,
        font: '24pt Arial',
        fillStyle: 'rgba(255, 255, 255, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: 590, y: 650 }
    });

    let pointsText = objects.Text({
        text: points,
        font: '24pt Arial',
        fillStyle: 'rgba(255, 255, 255, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: 275, y: 10 }
    });

    let hyperspaceText = objects.Text({
        text: 'Hyperspace',
        font: '24pt Arial',
        fillStyle: 'rgba(255, 255, 255, 1)',
        strokeStyle: 'rgba(0, 0, 0, 1)',
        position: { x: 275, y: 650 }
    });

    let spaceship = objects.Ship({
        imageSrc: 'assets/ship.png',
        size: { width: 100, height: 100 },       // Size in pixels
        center: { x: graphics.canvas.width / 2, y: graphics.canvas.height / 2 },
        rotation: 0,
        moveRate: 5 / 1000,         // Pixels per second
        rotateRate: (Math.PI * 1.7) / 1000    // Radians per second
    });

    function displayHighScores() {
        let out = document.getElementById("high-scores-table");
        out.innerHTML = "";
        for (let i = 0; i < 5; i++) {
            out.innerHTML += "<br/>" + scores[i];
        }
    }
    
    function insertScore() {
        for (let i = 0; i < scores.length; i++) {
            if (points > scores[i]){
                scores.splice(i,0,points);
                break;
            }
        }
    }

    function fire() {
        if (shootTime > 200) {
            bullets.push(createNewBullet());
            shootTime = 0;
        }
    }

    function spray() {
        for (let i = 0; i < 7; i++){
            ufoBullets.push(createNewUFO1Bullet(ufo1.rotation + ((i * 4 * Math.sqrt(2)) / (2 * Math.PI))));
        }
    }

    function ufo2Shoot() {
        ufoBullets.push(createNewUFO2Bullet(ufo2.rotation + (Math.random() * 2 * Math.PI)));
    }

    function createNewUFO1Bullet(rotation) {
        let bullet = objects.Bullet({
            imageSrc: 'assets/bullet.png',
            size: { width: 15, height: 15 },       // Size in pixels
            center: { x: ufo1.center.x, y: ufo1.center.y },
            rotation: rotation,
            moveRate: 350 / 1000,         // Pixels per second
            rotateRate: 0 / 1000    // Radians per second
        });
        bullet.initialize();
        return bullet;
    }

    function createNewUFO2Bullet(rotation) {
        let bullet = objects.Bullet({
            imageSrc: 'assets/bullet.png',
            size: { width: 15, height: 15 },       // Size in pixels
            center: { x: ufo2.center.x, y: ufo2.center.y },
            rotation: rotation,
            moveRate: 350 / 1000,         // Pixels per second
            rotateRate: 0 / 1000    // Radians per second
        });
        bullet.initialize();
        return bullet;
    }

    function createNewBullet() {
        let bullet = objects.Bullet({
            imageSrc: 'assets/bullet.png',
            size: { width: 10, height: 10 },       // Size in pixels
            center: { x: spaceship.center.x, y: spaceship.center.y },
            rotation: spaceship.rotation,
            moveRate: 650 / 1000,         // Pixels per second
            rotateRate: 0 / 1000    // Radians per second
        });
        bullet.initialize();
        return bullet;
    }

    function createSmallAsteroid(x, y) {
        let asteroid = objects.Asteroid({
            imageSrc: 'assets/asteroid.png',
            size: { width: 50, height: 50 },       // Size in pixels
            center: { x: x, y: y },
            rotation: Math.random() * 2 * Math.PI,
            moveRate: 100 / 1000,         // Pixels per second
            rotateRate: (Math.PI / 2) / 1000    // Radians per second
        });
        asteroid.initialize();
        return asteroid;
    }

    function createMediumAsteroid(x, y) {
        let asteroid = objects.Asteroid({
            imageSrc: 'assets/asteroid.png',
            size: { width: 75, height: 75 },       // Size in pixels
            center: { x: x, y: y },
            rotation: Math.random() * 2 * Math.PI,
            moveRate: 75 / 1000,         // Pixels per second
            rotateRate: (Math.PI / 4) / 1000    // Radians per second
        });
        asteroid.initialize();
        return asteroid;
    }

    function createLargeAsteroid(x, y) {
        let asteroid = objects.Asteroid({
            imageSrc: 'assets/asteroid.png',
            size: { width: 100, height: 100 },       // Size in pixels
            center: { x: x, y: y },
            rotation: Math.random() * 2 * Math.PI,
            moveRate: 50 / 1000,         // Pixels per second
            rotateRate: (Math.PI / 8) / 1000    // Radians per second
        });
        asteroid.initialize();
        return asteroid;
    }

    function createUFO1(x, y) {
        let ufo = objects.UFO({
            imageSrc: 'assets/ufo1.png',
            size: { width: 80, height: 80 },       // Size in pixels
            center: { x: x, y: y },
            rotation: Math.random() * 2 * Math.PI,
            moveRate: 90 / 1000,         // Pixels per second
            rotateRate: 0 // (Math.PI / 8) / 1000    // Radians per second
        });
        ufo.initialize();
        return ufo;
    }

    function createUFO2(x, y) {
        let ufo = objects.UFO({
            imageSrc: 'assets/ufo2.png',
            size: { width: 60, height: 60 },       // Size in pixels
            center: { x: x, y: y },
            rotation: Math.random() * 2 * Math.PI,
            moveRate: 120 / 1000,         // Pixels per second
            rotateRate: 0 // (Math.PI / 8) / 1000    // Radians per second
        });
        ufo.initialize();
        return ufo;
    }

    function hyperspace() {
        if (hyperspaceTime > 5000) {
            let badSpot = false;
            do {
                x = generateRandom();
                y = generateRandom();

                for (let i = 0; i < asteroids.length; i++) {
                    badSpot = false;
                    if (Math.sqrt((asteroids[i].center.x - x) * (asteroids[i].center.x - x) + 
                    (asteroids[i].center.y - y) * (asteroids[i].center.y - y)) < (asteroids[i].size.width / 2) + 300) {
                        badSpot = true;
                    }
                }
            }while(badSpot)

            spaceship.center.x = x;
            spaceship.center.y = y;
            hyperspaceTime = 0;
        }
    }

    function checkCollision() {
        for (let i = 0; i < asteroids.length; i++) {
            if (Math.sqrt((asteroids[i].center.x - spaceship.center.x) * (asteroids[i].center.x - spaceship.center.x) + 
            (asteroids[i].center.y - spaceship.center.y) * (asteroids[i].center.y - spaceship.center.y)) < (asteroids[i].size.width / 2) + 10) {
                explosion(spaceship.center.x, spaceship.center.y);
                cancelNextRequest = true;
                sleep(1000);
                lives--;
                asteroids = [];
                if (lives > -1) {
                    initialize();
                }
                else { 
                    insertScore();
                    cancelNextRequest = true;
                }
            }
        }

        if (ufo1 !== null) {
            if (Math.sqrt((ufo1.center.x - spaceship.center.x) * (ufo1.center.x - spaceship.center.x) + 
            (ufo1.center.y - spaceship.center.y) * (ufo1.center.y - spaceship.center.y)) < (ufo1.size.width / 2) + 10) {
                explosion(spaceship.center.x, spaceship.center.y);
                cancelNextRequest = true;
                sleep(1000);
                lives--;
                asteroids = [];
                if (lives > -1) {
                    initialize();
                }
                else { 
                    insertScore();
                    cancelNextRequest = true;
                }
            }
        }

        if (ufo2 !== null) {
            if (Math.sqrt((ufo2.center.x - spaceship.center.x) * (ufo2.center.x - spaceship.center.x) + 
            (ufo2.center.y - spaceship.center.y) * (ufo2.center.y - spaceship.center.y)) < (ufo2.size.width / 2) + 10) {
                explosion(spaceship.center.x, spaceship.center.y);
                cancelNextRequest = true;
                sleep(1000);
                lives--;
                asteroids = [];
                if (lives > -1) {
                    initialize();
                }
                else { 
                    insertScore();
                    cancelNextRequest = true;
                }
            }
        }

    }

    function checkBulletAsteroid() {
        for (let i = 0; i < asteroids.length; i++) {
            for (let j = 0; j < bullets.length; j++) {
                if (Math.sqrt((asteroids[i].center.x - bullets[j].center.x) * (asteroids[i].center.x - bullets[j].center.x) + 
                (asteroids[i].center.y - bullets[j].center.y) * (asteroids[i].center.y - bullets[j].center.y)) < (asteroids[i].size.width / 2) + 5) {
                    explosion(bullets[j].center.x, bullets[j].center.y);
                    let tmp = asteroids[i].size.width;
                    asteroids.splice(i,1);
                    if (tmp === 100){
                        for (let k = 0; k < 3; k++){
                            asteroids.push(createMediumAsteroid(bullets[j].center.x, bullets[j].center.y))
                        }
                        points += 100;
                    }
                    else if (tmp === 75){
                        for (let k = 0; k < 4; k++){
                            asteroids.push(createSmallAsteroid(bullets[j].center.x, bullets[j].center.y))
                        }
                        points += 200;
                    }
                    else { points += 300; }

                    bullets.splice(j,1);
                    break;
                }
            }
            
        }
    }

    function checkBulletUFO1() {
        if (ufo1 !== null) {
            for (let j = 0; j < bullets.length; j++) {
                if (Math.sqrt((ufo1.center.x - bullets[j].center.x) * (ufo1.center.x - bullets[j].center.x) + 
                (ufo1.center.y - bullets[j].center.y) * (ufo1.center.y - bullets[j].center.y)) < (ufo1.size.width / 2) + 5) {
                    explosion(bullets[j].center.x, bullets[j].center.y);
                
                    points += 500;
                    ufo1 = null;
                    bullets.splice(j,1);
                    break;
                }
            }
        }
    }

    function checkBulletUFO2() {
        if (ufo2 !== null) {
            for (let j = 0; j < bullets.length; j++) {
                if (Math.sqrt((ufo2.center.x - bullets[j].center.x) * (ufo2.center.x - bullets[j].center.x) + 
                (ufo2.center.y - bullets[j].center.y) * (ufo2.center.y - bullets[j].center.y)) < (ufo2.size.width / 2) + 5) {
                    explosion(bullets[j].center.x, bullets[j].center.y);
                
                    points += 1000;
                    ufo2 = null;
                    bullets.splice(j,1);
                    break;
                }
            }
        }
    }

    function checkShipUFOBullet() {
        for (let j = 0; j < ufoBullets.length; j++) {
            if (Math.sqrt((spaceship.center.x - ufoBullets[j].center.x) * (spaceship.center.x - ufoBullets[j].center.x) + 
            (spaceship.center.y - ufoBullets[j].center.y) * (spaceship.center.y - ufoBullets[j].center.y)) < (spaceship.size.width / 4) + 7) {
                explosion(ufoBullets[j].center.x, ufoBullets[j].center.y);
                
                ufoBullets.splice(j,1);
                cancelNextRequest = true;
                sleep(1000);
                lives--;
                asteroids = [];
                if (lives > -1) {
                    initialize();
                }
                else { 
                    insertScore();
                    cancelNextRequest = true;
                }
                break;
            }
        }

    }

    function checkAsteroidCount() {
        if (asteroids.length === 0) {
            console.log("asteroids.length: " + asteroids.length);
            let count = Math.floor(Math.random() * 3 + level);
            level++;
            for (let i = 0; i < count; i++){
                asteroids.push(createLargeAsteroid(generateAsteroidX(), generateAsteroidY()));
            }
            if (level % 2 === 0) {
                ufo1 = createUFO1(generateAsteroidX(), generateAsteroidY());
            }
            if (level % 3 === 0) {
                ufo2 = createUFO2(generateAsteroidX(), generateAsteroidY());
            }
        }
    }

    function generateAsteroidX() {
        return (spaceship.center.x + Math.floor(Math.random() * 500)) % 700;
    }

    function generateAsteroidY() {
        return (spaceship.center.y + Math.floor(Math.random() * 500)) % 700;
    }

    function generateRandom() {
        return Math.floor(Math.random() * 700);
    }

    function sleep(miliseconds) {
        var currentTime = new Date().getTime();
        while (currentTime + miliseconds >= new Date().getTime()) {
        }
     }

    function explosion(x, y) {

    }

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
        myMouse.update(elapsedTime);
    }

    function update(elapsedTime) {
        livesText.setText('lives: ' + lives);
        pointsText.setText(points);
        levelText.setText('level: ' + level);
        spaceship.updateLocation(elapsedTime);
        if (ufo1 !== null) {
            ufo1.updateLocation(elapsedTime);
            if (ufo1Time > 2500) {
                spray();
                ufo1.setRotation(Math.random() * 2 * Math.PI);
                ufo1Time = 0;
            }
        }

        if (ufo2 !== null) {
            ufo2.updateLocation(elapsedTime);
            if (ufo2Time > 3500) {
                ufo2.setRotation(Math.random() * 2 * Math.PI);
                ufo2Time = 0;
            }
            if (ufo2ShootTime > 500) {
                ufo2ShootTime = 0;
                ufo2Shoot();
            }
        }

        shootTime += elapsedTime;
        hyperspaceTime += elapsedTime;
        ufo1Time += elapsedTime;
        ufo2Time += elapsedTime;
        ufo2ShootTime += elapsedTime;
        
        for (let i = 0; i < asteroids.length; i++) {
            asteroids[i].updateLocation(elapsedTime);
        }
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i].center.x < 0 || bullets[i].center.y < 0 ||
                bullets[i].center.x > 700 || bullets[i].center.y > 700) {
                    bullets.splice(i,1);
                }
        }
        for (let i = 0; i < bullets.length; i++) {
            bullets[i].updateLocation(elapsedTime);
        }

        for (let i = 0; i < ufoBullets.length; i++) {
            if (ufoBullets[i].center.x < 0 || ufoBullets[i].center.y < 0 ||
                ufoBullets[i].center.x > 700 || ufoBullets[i].center.y > 700) {
                    ufoBullets.splice(i,1);
                }
        }
        for (let i = 0; i < ufoBullets.length; i++) {
            ufoBullets[i].updateLocation(elapsedTime);
        }

        checkCollision();
        checkBulletAsteroid();
        checkBulletUFO1();
        checkBulletUFO2();
        checkShipUFOBullet();
        checkAsteroidCount();
    }

    function render() {
        graphics.clear();
        
        for (let i = 0; i < asteroids.length; i++) {
            renderer.Asteroid.render(asteroids[i]);
        }
        for (let i = 0; i < bullets.length; i++) {
            renderer.Bullet.render(bullets[i]);
        }
        for (let i = 0; i < ufoBullets.length; i++) {
            renderer.Bullet.render(ufoBullets[i]);
        }
        if (cancelNextRequest){
            renderer.Text.render(gameOverText);
            sleep(2000);
            resetGame();
            game.showScreen('main-menu'); 
        }
        if (hyperspaceTime > 5000) {
            renderer.Text.render(hyperspaceText);   
        }
        if (ufo1 !== null) {
            renderer.UFO.render(ufo1);
        }
        if (ufo2 !== null) {
            renderer.UFO.render(ufo2);
        }
        renderer.Ship.render(spaceship);
        renderer.Text.render(livesText);
        renderer.Text.render(pointsText);
        renderer.Text.render(levelText);
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function resetGame() {
        lives = 3;
        level = 1;
        ufo1 = null;
        ufo2 = null;
        points = 0;
        initialize();
    }

    function initialize() {
        myKeyboard.register('ArrowUp', spaceship.moveForward);
        myKeyboard.register('ArrowLeft', spaceship.rotateLeft);
        myKeyboard.register('ArrowRight', spaceship.rotateRight);
        myKeyboard.register('z', hyperspace);
        myKeyboard.register(' ', fire);
        myKeyboard.register('Escape', function() {
            cancelNextRequest = true;
            game.showScreen('main-menu');
        });

        asteroids = [];
        bullets = [];
        
        asteroids.push(createLargeAsteroid(generateAsteroidX(), generateAsteroidY()));
        asteroids.push(createLargeAsteroid(generateAsteroidX(), generateAsteroidY()));
        // ufo1 = createUFO1(generateAsteroidX(), generateAsteroidY());
        // ufo2 = createUFO2(generateAsteroidX(), generateAsteroidY());

        ufo1 = null;
        ufo2 = null;
        let canvas = document.getElementById('id-canvas');
        
        cancelNextRequest = false;
        spaceship.center.x = canvas.width / 2;
        spaceship.center.y = canvas.height / 2;
        spaceship.reset();

        hyperspaceTime = 0;

        // if (previousScores !== null) {
        //     highScores = JSON.parse(previousScores);
        //     // scores = previousScores;
        // }
        
        displayHighScores();
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.objects, MyGame.render, MyGame.graphics, MyGame.input));
