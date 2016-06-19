// 1. Initialize global variables
// var total;
var activitycounter;
var submitcounter;


// 2. When the page loads, give focus to the first text field
$(function(){
  $("#name").focus();
});


// 3. Job Role section:
// First, hide "Other" input field if Javascript is enabled
$("#other-title").hide();
$("#title-label").hide();

// If JS enabled and "Other" option selected, add job title input field & placeholder text
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
        // Then, show colours based on design selected
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
    });


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
  // And clear any existing error message saying that no activities were checked
  $("#activityerror").remove();


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

});

// 6. Cost of activities
// As a user selects activities to register for, a running total is listed below the list of checkboxes.

$(":checkbox").change(function(){

    var total = 0;
    $("#cost").remove();

          if ($("input[name='all']").is(":checked"))  {
            total += 200;
          }

          $(".activities input:not([name='all'])").each(function(){
            if ($(this).is(":checked")) {
            total += 100;
            }
          });

    if (total > 0) {
    $(".activities").append("<p id='cost'>Total cost: $" + total + " </p>");
    }
});

// 7. Payment Info section

// First, make credit card the default option,
// This can be done just by removing the "Select Payment Method" option
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

$("button[type='submit']").on("click", function(e){
    // First, clear any existing error messages
    $("#nameerror").remove();
    $("#paydetailserror").remove();
    $("#ccserror").remove();
    $("#mailerror").remove();

    // Next, use variables to track problems with input;
    // these will tell us at end of function whether form can be sumbitted
     submitcounter = 0;
     activitycounter = 0;



    // 8.1 Name field can't be empty
    if ($("#name").val() === "") {
      submitcounter += 1;
      $("#name").before("<p id='nameerror' class='errortext'>Please enter your name.</p>");
      $("#name").focus();
    }

    // 8.2 At least one activity must be checked from the list under "Register for Actitivities."

      $(".activities input").each(function(){
        if ($(this).is(":checked")) {
          activitycounter += 1;
        }
        return activitycounter;
      });

      if (activitycounter === 0){
        submitcounter += 1;
        $(".activities").after("<p id='activityerror' class='errortext'>Please select an activity.</p>");
      }


    // 8.3 Credit card details
    /* If "Credit card" is the selected payment option, make sure the user supplied
    a credit card number, a zip code, and a 3 number CVV value. */
      if ($("#payment").val() == "credit card" && ($("#cc-num").val() === "" || $("#zip").val() === "" || $("#cvv").val() === "") ) {
          console.log("Credit card fields are blank.");
          submitcounter += 1;
          $("#payment").after("<p id='paydetailserror' class='errortext'>Please complete your payment details.</p>");
      }


    // 8.4 Email field must be a validly formatted e-mail address
      var emailinput = $("#mail").val();
      var emailformula = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

      if (!emailformula.test(emailinput)) {
        submitcounter += 1;
        $("#mail").before("<p id='mailerror' class='errortext'>Please enter a valid email.</p>");
      }

    // 8.5 Credit card number must be valid
      // use jQuery plugin
      $("#cc-num").validateCreditCard(function(result){
          console.log(result.valid);
          if ((result.valid === false) && ($("#cc-num").val() !== "")) {
            submitcounter += 1;
            $("#payment").after("<p id='ccserror' class='errortext'>Please enter a valid card number.</p>");
          } else {
            console.log("This is a valid credit card number");
          }
      });

  // 8.6 Finally, check whether form can be submitted
  if (submitcounter > 0) {
    e.preventDefault();
    console.log("Submit prevented");
    console.log(submitcounter);
  } else {
    console.log("Registration accepted");
    // If I don't put in an alert, the page refreshes instantly, which I
    // think is confusing for the user
    alert("Registration accepted");
  }

});
