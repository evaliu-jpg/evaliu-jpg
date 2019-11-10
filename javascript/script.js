// These are the constraints used to validate the form
var constraints = {
  name: {
    // You need to pick a username too
    presence: true,
    // And it must be between 3 and 20 characters long
    length: {
      minimum: 3
    },
    format: {
      // We don't allow anything that a-z and 0-9
      pattern: "[a-z ]+",
      // but we don't care if the username is uppercase or lowercase
      flags: "i",
      message: "can only contain letters"
    }
  },
  email: {
    // Email is required
    presence: true,
    // and must be an email (duh)
    email: true
  },
  username: {
    // You need to pick a username too
    presence: true,
    // And it must be between 3 and 20 characters long
    length: {
      minimum: 3,
      maximum: 20
    },
    format: {
      // We don't allow anything that a-z and 0-9
      pattern: "[a-z0-9]+",
      // but we don't care if the username is uppercase or lowercase
      flags: "i",
      message: "can only contain a-z and 0-9"
    }
  },
  password: {
    // Password is also required
    presence: true,
    // And must be at least 5 characters long
    length: {
      minimum: 8
    }
  },
  country: {
    // You also need to input where you live
    presence: true,
    // And we restrict the countries supported to Sweden
    inclusion: {
      within: ["AU"],
      // The ^ prevents the field name from being prepended to the error
      message: "^Sorry, this service is currently for Australians only"
    }
  },
  postcode: {
    // postcode is optional but if specified it must be a 4 digit long number
    format: {
      pattern: "\\d{4}",
      message: "Postcode must be 4 digits"
    }
  }
};

// Hook up the form so we can prevent it from being posted
var form = document.querySelector("form");
form.addEventListener("submit", function(ev) {
  ev.preventDefault();
  handleFormSubmit(form);
});

// Hook up the inputs to validate on the fly
var inputs = document.querySelectorAll("input, textarea, select");
console.log(inputs);
for (var i = 0; i < inputs.length; ++i) {
  inputs.item(i).addEventListener("change", function(ev) {
    var errors = validate(form, constraints) || {};
    showErrorsForInput(this, errors[this.name]);
  });
}

function handleFormSubmit(form, input) {
  // validate the form against the constraints
  var errors = validate(form, constraints);
  // then we update the form to reflect the results
  showErrors(form, errors || {});
  if (!errors) {
    showSuccess();
  }
}

// Updates the inputs with the validation errors
function showErrors(form, errors) {
  // We loop through all the inputs and show the errors for that input
  form.querySelectorAll("input[name], select[name]").forEach(function(input) {
    // Since the errors can be null if no errors were found we need to handle
    // that
    showErrorsForInput(input, errors && errors[input.name]);
  });
}

// Shows the errors for a specific input
function showErrorsForInput(input, errors) {
  // This is the root of the input
  var formGroup = closestParent(input.parentNode, "form-group"),
    // Find where the error messages will be insert into
    messages = formGroup.querySelector(".messages");
  // First we remove any old messages and resets the classes
  resetFormGroup(formGroup);
  // If we have errors
  if (errors) {
    // we first mark the group has having errors
    formGroup.classList.add("has-error");
    // then we append all the errors
    errors.forEach(function(error) {
      addError(messages, error);
    });
  } else {
    // otherwise we simply mark it as success
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
  // and remove any old messages
  formGroup.querySelectorAll(".help-block.error").forEach(function(el) {
    el.parentNode.removeChild(el);
  });
}

// Adds the specified error with the following markup
// <p class="help-block error">[message]</p>
function addError(messages, error) {
  var block = document.createElement("p");
  block.classList.add("help-block");
  block.classList.add("error");
  block.innerText = error;
  messages.appendChild(block);
}

function showSuccess() {
  // We made it \:D/
  alert("Success!");
}

/* GOOGLE MAPS FILL */

<script
  async
  defer
  src="https://maps.googleapis.com/maps/api/js?key=
  AIzaSyB9pDl5esbJs7zzGNQb15b4R5d5-BOTOKk
  &callback=initMap"
  type="text/javascript"
></script>;

var placeSearch, autocomplete;

var componentForm = {
  street_number: "short_name",
  route: "long_name",
  locality: "long_name",
  administrative_area_level_1: "short_name",
  country: "long_name",
  postal_code: "short_name"
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    { types: ["geocode"] }
  );

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(["address_component"]);

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = "";
    document.getElementById(component).disabled = false;
  }

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.

<script
  async
  defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDWDzrUadelfUD2cmWQlYXLUsCn9VpffKs&callback=initMap"
  type="text/javascript"
></script>;

function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
