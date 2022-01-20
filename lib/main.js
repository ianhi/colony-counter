"use strict";
class DrawingApp {
    constructor() {
        this.clickX = [];
        this.clickY = [];
        this.colonyCount = 0;
        this.clearEventHandler = () => {
            this.clearPoints();
        };
        this.pressEventHandler = (e) => {
            const mouseX = e.offsetX - this.pointCanvas.offsetLeft;
            const mouseY = e.offsetY - this.pointCanvas.offsetTop;
            this.addClick(mouseX, mouseY);
        };
        this.imgCanvas = document.getElementById('imgCanvas');
        this.pointCanvas = document.getElementById('pointCanvas');
        this.imgContext = this.imgCanvas.getContext('2d');
        this.pointContext = this.pointCanvas.getContext('2d');
        this.pointContext.lineCap = 'round';
        this.pointContext.lineJoin = 'round';
        this.pointContext.fillStyle = 'rgba(255, 0, 0, 0.5)';
        this.pointContext.lineWidth = 2;
        this.colonyCountDisplay = document.getElementById('colonyCounter');
        this.img = new Image();
        this.img.src = 'colonies.png';
        this.img.onload = () => {
            this.drawImageScaled();
        };
        this.createUserEvents();
    }
    createUserEvents() {
        const canvas = this.pointCanvas;
        canvas.addEventListener('mousedown', this.pressEventHandler);
        // canvas.addEventListener('touchstart', this.pressEventHandler);
        document
            .getElementById('clear')
            .addEventListener('click', this.clearEventHandler);
    }
    drawImageScaled() {
        const canvas = this.imgCanvas;
        const img = this.img;
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        const shiftX = (canvas.width - img.width * ratio) / 2;
        const shiftY = (canvas.height - img.height * ratio) / 2;
        this.imgContext.drawImage(img, 0, 0, img.width, img.height, shiftX, shiftY, img.width * ratio, img.height * ratio);
    }
    // private redrawPoints(): void {
    //   this.clearPoints();
    //   const clickX = this.clickX;
    //   const clickY = this.clickY;
    //   const context = this.pointContext;
    //   for (let i = 0; i < clickX.length; ++i) {
    //     context.beginPath();
    //     context.arc(clickX[i], clickY[i], 2.5, 0, 2 * Math.PI);
    //     context.fill();
    //   }
    //   context.closePath();
    // }
    drawPoint(x, y) {
        this.pointContext.beginPath();
        this.pointContext.arc(x, y, 2.5, 0, 2 * Math.PI);
        this.pointContext.fill();
        this.pointContext.closePath();
    }
    addClick(x, y) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.colonyCount++;
        this.updateCounterDisplay();
        this.drawPoint(x, y);
    }
    updateCounterDisplay() {
        this.colonyCountDisplay.innerHTML =
            'Colony Count : ' + this.colonyCount.toString();
    }
    clearPoints() {
        this.pointContext.clearRect(0, 0, this.pointCanvas.width, this.pointCanvas.height);
        this.clickX = [];
        this.clickY = [];
    }
}
new DrawingApp();
