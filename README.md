# jQuery UI Croppable - A plugin for web-based image cropping

## What exactly does it do?
When called on an jquery object of an image, Croppable creates the necessary elements and javascript to make a nice interface for determining the dimensions of a cropped image.

## What do I need to use it?
You'll need jQuery and jQueryUI (I developed Croppable with versions 1.7.2 and 1.8.7 respectively). You'll also need a backend that can handle image cropping.

## How do I use it?
Call the plugin on an image and pass it an element to click to initiate the crop and a callback to handle the output of the plugin. The dimString sent to the callback is in the form of (cropped width)x(cropped height)+(left offset)+(top offset). This happens to be the precise format to pass to ImageMagick when using a -crop command.

###Example:
```javascript
function cropCallback(dimString) {
    // do some things with the data
}

$('#some-image').croppable({ 'cropSelector': '#crop-button' }, cropCallback);
```

## What kind of backend can I use to crop the image?
I developed Croppable using a [Sinatra](http://www.sinatrarb.com/) instance and [MiniMagick](https://github.com/probablycorey/mini_magick). You can use whatever backend you want. You don't even really need to use a backend at all - dump the output to the console if you really want.
