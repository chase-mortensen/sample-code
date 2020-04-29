//------------------------------------------------------------------
//
// Creates a ship model based upon the passed in specification.
//
//------------------------------------------------------------------
MyGame.objects.Asteroid = function(spec) {

    let imageReady = false;
    let image = new Image();

    image.onload = function() {
        imageReady = true;
    };
    image.src = spec.imageSrc;
    let vectorX = 0;
    let vectorY = 0;

    //------------------------------------------------------------------
    //
    // Move in the direction of the rotation.
    //
    //------------------------------------------------------------------
    function initialize(elapsedTime) {
            //
            // Create a normalized direction vector
            vectorX = Math.cos(spec.rotation);
            vectorY = Math.sin(spec.rotation);
            // console.log("rotation: " + spec.rotation);

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
        rotate(elapsedTime);
    }

    function rotate(elapsedTime) {
        if (vectorX > vectorY) {
            spec.rotation -= spec.rotateRate * (elapsedTime);
        }
        else {
            spec.rotation += spec.rotateRate * (elapsedTime);
        }
    }

    let api = {
        get imageReady() { return imageReady; },
        get rotation() { return spec.rotation; },
        get image() { return image; },
        get center() { return spec.center; },
        get size() { return spec.size; },
        initialize: initialize,
        rotate: rotate,
        updateLocation: updateLocation,
    };

    return api;
};
