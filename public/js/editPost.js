(function ($) {
  let imageInput = document.getElementById("error_imgEditpost");
  let myForm = document.getElementById("editpostForm");
  if (myForm) {
    myForm.addEventListener("submit", (event) => {
      let image = document.getElementById("image");
      if (image.value && !/\.(jpe?g|png|jpg)$/i.test(image.value)) {
        event.preventDefault();
        imageInput.hidden = false;
        imageInput.innerHTML = "please enter a photo/valid photo.";
      } else {
        imageInput.innerHTML = "";
        imageInput.hidden = true;
      }
    });
  }
})(window.jQuery);
