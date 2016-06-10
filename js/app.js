//1. Initialize global variables


//2. When the page loads, give focus to the first text field
$(document).ready(function(){
  $("#name").focus();
});

/* 3. Job Role section:
When "Other" option is selected, add text input field with id "other-title"
and placeholder text "Your Title" */
$("#title").change(function(){
    if ($("#title").val() == "other") {
      $("#title").after($("<input type='text' id='other-title' placeholder='Your Title'>"));
    } else {
      $("#other-title").remove();
    }
});
