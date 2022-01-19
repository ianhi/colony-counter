declare class DrawingApp {
    private canvas;
    private context;
    private img;
    private clickX;
    private clickY;
    private colonyCount;
    private colonyCountDisplay;
    constructor();
    private createUserEvents;
    private drawImageScaled;
    private redraw;
    private addClick;
    private updateCounterDisplay;
    private clearCanvas;
    private clearEventHandler;
    private pressEventHandler;
}
