/* Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
Terms and conditions of use: http://tbs-sct.ircan.gc.ca/projects/gcwwwtemplates/wiki/Terms
Conditions régissant l'utilisation : http://tbs-sct.ircan.gc.ca/projects/gcwwwtemplates/wiki/Conditions
*/

//parseUri 1.2.2
// (c) Steven Levithan <stevenlevithan.com>
// MIT License

function parseUri (str) {
	var	o   = parseUri.options,
		m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i   = 14;

	while (i--) uri[o.key[i]] = unescape(m[i]) || "";

	uri[o.q.name] = {};
	uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
		if ($1) uri[o.q.name][$1] = $2;
	});

	return uri;
};

parseUri.options = {
	strictMode: false,
	key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
	q:   {
		name:   "queryKey",
		parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	},
	parser: {
		strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
		loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
	}
};

/** 
 * 
 * 
 * 
 * 
 * 
 * 
 * **/

var Utils = {
		getLibraryPath : function() { return PE.liblocation + "lib"; },
		getSupportPath : function() { return PE.liblocation + "support"; },
        getPluginsPath : function() { return PE.liblocation + "plugins"; },
	    loadParamsFromScriptID : function(name) {  
        	var parameters = parseUri(jQuery("script[id='wet-boew_plugin_" + name + "']").attr('src')).queryKey;
             return parameters;
        		},
        addCSSSupportFile : function(pathtofile) { document.write('<link rel="stylesheet" href="'+pathtofile+'" type="text/css" media="screen" />');  },
        
        addKeyboardBindingToPlugin : function(objec, keyboardaction, keyboardsequence, func) {
        	objec.focus(function(){
        		objec.bind(keyboardaction, keyboardsequence, func);
        		});
        },
        getPageLanguage : function() {return jQuery("meta[name='dc.language']").attr('content'); }
};
