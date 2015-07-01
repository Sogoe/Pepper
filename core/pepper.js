/**
 * Created by sony on 2015/7/1.
 */
var Pepper = function(name, canvasId) {

    //images loading
    this.imageLoadingProgressCallback = function(){};
    this.images = [];
    this.imageUrls = [];
    this.imageLoaded = 0;
    this.imagesFailedToLoaded = 0;
    this.imagesIndex = 0;

    return this;
};

Pepper.prototype = {
    getImage: function(imageUrl) {
        return this.images[imageUrl];
    },

    imageLoadedCallback: function(e) {
        this.imageLoaded ++;
    },

    imageLoadErrorCallBack: function(e) {
        this.imagesFailedToLoaded ++;
    },

    loadImage: function(imageUrl) {
        var image = new Image(),
            self = this;

        image.src = imageUrl;

        image.addEventListener('load', function(e) {
           self.imageLoadedCallback(e);
        });

        image.addEventListener('error', function(e) {
           self.imageLoadErrorCallBack(e);
        });

        this.images[imageUrl] = image;
    },

    loadImages: function() {
        if(this.imagesIndex < this.imageUrls.length) {
            this.loadImage(this.imageUrls[this.imagesIndex]);
            this.imagesIndex ++;
        }

        return (this.imageLoaded + this.imagesFailedToLoaded) / this.imageUrls.length * 100;
    },

    addImage: function(imageUrl) {
        this.imageUrls.push(imageUrl);
    },

    setImageProgressCallBack: function(callBack) {
        this.imageLoadingProgressCallback = callBack;
    },

    startLoadingImages: function(callBack) {
        var progressCallBack = callBack ? callBack : this.imageLoadingProgressCallback,
            self = this;
        function imageLoadingProgress() {
            var loadingPercent = self.loadImages();
            progressCallBack(loadingPercent);
            if(loadingPercent < 100) {
                window.requestNextAnimationFrame(imageLoadingProgress);
            }
        }
        window.requestNextAnimationFrame(imageLoadingProgress);
    }
};