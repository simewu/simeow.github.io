jQuery(document).ready(function($) {
  // Header fixed and Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 92) {
      $('.gotoTop').fadeIn('slow');
      $('#header').addClass('header');
      $('#header #logo h1 a, .navBar a').css(
        'color', '#000'
      );
    } else {
      $('.gotoTop').fadeOut('slow');
      $('#header').removeClass('header');
      $('#header #logo h1 a, .navBar a').css(
        'color', '#FFF'
      );
    }
  });
  $(window).scroll();

  $('.gotoTop').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 600, 'easeInOutExpo');
    return false;
  });

  new WOW().init(); // Initiate the wowjs

  $('.navBar').superfish({ // Superfish on nav menu
    animation: {
      opacity: 'show'
    },
    speed: 300
  });

  // Mobile Navigation
  if ($('#navBarContainer').length) {
    var $mobileNav = $('#navBarContainer').clone().prop({
      id: 'mobileNav'
    });
    $mobileNav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobileNav);
    $('body').prepend('<button type="button" id="mobileNavToggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobileNav').find('.menuHasChildren').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menuHasChildren i', function(e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobileNavToggle', function(e) {
      $('body').toggleClass('mobileNavActive');
      $('#mobileNavToggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $("#mobileNav, #mobileNavToggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobileNavActive')) {
          $('body').removeClass('mobileNavActive');
          $('#mobileNavToggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobileNav, #mobileNavToggle").length) {
    $("#mobileNav, #mobileNavToggle").hide();
  }

  // Smooth scroll to IDs
  $('a[href*="#"]:not([href="#"])').on('click', function() {
    if (location.hostname == this.hostname && location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')) {
      var targetID = $(this.hash);
      if (targetID.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header')) {
            top_space = top_space - 20;
          }
        }
        $('html, body').animate({
          scrollTop: targetID.offset().top - top_space
        }, 600, 'easeInOutExpo');
        if ($(this).parents('.navBar').length) {
          $('.navBar .menuActive').removeClass('menuActive');
          $(this).closest('li').addClass('menuActive');
        }
        if ($('body').hasClass('mobileNavActive')) {
          $('body').removeClass('mobileNavActive');
          $('#mobileNavToggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Porfolio filter
  $("#portfolioFilters li").click(function() {
    $("#portfolioFilters li").removeClass('filter-active');
    $(this).addClass('filter-active');
    var selectedFilter = $(this).data("filter");
    $("#portfolio-wrapper").fadeTo(100, 0);
    $(".portfolioItem").fadeOut().css('transform', 'scale(0)');
    setTimeout(function() {
      $(selectedFilter).fadeIn(100).css('transform', 'scale(1)');
      $("#portfolio-wrapper").fadeTo(300, 1);
    }, 300);
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  setAge = () => {
    $('#age').text(Math.round((new Date() - new Date(863251200000)) / 31536000000 * 10000000) / 10000000);
  }
  setInterval(setAge, 3154.6); // Every 3.1546 seconds age increments by exactly 0.0000001
  setAge();

  fileInput = document.createElement('input');
  fileInput.directory = ''
  fileInput.webkitdirectory = ''
  let i = document.querySelector('input').addEventListener('change', (e)=>{
    for(let i = 0; i < e.target.files.length; i++) {
      console.log(e.target.files[i].name);
    }
  })
});
