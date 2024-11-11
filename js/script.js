$(document).ready(function () {
  const currentPath = window.location.pathname.split("/").pop();

  // Highlight active navigation link based on current path
  $("nav ul li a").each(function () {
    if ($(this).attr("href") === currentPath) {
      $(this).addClass("active");
    }
  });

  // Toggle navbar visibility on hamburger click
  const $hamburger = $(".hamburger");
  const $navbar = $(".nav-bar");

  if ($hamburger.length && $navbar.length) {
    // Check that both elements exist
    $hamburger.on("click", function () {
      $navbar.toggleClass("active");
    });
  } else {
    console.error("One or more elements (hamburger, navbar) not found.");
  }

  $("#sameas").change(function () {
    if ($(this).is(":checked")) {
      $("#billing").val($("#address").val());
    } else {
      $("#billing").val(""); // Clear billing if unchecked
    }
  });

  // Function to toggle the visibility of .deliver-only based on #delivery checked state
  function toggleDeliveryOnly() {
    if ($("#delivery").is(":checked")) {
      $(".deliver-only").show(250);
      $(".same").show(250);
    } else {
      $(".deliver-only").hide(250);
      $(".same").hide(250);
    }
    $("#address").val("");
    $("input[name='sameas']").prop("checked", false);
  }

  function togglePayment() {
    if ($("#onl").is(":checked")) {
      $(".onlinepayment").show(250);
    } else {
      $(".onlinepayment").hide(250);
    }
    // Clear all credit card selections when switching to "pay on pickup"
    $("input[name='credit']").prop("checked", false);
    $("#card-number").val("");
  }

  // Initial call to set visibility based on the current checked radio button when the page loads
  toggleDeliveryOnly();
  togglePayment();

  // Attach change event listeners to both radio buttons
  $("input[name='takeout']").on("change", toggleDeliveryOnly);
  $("input[name='payment']").on("change", togglePayment);
});

function signupValidate() {
  var fname = $("#fname").val();
  var email = $("#email").val();
  var password = $("#password").val();
  var genderm = $("#genderm").is(":checked");
  var genderf = $("#genderf").is(":checked");
  var terms = $("#terms").is(":checked");
  var errMsg = "";
  var result = true;

  if (fname == "") {
    errMsg += "Full name cannot be empty.\n\n";
  } else if (!/^[A-Za-z\s]+$/.test(fname)) {
    errMsg +=
      "Full name can only contain alphabetic characters and spaces.\n\n";
  } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(fname)) {
    errMsg +=
      "Full name must contain at least one uppercase and one lowercase letter.\n\n";
  }

  if (email == "") errMsg += "Email cannot be empty.\n\n";

  if (password == "") {
    errMsg += "Password cannot be empty.\n\n";
  }

  if (password != "" && password.length < 9)
    errMsg += "Password must be at least 9 characters.\n\n";

  if (!genderm && !genderf) errMsg += "A gender must be selected.\n\n";

  if (!terms) errMsg += "You must agree to our ToS in order to continue.\n\n";

  if (errMsg != "") {
    alert(errMsg);
    result = false;
  }
  return result;
}

function orderValidate() {
  var email = $("#email").val();
  var address = $("#address").val();
  var billing = $("#billing").val();
  var postcode = $("#postcode").val();
  var contact = $("#contact").val();
  var cardnumber = $("#card-number").val();
  var delivery = $("#delivery").is(":checked");
  var pickup = $("#pickup").is(":checked");
  var pop = $("#pop").is(":checked");
  var onl = $("#onl").is(":checked");
  var visa = $("#visa").is(":checked");
  var mastercard = $("#mastercard").is(":checked");
  var amex = $("#amex").is(":checked");
  var sameas = $("#sameas").is(":checked");
  var errMsg = "";
  var result = true;

  if (!delivery && !pickup) errMsg += "You must choose a shipping method.\n\n";

  if (delivery && address == "")
    errMsg += "Delivery address cannot be empty.\n\n";

  if (sameas && address === "") {
    errMsg += "Please enter your delivery address first.\n\n";
  }

  if (!sameas && billing === "") {
    errMsg += "Billing address cannot be empty.\n\n";
  }

  if (postcode == "") {
    errMsg += "Postcode cannot be empty.\n\n";
  } else if (!/^\d{4}$/.test(postcode)) {
    errMsg += "Postcode must be a 4-digit number.\n\n";
  }

  if (contact == "") {
    errMsg += "Contact number cannot be empty.\n\n";
  } else if (!/^\d+$/.test(contact)) {
    errMsg += "Contact number can only contain numbers.\n\n";
  }

  if (email == "") errMsg += "Email cannot be empty.\n\n";

  if (!pop && !onl) errMsg += "You must choose a payment method.\n\n";

  if (onl && !visa && !mastercard && !amex)
    errMsg += "You must choose a a type of credit card.\n\n";

  if ((visa || mastercard || amex) && cardnumber == "") {
    errMsg += "Please enter your credit card number.\n\n";
  } else if ((visa || mastercard) && cardnumber.length != 16) {
    errMsg += "16 digits for Visa and MasterCard.\n\n";
  } else if (amex && cardnumber.length != 15) {
    errMsg += "15 digits for American Express.\n\n";
  } else if (cardnumber !== "" && !/^\d+$/.test(cardnumber)) {
    errMsg += "Credit card number can only contain numbers.\n\n";
  }

  if (errMsg != "") {
    alert(errMsg);
    result = false;
  }
  return result;
}

function init() {
  $("#regform").submit(signupValidate);
  $("#orderform").submit(orderValidate);
}

window.onload = init;
