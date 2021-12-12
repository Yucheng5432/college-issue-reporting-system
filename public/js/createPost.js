(function () {
  const myForm = document.getElementById("createpostForm");
  let titleInput = document.getElementById("title");
  let bodyInput = document.getElementById("body");
  let imageInput = document.getElementById("post-image")

  let errorDiv = document.getElementById("errorCreatePost");
  let bodyErrorDiv = document.getElementById("error_body");
  let imgErrorDiv = document.getElementById("error_inputFile")
  

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

      if (imageInput.value && !(/\.(jpe?g|png|jpg)$/i.test(imageInput.value)) )  {
        event.preventDefault();
        valid = false;
        imgErrorDiv.hidden = false;
        imgErrorDiv.innerHTML = "Please enter valid image file.";
        return;
      } else {
        valid = true;
        errorDiv.hidden = true;
      }
  
    });
  }
})();
