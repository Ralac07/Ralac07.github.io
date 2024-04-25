




// https://stackoverflow.com/a/43642346
// x = radius * Math.cos(Math.PI * 2 * angle / 360);

// y = radius * Math.sin(Math.PI * 2 * angle / 360);
function getPos(angle, center, radius) {
    // Define center and radius
    // const centerX = 100;
    // const centerY = 100;
    let centerX,centerY;
    [centerX,centerY] = center;
    // const radius = 100;
  
    // Convert angle to radians (JavaScript Math functions use radians)
    const radians = angle * Math.PI / 180;
  
    // Calculate x and y using cosine and sine
    const x = centerX + radius * Math.cos(radians);
    const y = centerY + radius * Math.sin(radians);
  
    // Return x and y as an object
    return [ x, y ];
}


const size = 1000;

let a = (Math.random() * 360)%360;
let b = (Math.random() * 360)%360;
let e = (Math.random() * 360)%360;
let d = (Math.random() * 360)%360;
let n = 100;
// let canvas = document.createElement("canvas");
// canvas.setAttribute("id","myCanvas");
// canvas.setAttribute("width",size);
// canvas.setAttribute("height",size);
// document.querySelector("body").append(canvas);
let hour = 0;
let minute = 0
let second = 0;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
setInterval(function(){
	second = new Date().getSeconds() + new Date().getMilliseconds() / 1000
	minute = new Date().getMinutes() + second/60;
    hour = new Date().getHours() / 2 + minute/60;
	
    ctx.clearRect(0, 0, c.width, c.height);
	// ctx.strokeStyle = "black";
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    // ctx.beginPath();
	// ctx.strokeStyle = "black";
	// ctx.lineWidth = 4;
    ctx.beginPath();
    // ctx.arc(size/2,size/2, size/2, 0, 2 * Math.PI);
    // ctx.lineWidth = 4;
	// ctx.beginPath();
    // ctx.strokeStyle = "black";
	
    ctx.moveTo(size/2, size/2);
    ctx.lineTo(...getPos((((hour%12) * (360/12)) + 90), [size/2,size/2], (50/200)*size));
    ctx.moveTo(size/2, size/2);
	
	// ctx.beginPath();
	// ctx.strokeStyle = "black";
    ctx.lineTo(...getPos((((minute%60) * (360/60)) - 90), [size/2,size/2], (80/200)*size));
    ctx.moveTo(size/2, size/2);
	// ctx.closePath();
	ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
	ctx.stroke();


	ctx.beginPath();
	ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
	ctx.moveTo(size/2, size/2);
	ctx.lineTo(...getPos((((second%60) * (360/60)) - 90), [size/2,size/2], (80/200)*size));
    ctx.lineWidth = 6;
	// ctx.strokeStyle = "red";
    ctx.stroke();


    document.documentElement.style.setProperty("--a",a);
    document.documentElement.style.setProperty("--b",b);
    document.documentElement.style.setProperty("--c",d);
    document.documentElement.style.setProperty("--d",e);
    a = (a + Math.random() * (n * 0.01528981518)) % 360;
    b = (b + Math.random() * (n * 0.03229182657)) % 360;
    d = (d + Math.random() * (n * 0.02536197933)) % 360;
    e = (e + Math.random() * (n * 0.04069221192)) % 360;
},(n))
