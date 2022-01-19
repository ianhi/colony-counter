"use strict";
class DrawingApp {
    constructor() {
        this.clickX = [];
        this.clickY = [];
        this.colonyCount = 0;
        this.clearEventHandler = () => {
            this.clearCanvas();
        };
        this.pressEventHandler = (e) => {
            let mouseX = e.changedTouches
                ? e.changedTouches[0].pageX
                : e.pageX;
            let mouseY = e.changedTouches
                ? e.changedTouches[0].pageY
                : e.pageY;
            mouseX -= this.canvas.offsetLeft;
            mouseY -= this.canvas.offsetTop;
            this.addClick(mouseX, mouseY);
            this.redraw();
        };
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.fillStyle = 'rgba(255, 0, 0, 0.5)';
        context.lineWidth = 2;
        this.canvas = canvas;
        this.context = context;
        this.colonyCountDisplay = document.getElementById('colonyCounter');
        this.img = new Image();
        this.img.src = 'colonies.png';
        this.img.onload = () => {
            this.drawImageScaled();
        };
        this.redraw();
        this.createUserEvents();
    }
    createUserEvents() {
        const canvas = this.canvas;
        canvas.addEventListener('mousedown', this.pressEventHandler);
        canvas.addEventListener('touchstart', this.pressEventHandler);
        document
            .getElementById('clear')
            .addEventListener('click', this.clearEventHandler);
    }
    drawImageScaled() {
        const canvas = this.context.canvas;
        const img = this.img;
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);
        const shiftX = (canvas.width - img.width * ratio) / 2;
        const shiftY = (canvas.height - img.height * ratio) / 2;
        this.context.drawImage(img, 0, 0, img.width, img.height, shiftX, shiftY, img.width * ratio, img.height * ratio);
    }
    redraw() {
        const clickX = this.clickX;
        const clickY = this.clickY;
        const context = this.context;
        for (let i = 0; i < clickX.length; ++i) {
            context.beginPath();
            context.arc(clickX[i], clickY[i], 2.5, 0, 2 * Math.PI);
            context.fill();
        }
        context.closePath();
    }
    addClick(x, y) {
        this.clickX.push(x);
        this.clickY.push(y);
        this.colonyCount++;
        this.updateCounterDisplay();
    }
    updateCounterDisplay() {
        this.colonyCountDisplay.innerHTML =
            'Colony Count : ' + this.colonyCount.toString();
    }
    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.clickX = [];
        this.clickY = [];
    }
}
new DrawingApp();
