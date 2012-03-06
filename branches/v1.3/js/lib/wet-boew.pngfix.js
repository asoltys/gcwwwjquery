/*!
 * jQuery integration v1.32 / Intégration jQuery v1.32
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * www.tbs.gc.ca/ws-nw/wet-boew/terms / www.sct.gc.ca/ws-nw/wet-boew/conditions
 */
 
/**
*    PNGFix - To allow for IE 5.5 + to show proper transparency for png's
*    Note :: Increased the fix to encompass all page png's
**/
var PngFix = {
		
	pnglocation : Utils.getSupportPath()+"/pngfix/inv.gif" ,
	
	isOlderIE: (/MSIE ((5\.5)|6)/.test(navigator.userAgent) && navigator.platform == "Win32"),

	init : function() {
		// Replace gif with png
	       	$('img.pngfix').each(function() {
	       	jQuery(this).attr('src',jQuery(this).attr('src').substring(0,jQuery(this).attr('src').lastIndexOf('.')) + '.png');
	       });	 
	   },
	helpIe : function() { $('img.pngfix').each(function() { PngFix.fixPng(this); }); },	   		
	fixPng : function(png) {
   		// get src
   		var src = png.src;
   		// replace by blank image
   		png.onload = function() { };
   		png.src = this.pnglocation;
   		// set filter (display original image)
   		png.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "',sizingMethod='scale')";
 	}
};


var ie6Reflow = {
    init: function(){
        /*addLoadEvent(screenResolution);*/
		window.onresize = screenResolution;
		function screenResolution(){
			var pixels = document.documentElement.clientWidth;
			var style = (pixels>0&&pixels<=935)?'gc-elastic':(pixels>935&&pixels<=10000)?'gc-elastic':'gc-elastic';
			document.body.className=style;
		};
		screenResolution();
    }
}
/**
* Requested Background Image Cache fix
*  Defect - Défaut #1073 [http://tbs-sct.ircan.gc.ca/issues/1073?lang=eng]
*/
var ieOptimzier = {
	optimize: function() {
		try { document.execCommand("BackgroundImageCache",false,true); } catch(err) {}
	}
};
 
var overFlowFix = {
	width: 0,
	centreWidth: 0,
	maxCentreWidth: 0,
	leftWidth: 0,
	maxLeftWidth: 0,
	rightWidth: 0,
	maxRightWidth: 0,
	
	stabilize: function() {
		this.centreWidth = $('#cn-centre-col-inner').outerWidth();
		if ($('#cn-left-col').length > 0) this.leftWidth = $('#cn-left-col').outerWidth();
		if ($('#cn-right-col').length > 0) this.rightWidth = $('#cn-right-col').outerWidth();
		this.width = this.centreWidth + this.leftWidth + this.rightWidth;

		// Is overflowing happening?
		if (this.width > $('#cn-cols-inner').width()) {
			// Figure out the maxWidths for each of the columns
			$('#cn-centre-col-inner').children().addClass("cn-overflow-test");
			this.maxCentreWidth = $('#cn-centre-col-inner').width();
			$('#cn-centre-col-inner').children().removeClass("cn-overflow-test");
			
			if ($('#cn-left-col').length > 0) {
				$('#cn-left-col').children().addClass("cn-overflow-test");
				this.maxLeftWidth = $('#cn-left-col').width();
				$('#cn-left-col').children().removeClass("cn-overflow-test");
			}
			
			if ($('#cn-right-col').length > 0) {
				$('#cn-right-col').children().addClass("cn-overflow-test");
				this.maxRightWidth = $('#cn-right-col').width();
				$('#cn-right-col').children().removeClass("cn-overflow-test");
			}
			
			// Fix centre column if it has been stretched
			if (this.centreWidth > this.maxCentreWidth) {this.adjust($('#cn-centre-col-inner'), this.maxCentreWidth);}

			// Fix left column if it has been stretched
			if (this.maxLeftWidth > 0 && this.leftWidth > this.maxLeftWidth) {this.adjust($('#cn-left-col'), this.maxLeftWidth);}
			
			// Fix right column if it has been stretched
			if (this.maxRightWidth > 0 && this.rightWidth > this.maxRightWidth) {this.adjust($('#cn-right-col'), this.maxRightWidth);}
		}
		
		// Enable overflowing
		$('#cn-left-col, #cn-centre-col, #cn-right-col').css('overflow-x','visible');
	},
	adjust: function(container, maxWidth) {
		var fixesNeeded = false;
		var pixelHeight = 0;
		var actualHeight = 0;
		var parentPixelHeight = 0;

		// Allow each top-level element that is wider than maxWidth to overflow the container
		container.children().each(function() {
			if ($(this).innerWidth() > maxWidth) {
				if (this.tagName != "/HEADER" && ($(this).is("table") || !overFlowFix.adjust($(this), maxWidth))) {
					pixelHeight = $(this).outerHeight(true);
					actualHeight = ((Math.round(((pixelHeight)/16)*Math.pow(10,1))/Math.pow(10,1)));
					$(this).css('position', 'absolute').wrap('<div style="width: 98.5%;height: ' + actualHeight + 'em;"></div>');
					parentPixelHeight = $(this).parent().outerHeight(true);
					if (pixelHeight > parentPixelHeight) $(this).parent().css('height', actualHeight*(pixelHeight/parentPixelHeight) + 'em');
					if ($(this).offsetParent().offset().top == 0) $(this).css("top",$(this).offset().top);
					else $(this).css("top",$(this).position().top);
				}
				fixesNeeded = true;
			}
		});
		return fixesNeeded;
	}
}
/**
 *  PngFix Runtime
 **/

$("document").ready(function(){   
	
	PngFix.init(); 	
	
	if(PngFix.isOlderIE) {
		PngFix.helpIe();
		overFlowFix.stabilize();
		ieOptimzier.optimize();
		ie6Reflow.init();
	}
});