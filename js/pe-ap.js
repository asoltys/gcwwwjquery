/* GC WEB TEMPLATE | MODELE DE PAGE WEB DU GC
TERMS AND CONDITIONS OF USE: http://tbs-sct.ircan.gc.ca/projects/gcwwwtemplates/wiki/Terms
CONDITIONS REGISSANT L'UTILISATION : http://tbs-sct.ircan.gc.ca/projects/gcwwwtemplates/wiki/Conditions
*/

/** JavaScript / JQuery Capabilities with Name-spaced HTML **/
var PE = {  
    progress: function(props){
	
	   /** Page Language - is set by the Meta Data Element [ dc.language ] **/
	    PE.language = jQuery("meta[name='dc.language']").attr('content'); 
	   /** Page Language - end **/
	   /** JS Location - The browser helps set this up for us **/
	    PE.liblocation = jQuery("script[id='progressive']").attr('src').replace("pe-ap.js","");
	    /** JS Location - end **/
	    
	    /** LOAD MANDITORY SUPPORTING LIBRARY AND PLUGINS FEATURES **/
	    PE.load('goc.utils.js');
	    PE.load('goc.skipnav.js');
	    PE.load('jquery.hotkeys-0.7.9.min.js');
	    PE.load('goc.tooltips.js');
	    
	    /** LOAD SUPPORTING PLUGINS **/
	    
	    PE.load('goc.pngfix.js');
	    PE.load('goc.equalheight.js');
	    
		PE.parameters = props /** DEPERICATED : Backward Compatibility **/ ;
		
		for(key in PE.parameters) {
			/** This is new functionality that will allow for plug-ins to be dynamically loaded per page
			 *  Approach : Parameters passed to be PE object are in a Key / Value pair
			 *  Data Model : Key - is the name of the property which will be the name of the plug-in file
			 *  		   : Value - will be the parameters ( if any ) to pass to the plug-in main function 
			 *  Notes : All methods will be fired on the Document.Ready JQuery to ensure proper DOM Loading
			 *  **/
			 var myPluginLoader = PE.liblocation+"plugins/goc."+[key]+".js?";
			 
			 if ( typeof(PE.parameters[key]) == 'object' )
			 {
				 var nCount = 0;
				 for (var name in PE.parameters[key])
				 {
					 var aMpersand = (nCount > 0 ) ? "&" : "" ;
					 myPluginLoader += "" + aMpersand + name + "=" +  escape(PE.parameters[key][name]);
					 ++nCount;
				 }
			 }else {
				 myPluginLoader += "id=" +  PE.parameters[key];
			};
			/** Append the script to the page DOM for autoloading ( Safari 2 & Opera 8 safe ) **/
			document.write('<script type="text/javascript" src="'+myPluginLoader+'" id="goc_plugin_'+[key]+'"><\/script>');
			
		
		}			
    },
    
	   /** Load Required Obligatory Scripts
	    *   Method: Brute force to ensure Safari 2 compatiblity
	    *   TODO: We may want to look at creator a more elegant Loader method
	    *   	  maybe through an ini file
	    *  **/
	    
   load: function(jsSrc, jParam){
    	if (jParam){
    		document.write('<script type="text/javascript" src="'+PE.liblocation+"lib/"+jsSrc+'?'+jParam+'"><\/script>');
    	}else {
    		document.write('<script type="text/javascript" src="'+PE.liblocation+"lib/"+jsSrc+'"><\/script>');
    	}
    	
    },
    
    loadParams : function (name, plugin){
    	return jQuery("script[id='goc_plugin_" + name + "']").attr('src');
    }
};
