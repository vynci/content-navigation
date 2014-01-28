/*( function ( $ ) {

	$.fn.invokeVideoPlayer = function (el, videoURL) {

		//alert(videoURL);

		var leftOffset 			= 0;
		var topOffset 			= 0;
		var overlayHeight 		= 0;
		var thumbnailOrigWidth 	= 0;
		var thumbnailOrigHeight = 0;
		var windowWidth			= 0;
		var windowHeight		= 0;
		var documentHeight 		= 0;
		var imgAspectRatio 		= 0;
		var thumbnailImg		= null;
		var imgPath 			= '';
		var imgMarginTop 		= '';
		var imgOriginWidth 		= 0;
		var imgOriginHeight 	= 0;

		$( el ).click( function () {

			var that = $( el );

			windowWidth			= $( window ).width();
			windowHeight		= $( window ).height();
			documentHeight 		= $( document ).height();
			leftOffset 			= that.offset().left;
			topOffset 			= that.offset().top;
			thumbnailOrigWidth 	= that.css( 'width' );
			thumbnailOrigHeight = that.css( 'height' );
			imgPath 			= that.find( '.cn-segment-video-thumbnail' ).attr( 'src' );
			videoUrl 			= that.find( '.cn-segment-video-thumbnail' ).attr( 'data-video-url' ) + '?html5=1&autoplay=1';

			$( 'html' ).append( _.template( $( '#cn-video-player-template' ).html(), {

				'overlayWidth' 				: $( document ).width(),
				'overlayHeight' 			: $( document ).height(),
				'leftOffset' 				: leftOffset, 
				'topOffset' 				: topOffset, 
				'width' 					: thumbnailOrigWidth, 
				'height' 					: thumbnailOrigHeight,
				'imgPath' 					: imgPath,
				'hoverCloseButtonTopOffset' : $( document ).scrollTop() + 15,
				'videoUrl' 					: videoUrl

			}));

			if( windowHeight > documentHeight ) {

				overlayHeight = windowHeight;

			} else {

				overlayHeight = documentHeight;

			}

			thumbnailImg = new Image();

			thumbnailImg.onload = function () {

				imgOriginWidth 	= thumbnailImg.naturalWidth;
				imgOriginHeight = thumbnailImg.naturalHeight;
				imgAspectRatio 	= imgOriginWidth / imgOriginHeight;

				$( '.cn-video-content' ).animate( {

					width: ( ( windowHeight * 1.25 ) + 320 ) + 'px',
					height: overlayHeight,
					top: 0,
					left: (windowWidth - ( ( windowHeight * 1.25 ) + 320 )) / 2

				}, 200, function () {

					$( '.cn-video-content-close-button' ).click(function () {

						removeVideoPlayer();

					});

				});

				$( '.cn-video-content .cn-video-player-container' ).animate( {

					width: ( windowHeight * 1.25 ) + 'px',
					height: ( ( windowHeight * 1.25) ) / imgAspectRatio + 'px',
					marginTop: $ ( document ).scrollTop() + ( ( windowHeight -  ( ( windowHeight * 1.25 / imgAspectRatio ) ) ) / 2 ),
					top: 0,
					left: 0

				}, 200, function () {

					$( '.cn-video-player-sidebar' ).fadeIn();
					$( '.cn-video-content .cn-video-player-container img' ).fadeOut(function () {
						$( '.cn-video-content .cn-video-player-container iframe' ).show();
					});
					
				});

				$( '.cn-video-player-sidebar' ).animate( {
					
					width: '290px',
					height: ( ( windowHeight * 1.25 ) / imgAspectRatio) + 'px',
					marginTop: $ ( document ).scrollTop() + ( ( windowHeight -  ( ( windowHeight * 1.25 / imgAspectRatio ) ) ) / 2 ),
					top: 0,
					left: 0

				}, 200);

			}

			thumbnailImg.src = imgPath;


			//initiate scroll locking
			var scrollPosition = [
		    	self.pageXOffset || $( document ).scrollLeft || $( 'body' ).scrollLeft,
		        self.pageYOffset || $( document ).scrollTop  || $( 'body' ).scrollTop
		    ];

		    $( 'html' ).data( 'scroll-position', scrollPosition );
		    $( 'html' ).data( 'previous-overflow', $( 'html' ).css( 'overflow' ) );
		    $( 'html' ).css( 'overflow', 'hidden' );
		    window.scrollTo( scrollPosition[ 0 ], scrollPosition[ 1 ] );

		});

		function removeVideoPlayer () {

			//$( '.cn-video-content' ).children( '.cn-video-content-close-button' ).hide();
			$( '.cn-video-player-sidebar' ).hide();

			var currentVideoContainerWidth = 

			$( '.cn-video-content .cn-video-player-container' ).animate( {
				width: '100%',
				height: '100%',
				marginTop: 0,
				top: 0,
				left: 0
			}, 200);

			$( '.cn-video-content' ).animate( {
				width: thumbnailOrigWidth,
				height: thumbnailOrigHeight,
				top: topOffset,
				left: leftOffset
			}, 200, function () {
				$( '.cn-video-content' ).parent().fadeOut(function () {
					$(this).remove();
				});
			});


			//release scroll lock
		    var scrollPosition = $( 'html' ).data( 'scroll-position' );
		    $( 'html' ).css( 'overflow', $( 'html' ).data( 'previous-overflow' ) );
		    window.scrollTo( scrollPosition[ 0 ], scrollPosition[ 1 ] );
		
		}

	};

} ( jQuery ) );*/

/*(function () {
	function test () {
		alert('')
	}

	return {
		test: test
	}
	
}).call(this);*/

//(function () {
	//console.log('test');


	/*var test = function () {
		alert('test');
	}

	return {
		test: test
	};*/

//}());

var leftOffset 			= 0;
var topOffset 			= 0;
var overlayHeight 		= 0;
var thumbnailOrigWidth 	= 0;
var thumbnailOrigHeight = 0;
var windowWidth			= 0;
var windowHeight		= 0;
var documentHeight 		= 0;
var imgAspectRatio 		= 0;
var thumbnailImg		= null;
var imgPath 			= '';
var imgMarginTop 		= '';
var imgOriginWidth 		= 0;
var imgOriginHeight 	= 0;
Window.Hello = 'foo';
function invokeVideoPlayer(targetElement, videoURL) {
	//alert($('#cn-video-player-template').html());
	//alert(videoURL);
	var that = $( targetElement );

	/*alert($( 'body' ).width())
	alert($( 'body' ).height())*/

	windowWidth			= $( document ).width();
	windowHeight		= $( document ).height();		
	documentHeight 		= $( document ).height();
	leftOffset 			= that.offset().left;
	topOffset 			= that.offset().top;
	thumbnailOrigWidth 	= that.find( 'img' ).css( 'width' );
	thumbnailOrigHeight = that.find( 'img' ).css( 'height' );
	imgPath 			= that.find( 'img' ).attr( 'src' );
	//videoUrl 			= that.find( '.cn-segment-video-thumbnail' ).attr( 'data-video-url' ) + '?html5=1&autoplay=1';

	var template = 	'<div class="cn-presentation-overlay" style="width: <%= overlayWidth %>px; height: <%= overlayHeight %>px;">' +
						'<div class="cn-video-content" style="left: <%= leftOffset %>px; top: <%= topOffset %>px; width: <%= width %>; height: <%= height %>;">' +
							'<div class="cn-video-player-container">' +
								'<iframe src="<%= videoUrl %>" frameborder="0" allowfullscreen></iframe>' +
								'<img src="<%= imgPath %>">' +
							'</div>' +
							'<div class="cn-video-player-sidebar">' +
								'<div class="cn-video-content-close-button"></div>' +
							'</div>' +
						'</div>' +
					'</div>';
	
	$( 'html' ).append( _.template( template, {

		'overlayWidth' 				: $( document ).width(),
		'overlayHeight' 			: $( document ).height(),
		'leftOffset' 				: leftOffset, 
		'topOffset' 				: topOffset, 
		'width' 					: thumbnailOrigWidth, 
		'height' 					: thumbnailOrigHeight,
		'imgPath' 					: imgPath,
		'hoverCloseButtonTopOffset' : $( document ).scrollTop() + 15,
		'videoUrl' 					: videoURL

	}));

	if( windowHeight > documentHeight ) {

		overlayHeight = windowHeight;

	} else {

		overlayHeight = documentHeight;

	}

	thumbnailImg = new Image();

	thumbnailImg.onload = function () {
		imgOriginWidth 	= thumbnailImg.naturalWidth;
		imgOriginHeight = thumbnailImg.naturalHeight;
		imgAspectRatio 	= 0.5625; //imgOriginWidth / imgOriginHeight;

		$( '.cn-video-content' ).animate( {

			width: windowWidth + 'px',
			height: ( ( windowWidth  - ( windowWidth * 0.24 ) ) * imgAspectRatio ) + 'px',
			top: 0,
			left: 0//(windowWidth - ( ( windowHeight * 1.25 ) + 320 )) / 2

		}, 200, function () {

			$( '.cn-video-content-close-button' ).click(function () {

				removeVideoPlayer();

			});

		});

		$( '.cn-video-content .cn-video-player-container' ).animate( {

			width: ( windowWidth  - ( windowWidth * 0.24 ) ) + 'px',
			height: ( ( windowWidth  - ( windowWidth * 0.24 ) ) * imgAspectRatio ) + 'px',
			marginTop: $ ( document ).scrollTop(),// + ( ( windowHeight -  ( ( windowHeight * 1.25 / imgAspectRatio ) ) ) / 2 ),
			top: 0,
			left: 0

		}, 200, function () {

			$( '.cn-video-player-sidebar' ).fadeIn();
			$( '.cn-video-content .cn-video-player-container img' ).fadeOut(function () {
				$( '.cn-video-content .cn-video-player-container iframe' ).show();
			});
			
		});

		$( '.cn-video-player-sidebar' ).animate( {
			
			width: ( windowWidth  - ( windowWidth * 0.76 ) ) + 'px',
			height: ( ( windowWidth  - ( windowWidth * 0.24 ) ) * imgAspectRatio ) + 'px',
			marginTop: $ ( document ).scrollTop() /*+ ( ( windowHeight -  ( ( windowHeight * 1.25 / imgAspectRatio ) ) ) / 2 )*/,
			top: 0,
			left: 0

		}, 200);

		//initiate scroll locking
		/*var scrollPosition = [
	    	self.pageXOffset || $( document ).scrollLeft || $( 'body' ).scrollLeft,
	        self.pageYOffset || $( document ).scrollTop  || $( 'body' ).scrollTop
	    ];

	    $( 'html' ).data( 'scroll-position', scrollPosition );
	    $( 'html' ).data( 'previous-overflow', $( 'html' ).css( 'overflow' ) );
	    $( 'html' ).css( 'overflow', 'hidden' );
	    window.scrollTo( scrollPosition[ 0 ], scrollPosition[ 1 ] );*/
	}

	thumbnailImg.src = imgPath;

}

function removeVideoPlayer () {

	//$( '.cn-video-content' ).children( '.cn-video-content-close-button' ).hide();
	$( '.cn-video-player-sidebar' ).hide();

	//var currentVideoContainerWidth = 

	$( '.cn-video-content .cn-video-player-container' ).animate( {
		width: '100%',
		height: '100%',
		marginTop: 0,
		top: 0,
		left: 0
	}, 200);

	$( '.cn-video-content' ).animate( {
		width: thumbnailOrigWidth,
		height: thumbnailOrigHeight,
		top: topOffset,
		left: leftOffset
	}, 200, function () {
		$( '.cn-video-content' ).parent().fadeOut(function () {
			$(this).remove();
		});
	});


	//release scroll lock
    /*var scrollPosition = $( 'html' ).data( 'scroll-position' );
    $( 'html' ).css( 'overflow', $( 'html' ).data( 'previous-overflow' ) );
    window.scrollTo( scrollPosition[ 0 ], scrollPosition[ 1 ] );*/

}		