/*
* ----------------------------------------------------------- 
Template Name : Biebre | vCard & Resume Template
Author Name   : Beeskip
Athor URI     : http://www.beeskip.com
Version       : 1.0
* ---------------------------------------------------------- 
*/

(function($) {
	"use strict";

	// Vars
	var body = $('body'),
		headerNav = $('nav.header-nav'),
		headerNavElem = $('nav.header-nav li'),
		headerNavElemHome = $('nav.header-nav li a[href="#home"]'),
		navToggle = $('.nav-toggle'),
		sectionOnMenu = $('div.right-side section.on-menu'),
		rightSide = $('div.right-side'),
		preloader = $('#preloader'),
		preloaderDelay = 350,
		preloaderFadeOutTime = 800,
		btnLoadContent = $('a.load-content');
		;
	
	
	// Mobile
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		body.addClass('mobile');
	}

	function detectIE() {
		if (navigator.userAgent.indexOf('MSIE') != -1)
			var detectIEregexp = /MSIE (\d+\.\d+);/ // test for MSIE x.x
		else // if no "MSIE" string in userAgent
			var detectIEregexp = /Trident.*rv[ :]*(\d+\.\d+)/ // test for rv:x.x or rv x.x where Trident string exists

		if (detectIEregexp.test(navigator.userAgent)){ // if some form of IE
			var ieversion=new Number(RegExp.$1) // capture x.x portion and store as a number
			if (ieversion >= 9) {
				return true;
			}
		}
		return false;
	}

	function getWindowWidth() {
		return Math.max( $(window).width(), window.innerWidth);
	}
	

	// Preloader
	function init_Preloader() {
		
		// Hide Preloader
		preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
		
	}


	// Refresh Waypoints
	var refreshWaypoints_timeout;
	function refreshWaypoints() {
		clearTimeout(refreshWaypoints_timeout);
		refreshWaypoints_timeout = setTimeout(function() {
			Waypoint.refreshAll();
		}, 1000);
	}


	// Animations
	function init_Animations() {
		if( !body.hasClass('mobile') ) {
			if( detectIE() ) {
				$('.animated').css({
					'display':'block',
					'visibility':'visible'
				});
			} else {
				/* Starting Animation on Load */
				$(window).on('load', function() {
					$('.onstart').each( function() {
						var elem = $(this);
						if ( !elem.hasClass('visible') ) {
							var animationDelay = elem.data('animation-delay'),
								animation = elem.data('animation');
							if ( animationDelay ) {
								setTimeout(function(){
									elem.addClass( animation + " visible" );
								}, animationDelay);
							} else {
								elem.addClass( animation + " visible" );
							}
						}
					});
				});
			}
		}
	}
	
	 

	// Navigation	
	function init_WaypointsNav() {
		sectionOnMenu.each(function(){
			var section = $(this);

			var waypoints = section.waypoint(function(direction) {
				var activeSection = section.attr('id');
				
				if (direction === 'down') {
					init_UpdateWaypointsNav(activeSection);
				}
				
			},{
				offset: '30%',
				context: rightSide,
			});
			
			var waypoints = section.waypoint(function(direction) {
				var activeSection = section.attr('id');
				
				if (direction === 'up') {
					init_UpdateWaypointsNav(activeSection);
				}

			},{
				offset: '-30%',
				context: rightSide,
			});
							
		});
	}
	
	function init_UpdateWaypointsNav(activeSection) {
		if(headerNavElemHome.parents('li').hasClass('active')){
			return true;
		}
		if(!headerNav.find('a[href="#'+ activeSection +'"]').parents('li').hasClass('active')){
			headerNavElem.removeClass('active');
			headerNav.find('a[href="#'+ activeSection +'"]').parents('li').addClass('active');
		}
	};
	
	function init_Navigation() {
		btnLoadContent.off('click');
		navToggle.off('click');

		if(!(1024 >= getWindowWidth() || body.hasClass('mobile'))) {

			if(headerNav.css('display', 'none')){
				headerNav.css('display', 'table');
			}
			
			if(navToggle.hasClass('open')){
				navToggle.removeClass('open');
			}

			if(!body.hasClass('ov-active')){
				headerNavElem.removeClass('active');
				if(headerNavElemHome){
					headerNavElemHome.parents('li').addClass('active');					
				}
			}
			
			init_WaypointsNav();

			btnLoadContent.on('click', function(e) {
				e.preventDefault();

				var target = $(this).attr('href');
				
				if(target == '#home'){
					if(body.hasClass('ov-active')){
						body.removeClass('ov-active');
						headerNavElem.removeClass('active');
						headerNavElemHome.parents('li').addClass('active');
					}
				} else {
					if(!body.hasClass('ov-active')){
						body.addClass('ov-active');
					}
				}
				
				if( headerNav.find('a[href="'+ target +'"]') ){
					headerNavElem.removeClass('active');
					headerNav.find('a[href="'+ target +'"]').parents('li').addClass('active');
				}
				
				// Smooth Scroll
				var sScroll = $(this),
					sScroll_target = sScroll.attr('href');				
				if(sScroll_target == null){ sScroll_target = '#'; }
				
				$.smoothScroll({
					offset: 0,
					easing: 'swing',
					speed: 800,
					scrollTarget: sScroll_target,
					scrollElement: rightSide
				});
				
				return false;
			});

		} else {
		
			if(headerNav.css('display', 'table')){
				headerNav.css('display', 'none');
			}
			
			if(navToggle.hasClass('open')){
				headerNav.css('display', 'block');
			}
		
			navToggle.on('click', function(e) {
				e.preventDefault();
				if(!$(this).hasClass('open')){
					$(this).addClass('open');
					headerNav.slideDown(500);
				} else {
					headerNav.slideUp(500);
					$(this).removeClass('open');
				}
			});
		
			// Smooth Scroll
			btnLoadContent.on('click', function(e) {
				e.preventDefault();
				
				var sScroll = $(this),
					sScroll_target = sScroll.attr('href');					
				if(sScroll_target == null){ sScroll_target = '#'; }
				
				$.smoothScroll({
					offset: 0,
					easing: 'swing',
					speed: 800,
					scrollTarget: sScroll_target
				});
				
				return false;
			});
			
		}
	}
	

	// Back button trigers animation
	function init_LocationHashChanged() {
		if(!(1024 >= getWindowWidth() || body.hasClass('mobile'))){
			if (location.hash === '#home' || location.hash === '') {
				if(body.hasClass('ov-active')){
					body.removeClass('ov-active');
				}
				headerNav.find(' li').removeClass('active');
				if(headerNavElemHome){
					headerNavElemHome.parents('li').addClass('active');
				}
			} else {
				if(!body.hasClass('ov-active')){
					body.addClass('ov-active');
				}
				
				if(headerNav.find('a[href="'+ location.hash +'"]')){
					headerNavElem.removeClass('active');
					headerNav.find('a[href="'+ location.hash +'"]').parents('li').addClass('active');
				}
				
				$.smoothScroll({
					offset: 0,
					easing: 'swing',
					speed: 800,
					scrollTarget: location.hash,
					scrollElement: rightSide
				});
			}
		} else {
			$.smoothScroll({
				offset: 0,
				easing: 'swing',
				speed: 800,
				scrollTarget: location.hash
			});
		}
	}
	window.onhashchange = init_LocationHashChanged;
	
	
	 
 
	 
	 
	
	
	// Mailchimp 
	function init_Mailchimp() {
		$('.mailchimp-form').ajaxChimp({
			callback: mailchimpCallback,
			url: "mailchimp-post-url" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
		});

		function mailchimpCallback(resp) {
			 if (resp.result === 'success') {
				$('.success-message').html(resp.msg).fadeIn(1000);
				$('.error-message').fadeOut(500);		
			} else if(resp.result === 'error') {
				$('.error-message').html(resp.msg).fadeIn(1000);
			}  
		}

		$('#email').focus(function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});

		$('#email').on('keydown', function(){
			$('.error-message').fadeOut();
			$('.success-message').fadeOut();
		});

		$("#email").on('click', function() {
			$("#email").val('');
		});
	}


	 
	
	// magnificPopup Portfolio
	 $('.img-zoom').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-fade',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0, 1]
    }
	});
 
	
	// magnificPopup video blog
	 $('.blog_play').magnificPopup({
				disableOn: 700,
				type: 'iframe',
				mainClass: 'mfp-fade',
				removalDelay: 160,
				preloader: false,
				fixedContentPos: false
			});
			
	// Filter menu Portfolio
	 $(window).on('load', function() {
		var $container = $('.work-filter');
		var $filter = $('#menu-filter');
		$container.isotope({
			filter: '*',
			layoutMode: 'masonry',
			animationOptions: {
				duration: 750,
				easing: 'linear'
			}
		});

		$filter.find('a').on("click", function() {
			var selector = $(this).attr('data-filter');
			$filter.find('a').removeClass('active');
			$(this).addClass('active');
			$container.isotope({
				filter: selector,
				animationOptions: {
					animationDuration: 750,
					easing: 'linear',
					queue: false,
				}
			});
			return false;
		});
	});

 
	// Counter Facts
	$('.counter_box').appear(function() {
			$('.counter_value').countTo({
				speed: 4000,
				refreshInterval: 60,
				formatter: function (value, options) {
					return value.toFixed(options.decimals);
				}
			});
		});
	
	// Carousel Clients
	$("#owl-clients").owlCarousel({
		autoPlay: 3000,
		stopOnHover: true,
		navigation: false,
		paginationSpeed: 1000,
		goToFirstSpeed: 2000,
		singleItem: true,
		autoHeight: true,
	});
	 
	
	// WINDOW LOAD FUNCTION
	$(window).on('load', function() {
		init_LocationHashChanged();
		init_Preloader(); 
		
		 
	});
	
	// DOCUMENT.READY FUNCTION
	jQuery(document).ready(function($) {
		init_Animations(); 
		init_Navigation(); 
		init_Mailchimp(); 
	});
	
	// WINDOW.RESIZE FUNCTION
	$(window).on('resize', function () {
		init_Navigation(); 
	});

})(jQuery);

 