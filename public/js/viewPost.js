$(document).ready(function() {

    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var url = window.location.href;
    var postId = url.split('')[url.length - 1];

    var loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
    if(loggedIn){
        console.log("User is logged in");
        currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
        $("#login-user-name").empty();
        $("#login-password").html(`<p>${currentUser.name}</p>`);
        $("#login-button-wrapper").html("<p class='control'><button class='button is-success' id='logout-button'>Sign Out</button></p>");
        
    } else{
  
        $("#login-button-wrapper").html("<p class='control'><button class='button is-success' id='login-button'>Login</button></p>");
        $("#login-password").html('<p class="control has-icons-left"><input class="input" type="password" placeholder="Password" id="pass"><span class="icon is-small is-left"><i class="fa fa-lock"></i></span></p>');
        $("#login-user-name").html('<p class="control has-icons-left has-icons-right"><input class="input" type="email" placeholder="userName" id="userName"><span class="icon is-small is-left"><i class="fa fa-envelope"></i></span><span class="icon is-small is-right"><i class="fa fa-check"></i></span></p>');    
    }

    var postInfo = {};
    var comments = [];

    $("#submit-comment").on("click", function(){
        var newComment = {
            body: $("#comment").val().trim(),
            UserId: currentUser.id,
            PostId: postId
        }
        $.post(`/api/comments`, newComment, function(){
            location.reload();
        });
    });

    function getPostInfo() {
        $.get(`/posts/api/posts/${postId}`, function(retPost) {
            postInfo = retPost;
            getComments();
        });
    }

    function getComments() {
        $.get(`/posts/api/post-comments/${postId}`, function(retComms) {
            comments = retComms;
            console.log(retComms)
            displayRefresh();
        });
    }

    function displayRefresh() {
        $("#title").empty();
        $("#message").empty();
        $("#commentBox").empty();

        $("#title").text(postInfo.title)
        $("#message").text(postInfo.body);
        comments.forEach(function(comment) {
            var nextComm = $("<div>");
            nextComm.addClass("message");
            nextComm.addClass("is-success");
            nextComm.css("color", "black");
            nextComm.text(comment.body);
            $("#commentBox").append(nextComm)
        })
    }

    getPostInfo();
});