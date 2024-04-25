"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// https://stackoverflow.com/a/43642346
// x = radius * Math.cos(Math.PI * 2 * angle / 360);
// y = radius * Math.sin(Math.PI * 2 * angle / 360);
function getPos(angle, center, radius) {
  // Define center and radius
  // const centerX = 100;
  // const centerY = 100;
  var centerX, centerY;

  var _center = _slicedToArray(center, 2);

  centerX = _center[0];
  centerY = _center[1];
  // const radius = 100;
  // Convert angle to radians (JavaScript Math functions use radians)
  var radians = angle * Math.PI / 180; // Calculate x and y using cosine and sine

  var x = centerX + radius * Math.cos(radians);
  var y = centerY + radius * Math.sin(radians); // Return x and y as an object

  return [x, y];
}

var size = 1000;
var a = Math.random() * 360 % 360;
var b = Math.random() * 360 % 360;
var e = Math.random() * 360 % 360;
var d = Math.random() * 360 % 360;
var n = 100; // let canvas = document.createElement("canvas");
// canvas.setAttribute("id","myCanvas");
// canvas.setAttribute("width",size);
// canvas.setAttribute("height",size);
// document.querySelector("body").append(canvas);

var hour = 0;
var minute = 0;
var second = 0;
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
setInterval(function () {
  var _ctx, _ctx2, _ctx3;

  second = new Date().getSeconds() + new Date().getMilliseconds() / 1000;
  minute = new Date().getMinutes() + second / 60;
  hour = new Date().getHours() / 2 + minute / 60;
  ctx.clearRect(0, 0, c.width, c.height); // ctx.strokeStyle = "black";

  c = document.getElementById("myCanvas");
  ctx = c.getContext("2d"); // ctx.beginPath();
  // ctx.strokeStyle = "black";
  // ctx.lineWidth = 4;

  ctx.beginPath(); // ctx.arc(size/2,size/2, size/2, 0, 2 * Math.PI);
  // ctx.lineWidth = 4;
  // ctx.beginPath();
  // ctx.strokeStyle = "black";

  ctx.moveTo(size / 2, size / 2);

  (_ctx = ctx).lineTo.apply(_ctx, _toConsumableArray(getPos(hour % 12 * (360 / 24) - 90, [size / 2, size / 2], 50 / 200 * size)));

  ctx.moveTo(size / 2, size / 2); // ctx.beginPath();
  // ctx.strokeStyle = "black";

  (_ctx2 = ctx).lineTo.apply(_ctx2, _toConsumableArray(getPos(minute % 60 * (360 / 60) - 90, [size / 2, size / 2], 80 / 200 * size)));

  ctx.moveTo(size / 2, size / 2); // ctx.closePath();

  ctx.strokeStyle = "black";
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.moveTo(size / 2, size / 2);

  (_ctx3 = ctx).lineTo.apply(_ctx3, _toConsumableArray(getPos(second % 60 * (360 / 60) - 90, [size / 2, size / 2], 80 / 200 * size)));

  ctx.lineWidth = 6; // ctx.strokeStyle = "red";

  ctx.stroke();
  document.documentElement.style.setProperty("--a", a);
  document.documentElement.style.setProperty("--b", b);
  document.documentElement.style.setProperty("--c", d);
  document.documentElement.style.setProperty("--d", e);
  a = (a + Math.random() * (n * 0.01528981518)) % 360;
  b = (b + Math.random() * (n * 0.03229182657)) % 360;
  d = (d + Math.random() * (n * 0.02536197933)) % 360;
  e = (e + Math.random() * (n * 0.04069221192)) % 360;
}, n);