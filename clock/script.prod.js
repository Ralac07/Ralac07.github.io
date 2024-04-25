"use strict";function _toConsumableArray(t){return _arrayWithoutHoles(t)||_iterableToArray(t)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function _arrayWithoutHoles(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}function _slicedToArray(t,e){return _arrayWithHoles(t)||_iterableToArrayLimit(t,e)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArrayLimit(t,e){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)){var r=[],o=!0,n=!1,a=void 0;try{for(var i,c=t[Symbol.iterator]();!(o=(i=c.next()).done)&&(r.push(i.value),!e||r.length!==e);o=!0);}catch(t){n=!0,a=t}finally{try{o||null==c.return||c.return()}finally{if(n)throw a}}return r}}function _arrayWithHoles(t){if(Array.isArray(t))return t}function getPos(t,e,r){var o=_slicedToArray(e,2),n=o[0],a=o[1],i=t*Math.PI/180;return[n+r*Math.cos(i),a+r*Math.sin(i)]}var size=1e3,a=360*Math.random()%360,b=360*Math.random()%360,e=360*Math.random()%360,d=360*Math.random()%360,n=100,x=0,y=0,fontSize=85,hour=0,minute=0,second=0,c=document.getElementById("myCanvas"),ctx=c.getContext("2d");setInterval(function(){second=(new Date).getSeconds()+(new Date).getMilliseconds()/1e3,minute=(new Date).getMinutes()+second/60,hour=(new Date).getHours()%12+minute/60,ctx.clearRect(0,0,c.width,c.height);for(var t=1;t<=12;t++){ctx.font="".concat(fontSize,"px firacode");var r=_slicedToArray(getPos(t%12*30-90,[size/2,size/2],.4*size),2);x=r[0],y=r[1],y*=.975,[10,11,12].includes(t)?ctx.fillText(t,.985*x-fontSize/2,y+fontSize/2):ctx.fillText(t,1.03*x-fontSize/2,y+fontSize/2),ctx.beginPath(),ctx.moveTo.apply(ctx,_toConsumableArray(getPos(t%12*30-90,[size/2,size/2],.45*size))),ctx.lineTo.apply(ctx,_toConsumableArray(getPos(t%12*30-90,[size/2,size/2],.475*size))),ctx.strokeStyle="black",ctx.stroke(),ctx.strokeStyle="red"}c=document.getElementById("myCanvas"),(ctx=c.getContext("2d")).beginPath(),ctx.moveTo(size/2,size/2),ctx.lineTo.apply(ctx,_toConsumableArray(getPos(hour%12*30-90,[size/2,size/2],.25*size))),ctx.moveTo(size/2,size/2),ctx.lineTo.apply(ctx,_toConsumableArray(getPos(minute%60*6-90,[size/2,size/2],.4*size))),ctx.moveTo(size/2,size/2),ctx.strokeStyle="black",ctx.lineWidth=10,ctx.stroke(),ctx.beginPath(),ctx.strokeStyle="red",ctx.lineWidth=2,ctx.moveTo(size/2,size/2),ctx.lineTo.apply(ctx,_toConsumableArray(getPos(second%60*6-90,[size/2,size/2],.4*size))),ctx.lineWidth=6,ctx.strokeStyle="red",ctx.stroke(),ctx.beginPath(),ctx.fillStyle="black",ctx.beginPath(),ctx.arc(size/2,size/2,15,0,2*Math.PI),ctx.fill(),document.documentElement.style.setProperty("--a",a),document.documentElement.style.setProperty("--b",b),document.documentElement.style.setProperty("--c",d),document.documentElement.style.setProperty("--d",e),document.querySelector("#myCanvas").style.setProperty("opacity","1"),a=(a+Math.random()*(.01528981518*n))%360,b=(b+Math.random()*(.03229182657*n))%360,d=(d+Math.random()*(.02536197933*n))%360,e=(e+Math.random()*(.04069221192*n))%360},n);