/**
 *  Swarm dictionary
 *  @notes - a swarm instance for common terms with a minimal english and french localization library
 */
(function($, pe) {
	//@merge:start
    pe.dic = {
        // webpage features
        top_of_page : (pe.language === 'eng') ? "Top of Page" : "Haut de la page", 
        archived_page : (pe.language == "eng") ? "This Web page has been archived on the Web." : "Cette page Web a été archivée dans le Web.", 
        sub_menu_help : (pe.language === 'eng') ? " (open the submenu with the down arrow key)" : " (ouvrir le sous-menu avec la touche de la flèche descendante)", 
        // mediabar controls
        play_button : (pe.language === "eng") ? "Play" : "Jouer", 
        stop_button : "Pause",
        close_window : (pe.language === 'eng') ? "Close" : "Fermer",
        rewind : (pe.language === 'eng') ? "Rewind " : "Reculer ", 
        fastforward : (pe.language === 'eng') ? "Fast forward " : "Avancer ", 
        mute : (pe.language === 'eng') ? "Mute" : "Activer le mode muet",
        unmute : (pe.language === 'eng') ? "Unmute" : "Désactiver le mode muet", 
        closedcaptions_on : (pe.language === 'eng') ? "Hide Closed captioning " : "Masquer le sous-titrage ", 
        closedcaptions_off : (pe.language === 'eng') ? "Show Closed captioning" : "Afficher le sous-titrage ", 
        audiodescription_on : (pe.language === 'eng') ? "Disable Audio Description " : "Désactiver l'audiodescription ",
        audiodescription_off : (pe.language === 'eng') ? "Enable Audio Description" : "Activer l'audiodescription ",
        novideo : (pe.language === 'eng') ? "Your browser does not appear to have the capabilities to play this video, please download the video below" : "Votre navigateur ne semble pas avoir les capacité nécessaires pour lire cette vidéo, s'il vous plaît télécharger la vidéo ci-dessous", 
        position : (pe.language === 'eng') ? "Current Position: " : "Position actuelle : ",
        duration : (pe.language === 'eng') ? "Total Time: " : "Temps total : ",
        buffered : (pe.language === 'eng') ? "Buffered: " : "Mis en mémoire-tampon : ",
            
        // time functions
        ago : function(time_value) {
            var parsed_date = pe.date.convert(time_value);
            var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
            var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
            delta = delta + (relative_to.getTimezoneOffset() * 60);
            var r = '';
            if(delta < 60) {
                r = (pe.language === "eng") ? 'a minute ago' : 'il ya une minute';
            } else if(delta < 120) {
                r = (pe.language === "eng") ? 'couple of minutes ago' : 'il ya quelques minutes';
            } else if(delta < (45 * 60)) {
                r = (pe.language === "eng") ? (parseInt(delta / 60)).toString() + ' minutes ago' : 'il ya ' + (parseInt(delta / 60)).toString() + ' minutes';
            } else if(delta < (90 * 60)) {
                r = (pe.language === "eng") ? 'an hour ago' : 'il ya une heure';
            } else if(delta < (24 * 60 * 60)) {
                r = (pe.language === "eng") ? '' + (parseInt(delta / 3600)).toString() + ' hours ago' : 'il ya ' + (parseInt(delta / 3600)).toString() + ' heures';
            } else if(delta < (48 * 60 * 60)) {
                r = (pe.language === "eng") ? ' yesterday' : ' hier';
            } else {
                r = (pe.language === "eng") ? (parseInt(delta / 86400)).toString() + ' days ago' : 'il ya ' + (parseInt(delta / 86400)).toString() + ' jours';
            }
            return r;
        }
    };
    //@merge:end
})(jQuery, pe)