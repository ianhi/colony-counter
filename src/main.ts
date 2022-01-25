import { fabric } from 'fabric';
import { Image, IEvent } from 'fabric/fabric-impl';

/* eslint-disable @typescript-eslint/ban-ts-comment */
const imageUrl = new URL('colonies.png', import.meta.url); // parcel loading scheme for local file

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
  private canvas: fabric.Canvas;
  private img: fabric.Image;
  private radius = 4;

  private clicks: number[][] = [];
  private circles: fabric.Circle[] = [];

  private maxWidth = 512;
  private maxHeight = 512; // TODO: make these more reactive to the page - this is arbitrary

  private lastPosX: number;
  private lastPosY: number;
  private isDragging = false;
  private selection = false;
  private aspect: number;

  private colonyCount = 0;
  private colonyCountDisplay: HTMLElement;

  constructor() {
    this.canvas = new fabric.Canvas('canvas');

    this.colonyCountDisplay = document.getElementById('colonyCounter');

    this.canvas.on('mouse:wheel', this.mouseWheel.bind(this));
    this.canvas.on('mouse:move', this.mouseMove.bind(this));
    this.canvas.on('mouse:up', this.mouseUp.bind(this));
    this.canvas.on('mouse:down', this.mouseDown.bind(this));

    document
      .getElementById('clear')
      .addEventListener('click', this.clearEventHandler);
    function logKey(e: KeyboardEvent) {
      console.log(` ${e.code}`);
      console.log(e.code === 'Delete');
      // this.canvas.
    }
    // document.getElementById('canvas').addEventListener('keydown', logKey);
    document.addEventListener('keydown', logKey);
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (['Backspace', 'Delete'].includes(e.key)) {
        this.canvas.getActiveObjects().forEach((obj) => {
          this.canvas.remove(obj);
        });
        // confusingly this line removes the selection boundary from the deleted
        // objects.
        this.canvas.discardActiveObject();
      }
    });

    this.img = fabric.Image.fromURL(
      imageUrl.toString(),
      this.updateImg.bind(this)
    );
    // (img) => {
    //   this.up;

    //   this.resizeWithBounds(this.img.height, this.img.width);
    //   this.canvas.setBackgroundImage(
    //     img,
    //     this.canvas.renderAll.bind(this.canvas),
    //     {
    //       scaleX: this.canvas.width / img.width,
    //       scaleY: this.canvas.height / img.height,
    //     }
    //   );
    // });
    // this.aspect = this.img.height / this.img.width;

    const fileUpload = document.getElementById('file-upload');
    document.getElementById('img-upload').addEventListener('click', () => {
      fileUpload.click();
    });
    fileUpload.addEventListener('change', this.newImg);

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
  }
  private updateImg(img: Image) {
    const imgAspect = img.width / img.height;

    // TODO: is there a simpler way?
    // perhaps a nifty fabricjs method?
    if (img.width > this.maxWidth || img.height > this.maxHeight) {
      // img bigger than max canvas size
      if (img.width > img.height) {
        this.canvas.setWidth(this.maxWidth);
        this.canvas.setHeight(this.maxWidth / imgAspect);
      } else {
        this.canvas.setHeight(this.maxHeight);
        this.canvas.setWidth(this.maxHeight * imgAspect);
      }
    } else {
      this.canvas.setHeight(Math.min(img.height, this.maxHeight));
      this.canvas.setHeight(Math.min(img.width, this.maxWidth));
    }
    this.canvas.setBackgroundImage(
      img,
      this.canvas.renderAll.bind(this.canvas),
      {
        scaleX: this.canvas.width / img.width,
        scaleY: this.canvas.height / img.height,
      }
    );
    this.canvas.renderAll();
  }

  private updateCounterDisplay(): void {
    this.colonyCountDisplay.innerHTML =
      'Colony Count : ' + this.colonyCount.toString();
  }

  private clearEventHandler = (): void => {
    console.warn('gotta do this!');
    // this.clearPoints();
  };
  private mouseMove(opt: IEvent<MouseEvent>) {
    if (this.isDragging) {
      const e = opt.e;
      const vpt = this.canvas.viewportTransform;
      vpt[4] += e.clientX - this.lastPosX;
      vpt[5] += e.clientY - this.lastPosY;
      this.canvas.requestRenderAll();
      this.lastPosX = e.clientX;
      this.lastPosY = e.clientY;
    }
  }
  private mouseWheel(opt: IEvent<WheelEvent>) {
    const delta = opt.e.deltaY;
    let zoom = this.canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) {
      zoom = 20;
    }
    if (zoom < 0.01) {
      zoom = 0.01;
    }
    // console.log(this.canvas.viewportTransform);

    // viewport indexes are:
    // [Sx, Qx, Qy, Sy, Tx, Ty]
    // S = scale, Q = skew, T = translate

    // gimp does this as zoom out as freely as you want
    // but if you are zooming in and the cursor is outside the image it pushes it
    // to the edge of the image
    // TODO: replicate that
    if (zoom < 0.1) {
      // center the image in case we've zoomed real far out
      // so that user doesn't lose the image and can find it again.
      this.canvas.zoomToPoint(
        // { x: this.canvas.width / 2, y: this.canvas.height / 2 },
        { x: this.canvas.width / 2, y: this.canvas.height / 2 },
        zoom
      );
      console.log(zoom);
      // } else if (delta > ) {
      //   // zooming in but mouse is outside image
    } else {
      this.canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    }
    opt.e.preventDefault();
    opt.e.stopPropagation();
  }
  private mouseUp(opt: IEvent<MouseEvent>) {
    // on mouse up we want to recalculate new interaction
    // for all objects, so we call setViewportTransform
    this.canvas.setViewportTransform(this.canvas.viewportTransform);
    this.isDragging = false;
  }
  private mouseDown = (opt: IEvent<MouseEvent>): void => {
    const evt = opt.e;
    if (evt.altKey === true) {
      this.isDragging = true;
      this.selection = false;
      this.lastPosX = evt.clientX;
      this.lastPosY = evt.clientY;
    } else {
      console.log(opt.target);
      if (opt.target) {
        // clicked on a circle!
        return;
      } else {
        const coords = this.canvas.getPointer(opt.e);
        this.clicks.push([coords.x, coords.y]);
        const circ = new fabric.Circle({
          radius: this.radius,
          left: coords.x - this.radius,
          top: coords.y - this.radius,
          fill: 'rgba(255,0,0,.75)',
          hasControls: false,
          // hasBorders: false,
        });
        // object.hasControls = object.hasBorders = false;
        this.canvas.add(circ);
        this.circles.push(circ);
        this.canvas.renderAll();
        this.colonyCount++;
        this.updateCounterDisplay();
      }
    }
  };

  // gross any - couldn't figure it out :(
  private newImg = (e: any): void => {
    const reader = new FileReader();

    reader.addEventListener('load', (f) => {
      this.canvas.remove(this.img);
      const data = f.target.result as string;
      this.img = fabric.Image.fromURL(data, (img) => {
        this.updateImg(img);
      });
    });
    reader.readAsDataURL((e.target as HTMLInputElement).files[0]);
  };
}

new DrawingApp();
