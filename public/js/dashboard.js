(function ($) {
   let searchTitle = $("#searchTitle");//search Title
   let searchPostForm = $("#searchForm");//search input posts
   let searchTerm = $("#searchTerm");// input 
   let searchPostList = $("#searchPostsList"); // searched postsList
   let errorInput = $("#errorInput"); //input invalid words
   let noResult = $("#noResult"); //no result by searching
   let private = $("#private"); //get private div
   
  $("#delete").on("click", function (event) {
    event.preventDefault();
    $.ajax({
      type: "DELETE",
      url: "/comments/",
    });
  });

  //search posts
  searchPostForm.submit(function(event){
    event.preventDefault();
    let query = searchTerm.val();
    console.log(query);
    console.log(typeof(query));
    if(typeof(query)==='undefined'){
      errorInput.attr("style","display:block");
      searchTerm.focus();
    }
    if(searchTerm.val().trim()===""){
      errorInput.attr("style","display:block");
      searchTerm.focus();
    }
    if(typeof(query)!= 'string'){
      errorInput.attr("style","display:block");
      searchTerm.focus();
    }
    if(query.split(" ").join("").length === 0){
      errorInput.attr("style","display:block");
      searchTerm.focus();
    }
    if(query ===" "){
      errorInput.attr("style","display:block");
      searchTerm.focus();
    }
    else{
      private.attr("style","display:none");
      searchTitle.attr("style","display:block");
      errorInput.attr("style", "display:none;background-color: white;");
      noResult.attr("style", "display:none;background-color: white;");
      searchPostList.empty();

  $.ajax({
    type: "post",
    url: "http://localhost:3000/posts/search/searchterm",
    data: {
        searchterm: query
    },

    success: function(data){
      let posts = $(data);
      if(posts.length === 0){
        noResult.attr("style", "display:block");
        searchTerm.focus();
      }
      if(posts && posts.length !== 0){
        searchPostList.attr("style","display:block;background-color: white;");
        errorInput.attr("style","display:none;background-color: white;");
        noResult.attr("style","display:none;background-color: white;");
      }
      for(let i=0;i<posts.length;i++){
        let post = posts[i];
        searchPostList.append("<h4 >"+ post.title +"</h4>");
        searchPostList.append("<p class=\"searchedPostsdate-div\">"+" by"+ post.username +"on"+ post.date +"</label><p>");
        searchPostList.append("<p class=\"searchedPost-body\">"+ post.body +"</p>");
        searchPostList.append("<label class=\"searchedtags\">Tag: </label>");
        for(let j=0;j<post.tags.length;j++){
          searchPostList.append("<label class=\"searchedtaglable\">"+ post.tags[j] +" "+"</label>");
        }
        searchPostList.append("<br>");
        searchPostList.append("<label class=\"searchedcomments\">Comments</label><br>");
        for(let k=0;k<post.comments.length;k++){
          searchPostList.append("<label class=\"searchedcommentsDate\">"+"by "+ post.comments[k].userName +" on "+ post.comments[k].date +"</label>");
          searchPostList.append("<p class=\"searcommentresolve\">"+ post.comments[k].body +"</p>");
          }
        }
      }
    });
  }

});


let title = document.getElementById("title")
let body = document.getElementById("body")
let span = document.getElementById("errorCreatePost")
let span_body = document.getElementById("error_body")
let form = document.getElementById("createpostForm")
let createPostBtn = document.getElementById("createPostBtn")


$("#createPostBtn").on("click", function (event) { 

  let valid = false
  event.preventDefault();
   if(!title.value.trim()){
     span.hidden = false
     span.innerHTML = "Title cannot be empty"
     title.focus()
     return
   }else{
     span.hidden = true
     valid = true
   }

   if(!body.value.trim()){
    span_body.hidden = false
    span_body.innerHTML = "Body cannot be empty"
    body.focus()
    return
  }else{
    span_body.hidden = true
    valid = true
  }

  if(valid == true){
    $('#createPostBtn').unbind().submit();
  }
});

})(window.jQuery);
