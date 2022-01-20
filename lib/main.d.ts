declare function arrayToCsv(data: number[][]): string;
declare class DrawingApp {
    private imgCanvas;
    private pointCanvas;
    private imgContext;
    private pointContext;
    private img;
    private pointRadius;
    private clicks;
    private colonyCount;
    private colonyCountDisplay;
    constructor();
    private createUserEvents;
    private drawImageScaled;
    private redrawPoints;
    private drawPoint;
    private addClick;
    private updateCounterDisplay;
    private clearPoints;
    private clearEventHandler;
    private pressEventHandler;
    private newImg;
}
