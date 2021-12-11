(function () {
  const myForm = document.getElementById("createpostForm");
  let titleInput = document.getElementById("title");
  let bodyInput = document.getElementById("body");
  let errorDiv = document.getElementById("errorCreatePost");
  let bodyErrorDiv = document.getElementById("error_body");
  

  if (myForm) {
    myForm.addEventListener("submit", (event) => {
      valid = true;
      if (titleInput.value.trim().length == 0) {
        event.preventDefault();
        valid = false;
        errorDiv.hidden = false;
        errorDiv.innerHTML = "Please enter title";
        return;
      } else {
        valid = true;
        errorDiv.hidden = true;
      }

      if (bodyInput.value.trim().length == 0) {
        event.preventDefault();
        valid = false;
        bodyErrorDiv.hidden = false;
        bodyErrorDiv.innerHTML = "Please enter body";
        return;
      } else {
        valid = true;
        errorDiv.hidden = true;
      }
  
    });
  }
})();
