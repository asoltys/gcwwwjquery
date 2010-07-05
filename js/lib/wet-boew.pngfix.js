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
	init : function() {
		 	// Replace gif with png
	       $('img.pngfix').each(function() {
				jQuery(this).attr('src',jQuery(this).attr('src').substring(0,jQuery(this).attr('src').lastIndexOf('.')) + '.png');
				
			});
			var badBrowser = (/MSIE ((5\.5)|6)/.test(navigator.userAgent) && navigator.platform == "Win32");
	   		if (badBrowser) {
	     		$('img.pngfix').each(function() {
			       		if (!this.complete) {
			        		 this.onload = function() { PngFix.fixPng(this); };
			       		} else {
			        	 PngFix.fixPng(this); 
			        	 };
	     		});
	     		}
	},
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
 *  PngFix Runtime
 **/

$("document").ready(function(){   PngFix.init(); });