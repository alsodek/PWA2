/*  
	Your Project Title
	Author: You
*/

(function($){
	
	
	/*
	===============================================
	========================= APPLICATION FUNCTIONS	
	*/
	
	
	var checkLoginState = function(){
		$.ajax({
			url: 'xhr/check_login.php',
			type: 'get',
			dataType: 'json',
			success: function(response){
				// if user, loadApp()
				// if error, loadLanding()
			}
		});
	};
	
	

	// 	============================================
	//	SETUP FOR INIT
		
	var init = function(){
	
		checkLoginState();
	};
	
	
	init();
	
    
    /*
	===============================================
	======================================== Tooltip	
	*/
    
    $('.masterTooltip').hover(function(){
        // Hover over 
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
    }, function() {
        // Hover out
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
    }).mousemove(function(e) {
        var mousex = e.pageX + 20; 
        var mousey = e.pageY + 10;
        $('.tooltip')
        .css({ top: mousey, left: mousex })
    });
		
    
     /*
	===============================================
	======================================== Tabbed Accordion	
	*/
    
    $('ul.tabs').each(function(){
        // Keep track of each tab and which one is active.
        var $active, $content, $links = $(this).find('a');
        
        // If location.hash matches a link use that tab.
        // If no match is found, use first link.
        $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
        $active.addClass('active');
        
        $content = $($active[0].hash);
        
        // Hide the remaining content.
        $links.not($active).each(function () {
            $(this.hash).hide();
        });
        
        // Bind the click event handler
        $(this).on('click', 'a', function(e){
            // Make old tab inactive
            $active.removeClass('active');
            $content.hide();
            
            // Update the variables with the new link and content.
            $active = $(this);
            $content = $(this.hash);
            
            // Make the tab active.
            $active.addClass('active');
            $content.show();
            
            // Prevent the default
            e.preventDefault();
        });
    });
    
    
	/*
	===============================================
	======================================== Add Modal	
	*/
	
    $('.modalClick').on('click', function(event){
        event.preventDefault();
        $('#overlay')
            .fadeIn()
            .find('#modal')
            .fadeIn();
    });
    
     $('.close').on('click', function(event){
        event.preventDefault();
        $('#overlay')
            .fadeOut()
            .find('#modal')
            .fadeOut();
    });
    
	
    
    /*
	===============================================
	======================================== Fading	
	*/
    
    $('.mystatus').mouseover(function(){
        $(this).fadeTo(100, .3);
    });
    
    $('.mystatus').mouseout(function(){
        $(this).fadeTo(100, 1);
    });
    
    
    /*
	===============================================
	======================================== EVENTS	
	*/
    
	/*	
	==================================== END EVENTS 
	===============================================
	*/
		
		

	
})(jQuery); // end private scope




