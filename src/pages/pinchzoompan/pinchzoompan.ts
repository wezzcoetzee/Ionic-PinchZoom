import { Component, ViewChild } from '@angular/core';
import { NavParams, Gesture } from 'ionic-angular';

@Component({
  selector: 'page-pinchzoompan',
  templateUrl: 'pinchzoompan.html',
})
export class PinchzoompanPage {

  @ViewChild('image') element;
  @ViewChild('imageParent') elementParent;

  image = null;
  container = null;
  transforms = [];
  adjustScale = 1;
  adjustDeltaX = 0;
  adjustDeltaY = 0;

  currentScale = null;
  currentDeltaX = null;
  currentDeltaY = null;

  limitsSet = false;
  minDeltaX = null;
  minDeltaY = null;
  maxDeltaX = null;
  maxDeltaY = null;
  maxScale = 8;

  public mediaUrl: any;
  public src: string;
  private gesture: Gesture;
  public mediaLoaded:boolean = false;

  constructor(private _navParams: NavParams) {
    this.mediaUrl = this._navParams.get("img");    
    this.src = this.mediaUrl;
  }

  setMediaLoaded =() =>{
    setTimeout(()=>this.mediaLoaded = true, 200);
  };

  setLimits() {
    if (this.limitsSet || this.image.width === 0 || this.image.height ===0)
      return;

    this.maxDeltaX = this.image.width / 2;
    this.maxDeltaY = this.image.height / 2;
    this.minDeltaX = 0 - this.maxDeltaX;
    this.minDeltaY = 0 - this.maxDeltaY;
    this.limitsSet = true;
  }

  ionViewDidLoad() {
    this.image = this.element.nativeElement;
    this.container = this.elementParent.nativeElement;
    // Prevent long press saving on mobiles.
    this.container.addEventListener('touchstart', function(e) {
      e.preventDefault();
    });

    this.init();
  }

  /*
   Initialize listeners for gestures
   */
  init = () => {

    //create gesture obj w/ ref to DOM element
    this.gesture = new Gesture(this.element.nativeElement);

    //listen for the gesture
    this.gesture.listen();

    this.gesture.on('doubletap', (ev) => {
      this.transforms = [];
      this.adjustScale *= 2;
      if (this.adjustScale > this.maxScale) this.adjustScale = 1;
      this.transforms.push('scale(' + this.adjustScale + ')');
      this.transforms.push('translate(' + this.adjustDeltaX + 'px,' + this.adjustDeltaY + 'px)');
      this.container.style.transform = this.transforms.join(' ');
    });


    this.gesture.on("pinch", (ev) => {

      this.setLimits();

      this.transforms = [];

      // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
      this.currentScale = this.adjustScale * ev.scale;
      if (this.currentScale > this.maxScale)
        this.currentScale = this.maxScale;

      // Concatinating and applying parameters.
      if (this.currentScale < 1) {
        this.currentScale = 1;
        this.currentDeltaX = 0;
        this.currentDeltaY = 0;
      }
      this.transforms.push('scale(' + this.currentScale + ')');
      this.transforms.push('translate(' + this.currentDeltaX + 'px,' + this.currentDeltaY + 'px)');
      this.container.style.transform = this.transforms.join(' ');

    });

    this.gesture.on("pan", (ev) => {

      this.setLimits();

      this.transforms = [];

      // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
      this.currentScale = this.adjustScale;
      this.currentDeltaX = this.adjustDeltaX + (ev.deltaX / this.currentScale);
      this.currentDeltaY = this.adjustDeltaY + (ev.deltaY / this.currentScale);

      if (this.currentDeltaX > this.maxDeltaX) this.currentDeltaX = this.maxDeltaX;
      if (this.currentDeltaX < this.minDeltaX) this.currentDeltaX = this.minDeltaX;
      if (this.currentDeltaY > this.maxDeltaY) this.currentDeltaY = this.maxDeltaY;
      if (this.currentDeltaY < this.minDeltaY) this.currentDeltaY = this.minDeltaY;

      // Concatinating and applying parameters.
      if (this.currentScale < 1) {
        this.currentScale = 1;
        this.currentDeltaX = 0;
        this.currentDeltaY = 0;
      }
      this.transforms.push('scale(' + this.currentScale + ')');
      this.transforms.push('translate(' + this.currentDeltaX + 'px,' + this.currentDeltaY + 'px)');
      this.container.style.transform = this.transforms.join(' ');

    });


    this.gesture.on("pinchend", (ev) => {

      // Saving the final transforms for adjustment next time the user interacts.
      this.adjustScale = this.currentScale;

    });

    this.gesture.on("panend", (ev) => {

      // Saving the final transforms for adjustment next time the user interacts.
      this.adjustDeltaX = this.currentDeltaX;
      this.adjustDeltaY = this.currentDeltaY;

    });

  }
}
