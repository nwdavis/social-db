$(document).ready(function() {
  var loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  var subject; 
  var currentUser = {};

  if(loggedIn){
      console.log("User is logged in");
      currentUser = JSON.parse(localStorage.getItem("currentUser"));

      $("#login-user-name").empty();
      $("#login-password").html(`<p>${currentUser.name}</p>`);
      $("#login-button-wrapper").html("<p class='control'><button class='button is-success' id='logout-button'>Sign Out</button></p>");
      
  } else {

      $("#login-button-wrapper").html("<p class='control'><button class='button is-success' id='login-button'>Login</button></p>");
      $("#login-password").html('<p class="control has-icons-left"><input class="input" type="password" placeholder="Password" id="pass"><span class="icon is-small is-left"><i class="fa fa-lock"></i></span></p>');
      $("#login-user-name").html('<p class="control has-icons-left has-icons-right"><input class="input" type="email" placeholder="userName" id="userName"><span class="icon is-small is-left"><i class="fa fa-envelope"></i></span><span class="icon is-small is-right"><i class="fa fa-check"></i></span></p>');    
  }

  

  function renderSubjectOptions() {
    

    var subjects = ["general", "resources", "careers", "random"];
    var rowsToAdd = [];
    for (var i = 0; i < subjects.length; i++) {
      rowsToAdd.push(createSubjectOption(subjects[i]));
    }

    $("#subjects").empty();
    console.log(rowsToAdd);
    console.log($("#subjects"));
    $("#subjects").append(rowsToAdd);
    $("#subjects").val(subject);
  }

  function createSubjectOption(subject){
    var listOption = $("<option>");
    listOption.attr("value", subject);
    listOption.text(subject);
    return listOption;
  }

  renderSubjectOptions();

  $("#new-post-submit").on("click", function(event){
    event.preventDefault();

    
    console.log("submitNewPost called")

     // Getting jQuery references to the post body, title, form, and user select
    var bodyInput = $("#body");
    var titleInput = $("#title");

    var newPost = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      subject: $("#subjects").val(),
      UserId: currentUser.id
    }
    console.log("here is the new post : ")
    console.log(newPost);

    $.post("/api/posts", newPost, function(postObj){
      window.location.href = `/posts/${postObj.id}`;
    });
  });
  
});
  
//   // var userSelect = $("#user");
//   // Adding an event listener for when the form is submitted
//   $(document).on("click", "#new-post-submit", handleFormSubmit);
//   // $(linkForm).on("submit", handleFormSubmit);
//   // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
//   var url = window.location.search;
//   var postId;
//   var userId;
//   // Sets a flag for whether or not we're updating a post to be false initially
//   var updating = false;

//   // If we have this section in our url, we pull out the post id from the url
//   // In '?post_id=1', postId is 1
//   if (url.indexOf("?post_id=") !== -1) {
//     postId = url.split("=")[1];
//     getPostData(postId, "post");
//   }
//   // Otherwise if we have an user_id in our url, preset the user select box to be our User
//   else if (url.indexOf("?user_id=") !== -1) {
//     userId = url.split("=")[1];
//   }

//   // Getting the users, and their posts
//   // getUsers();

//   // A function for handling what happens when the form to create a new post is submitted
//   function handleFormSubmit(event) {
//     event.preventDefault();
//     // Wont submit the post if we are missing a body, title, or user
//     if (!titleInput.val().trim() || !bodyInput.val().trim()) {
//       console.log("ERROR!");
//       return;
//     }
//     // Constructing a newPost object to hand to the database
//     var newPost = {
//       title: titleInput
//         .val()
//         .trim(),
//       body: bodyInput
//         .val()
//         .trim(),
//       UserId: currentUser.id
//     };

//     // If we're updating a post run updatePost to update a post
//     // Otherwise run submitPost to create a whole new post
//     // if (updating) {
//     //   newPost.id = postId;
//     //   updatePost(newPost);
//     // }
//     // else {
//       submitPost(newPost);
//     // }
//   }

//   // Submits a new post and brings user to landing/index page upon completion
//   function submitPost(post) {
//     $.post("/api/posts", post, function() {
//       window.location.href = "/";
//     });
//   }

//   // Gets post data for the current post if we're editing, or if we're adding to an user's existing posts
//   // function getPostData(id, type) {
//   //   var queryUrl;
//   //   switch (type) {
//   //     case "post":
//   //       queryUrl = "/api/posts/" + id;
//   //       break;
//   //     case "user":
//   //       queryUrl = "/api/users/" + id;
//   //       break;
//   //     default:
//   //       return;
//   //   }
//   //   $.get(queryUrl, function(data) {
//   //     if (data) {
//   //       console.log(data.UserId || data.id)
//   //       // If this post exists, prefill our link forms with its data
//   //       titleInput.val(data.title);
//   //       bodyInput.val(data.body);
//   //       userId = data.UserId || data.id;
//   //       // If we have a post with this id, set a flag for us to know to update the post
//   //       // when we hit submit
//   //       updating = true;
//   //     }
//   //   });
//   // }

//   // A function to get Users and then render our list of Users
//   // function getUsers() {
//   //   $.get("/api/users", renderUserList);
//   // }
//   // Function to either render a list of users, or if there are none, direct the user to the page
//   // to create an user first
//   // function renderUserList(data) {
//   //   if (!data.length) {
//   //     window.location.href = "/users";
//   //   }
//   //   var rowsToAdd = [];
//   //   for (var i = 0; i < data.length; i++) {
//   //     rowsToAdd.push(createUserRow(data[i]));
//   //   }
//   //   userSelect.empty();
//   //   console.log(rowsToAdd);
//   //   console.log(userSelect);
//   //   userSelect.append(rowsToAdd);
//   //   userSelect.val(userId);
//   // }

//   // Creates the user options in the dropdown
//   // function createUserRow(user) {
//   //   var listOption = $("<option>");
//   //   listOption.attr("value", user.id);
//   //   listOption.text(user.id + " " + user.name);
//   //   // listOption.text(user.name);
//   //   return listOption;
//   // }

//   // Update a given post, bring user to the blog page when done
//   // function updatePost(post) {
//   //   $.ajax({
//   //     method: "PUT",
//   //     url: "/api/posts",
//   //     data: post
//   //   })
//   //   .done(function() {
//   //     window.location.href = "/landing";
//   //   });
//   }
// });
