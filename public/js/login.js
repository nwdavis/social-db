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
      console.log(userObj);
      localStorage.setItem("currentUser", JSON.stringify(userObj));
      localStorage.setItem("loggedIn", true);
      
      window.location.href = "/"

    });
  });
  
  $("#logout-button").on("click", function(){
    
    localStorage.removeItem("currentUser");
    localStorage.setItem("loggedIn", false)

    window.location.href = "/"
    
  });

});