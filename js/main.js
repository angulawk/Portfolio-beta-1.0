$(document).ready(function() {
  //toggle navigation

  $(".hamburger").click(function() {
    $(this).toggleClass("is-active");
    $(".links").toggleClass("active");
  });

  //page scroll

  var xH;
  $(".small_view").hover(
    function() {
      xH = $(this)
        .children("img")
        .css("height");
      xH = parseInt(xH);
      xH = xH - 350;
      xH = "-" + xH + "px";
      $(this)
        .children("img")
        .css("top", xH);
    },
    function() {
      $(this)
        .children("img")
        .css("top", "0px");
    }
  );

  //box info show
  $(".triangle").click(function() {
    var revealThing = $(this).next();
    revealThing.slideToggle();
  });

  $(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html, body").animate(
            {
              scrollTop: target.offset().top
            },
            1000
          );
          return false;
        }
      }
    });
  });

  $(window).bind("scroll", function() {
    if ($(window).scrollTop() > 50) {
      $("#menu").addClass("fixed");
    } else {
      $("#menu").removeClass("fixed");
    }
  });

  $(".links li a").click(function() {
    $("li a").removeClass("active_link");
    $(this).addClass("active_link");
  });
});
