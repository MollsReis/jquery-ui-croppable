// create jQuery function using Croppable
(function ( $ ) {

    var Croppable = {

        // size holding div, line up resizer div, and enable button
        init: function(image) {

            // save image for crop to use
            self.image = image;

            // create cropping box and resize handle
            self.image.parent().append('<div id="crop-box"><div id="resize-handle"></div></div>');
            $('#crop-box #resize-handle').addClass('ui-resizable-handle ui-resizable-se');

            // style crop box, resize handle, and image
            $('#crop-box').css({
                'z-index':    '1000',
                'position':   'absolute',
                'height':     (self.image.innerHeight() * 0.90) + 'px',
                'width':      (self.image.innerWidth() * 0.90) + 'px',
                'cursor':     'move',
                'background-image': 'url("' + self.image.attr('src') + '")',
                'background-repeat': 'no-repeat',
                'background-attachment': 'fixed'
            });
            $('#crop-box #resize-handle').css({
                'z-index':    '1001',
                'position':   'absolute',
                'bottom':     '0',
                'right':      '0',
                'cursor':     'se-resize',
                'height':     '25px',
                'width':      '25px',
                'background': '#B94A48'
            });
            self.image.css({
                'opacity': '0.40',
                'filter': 'alpha(opacity=40)'
            });
            self.image.parent().css({
                'position': 'relative'
            });

            // line up background with possible scrolled page
            Croppable.moveBackground();

            // crop box initial position
            $('#crop-box').offset({
                top:  self.image.offset().top + (self.image.innerHeight() * 0.05),
                left: self.image.offset().left + (self.image.innerWidth() * 0.05)
            });

            // set crop box to be draggable and resizeable
            $('#crop-box').draggable({ containment: self.image })
                          .resizable({ containment: self.image, handles: { 'se': '#resize-handle' } });
        },

        // send new image dimensions via post
        crop: function() {
            var height = $('#crop-box').innerHeight();
            var width = $('#crop-box').innerWidth();
            var left = $('#crop-box').position().left - self.image.position().left;
            var top = $('#crop-box').position().top - self.image.position().top;
            var dimString = width + "x" + height + "+" + left + "+" + top;
            Croppable.cropCallback.call(this, dimString);
        },

        // move background when window scrolls
        moveBackground: function() {
            var top = self.image.offset().top - $(document).scrollTop();
            $('#crop-box').css({
                'background-position': self.image.offset().left + 'px ' + top + 'px'
            });
        }

    };

    // user end of croppable
    $.fn.croppable = function(options, cropCallback) {
        Croppable.init(this);
        Croppable.cropCallback = cropCallback;
        $(options.cropSelector).click(Croppable.crop);
        $(window).scroll(function(){
            Croppable.moveBackground();
        });
        return this;
    };

})( jQuery );
