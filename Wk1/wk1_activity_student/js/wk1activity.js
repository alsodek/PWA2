// JavaScript Document

(function($){  //10. Explain why this is used instead of a document ready function. Comment your answer out on line 4.
// You use this because

//4. Add the jQuery function-select the h2 of this simple web page.
    $("h2");
    
//5. Selectors using IDS
    $("ul[id=hlisting]");

//6. Selectors using Classes
    $("li[class$=america]");

//7. Manipulator
    var messages = $("<span id='phone'>").append("1-555-Tibbles");

//8. Manipulator-Before
    $("class=buy").prepend("messages");

//9. CSS Method - Complete this line
 $(".trip").on("mouseenter", function() {
    $(this).html("background-color", "#252b30");
  });
  


})(jQuery) //Closes main tag