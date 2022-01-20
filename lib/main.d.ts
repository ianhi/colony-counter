declare class DrawingApp {
    private imgCanvas;
    private pointCanvas;
    private imgContext;
    private pointContext;
    private img;
    private clickX;
    private clickY;
    private colonyCount;
    private colonyCountDisplay;
    constructor();
    private createUserEvents;
    private drawImageScaled;
    private drawPoint;
    private addClick;
    private updateCounterDisplay;
    private clearPoints;
    private clearEventHandler;
    private pressEventHandler;
}
