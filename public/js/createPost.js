
(function () {
 
    const myForm = document.getElementById("createpostForm");
    let titleInput = document.getElementById("title")
    let bodyInput = document.getElementById("body")
    let errorDiv = document.getElementById('errorCreatePost');
    let bodyErrorDiv = document.getElementById('error_body')
    //  let some = document.getElementById('editPostbtn')
    //  console.log(some)
    // let myUl = document.getElementById('attempts');
    // let frmLabel = document.getElementById('formLabel');
    
    if (myForm) {
      myForm.addEventListener("submit", (event) => {
        valid = true
        if(titleInput.value.trim().length == 0){
            event.preventDefault();
            valid = false
            // usernameInput.value = ''
            errorDiv.hidden = false
            errorDiv.innerHTML = 'User must enter title' 
            return 
          }
           else{
            valid = true
            errorDiv.hidden = true
          }

          if(bodyInput.value.trim().length == 0){
            event.preventDefault();
            valid = false
            // usernameInput.value = ''
            bodyErrorDiv.hidden = false
            bodyErrorDiv.innerHTML = 'User must enter body' 
            return 
          }
           else{
            valid = true
            errorDiv.hidden = true
          }

      })

  }
})();
