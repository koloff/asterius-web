(function($) {
  $.fn.scrollable = function() {
    this.on('mousewheel DOMMouseScroll', function(e) {
      let e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += ( delta < 0 ? 1 : -1 ) * 60;
      this.scrollLeft += ( delta < 0 ? 1 : -1 ) * 60;
      e.preventDefault();
    });
  };
}(jQuery));