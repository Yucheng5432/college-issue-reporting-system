(function () {
  const myForm = document.getElementById("createpostForm");
  let titleInput = document.getElementById("title");
  let bodyInput = document.getElementById("body");
  let errorDiv = document.getElementById("errorCreatePost");
  let bodyErrorDiv = document.getElementById("error_body");
  // let fileErrorDiv = document.getElementById("error_inputFile");
  // let inputFile = document.getElementById("post-image").value;
  // let extname = inputFile.split(".").pop();
  // console.log(extname);
  // console.log(titleInput);

  if (myForm) {
    myForm.addEventListener("submit", (event) => {
      valid = true;
      if (titleInput.value.trim().length == 0) {
        event.preventDefault();
        valid = false;
        // usernameInput.value = ''
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
        // usernameInput.value = ''
        bodyErrorDiv.hidden = false;
        bodyErrorDiv.innerHTML = "Please enter body";
        return;
      } else {
        valid = true;
        errorDiv.hidden = true;
      }
      // if (extname !== "jpg") {
      //   event.preventDefault();
      //   valid = false;
      //   fileErrorDiv.hidden = false;
      //   fileErrorDiv.innerHTML = "Please enter images only";
      //   return;
      // } else {
      //   valid = true;
      //   errorDiv.hidden = true;
      // }
    });
  }
})();
