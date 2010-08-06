/* Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
Terms and conditions of use: http://tbs-sct.ircan.gc.ca/projects/gcwwwtemplates/wiki/Terms
Conditions régissant l'utilisation : http://tbs-sct.ircan.gc.ca/projects/gcwwwtemplates/wiki/Conditions
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
	
	maxLeftWidth : 0,
	maxCentreWidth: 0,
	maxRightWidth: 0,
	
	stabilize: function() {
		
		 // Figure out the maxWidths for each of the columns
		 if ($('#cn-centre-col').length > 0) {
			this.maxCentreWidth = $('#cn-centre-col-gap').width();
		 };
		 if ($('#cn-left-col').length > 0) {
		 		this.maxLeftWidth = $('#cn-left-col-gap').width();
		 };
		
		if ($('#cn-right-col').length > 0) {
			this.maxRightWidth = $('#cn-right-col-gap').width();
		   	}
		
		// Check to see if the left column has been stretched. If so, call fixOverflow to fix it.
		if ( this.maxLeftWidth > 0 && $('#cn-left-col').width() > this.maxLeftWidth) {
		   this.adjust("#cn-left-col", this.maxLeftWidth);
		   // Remove overflow-x: hidden since issue has been fixed
		   $('#cn-left-col').css('overflow-x','visible');
		}		
		// Check to see if the centre column has been stretched. If so, call fixOverflow to fix it.
		if ($('#cn-centre-col-inner').innerWidth() > $('#cn-centre-col-gap').width()) {
		   this.adjust("#cn-centre-col-inner", this.maxCentreWidth);
		   // Remove overflow-x: hidden since issue has been fixed
		   $('#cn-centre-col').css('overflow-x','visible');
		}
		// Check to see if the right column has been stretched. If so, call fixOverflow to fix it.
		if (this.maxRightWidth > 0 && $('#cn-right-col').width() > this.maxRightWidth) {
			this.adjust("#cn-right-col", this.maxRightWidth);
		   // Remove overflow-x: hidden since issue has been fixed
		   $('#cn-right-col').css('overflow-x','visible');
		}
	},
	adjust: function(container, maxWidth) {
		   // Find each top-level element in container that is wider than maxWidth and do the following
		   $(container).css('position', 'absolute').wrap('<div style="width: 100%; height: ' + (Math.round(($(container).height()/16)*Math.pow(10,1))/Math.pow(10,1)) + 'em;"></div>');	   
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
	
	}
});