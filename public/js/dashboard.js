(function ($) {

   let searchPostForm = $("#searchForm");//search input posts
   let searchTerm = $("#searchTerm");// input 
   let searchPostList = $("#searchPostsList"); // searched postsList
   let errorInput = $("#errorInput"); //input invalid words
   let noResult = $("#noResult"); //no result by searching

   
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
    if(typeof(query)=='undefined'){
      errorInput.attr("style","display:block");
      searchTerm.focus();
    }
    if(typeof(query)!= 'string'){
      errorInput.attr("style","display:block");
      searchTerm.focus();
    }
    if(query.split(" ").join("").length == 0){
      errorInput.attr("style","display:block");
      searchTerm.focus();
    }
    if(query ===" "){
      errorInput.attr("style","display:block");
      searchTerm.focus();
    }
    else{
      errorInput.attr("style", "display:none;background-color: white;");
      searchPostList.empty();

  $.ajax({
    type: "post",
    url: "http://localhost:3000/posts/search/searchterm",
    data: {
        searchterm: query
    },

    success: function(data){
      let posts = $(data);
      if(posts){
        searchPostList.attr("style","display:block;background-color: white;");
        errorInput.attr("style","display:none;background-color: white;");
        noResult.attr("style","display:none;background-color: white;");
      }

      if(posts.length === 0){
        noResult.attr("style", "display:block");
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

})(window.jQuery);
