$(document).ready(function() {
    /* global moment */
    var loggedIn = JSON.parse(localStorage.getItem("loggedIn"));

    var currentUser = {};
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

    // postContainer holds all of our posts
    var postContainer = $("#postContainer");
    var postCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    // $(document).on("click", "button.delete", handlePostDelete);
    //   $(document).on("click", "button.edit", handlePostEdit);
    // Variable to hold our posts
    var posts;

    // The code below handles the case where we want to get blog posts for a specific user
    // Looks for a query param in the url for user_id
    var url = window.location.search;
    var userId;
    if (url.indexOf("?user_id=") !== -1) {
        userId = url.split("=")[1];
        getPosts(userId);
    }
    // If there's no userId we just get all posts as usual
    else {
        getPosts();
    }


    // This function grabs posts from the database and updates the view
    function getPosts(user) {
        userId = user || "";
        if (userId) {
            userId = "/?user_id=" + userId;
        }
        $.get("/api/posts" + userId, function(data) {
            console.log("Posts", data);
            posts = data;
            if (!posts || !posts.length) {
                displayEmpty(user);
            } else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete posts
    function deletePost(id) {
        $.ajax({
                method: "DELETE",
                url: "/api/posts" + id
            })
            .done(function() {
                getPosts(postCategorySelect.val());
            });
    }

    // InitializeRows handles appending all of our constructed post HTML inside postContainer
    function initializeRows() {
        postContainer.empty();
        var postsToAdd = [];
        for (var i = 0; i < posts.length; i++) {
            postsToAdd.push(createNewRow(posts[i]));
        }
        postContainer.append(postsToAdd);
    }

    // This function constructs a post's HTML
    function createNewRow(post) {
        var formattedDate = new Date(post.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newPostPanel = $("<div>");
        newPostPanel.addClass("panel panel-default");
        var newPostPanelHeading = $("<div>");
        newPostPanelHeading.addClass("panel-heading");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-info");
        var newPostTitle = $("<h2>");
        var newPostDate = $("<small>");
        var newPostUser = $("<h5>");
        // newPostUser.text("Written by: " + post.id + post.User.name);
        newPostUser.css({
            float: "right",
            color: "blue",
            "margin-top": "-10px"
        });
        var newPostPanelBody = $("<div>");
        newPostPanelBody.addClass("panel-body");
        var newPostBody = $("<p>");
        newPostTitle.html(`<a href="posts/${post.id}">` + post.title + "</a>" + " " + " ");
        newPostBody.text(post.body);
        newPostDate.text(formattedDate);
        // newPostUser.text("Written by:  " + post.id + " " + post.User.name);
        newPostTitle.append(newPostDate);
        newPostPanelHeading.append(deleteBtn);
        // newPostPanelHeading.append(editBtn);
        newPostPanelHeading.append(newPostTitle);
        newPostPanelHeading.append(newPostUser);
        newPostPanelBody.append(newPostBody);
        newPostPanel.append(newPostPanelHeading);
        newPostPanel.append(newPostPanelBody);
        newPostPanel.data("post", post);
        return newPostPanel;
    }

    // This function figures out which post we want to delete and then calls deletePost
    function handlePostDelete() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        deletePost(currentPost.id);
    }

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handlePostEdit() {
        var currentPost = $(this)
            .parent()
            .parent()
            .data("post");
        window.location.href = "/landing" + currentPost.id;
    }

    // This function displays a messgae when there are no posts
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for user #" + id;
        }
        postContainer.empty();
        var messageh2 = $("<h2>");
        messageh2.css({ "text-align": "center", "margin-top": "50px" });
        messageh2.html("No posts yet");
        postContainer.append(messageh2);
    }

});

// this removes the modal once closed out
jQuery('#modal-card').on('hidden', function(e) {
    jQuery(this).remove();
});