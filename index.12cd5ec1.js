function t(t,e,n,i){Object.defineProperty(t,e,{get:n,set:i,enumerable:!0,configurable:!0})}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},o=e.parcelRequired1f1;null==o&&((o=function(t){if(t in n)return n[t].exports;if(t in i){var e=i[t];delete i[t];var o={id:t,exports:{}};return n[t]=o,e.call(o.exports,o,o.exports),o.exports}var s=new Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(t,e){i[t]=e},e.parcelRequired1f1=o),o.register("27Lyk",(function(e,n){var i,o;t(e.exports,"register",(()=>i),(t=>i=t)),t(e.exports,"resolve",(()=>o),(t=>o=t));var s={};i=function(t){for(var e=Object.keys(t),n=0;n<e.length;n++)s[e[n]]=t[e[n]]},o=function(t){var e=s[t];if(null==e)throw new Error("Could not resolve bundle with id "+t);return e}})),o("27Lyk").register(JSON.parse('{"aT88m":"index.12cd5ec1.js","NIq5X":"colonies.33cec3db.png"}'));var s;s=new URL(o("27Lyk").resolve("NIq5X"),import.meta.url).toString();const a=new URL(s);new class{constructor(){this.clicks=[],this.colonyCount=0,this.clearEventHandler=()=>{this.clearPoints()},this.pressEventHandler=t=>{const e=t.offsetX-this.pointCanvas.offsetLeft,n=t.offsetY-this.pointCanvas.offsetTop;this.addClick(e,n)},this.newImg=t=>{const e=new FileReader;e.addEventListener("load",(()=>{this.img.src=e.result}),!1),e.readAsDataURL(t.target.files[0])},this.imgCanvas=document.getElementById("imgCanvas"),this.pointCanvas=document.getElementById("pointCanvas"),this.imgContext=this.imgCanvas.getContext("2d"),this.pointContext=this.pointCanvas.getContext("2d"),this.pointContext.lineCap="round",this.pointContext.lineJoin="round",this.pointContext.fillStyle="rgba(255, 0, 0, 0.75)",this.pointContext.lineWidth=2,this.pointRadius=4,console.log("here? 1"),this.colonyCountDisplay=document.getElementById("colonyCounter"),this.img=new Image,this.img.onload=()=>{this.drawImageScaled()},this.img.src=a,this.drawImageScaled(),console.log("here?"),this.createUserEvents()}createUserEvents(){this.pointCanvas.addEventListener("mousedown",this.pressEventHandler),document.getElementById("clear").addEventListener("click",this.clearEventHandler);const t=document.getElementById("file-upload");document.getElementById("img-upload").addEventListener("click",(()=>{t.click()})),t.addEventListener("input",this.newImg),document.getElementById("img-save").addEventListener("click",(()=>{alert("not implemented yet sorry!")})),document.getElementById("csv-save").addEventListener("click",(()=>{const t=URL.createObjectURL(new Blob([(e=this.clicks,e.map((t=>t.map(String).map((t=>`"${t}"`)).join(","))).join("\n"))],{type:"text/csv;charset=utf-8;"}));var e;const n=document.createElement("a");n.href=t,n.setAttribute("download","points.csv"),n.click()})),document.getElementById("point-size-slider").addEventListener("input",(t=>{this.pointRadius=t.target.value,this.redrawPoints()})),document.getElementById("point-alpha-slider").addEventListener("input",(t=>{const e=t.target.value;this.pointContext.fillStyle=`rgba(255, 0, 0, ${e}`,this.redrawPoints()}))}drawImageScaled(){const t=this.imgCanvas;this.imgContext.clearRect(0,0,t.width,t.height);const e=this.img,n=t.width/e.width,i=t.height/e.height,o=Math.min(n,i),s=(t.width-e.width*o)/2,a=(t.height-e.height*o)/2;this.imgContext.drawImage(e,0,0,e.width,e.height,s,a,e.width*o,e.height*o)}redrawPoints(){this.pointContext.clearRect(0,0,this.pointCanvas.width,this.pointCanvas.height),this.clicks.map((t=>{this.drawPoint(t[0],t[1])}))}drawPoint(t,e){this.pointContext.beginPath(),this.pointContext.arc(t,e,this.pointRadius,0,2*Math.PI),this.pointContext.fill(),this.pointContext.closePath()}addClick(t,e){this.clicks.push([t,e]),this.colonyCount++,this.updateCounterDisplay(),this.drawPoint(t,e)}updateCounterDisplay(){this.colonyCountDisplay.innerHTML="Colony Count : "+this.colonyCount.toString()}clearPoints(){this.pointContext.clearRect(0,0,this.pointCanvas.width,this.pointCanvas.height),this.clicks=[]}};
//# sourceMappingURL=index.12cd5ec1.js.map
