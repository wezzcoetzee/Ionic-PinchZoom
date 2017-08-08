# Ionic-PinchZoom
This is a basic application that shows you how to create a Pinch-Zoom for images, as well as panning. I noticed that using the native plugins would either blur the image, or did not allow for pinch to zoom. That is why I created this.

# Installation

Firstly, make sure that ionic and cordova are installed using `npm install -g ionic cordova`.

* Clone this repository
* run `npm install`

That's it, to run the project just use `ionic servce`

# Usage

the main code is stored in `src/pages/pinchzoompan`.

You need to navigate to the page, passing through `NavParams` with the name `img`. The page loads up with a black background and the image displayed in the middle, fully zoomed out. The user can perform the following actions:

* Pinch with two fingers to zoom
* Pan with one finger to move the image around
* Click the back button at the top to go back to the previous page.

# Contact

Please feel free to contact me on Github if you want, you can also submit pull requests if you feel the need to do so.

# License

The MIT License

Copyright (c) 2017 Wesley Coetzee

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.