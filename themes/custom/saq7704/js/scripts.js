// MOBILE MENU
$ = jQuery.noConflict();
jQuery(document).ready(function($){

	$("#openNav").click(function() {
		$(".navBlock").slideDown("slow");
		$("#closeNav").toggle();
		$("#openNav").toggle();
	});
	$("#closeNav").click(function() {
		$(".navBlock").slideUp("slow");
		$("#closeNav").toggle();
		$("#openNav").toggle();
		});

});

// ACCORDION
jQuery(document).ready(function($){

  $(".toggleAccord button").click(function() {
    var btn = $(this);
    var toggle = btn.parent();
    var content = btn.parent().next();
    if (btn.attr('aria-expanded') === 'false') {
      // open
      $(content).slideDown();
      toggle.addClass('closeAccord');
      btn.attr('aria-expanded', 'true');
      content.attr('aria-hidden', 'false');
    } else {
      // close
      $(content).slideUp();
      toggle.removeClass('closeAccord');
      btn.attr('aria-expanded', 'false');
      content.attr('aria-hidden', 'true');
    }
  });

});

// BACK TO TOP BUTTON
$(window).scroll(function () {
	'use strict';
	if ($(window).width() <= 800) {
    if ($(window).scrollTop() > 600) {
    $('#back2top').slideDown("400");
} else {
    $('#back2top').hide();
}
}

	else {
    if ($(window).scrollTop() > 600) {
    $('#back2top').slideDown("400");
} else {
    $('#back2top').hide();
}
}

});

// SMOOTH SCROLL
$(function() {
'use strict';
  $('a[href*="#"]:not([href="#"])').click(function() {
    $(".leftNav").animate({left: '-450px'}, 300);
	  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});