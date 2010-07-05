/* Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
Terms and conditions of use: http://tbs-sct.ircan.gc.ca/projects/gcwwwtemplates/wiki/Terms
Conditions régissant l'utilisation : http://tbs-sct.ircan.gc.ca/projects/gcwwwtemplates/wiki/Conditions
*/

/**
*    ieOverflow - To allow for IE 5.5 + 6 + to act like a normal standards compliant browser, allowing overflow in parent containers
*    		     flow outside the box, instead of breaking the page.
**/
var ieOverflow = {
	params :  Utils.loadParamsFromScriptID("overflow"),
	init: function() {

		/** Check to see what class to call for the functionality **/
	    this.params.id = (this.params.id == "default"  ) ? ".ieoverflow" : "." + this.params.id;
        /** End of parameter qualifying **/
	    
	if ( /MSIE ((5\.5)|6)/.test(navigator.userAgent) && navigator.platform == "Win32" ) {	
		$("div.center").find(params.id.toString()).each(function() {
	 		var hght = Math.round((jQuery(this).height()/16)*Math.pow(10,1))/Math.pow(10,1);
			var cssH = hght + "em";
			var stylet = 'hieght:'+cssH+';width:98.5%';
			jQuery(this).wrap($("<div></div>").css("height",cssH).css("width","98.5%"));
			jQuery(this).css('position','absolute');
			jQuery(this).parent().after('<br /><br /><br /><br /><br />');

			}
		);};
	}
};

/**
 *  ieOverFlow Runtime
 **/

$("document").ready(function(){   ieOverflow.init(); });