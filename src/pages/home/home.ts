import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PinchzoompanPage } from '../pinchzoompan/pinchzoompan';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public imageUrl: string = 'https://i.vimeocdn.com/video/495195973_640.jpg';

  constructor(private _navCtrl: NavController) {

  }

  public goToPinchZoomPan(): void {
    this._navCtrl.push(PinchzoompanPage, { img: this.imageUrl });
  }

}
