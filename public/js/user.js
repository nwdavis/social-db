$(document).ready(function() {

  $(document).on("click", "#new-user-submit", handleUserFormSubmit);
  $(document).on("click", "#cancel-btn", handleCancelButtonPress);

  // A function to handle what happens when the form is submitted to create a new User
  function handleUserFormSubmit(event) {
    console.log("Submit function called");
    event.preventDefault();

    var userNameInput = $("#user-name");
    var password1 = $("#password-1").val().trim();
    var password2 = $("#password-2").val().trim();

    // Don't do anything if the name fields hasn't been filled out
    if (!userNameInput.val().trim() || !password1 || !password2) {
      return;
    }
    // Calling the upsertUser function and passing in the value of the name input
    if(password1 === password2){
      $("#passwordMatchAlert").empty();
      upsertUser(
        {
        name: userNameInput.val().trim(),
        login_password: password1
        }
      );
    } else{
      $("#passwordMatchAlert").html("Passwords must match");
    }
    
  }

  // A function for creating an user. Calls getUsers upon completion
  function upsertUser(userData) {
    $.post("/api/user/create", userData)
      .then(function(){
        window.location = "/"
      });
  }

  // Function for handling what happens when the delete button is pressed
  function handleCancelButtonPress() {
   password1.empty();
   password2.empty();
   userNameInput.empty();
  }
});




