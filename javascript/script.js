
  // These are the constraints used to validate the form
  var constraints = {
    name: {
      presence: true,
      length: {
        minimum: 3,maximum:15
      },
      format: {
        pattern: "[a-z ]+",
        flags: "i",
        message: "can only contain letters"
      }
    },
    email: {
      // Email is required
      presence: true,
      email: true
    },

      
  };


  var form = document.querySelector("form");
  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    handleFormSubmit(form);
  });


  var inputs = document.querySelectorAll("input, textarea, select");
  console.log(inputs);
  for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function(ev) {

      var errors = validate(form, constraints) || {};
      showErrorsForInput(this, errors[this.name])
    });
  }

  function handleFormSubmit(form, input) {
    // validate the form against the constraints
    var errors = validate(form, constraints);
    //update show
    showErrors(form, errors || {});
    if (!errors) {
      showSuccess();
    }
  }

  function showErrors(form, errors) {
    form.querySelectorAll("input[name], select[name]").forEach( function(input) {
// show no err
      showErrorsForInput(input, errors && errors[input.name]);
    });
  }

 // show error
  function showErrorsForInput(input, errors) {
    var formGroup = closestParent(input.parentNode, "form-group")
      , messages = formGroup.querySelector(".messages");
    resetFormGroup(formGroup);
    // If we have errors
    if (errors) {
      formGroup.classList.add("has-error");
      errors.forEach(function(error) {
        addError(messages, error);

        //append
      });
    } else {
      formGroup.classList.add("has-success");
    }
  }

  // Recusively finds the closest parent that has the specified class
  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }

  function resetFormGroup(formGroup) {
    // Remove the success and error classes
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    formGroup.querySelectorAll(".help-block.error").forEach(function(el) {
      el.parentNode.removeChild(el);
    });
  }

  function addError(messages, error) {
    var block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    block.innerText = error;
    messages.appendChild(block);
  }

  function showSuccess() {
    alert("Success!");
  }


  // Credit Card and Payment Details
  //jQuery

  var owner = $('#owner'),
    CVV = $("#cvv"), 
    cardNumber = $('#cardNumber'),
    cardNumberField = $('#card-number-field'),

    var constraints = {
    cvv: {
      // Email is required
      presence: true,
      pattern:"1-9",
      length: {
        minimum: 3, maximum:3,
        message: "check the back of your credit card for the three digits"
      },
    },
  }



// Aniamtion steps left
let li = $("li"); 
let backgroundInterval = setInterval(function(){
    li.toggleClass("li-change");
 },100)

