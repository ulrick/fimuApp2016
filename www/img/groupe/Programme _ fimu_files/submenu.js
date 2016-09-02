(function($) {

  $.fn.menumaker = function() {

    var submenu = $(this), settings = $.extend({
      breakpoint: 946
    });

    return this.each(function() {
      resizeFix = function() {
         if ($(window).width() > settings.breakpoint) {
          submenu.removeClass('small-screen');
          $('#submenu').indicatorposition();
        }

        if ($(window).width() <= settings.breakpoint && !submenu.hasClass("small-screen")) {
          submenu.addClass('small-screen');
        }
      };
        
      resizeFix();
      return $(window).on('resize', resizeFix);
    });
  };

  $.fn.indicatorposition = function() {
    var foundActive = false, activeElement, indicatorPosition, indicator = $('#submenu #menu-indicator'), defaultPosition;

    $("#submenu > ul > li").each(function() {
      if ($(this).hasClass('active')) {
        activeElement = $(this);
        foundActive = true;
      }
    });

    if (foundActive === false) {
      activeElement = $("#submenu > ul > li").first();
    }

    defaultPosition = indicatorPosition = activeElement.position().left + activeElement.width()/2 + 24;
    indicator.css("left", indicatorPosition);

    $("#submenu > ul > li").hover(function() {
      activeElement = $(this);
      indicatorPosition = activeElement.position().left + activeElement.width()/2 + 24;
      indicator.css("left", indicatorPosition);
    }, 
    function() {
      indicator.css("left", defaultPosition);
    });
  };
})(jQuery);

(function($){
$(document).ready(function(){

  $(window).load(function() {
    $("#submenu").menumaker();
    $('#submenu').prepend("<div id='menu-indicator'></div>");
    $('#submenu').indicatorposition();
  });

});
})(jQuery);
