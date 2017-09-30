$(document).ready(function() {

  //when login is clicked gather username/pw, and call backend
  $("#login-button").on("click", function(){
    var userName = $("#userName").val().trim()
    var userPass = $("#pass").val().trim()

    $.ajax({
      method: "GET",
      url: `/api/user/${userName}/${userPass}`
    })
    .done(function(userObj) {
      
      localStorage.setItem("currentUser", JSON.stringify(userObj));
      
      window.location.href = "/"

    });
  });

});