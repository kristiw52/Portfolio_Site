/*  JavaScript Document  */

//this is the spacing between the thumbnails
var thumbnailSpacing = 15;

//this is jQuery's document ready. inside of the parenthesis is a generic function. we split this open on the bracket so anything insde of here won't trigger until all of HTML has been loaded into the browser. 
$(document).ready(function(){

//	 here we'll first assign the spacing above, to the bottom of the sorting div. So we search for that with the $. In order to access that global variable above, we'll need to put window in front. So when the document is loaded, whatever the variable thumbnailSpacing is set to, we're going to apply that to the margin bottom. That way, the sorting div will have the same spacing as all of the thumbnails have from each other.
	$('.gallery .sorting').css('margin-bottom', window.thumbnailSpacing+'px');

//This adds the show me class to all of the individual thumbnails, since this is how we're going to target and animate the different thumbnails. So we search for all of those with the $ and add the addClass, so when this page loads in addition to setting the margin bottom, were also going to add the showMe class to all the indivudal thumbnails.
$('.thumbnail_container a.thumbnail').addClass('showMe').addClass('fancybox').attr('rel','group');
	
//So then inside , simply call our fundtion here.	
	positionThumbnails();
//this runs the viewport check at a set interal. the thumbnails take half a second to animate, so we do more than half a second - 750 is 3/4 of a second.	
	setInterval('checkViewport()',750);
	
});

//here we set up a listening event to detect the window size to see if we need to reposition the thumbnail in addition to the media queries in css. 
function checkViewport(){
	
	var photosWidth = $('.photos').width();
	var thumbnailContainerWidth = $('.thumbnail_container').width();
	var thumbnailWidth = $('.thumbnail_container a.thumbnail:first-child').outerWidth();
//if photos width is less than thumbnail containers, we need to reposition the thumbnails because they are now wider, so we'll run the position thumbnails function. then in the next if statement, if the photos width minus the thumbnail width is still greater	than the thumbnail container we know we can fit another thumbnail on that row, and then we'll run the position thumbnails again. 
	if( photosWidth < thumbnailContainerWidth ){
		positionThumbnails();		
	}
	if( (photosWidth - thumbnailWidth) > thumbnailContainerWidth ) {
		positionThumbnails();
	}
	
	/* debug */ //$('.debug-size').html('photosWidth = '+photosWidth+' thumbnailContainerWidth = '+thumbnailContainerWidth);
	
}


//this sets up our custom function. We can run this any number of times based on the user changing the screen size
function positionThumbnails (){

//this clears out the html inside of the div with a class of debug remainder.	
	/* debug */ //$('.debug-remainder').html('');

//this is the container width. We're going to set this equal to, and figure out the width of the photos div.	
	var containerWidth = $('.photos').width();
//this is thumbnail row and we'll set it equal to zero.	
	var thumbnail_R = 0;
//this is thumbnail column also set to zero.
	var thumbnail_C = 0;
//this is the thumbnail width, and we're going to query the actual thumbnail width itself, this way we can make css changes and our JavaScript will pick up on the CSS value for this. So we search for those with $. We only need to search for first child since they're all going to be set the same. We don't need to query every thumgnail, so outside of the parenthesis, outer width. This way, if we have a border or anything else, that will get calculated as well. Then add the spacing.
	var thumbnailWidth = $('a.thumbnail img:first-child').outerWidth() + window.thumbnailSpacing;
//this detects the height, this way we don't have to have perfectly squared thumbnails.	
	var thumbnailHeight = $('a.thumbnail img:first-child').outerHeight() + window.thumbnailSpacing;
//this figures out how many thumbnails we can fit in the photos area. We want to make sure we have no remainders, so we want to make sure we have enough room for another column of thumbnails, so we'll use a JavaScript function math.floor so we don't get any remainders or decimal points. 	
	var max_C = Math.floor(containerWidth / thumbnailWidth);
	
	
//this searches for each thumbnail, and adds a generic function. we want to count each one of the  items we find.	
	$('.thumbnail_container a.thumbnail.showMe').each(function(index){
//we declare this variable to capture the remainder. the index%max_c is calculating the modulus between index and max c, which is telling us whether one can be divided into the other one without any remainder. so that calculates first, then divide it by 100.		
		var remainder = (index%max_C)/100;
		var maxIndex = 0;
//now we set the remainder over to our debugging text so we can see whats happening.
		/* debug */ //$('.debug-remainder').append(remainder+' - ');

//this calculates the var remainder above and if it gives us no remainder (equals zero) we're going to come down to check to make sure that the thumbnail is not the first thumbnail (if(index !=0), and then we're going to take the thumbnail row, add the thumbnail height, and then we're going to set the column to 0.That'll move the next thumbnail after our remainder over on the left, and move it down the height of the thumbnails, giving us our rows and columns. And if the remainder is not 0, we know we're still in a row and we're going to continue to space out each of the thumbnails based on the width (thumbnail_C += thumbnailWidth). 	
		if(remainder == 0){
			if(index != 0){
				thumbnail_R += thumbnailHeight;
			}
			thumbnail_C = 0;
		}else{
			thumbnail_C += thumbnailWidth;
		}

//this animates the thumbnails. We're still insdie of the thumbnail 'each' above. So now all theumbnails will start at the 0 position, we calculate each one, find it's remainder and then they'll animate out. This is done 500 milliseconds, so each animation will take half of a second to play. This also calculates based on the browser width.	
		$(this).css('display','block').animate({
			'opacity':1,
			'top':thumbnail_R+'px',
			'left':thumbnail_C+'px'
		}, 500);

//now we calculate the thumbnail_container. So we create the 2 new variables, then the line below applies it to the thumbnailContainer. so now we are calculating the position of each thumbnail and animating each one to each spot. 		
		var newWidth = max_C * thumbnailWidth;
		var newHeight = thumbnail_R + thumbnailHeight;
		$('.thumbnail_container').css({'width':newWidth+'px', 'height':newHeight+'px'});
			
		
	});
	
	detectFancyboxLinks();
	
}

//here we search for all of the thumbnail links, the a.fancybox. if the relationship equals group, we'll run the fancy box plug-in function, which is .fancybox. if you're curious you can look under the fancy box documentation to see additional properties that you can set insde of here. 
function detectFancyboxLinks(){

//Lightbox won't be the optimal user experience on a small screen, so in cases of a really small screen we'll remove the Lightbox altogether, and let the device show us the native jpg in a new window. This will also allow users to pinch and tap on the photographs as well.
//so when we run the detectFancybox function, we're going to remove all instances of click events that have been assigned previously. Then we're going to check the window width, and if its less than 550 pixels, we're going to remove the Fancybox class and add a target of blank so that each time we click a link, it will go to a new window. And if the window is greater than 550 we'll remove that target. 	Then we'll detect all of the Fancybox links that are in existence and activate the Lightbox for those. So if we are over 550, we will not have removed the Fancybox class.
	$('a.fancybox').unbind('click.fb');
	
	if( $(window).width() < 550 ){
		$('.thumbnail_container a.thumbnail').removeClass('fancybox').attr('target','_blank');
	}else{
		$('.thumbnail_container a.thumbnail').removeAttr('target');
	}
	
	
	$('a.fancybox[rel="group"]').fancybox({
		'transitionIn' : 'elastic',
		'transitionOut' : 'elastic',
		'titlePosition' : 'over',
		'speedIn' : 500,
		'overlayColor' : '#000',
		'padding' : 0,
		'overlayOpacity' : .75
	});
}
