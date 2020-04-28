// Set the document title
/*
var document;
document.title = 'How much are you worth?';

var today = new Date();
var apiKey = 'KNuYtBsrzdp96yMKL8xA';
var start = today.setDate(today.getDate() - 5);
var end = today;

var url = "https://www.quandl.com/api/v3/datasets/LBMA/GOLD.json?api_key=" + apiKey + "&column_index=2&start_date=" + start + "&end_date=" + end;

var div = document.createElement('div');
var para = document.createElement('p');
para.textContent = "NA";
div.appendChild(para);

var theData;
    var convert = function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onload = function() {
            theData = xhr.response;
            console.log(theData);
            document.querySelector('#quandl').textContent = "Some data was fetched into 'theData'";
            document.title = theData.dataset.name + " from Quandl's API"
        }
        xhr.send();
    }
*/
/*
// Create a red div in the body
var div = document.createElement('div');
div.setAttribute('class', 'red shadowed stuff-box');
document.querySelector('body').appendChild(div);

var form = document.createElement('form');
div.appendChild(form);
var slider = document.createElement('input');
var output = document.createElement('p');
output.innerHTML = "Fib(0)";
div.appendChild(output);
slider.type = 'range';
div.appendChild(slider);
slider.min = '0';
slider.max = '50';

// Adding 1st div
var para = document.createElement('p');
para.textContent = "NA";
div.appendChild(para);

var x = 10;


function fib(num) {
    "use strict";
    if (num === 0) {
        para.textContent = "0 ";
        div.appendChild(para);
        return 0;
    } else if (num === 1) {
        para.textContent = "1 ";
        div.appendChild(para);
        return 1;
    } else {
        x = fib(num - 1) + fib(num - 2);
        para.textContent = x;
        div.appendChild(para);
        return x;
    }
}


var text = "Fib:";
function newFib(num) {
    'use strict';
    var oneBack = 1, twoBack = 0, tmp = 0;
    
    while (num >= 0) {
        tmp = oneBack;
        oneBack = oneBack + twoBack;
        twoBack = tmp;
        num = num - 1;
    }
    
    //para.textContent = twoBack;
    //div.appendChild(para);
    var str = twoBack.toString() + " ";
    text = text.concat(str);
    return twoBack;
}

//text.concat(num + " ");
// Get value from slider
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    'use strict';
    output.innerHTML = "Fib(" + this.value + ")";
    //delete para;
    para.innerHTML = "Clear";
    
    x = Number(this.value);
    //newFib(x);
    
    text = "";
    var i = 0;
    while (i <= x) {
        newFib(i);
        i = i + 1;
    }
    
    //var para = document.createElement('p');
    para.innerHTML = text;
    div.appendChild(para);
};
*/