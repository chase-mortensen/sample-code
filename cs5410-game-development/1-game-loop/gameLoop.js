//let previous = performance.now();
let previous;
let eventArray = [];
let renderArray = [];

function test() {
    //console.log("Test Function");
    let out = document.getElementById("add");
    out.innerHTML += "Paragraph changed.<br>";
    scrollDown();
}

function getValues() { // https://www.w3schools.com/js/tryit.asp?filename=tryjs_form_elements
    console.log("Get Values Function");
    previous = performance.now();
    let x = document.getElementById("form");
    let out = document.getElementById("add");
    let text = "";
    //let i;
    let tmp = [];
    for (let i = 0; i < x.length; i++) {
        tmp.push(x.elements[i].value);
        //eventArray += x.elements[i].value;
    }
    tmp.push(0);
    console.log("tmp: " + tmp);
    eventArray.push(tmp);
    requestAnimationFrame(gameLoop)
}

function scrollDown() {
    //console.log("Scroll Down Function");
    let last = document.getElementById("last");
    last.scrollIntoView();
}

function render() {
    // any events that need reporting are displayed.
    console.log("Render Function");
    let out = document.getElementById("add");
    let name = "";
    let remaining = 0;
    for (let i = 0; i < renderArray.length; i++) {
        name = eventArray[renderArray[i]][0];
        remaining = eventArray[renderArray[i]][2];
        out.innerHTML += "Event: " + name + " (" + remaining + " remaining)<br/>";
    }
    scrollDown();
    //requestAnimationFrame(gameLoop);
}

function update(elapsedTime) {
    // any active events are updated.
    console.log("Update Function");
    renderArray = [];

    // Check this function... use while loop?
    let length = eventArray.length;
    let i = 0;
    while (i < length) {
        if (eventArray[i][2] <= 0) {
            eventArray.splice(i,1);
            console.log("Removing index: " + i);
            length--;
        }
        else {
            i++;
        }
    }

    
    for (let j = 0; j < eventArray.length; j++) {
        //WRONG -> subtract interval time from running time total
        eventArray[j][4] += elapsedTime;
        console.log("eventArray[j][4] (eventTime): " + eventArray[j][4]);
        if (eventArray[j][4] >= eventArray[j][1]) { 
            renderArray.push(j);
            eventArray[j][2]--;
            eventArray[j][4] -= eventArray[j][1];
            console.log("Will render index: " + j);
        }
    }
}

function processInput() {
    //console.log("Process Input Function (no actions)");
    //getValues();
}

function gameLoop() {
    // update the elapsed time since the last time the function was called.
    console.log("Game Loop");
    let current = performance.now();
    let elapsedTime = current - previous;
    console.log("Elapsed time: " + elapsedTime);
    
    processInput();
    update(elapsedTime);
    render();
    
    previous = current;
    

    if (eventArray.length > 0)
        requestAnimationFrame(gameLoop);    
}

//requestAnimationFrame(gameLoop);

