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
      this.adjustScale += 1;
      if (this.adjustScale >= 4) this.adjustScale = 1;
      this.transforms.push('scale(' + this.adjustScale + ')');
      this.container.style.transform = this.transforms.join(' ');
    });


    this.gesture.on("pinch", (ev) => {
      this.transforms = [];

      // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
      this.currentScale = this.adjustScale * ev.scale;

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
      this.transforms = [];

      // Adjusting the current pinch/pan event properties using the previous ones set when they finished touching
      this.currentScale = this.adjustScale * 1;
      this.currentDeltaX = this.adjustDeltaX + (ev.deltaX / this.currentScale);
      this.currentDeltaY = this.adjustDeltaY + (ev.deltaY / this.currentScale);

      if (this.currentDeltaX > (this.image.width / 2)) this.currentDeltaX = this.image.width / 2;
      if (this.currentDeltaX < 0-(this.image.width / 2)) this.currentDeltaX = 0-this.image.width / 2;
      if (this.currentDeltaY > (this.image.height / 2)) this.currentDeltaY = this.image.height / 2;
      if (this.currentDeltaY < 0-(this.image.height / 2)) this.currentDeltaY = 0-this.image.height / 2;

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
