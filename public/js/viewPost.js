$(document).ready(function() {
    var url = window.location.href;
    console.log(url);
    var postId = url.split('')[url.length - 1];
    var postInfo = {};
    var comments = {};

    function getPostInfo() {
        $.get(`api/posts/${postId}`, function(retPost) {
            postInfo = retPost;
            getComments();
        });
    }

    function getComments() {
        $.get(`api/post-comments/${postId}`, function(retComms) {
            comments = retComms;
            displayRefresh();
        });
    }

    function displayRefresh() {
        $("#postBox").empty();
        $("#commentBox").empty();

        $("#postBox").text(postInfo.body);
        comments.forEach(function(comment) {
            var nextComm = $("<div>");
            nextComm.text(comment.body);
            $("#commentBox").append(nextComm)
        })
    }

    getPostInfo();
});