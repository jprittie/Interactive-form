//1. Initialize global variables
var total;
var activitycounter;

//2. When the page loads, give focus to the first text field
$(function(){
  $("#name").focus();
});

// 3. Job Role section:

// First, hide "Other" input field if Javascript is enabled
$("#other-title").hide();
$("#title-label").hide();

// If JS enabled and "Other" option selected, add text input field with id "other-title"
// and placeholder text "Your Title"
$("#title").change(function(){
    if ($("#title").val() == "other") {
      $("#other-title").show();
    } else {
      $("#other-title").hide();
    }
});


// 4. T-Shirt Info section
// Only display colours that match the selected design

    // 4.1 NOT NEEDED ON ACCOUNT OF EE
    // If no design selected, colour options don't appear,
    // and colour menu reads “Please select a T-shirt theme”

    /*if ($("#design").val() == "select theme") {
        // clear current colour dropdown
        $("#color").children().remove();
        $("#color").append($("<option>Please select a T-shirt theme</option>"));
    }*/

// 4.2 EE: Hide "Color" label and select menu until a T-Shirt design is selected
$("#colors-js-puns").hide();

$("#design").change(function(){
    // First, clear current colour dropdown
    $("#color").children().remove();
    // Then show colours based on design selected
    if ($("#design").val() == "js puns") {
        $("#color").append($("<option value='cornflowerblue'>Cornflower Blue</option>"));
        $("#color").append($("<option value='darkslategrey'>Dark Slate Grey</option>"));
        $("#color").append($("<option value='gold'>Gold</option>"));
        $("#colors-js-puns").show();
    } else if ($("#design").val() == "heart js") {
        $("#color").append($("<option value='tomato'>Tomato</option>"));
        $("#color").append($("<option value='steelblue'>Blue Steel</option>"));
        $("#color").append($("<option value='dimgrey'>Dim Grey</option>"));
        $("#colors-js-puns").show();
    } else {
        $("#colors-js-puns").hide();
    }
})

/* 5. Register for Activities section
Don't allow selection of two workshops at the same date and time.
Disable checkbox and indicate that workshop in competing time slot isn't available.
When workshop is unchecked, any competing activites are enabled again */
$(":checkbox").change(function(){

  // First, clear any existing messages about workshop conflicts
  $("#express").remove();
  $("#js-frameworks").remove();
  $("#node").remove();
  $("#js-libs").remove();

  // Next, prevent schedule conflicts and add messages
    if ($("input[name='js-frameworks']").is(":checked")) {
      $("input[name='express']").attr("disabled", true);
      $("input[name='express']").parent().after("<p id='express' class='conflict'>This workshop conflicts with your current selection.</p>");
      // Gray out colour of workshop label
      $("input[name='express']").parent().css('color','gray');
    } else {
      $("input[name='express']").attr("disabled", false);
      $("input[name='express']").parent().css('color','#000');
    }

   if ($("input[name='express']").is(":checked")) {
      $("input[name='js-frameworks']").attr("disabled", true);
      $("input[name='js-frameworks']").parent().after("<p id='js-frameworks' class='conflict'>This workshop conflicts with your current selection.</p>");
      $("input[name='js-frameworks']").parent().css('color','gray');
    } else {
      $("input[name='js-frameworks']").attr("disabled", false);
      $("input[name='js-frameworks']").parent().css('color','#000');
    }

    if ($("input[name='js-libs']").is(":checked")) {
      $("input[name='node']").attr("disabled", true);
      $("input[name='node']").parent().after("<p id='node' class='conflict'>This workshop conflicts with your current selection.</p>");
      $("input[name='node']").parent().css('color','gray');
    } else {
      $("input[name='node']").attr("disabled", false);
      $("input[name='node']").parent().css('color','#000');
    }

    if ($("input[name='node']").is(":checked")) {
      $("input[name='js-libs']").attr("disabled", true);
      $("input[name='js-libs']").parent().after("<p id='js-libs' class='conflict'>This workshop conflicts with your current selection.</p>");
      $("input[name='js-libs']").parent().css('color','gray');
    } else {
      $("input[name='js-libs']").attr("disabled", false);
      $("input[name='js-libs']").parent().css('color','#000');
    }

})

/* 6. Cost of actvities
As a user selects activities to register for, a running total is listed below the list of checkboxes. For example, if the user selects "Main conference" then Total: $200 should appear. If they add 1 workshop the total should change to Total: $300. */

$(":checkbox").change(function(){
    enableButton();
    $("#activityerror").remove();

    var total = 0;
    $("#cost").remove();

          if ($("input[name='all']").is(":checked"))  {
            total += 200;
          }

          $(".activities input:not([name='all'])").each(function(){
            if ($(this).is(":checked")) {
            total += 100;
            }
          })

    if (total > 0) {
    $(".activities").append("<p id='cost'>Total cost: $" + total + " </p>")
    }
})

// 7. Payment Info section

// First, make credit card the default option,
// This can be done just by removing the "Select Payment Method" option
// and hide the "Select method" option, because we don't need it anymore
//$("option[value='credit card']").prop("selected", true);
$("option[value='select_method']").remove();
// Then, hide payment information for the other two options
$("#paypal").hide();
$("#bitcoin").hide();
// Next, display payment sections based on chosen payment option
$("#payment").change(function(){
    $(this).val() === "credit card" ? $("#credit-card").show() : $("#credit-card").hide();
    $(this).val() === "paypal" ? $("#paypal").show() : $("#paypal").hide();
    $(this).val() === "bitcoin" ? $("#bitcoin").show() : $("#bitcoin").hide();
});



/* 8. Form validation. Display error messages and don't let the user submit
the form if any of these validation errors exist: */

$("button[type='submit']").on("click", function(){
    // First, clear any existing error messages
    //$("#activityerror").remove();
    $("#paydetailserror").remove();
    // Next, use variables to track problems with input;
    // these will tell us at end of function whether form can be sumbitted
    var submitcounter = 0;
    var activitycounter = 0;
    // Then, make sure button is enabled, in case it has previously been disabled
    $("button[type='submit']").attr("disabled", false);


    // 8.1 Name field can't be empty
    if ($("#name").val() === "") {
      submitcounter += 1;
      $("#name").focus().attr("placeholder","Please enter your name");
      $("#name").addClass("errortext");
    }

    // 8.2 At least one activity must be checked from the list under "Register for Actitivities."
      /*$(".activities input").each(function(){
        if ($(this).prop("checked", false)) {
          console.log("This isn't checked.")
          activitycounter += 1;
        }
        return activitycounter;
      })

      if ($(".activities input").length === activitycounter){
        submitcounter += 1;
        $(".activities").after("<p id='activityerror' class='errortext'>Please select an activity.</p>");
      }*/

      $(".activities input").each(function(){
        if ($(this).is(":checked")) {
          console.log("This is checked.")
          activitycounter += 1;
        }
        return activitycounter;
      })

      if (activitycounter == 0){
        submitcounter += 1;
        $(".activities").after("<p id='activityerror' class='errortext'>Please select an activity.</p>");
      }



    // 8.3 Payment option must be selected
    // This can be done just by removing the "Select Payment Method" option
    // (which makes sense anyway, since Credit Card must be the default)
    $("option[value='select_method']").remove();



    // 8.4 Credit card details
    /*If "Credit card" is the selected payment option, make sure the user supplied
    a credit card number, a zip code, and a 3 number CVV value.*/
      if ($("#payment").val() == "credit card" && ($("#cc-num").val() == "" || $("#zip").val() == "" || $("#cvv").val() === "") ) {
          console.log("Credit card fields are blank.")
          submitcounter += 1;
          $("#payment").after("<p id='paydetailserror' class='errortext'>Please complete your payment details.</p>");
      }


    // 8.4 Email field must be a validly formatted e-mail address
    //***WHY DID THIS WORK WHEN I HIT THE ENTER KEY ON THE FIELD?
      var emailinput = $("#mail").val();
      var emailformula = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

      if (!emailformula.test(emailinput)) {
        submitcounter += 1;
        $("#mail").attr("placeholder","Please enter a valid email");
        $("#mail").addClass("errortext");
        //$("#mail").after("<p id='emailerror' class='errortext'>Please enter a valid email.</p>");
      }

    // 8.5 Credit card number must be valid
    /* if ($("option[value='credit card']").is(":selected")){
        var ccinput = $("#cc-num").val();
        var ccformula =
    } */


  if (submitcounter > 0) {
  $("button[type='submit']").attr("disabled", true);
  }

});


function enableButton(){
  $("button[type='submit']").attr("disabled", false);
}

// IF SUBMIT BUTTON WORKS, FORM CLEARS; IS THAT THE RIGHT THING TO DO?

// HITTING ENTER ON ANY INPUT SUBMITS FORM - MUST DISABLE THIS
// At one point, I saw bitcoin and paypal info show when they shouldn't have

// How do I jump to part of page where error is?
