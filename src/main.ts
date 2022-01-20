function arrayToCsv(data: number[][]): string {
  return data
    .map(
      (row) =>
        row
          .map(String) // convert every value to String
          .map((v) => `"${v}"`) // quote it
          .join(',') // comma-separated
    )
    .join('\n'); // rows starting on new lines
}

class DrawingApp {
  private imgCanvas: HTMLCanvasElement;
  private pointCanvas: HTMLCanvasElement;
  private imgContext: CanvasRenderingContext2D;
  private pointContext: CanvasRenderingContext2D;
  private img: HTMLImageElement;
  private pointRadius: number;

  private clicks: number[][] = [];

  private colonyCount = 0;
  private colonyCountDisplay: HTMLElement;

  constructor() {
    this.imgCanvas = document.getElementById('imgCanvas') as HTMLCanvasElement;
    this.pointCanvas = document.getElementById(
      'pointCanvas'
    ) as HTMLCanvasElement;
    this.imgContext = this.imgCanvas.getContext('2d');
    this.pointContext = this.pointCanvas.getContext('2d');

    this.pointContext.lineCap = 'round';
    this.pointContext.lineJoin = 'round';
    this.pointContext.fillStyle = 'rgba(255, 0, 0, 0.75)';
    this.pointContext.lineWidth = 2;

    this.pointRadius = 4;

    this.colonyCountDisplay = document.getElementById('colonyCounter');

    this.img = new Image();
    this.img.src = 'colonies.png';
    this.img.onload = (): void => {
      // TODO some sort of resizing to prevent clicking outside of the image
      // maybe have a maxmimum image size and possibly shrink in either of the directions

      // this.resize_canvases(`${this.img.width}px`, `${this.img.height}px`);
      this.drawImageScaled();
    };

    this.createUserEvents();
  }

  private createUserEvents(): void {
    const canvas = this.pointCanvas;

    canvas.addEventListener('mousedown', this.pressEventHandler);
    // canvas.addEventListener('touchstart', this.pressEventHandler);

    document
      .getElementById('clear')
      .addEventListener('click', this.clearEventHandler);

    const fileUpload = document.getElementById('file-upload');
    document.getElementById('img-upload').addEventListener('click', () => {
      fileUpload.click();
    });
    fileUpload.addEventListener('input', this.newImg);

    document.getElementById('img-save').addEventListener('click', () => {
      alert('not implemented yet sorry!');
    });

    document.getElementById('csv-save').addEventListener('click', () => {
      const url = URL.createObjectURL(
        new Blob([arrayToCsv(this.clicks)], { type: 'text/csv;charset=utf-8;' })
      );

      // Create a link to download it
      const down = document.createElement('a');
      down.href = url;
      down.setAttribute('download', 'points.csv');
      down.click();
      // should somehow destroy the created link?
    });

    document
      .getElementById('point-size-slider')
      .addEventListener('input', (e) => {
        this.pointRadius = (e.target as HTMLInputElement)
          .value as unknown as number;
        this.redrawPoints();
      });
    document
      .getElementById('point-alpha-slider')
      .addEventListener('input', (e) => {
        const alpha = (e.target as HTMLInputElement).value as unknown as number;
        this.pointContext.fillStyle = `rgba(255, 0, 0, ${alpha}`;
        this.redrawPoints();
      });
  }

  // private resize_canvases(width: string, height: string): void {
  //   this.imgCanvas.setAttribute('width', width);
  //   this.imgCanvas.setAttribute('height', height);
  //   this.pointCanvas.setAttribute('width', width);
  //   this.pointCanvas.setAttribute('height', height);
  // }

  private drawImageScaled(): void {
    const canvas = this.imgCanvas;
    this.imgContext.clearRect(0, 0, canvas.width, canvas.height);
    const img = this.img;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.min(hRatio, vRatio);
    const shiftX = (canvas.width - img.width * ratio) / 2;
    const shiftY = (canvas.height - img.height * ratio) / 2;
    this.imgContext.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      shiftX,
      shiftY,
      img.width * ratio,
      img.height * ratio
    );
  }

  private redrawPoints(): void {
    this.pointContext.clearRect(
      0,
      0,
      this.pointCanvas.width,
      this.pointCanvas.height
    );
    this.clicks.map((click) => {
      this.drawPoint(click[0], click[1]);
    });
  }

  private drawPoint(x: number, y: number): void {
    this.pointContext.beginPath();
    this.pointContext.arc(x, y, this.pointRadius, 0, 2 * Math.PI);
    this.pointContext.fill();
    this.pointContext.closePath();
  }

  private addClick(x: number, y: number): void {
    this.clicks.push([x, y]);
    this.colonyCount++;
    this.updateCounterDisplay();
    this.drawPoint(x, y);
  }

  private updateCounterDisplay(): void {
    this.colonyCountDisplay.innerHTML =
      'Colony Count : ' + this.colonyCount.toString();
  }

  private clearPoints(): void {
    this.pointContext.clearRect(
      0,
      0,
      this.pointCanvas.width,
      this.pointCanvas.height
    );
    this.clicks = [];
  }

  private clearEventHandler = (): void => {
    this.clearPoints();
  };

  private pressEventHandler = (e: MouseEvent): void => {
    const mouseX = e.offsetX - this.pointCanvas.offsetLeft;
    const mouseY = e.offsetY - this.pointCanvas.offsetTop;

    this.addClick(mouseX, mouseY);
  };

  // gross any - couldn't figure it out :(
  private newImg = (e: any): void => {
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        this.img.src = reader.result as string;
      },
      false
    );
    reader.readAsDataURL((e.target as HTMLInputElement).files[0]);
  };
}

new DrawingApp();
