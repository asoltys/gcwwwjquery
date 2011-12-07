/**
 * 
 */
// @merge:third-party
(function($) {

	 var pe = {
	        //----------- PROPERTIES -----------------//
	        /**
	         * @property : language
	         * @returns : page language in page
	         */
	        language : ($("html").attr('lang')) ? 
	        				($("html").attr('lang').indexOf('en') == 0 ) ? 
	        						'eng' : 'fra' : 
	        								$("meta[name='dc.language'], meta[name='dcterms.language']").attr('content'),
	        /**
	         *  @property : ie
	         // ----------------------------------------------------------
			// A short snippet for detecting versions of IE in JavaScript
			// without resorting to user-agent sniffing
			// ----------------------------------------------------------
			// If you're not in IE (or IE version is less than 5) then:
			//     ie === undefined
			// If you're in IE (>=5) then you can determine which version:
			//     ie === 7; // IE7
			// Thus, to detect IE:
			//     if (ie) {}
			// And to detect the version:
			//     ie === 6 // IE6
			//     ie > 7 // IE8, IE9 ...
			//     ie < 9 // Anything less than IE9
			// ----------------------------------------------------------
	         */
	        ie : (function(){var undef,v = 3,div = document.createElement('div'),all = div.getElementsByTagName('i');while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',all[0]);return v > 4 ? v : undef;}()),
	        /**
	         * @property : mobile
	         * @returns: true/false if mobile device
	         */
	        mobile : (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())),
	        /**
	         * @property: defaultfontsize
	         * @returns : default numeric only version of the font size
	         */
	        defaultfontsize : $('p:first').css('fontSize').replace(/px/, ''),
	        
	        /**
	         * @property: pagecontainer
	         * @returns : the WET aware page query to append items to
	         */
	        pagecontainer : $('#cn-body-inner-3col,#cn-body-inner-2col,#cn-body-inner-1col').add('body').eq(0),
	        /**
	         * property: liblocation
	         * @returns: location of JS framework for WET-BOEW
	         */
	        
	        liblocation : $("script[id='progressive']").attr('src').replace(/pe.js.*$/i, ""),
	        /**
	         * @property: browser
	         * @property.flash : version of flash installed 0 if not installed
	         * @property.silverlight: version of silverlight ( Major only ) , 0 if not installed
	         */
	        
	        browser : {
//@formatter:off
	            flash : function(){try{try{var a=new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');try{a.AllowScriptAccess='always'}catch(e){return'6,0,0'}}catch(e){}return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g,',').match(/^,?(.+),?$/)[1]}catch(e){try{if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){return(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1]}}catch(e){}}return'0'}(), 
	            silverlight : function(){var a;try{try{var b=new ActiveXObject('AgControl.AgControl');if(b.IsVersionSupported("4.0"))a=4;else if(b.IsVersionSupported("3.0"))a=3;else if(b.IsVersionSupported("2.0"))a=2;else a=1;b=null}catch(e){var c=navigator.plugins["Silverlight Plug-In"];if(c){if(c.description==="1.0.30226.2")a=2;else a=parseInt(c.description[0])}else a=0}}catch(e){a=0}return a}()
//@formatter:on       
	        },
	        //---------------- FUNCTIONS ------------------------------//
	        /**
	         *  @function: url
	         *  @return: object with normalized url and it parts to easier url digestion in plugins
	         *  @notes : there are some nice features to the function ( including .absolute creates the absolute version of a relative url )
	         */
//@formatter:off
	        url : function(d){d=d||window.location.href;if(!/^\w+:/.test(d)){var e=document.createElement('img');e.src=d;d=e.src}var o={key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","filename","query","anchor"],parser:{query:/(?:^|&)([^&=]*)=?([^&]*)/g,url:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var m=o.parser.url.exec(d);var f={};f.absolute=d;var i=14;while(i--)f[o.key[i]]=m[i]||"";f.parameter={};f[o.key[12]].replace(o.parser.query,function(a,b,c){if(b)f.parameter[b]=c});return f},
//@formatter:on
			/*
	         * Twita@talinkahashifyer
	         * http://www.dustindiaz.com
	         * http://www.dustindiaz.com/basement/ify.html
	         *
	         * Copyright (c) 2009 Dustin Diaz
	         * licensed under public BSD
	         */
	        ify : function() {
		            return {
	                "link" : function(t) {
	                    return t.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_@:~%&\?\+#\/.=]+[^:\.,\)\s*$]/ig, function(m) {
	                        return '<a href="' + m + '">' + ((m.length > 25) ? m.substr(0, 24) + '...' : m) + '</a>';
	                    });
	                }, "at" : function(t) {
	                    return t.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15}(\/[a-zA-Z0-9-_]+)*)/g, function(m, m1, m2) {
	                        return m1 + '@<a href="http://twitter.com/' + m2 + '">' + m2 + '</a>';
	                    });
	                }, "hash" : function(t) {
	                    return t.replace(/(^|[^&\w'"]+)\#([a-zA-Z0-9_]+)/g, function(m, m1, m2) {
	                        return m1 + '#<a href="http://search.twitter.com/search?q=%23' + m2 + '">' + m2 + '</a>';
	                    });
	                }, "clean" : function(tweet) {
	                    return this.hash(this.at(this.link(tweet)));
	                }
	            };
	        }(),
	        /**
	         * @function: should()
	         * @returns: true/false of object restriction and defaults to true if not restriction passed
	         */
	        should : function(plugin) {
	            if(plugin.hasOwnProperty('restrict'))
	                return ( typeof (plugin.restrict) === 'function') ? plugin.restrict() : plugin.restrict;
	            return true
	        },
	         /**
	         * @property: widget
	         * @property.sanitize : a CSS cleansing function to sanitize all class names that are not widget themeing compatible
	         */
	        widget : {
	        	 sanitize : function(elm) {
	        	 	elm.find('[class]').attr('class',
	           					function(i, c){
	           						var ac = c.split(' '); var n = [];
	           						for(var i = 0; i < ac.length; i++) {
										if( ac[i].toLowerCase().indexOf('widget-') > -1 ){
											n.push(ac[i]);
										} 
									}
	              					return n.join(" ");
	           					});
	        	 }
	        },
	          /**
	         * @function: limit()
	         * @returns: returns a class-based set limit count on plugins (0 if none found  == unlimited )
	         */
	        limit : function(elm) {
	            var count = $(elm).attr('class').match(/\blimit-\d+/);
	            if (!count) return 0;
	            return count[0].replace(/limit-/i,"");
	        },
	        /**
	         *  @function: string - a suite of string related functions
	         *  @string.pad : pads a numeric string with appriopiate zeros 
	         */
	        string : {
	        	// pads numeric string with appropiate leading zeros
	        	// @parms : i - original string
	        	//          l - leading padding required
	        	// 			s - padding character
	        	// @example : if I want to have a number with appriopiate leading '0's - pad(20,2,'0') => 20 also pad('2',2,'0') => 02
	        	 pad : function(i,l,s) {var o = i.toString();if (!s) { s = '0'; }while (o.length < l) {o = s + o;}return o;}
	        },
	        /**
	         *  @function : a suite of date related functions for easier parsing of dates
	         */
	        date : {
	        	// Converts the date in d to a date-object. The input can be:
			        //   a date object: returned without modification
			        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
			        //   a number     : Interpreted as number of milliseconds
			        //                  since 1 Jan 1970 (a timestamp)
			        //   a string     : Any format supported by the javascript engine, like
			        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
			        //  an object     : Interpreted as an object with year, month and date
			        //                  attributes.  **NOTE** month is 0-11.
	        	convert: function(d) {
			        
			        return (
			            d.constructor === Date ? d :
			            d.constructor === Array ? new Date(d[0],d[1],d[2]) :
			            d.constructor === Number ? new Date(d) :
			            d.constructor === String ? new Date(d) :
			            typeof d === "object" ? new Date(d.year,d.month,d.date) :
			            NaN
			        );
			    },
			    
			 		// Compare two dates (could be of any type supported by the convert
			        // function above) and returns:
			        //  -1 : if a < b
			        //   0 : if a = b
			        //   1 : if a > b
			        // NaN : if a or b is an illegal date
			        // NOTE: The code inside isFinite does an assignment (=).
	    		compare:function(a,b) {
			        return (
			            isFinite(a=this.convert(a).valueOf()) &&
			            isFinite(b=this.convert(b).valueOf()) ?
			            (a>b)-(a<b):
			            NaN
			        );
	    		},
	    		 // Checks if date in d is between dates in start and end.
			        // Returns a boolean or NaN:
			        //    true  : if d is between start and end (inclusive)
			        //    false : if d is before start or after end
			        //    NaN   : if one or more of the dates is illegal.
			        // NOTE: The code inside isFinite does an assignment (=).
			    in_range:function(d,start,end) {
			     
			       return (
			            isFinite(d=this.convert(d).valueOf()) &&
			            isFinite(start=this.convert(start).valueOf()) &&
			            isFinite(end=this.convert(end).valueOf()) ?
			            start <= d && d <= end :
			            NaN
			        );
			    },
			    
	        	to_iso_format: function(d, timepresent){
	        		var date = this.convert(d);
	        		return (timepresent) ?  date.getFullYear() + '-' + pe.string.pad(date.getMonth() + 1,2,'0') + '-' + pe.string.pad(date.getDate() + 1, 2, '0') + ' ' + pe.string.pad(date.getHours(), 2, '0') + ':' + pe.string.pad(date.getMinutes(),2,'0') 
	        					: date.getFullYear() + '-' + pe.string.pad(date.getMonth() + 1,2,'0') + '-' + pe.string.pad(date.getDate() + 1, 2, '0');
	        	}
	        	
	         },  
	        /**
	         * @ function exec pe objects in development mode
	         */
	        exec : function(plugin) {
	        	if (plugin.scope === 'global') { plugin.exec() }else{ $(".wet-boew-"  + plugin.id).each( function(){ if (plugin.live && !plugin.live.executed){$('.wet-boew-' + plugin.id  ).live( plugin.live.events.join(' '), plugin.live.func );plugin.live.executed = true;};plugin.exec(this) } ) };
	         },
	        /**
	         * @function: progress
	         * @returns : nothing
	         * @notes : the main loader/swarming function
	         */
	        progress : function() {
	            // page specific global - load all supporting files
	            var $link = $('<link rel="stylesheet" type="text/css" />').appendTo('head');
	            // See http://www.subchild.com/2010/05/20/cross-browser-problem-with-dynamic-css-loading-with-jquery-1-4-solved/
	            $link.attr({href : pe.liblocation + 'css/pe.css', rel : 'stylesheet', type : 'text/css'});
	            var dmode = $('script[src*="pe.fn."]').filter(function(){ return /\.js$/.test(this.src)}).map( function() { return this.src.replace(/^.*\.([^\.]+)\.js$/i,"$1") } ).toArray() ;
	            // load all supporting files
	            var $link2 = $('<link rel="stylesheet" type="text/css" />').appendTo('head');
	            // See http://www.subchild.com/2010/05/20/cross-browser-problem-with-dynamic-css-loading-with-jquery-1-4-solved/
	            $link2.attr({
	                href : pe.liblocation + 'css/pe.theme'+( (pe.url($("script[id='progressive']").attr('src')).parameter['theme']) ? '.'+pe.url($("script[id='progressive']").attr('src')).parameter['theme'] : '')+'.css', rel : 'stylesheet', type : 'text/css'
	            });
	            // now check for the existance of development files
	            // now start loading squences
	            for(var fcn in pe.fn) {
	                if(pe.fn.hasOwnProperty(fcn) && pe.fn[fcn].scope === 'global') {
	                    // now check for dependencies
	                    if(pe.should(pe.fn[fcn])){
	                       if( !(jQuery.inArray(fcn,dmode)>-1) ) { pe.fn[fcn].exec() };
	                    }  
	                }
	            };
	            // now lets crawl the page for plugins
	            $('[class^="pe-"]').each(function() {
	                // so do we exec the function on those as well?
	                var _fcall = $(this).attr('class').replace(/^pe-(\S*).*/i, "$1".toLowerCase());
	                // now call the plugin logic on the element since we are there
	                if(pe.fn.hasOwnProperty(_fcall) && pe.fn[_fcall].scope != 'global') {// do not re-run global set plugins 
	                     if(!(jQuery.inArray(_fcall,dmode) > -1) ) {
	                        // now execute the function
	                     	pe.fn[_fcall].exec(this);
	                     }    
	        	}
	    	});
	    }};
	// ----------- DICTIONARY NAMESPACE ----------------------------------//
    pe.dic = {
    		//@merge:dictionary
    };
   	// ----------- PLUGINS NAMESPACE AND REPOSITORY ----------------------------------//
    pe.fn = {
    		//@merge:functions
    };
 	// ------------- pe BINDING ------------------------------------------------//
 	window.pe = pe;
    return pe;
    
})(jQuery).progress()