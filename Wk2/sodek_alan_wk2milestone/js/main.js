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




