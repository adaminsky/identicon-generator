
// I was just playing around with drawing with javascript.
function triangle(first, second, third) {
    ctx.beginPath();
    ctx.moveTo(200, 25);
    ctx.lineTo(first, second);
    ctx.lineTo(third, first);
    ctx.closePath();

    // Filling the triangle
    ctx.fillStyle = "#FFCC00";
    ctx.fill();
}

// Take these numbers and add or subtract random numbers around ten.
// triangle(97, 175, 399);

// First must be greater than 250
function hexagon(first, second, third, operation) {
    ctx.beginPath();
    ctx.moveTo(50, third);
    ctx.lineTo(first, third);
    ctx.lineTo(first + second, third + second);
    ctx.lineTo(first, third + (second * 2));
    ctx.lineTo(50, third + (second * 2));
    ctx.lineTo(50 - third, third + second);
    ctx.closePath();

    ctx.globalCompositeOperation = operation;
    ctx.fillStyle = "FFCC00";
    ctx.fill();
}

function circle(radius, operation) {
    ctx.beginPath();
    ctx.arc(150, 150, radius, 0, 2 * Math.PI);
    ctx.globalCompositeOperation = operation;
    ctx.fillStyle = "FFCC00";
    ctx.fill();
}

function square(x, y, color, operation) {
    ctx.beginPath();
    ctx.rect(x, y, 25, 25);
    ctx.globalCompositeOperation = operation
    ctx.fillStyle = color;
    ctx.fill();
}

// This is the start of the actual function.

function identicon(string, operation, bool) {

    var hashstr = md5(string);
    var color1 = hashstr.substr(0, 6);
    var color2 = hashstr.substr(6, 6);
    var color3 = hashstr.substr(12, 6);
    var color4 = hashstr.substr(18, 6);

    for (var i = 0; i < 3; i++) {
        for(var j = 0; j < 5; j++) {
            var num = parseInt(hashstr.substr((5*i) + j, 2), 16);
            if ((num % 2) == 1) {
                square(25 * i, 25 * j, color1, operation);
            } else {
                if (bool) {
                    square(25 * i, 25 * j, color4, operation);
                }
            }
        }
    }

    for (var k = 2; k > 0; k--) {
        for (var h = 5; h > 0; h--) {
            var num =  parseInt(hashstr.substr((5*(k-1)) + (5-h), 2), 16);
            if ((num % 2 == 1)) {
                square(25 * (5 - k), 25 * (5 - h), color1, operation);
            } else {
                if (bool) {
                    square(25 * (5 - k), 25 * (5 - h), color4, operation);
                }
            }
        }
    }
}

function toImage() {
    var image = new Image();
    image = canvas.toDataURL("image/png");
    return image;
}

function lines(hash) {
    ctx.beginPath();
    for (var i = 0; i < 5; i++) {
        var x = parseInt(hash.substr(i*2, 2), 16);
        var y = parseInt(hash.substr(i*3, 3), 16);
        if (i == 0) {
            ctx.moveTo(25 * (x % 3) + 12.5, 25 * (y % 5));
        } else {
            ctx.lineTo(25 * (x % 3) + 12.5, 25 * (y % 5));
        }
    }
    ctx.lineTo(25 * (4 - (x % 3)) + 12.5, 25 * (y % 5));
    for (var j = 4; j >= 0; j--) {
        x = parseInt(hash.substr(j*2, 2), 16);
        y = parseInt(hash.substr(j*3, 3), 16);
        ctx.lineTo(25 * (4 - (x % 3)) + 12.5, 25 * (y % 5));
    }
    ctx.fillStyle = hash.substr(12, 6);
    ctx.fill();
}

// Some example implementations of this code.

// This takes the regular identicon and subtracts an identicon and shape created
// from the current time.
function xoricon(string) {
    // Getting the current time and the seconds.
    var time = Date();
    var seconds = new Date();

    var canvas = document.getElementById("0");
    var ctx = cavas.getContext('2d');
    ctx.globalCompositeOperation = "xor";
    lines(md5(time + string));
    identicon(seconds.getTime(), "xor", false);
    identicon(string, "xor", true);

    // Creating the off-white background.
    ctx.fillStyle = "#FDF6EE";
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillRect(0, 0, 125, 125);
}

// This takes the id of the canvas element and the string to create the
// identicon from and it creates a simple identifying shape with two colors.
function simpleIcon(id, string) {

    // Gets the canvas from the id provided by the user.
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');

    // Draws the lines from the given string and then fills the shape with a
    // background.
    lines(md5(string));
    ctx.fillStyle = md5(now).substr(18, 6);
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillRect(0, 0, 125, 125);
}

// Creates 20 identicons of the xor style.
function arrayOfXoricon() {
    for (var i = 0; i < 20; i++) {
        var canvas = document.getElementById(i.toString());
        var ctx = canvas.getContext('2d');
        var now = new Date().getTime() * Math.random();
        xoricon(now);
    }
}

// Creates 20 simple shape identicons.
function simpleIconArray() {
    for (var j = 0; j < 20; j++) {
        var canvas = document.getElementById(j.toString());
        var ctx = canvas.getContext('2d');
        var now = new Date().getTime() * Math.random();
        lines(md5(now));
        ctx.fillStyle = md5(now).substr(18, 6);
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillRect(0, 0, 125, 125);
    }
}
