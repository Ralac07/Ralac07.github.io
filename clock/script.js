




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
let x = 0;
let y = 0;
let fontSize = 85;
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

    for (let index = 1; index <= 12; index++) {
        // ctx.moveTo();
        
        // ctx.moveTo(size/2, size/2);
        ctx.font = `${fontSize}px firacode`;
        [x,y] = getPos((((index%12) * (360/12)) - 90), [size/2,size/2], (80/200)*size);
        y *= 0.975;
        if (![10,11,12].includes(index)) {
            ctx.fillText(index,(x * 1.03)-(fontSize/2),y+(fontSize/2));
        } else {
            ctx.fillText(index,(x * 0.985)-(fontSize/2),y+(fontSize/2));
        }
        ctx.beginPath();
        ctx.moveTo(...getPos((((index%12) * (360/12)) - 90), [size/2,size/2], (90/200)*size));
        ctx.lineTo(...getPos((((index%12) * (360/12)) - 90), [size/2,size/2], (95/200)*size));
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.strokeStyle = "red";
    }
        
	second = new Date().getSeconds() + new Date().getMilliseconds() / 1000
	minute = new Date().getMinutes() + second/60;
    hour = (new Date().getHours()%12) + minute/60;
	
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
    ctx.lineTo(...getPos((((hour%12) * (360/12)) - 90), [size/2,size/2], (50/200)*size));
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
	ctx.strokeStyle = "red";
    ctx.stroke();







    ctx.beginPath() 
    ctx.fillStyle = "black"; 
    ctx.beginPath(); 
    ctx.arc(size/2,size/2, 15, 0, 2 * Math.PI); 
    ctx.fill()

    // for (let index = 0; index < array.length; index++) {
    //     ctx.moveTo(...getPos((((hour%12) * (360/12)) - 90), [size/2,size/2], (80/200)*size));
    //     ctx.lineTo(...getPos((((hour%12) * (360/12)) - 90), [size/2,size/2], (90/200)*size));
    // }

    document.documentElement.style.setProperty("--a",a);
    document.documentElement.style.setProperty("--b",b);
    document.documentElement.style.setProperty("--c",d);
    document.documentElement.style.setProperty("--d",e);
    document.querySelector("#myCanvas").style.setProperty("opacity","1");
    a = (a + Math.random() * (n * 0.01528981518)) % 360;
    b = (b + Math.random() * (n * 0.03229182657)) % 360;
    d = (d + Math.random() * (n * 0.02536197933)) % 360;
    e = (e + Math.random() * (n * 0.04069221192)) % 360;
},(n))
