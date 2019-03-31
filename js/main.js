$(document).ready(function(){
//toggle navigation

	  $('.hamburger').click(function() { 
	    $(this).toggleClass("is-active");
	    $('.links').toggleClass("active");  
	  });

//page scroll

	var xH;
	$('.small_view').hover(
	function () {
	    xH = $(this).children("img").css("height");
	    xH = parseInt(xH);
	    xH = xH - 350;
	    xH = "-" + xH + "px";
	    $(this).children("img").css("top", xH);
	}, function () {
	    $(this).children("img").css("top", "0px");
	});

	//box info show
	$(".triangle").click(function() {
    var revealThing = $(this).next();
    revealThing.slideToggle();
	});

	$(function() {
	  $('a[href*="#"]:not([href="#"])').click(function() {
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

	$(window).bind('scroll', function () {
    if ($(window).scrollTop() > 50) {
        $('#menu').addClass('fixed');
    } else {
        $('#menu').removeClass('fixed');
    }
	});

	$('.links li a').click(function() {
		$('li a').removeClass('active_link');
		$(this).addClass('active_link');
	})
});

//modal

var btnContactMe = document.querySelector('.contact_me_btn'),
	closeBtn = document.querySelector('#close_me');

btnContactMe.addEventListener('click', function() {
	document.body.classList.add('modal_opened');
}, false);

closeBtn.addEventListener('click', function() {
	document.body.className = "";
}, false);

document.addEventListener('keyup', function(e) {
	if(e.keyCode === 27) {
		document.body.classList.remove('modal_opened');
	}

}, false);


//form 

  function _(id) {
    return document.getElementById(id);
  }

  function submitForm() {
    _('mybtn').disabled = true;
    _('status').innerHTML = '<br><p> Please wait... </p>';
    var formData = new FormData();
    formData.append('firstName', _('firstName').value);
    formData.append('lastName', _('lastName').value);
    formData.append('email', _('email').value);
    formData.append('msg', _('msg').value);

    var ajax = new XMLHttpRequest();
    ajax.open('POST', '../mail.php');
    ajax.onreadystatechange = function() {
      if(ajax.readyState == 4 && ajax.status == 200) {
        if(ajax.responseText == "success") {
          _('contact-form').innerHTML = '<h2>Thanks ' + _('firstName').value + ', your message has been sent. </h2>';
        } else {
          _('status').innerHTML = ajax.responseText;
          _('mybtn').disabled = false;
        }
      }
    }
    ajax.send( formData );
  }

  $("#contact-form").validate({
  rules: {
    firstName: "required",
    lastName: "required",
    email: {
      required: true,
      email: true
    },
    msg: "required"

  },
  messages: {
    firstName: "Please specify your first name",
    lastName: "Please specify your last name",
    email: {
      required: "Please type your email address",
      email: "Your email address must be in the format of name@domain.com"
    },
    msg: "Please specify message"
  }
});

