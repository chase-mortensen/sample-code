//------------------------------------------------------------------
//
// Creates a ship model based upon the passed in specification.
//
//------------------------------------------------------------------
MyGame.objects.Ship = function(spec) {

    let imageReady = false;
    let image = new Image();

    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;
    let vectorX = 0;
    let vectorY = 0;

    function reset() {
        vectorX = 0;
        vectorY = 0;
    }

    //------------------------------------------------------------------
    //
    // Move in the direction of the rotation.
    //
    //------------------------------------------------------------------
    
    function moveForward(elapsedTime) {
        //
        // Create a normalized direction vector
        vectorX += Math.cos(spec.rotation);
        vectorY += Math.sin(spec.rotation);
        // verifyVectors();

        // console.log("vectorX: " + vectorX);
        // console.log("vectorY: " + vectorY);
    }

    function updateLocation(elapsedTime) {
        spec.center.x += (vectorX * spec.moveRate * elapsedTime);
        spec.center.y += (vectorY * spec.moveRate * elapsedTime);
        if (spec.center.x < 0) { spec.center.x += 700};
        if (spec.center.y < 0) { spec.center.y += 700};
        spec.center.x %= 700;
        spec.center.y %= 700;
    }

    function verifyVectors() { // this still needs some work
        if (Math.abs(vectorX) > Math.abs(Math.cos(spec.rotation) * 100)) {
            if (vectorX > 0) { vectorX = Math.abs(Math.cos(spec.rotation)) * 100; }
            else { vectorX = -Math.abs(Math.cos(spec.rotation)) * 100; }
        }
        if (Math.abs(vectorY) > Math.abs(Math.sin(spec.rotation) * 100)) {
            if (vectorY > 0) { vectorY = Math.abs(Math.sin(spec.rotation)) * 100; }
            else { vectorY = -Math.abs(Math.sin(spec.rotation)) * 100; }
        }
    }

    function rotateLeft(elapsedTime) {
        spec.rotation -= spec.rotateRate * (elapsedTime);
    }

    function rotateRight(elapsedTime) {
        spec.rotation += spec.rotateRate * (elapsedTime);
    }

    let api = {
        get imageReady() { return imageReady; },
        get rotation() { return spec.rotation; },
        get image() { return image; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        moveForward: moveForward,
        rotateLeft: rotateLeft,
        rotateRight: rotateRight,
        updateLocation: updateLocation,
        reset: reset,
    };

    return api;
};
