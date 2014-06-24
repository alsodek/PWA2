/*  
	Your Project Title
	Author: You
*/

(function($){
	
    
    /*
	===============================================
	========================= LOGIN	
	*/
    
    $('#signinButton').click(function(){
        var user = $('#user').val();
        var pass = $('#pass').val();
        console.log("This notifies you if the password is working");
        $.ajax({
            url:'xhr/login.php',
            type: 'post',
            dataType: 'json',
            data: {
                username: user,
                password: pass
            },
            success:function(response){
                console.log("Test User");
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign('admin.html')
                };
            }
        });
    });
	
    
    /*
	===============================================
	========================= LOGOUT
	*/
    
    $('#logOut').click(function(e){
        e.preventDefault;
        $.get('xhr/logout.php', function(){
            window.location.assign('index.html')
        })
    });
    
    
    
    /*
	===============================================
	========================= REGISTRATION PAGE
	*/
    
    $('#register').on('click', function(){
        var firstname = $('#first').val(),
            lastname = $('#last').val(),
            username = $('#userName').val(),
            email = $('#email').val(),
            password = $('#password').val();
            console.log(firstname+' '+lastname+' '+username+' '+email+' '+password);
        
        $.ajax({
            url: 'xhr/register.php',
            type: 'post',
            dataType: 'json',
            data: {
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: password
            },
            
            success: function(response){
                if (response.error){
                    alert(response.error);
                }else{
                    window.location.assign('admin.html');
                }
            }
        });
    });
    
    
    
    /*
	===============================================
	========================= GO TO PROJECTS BUTTON
	*/
    
    
    $('.projectsbtn').on('click', function(e){
        e.preventDefault();
        window.location.assign('projects.html');
    });
    
    
    /*
	===============================================
	========================= GO TO DASHBOARD BUTTON
	*/
    
    
    $('.dashboard').on('click', function(e){
        e.preventDefault();
        window.location.assign('index.html');
    });
    
    
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
	======================================== New Projects	
	*/
    
    
    $('#addButton').on('click', function(e){
        e.preventDefault();
        var projName = $('#projectName').val(),
            projDesc = $('#projectDescription').val(),
            projDue = $('#projectDueDate').val(),
            status = $('input[name = "status"]:checked').prop("id");
        
        $.ajax({
            url: "xhr/new_project.php",
            type: "post",
            dataType: "json",
            data: {
                projectName: projName,
                projectDescription: projDesc,
                dueDate: projDue,
                status: status
            },
            success: function(response){
                console.log('Testing for success');
                
                if(response.error){
                    alert(response.error);
                }else{
                    window.location.assign("projects.html");
                };    
            }
        });
    });
    
    
    
    
    /*
	===============================================
	======================================== Get Projects	
	*/
    
    var projects = function(){
    
        $.ajax({
            url: 'xhr/get_projects.php',
            type: 'get',
            dataType: 'json',
            success: function(response){
                if(response.error){
                    console.log(response.error);
                }else{
                    
                    for(var i=0, j=response.projects.length; i < j; i++){
                        var result = response.projects[i];
                        
                        $(".projects").append(
                            '<div style="border:1px solid black">' +
                            " <input class='projectid' type='hidden' value='" + result.id + "'>" +
                            " Project Name: " + result.projectName + "<br>" +
                            " Project Description: " + result.projectDescription + "<br>" +
                            " Project Due Date: " + result.dueDate + "<br>" +
                            " Project Status: " + result.status + "<br>"
                            + '<button class="deletebtn">Delete</button>'
                            //+ '<button class="editbtn">Edit</button>'
                            + '</div> <br>'
                        );    
                    };   
                    $('.deletebtn').on('click', function(e){
                        var pid = $(this).parent().find(".projectid").val();
                        console.log('test delete');
                        $.ajax({
                            url: 'xhr/delete_project.php',
                            data: {
                                projectID: pid
                            },
                            type: 'POST',
                            dataType: 'json',
                            success: function(response){
                                console.log('Testing for sccess');
                                
                                if(response.error){
                                    alert(response.error);
                                }else{
                                    //console.log(result.id);
                                    window.location.assign("projects.html");
                                };
                            }
                        });
                    }); //End Delete
                }
            }
        })
    }
    projects();
    
    
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




