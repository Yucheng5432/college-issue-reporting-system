
(function($){
    let createPostForm  = $("#createpostForm");
    let createPostsList = $("#createPostsList");
    let createPostTitle = $("#createpostTitle");
    let createPostBody = $("#createpostBody");
    let createPostTag = $("#createpostTag");


    createPostForm.submit(function(event){
        event.preventDefault();


        $.ajax({
            url: "/dashBoard",
            type: "get",
            data:{
                "title": createPostTitle.val(),

            },
            success : function(data){
                let post = data;
                createPostsList.append("<label>"+createPostTitle.val +"</label><br>");
                createPostsList.append("<textarea >"+createPostBody+"</textarea><br>");
                createPostsList.append("<label>comment</label><br>");
                createPostsList.append("<textarea >"+createPostTag+"</textarea><br>");
            }
        });
    });
    




})