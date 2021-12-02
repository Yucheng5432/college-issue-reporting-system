// // (function ($) {
 
// //     let usernameInput = $('#username');
// //     let passwordInput = $('#password');
// //     let loginForm = $('#login-form')
// //     let submitButton = $('#loginButton');
// //     let formAlert = $('#error_username')
// //     let passAlert = $('#error_password')

// //     loginForm.submit((event) => {
// //         event.preventDefault();
        
// //         formAlert.addClass('hidden')
// //         formAlert.text('')
// //         passAlert.addClass('hidden')
// //         passAlert.text('')

// //         var userNameStr = usernameInput.val()
// //         var passwordStr = passwordInput.val()
// //         if(!userNameStr){
// //             formAlert.text('You must enter username')
// //             formAlert.removeClass('hidden')
// //             usernameInput.focus()
// //             return
// //         }
// //         if (/\s/.test(userNameStr)) {
// //             formAlert.text('Username has spaces')
// //             formAlert.removeClass('hidden')
// //             usernameInput.focus()
// //             return
// //         }
// //         if (!userNameStr.match(/^[a-z0-9]+$/i)) {
// //             formAlert.text('Only alphanueric values allowed for username')
// //             formAlert.removeClass('hidden')
// //             usernameInput.focus()
// //             return
// //         }
// //         if(!passwordStr){
// //             passAlert.text('Please enter password')
// //             passAlert.removeClass('hidden')
// //             passwordInput.focus()
// //             return
// //         }
// //         loginForm.unbind().submit()
// //     });
  
// // })(jQuery);
// // (function ($) {
// //     let loginForm = $('#login-form')
// //     let usernameInput = $('#username');
// //     let passwordInput = $('#password');
// //     let submitButton = $('#loginButton');
// //     let errors = $('.error');

// //     loginForm.submit((event) => {
// //         event.preventDefault();
// //         usernameInput.removeClass('is-invalid is-valid');
// //         passwordInput.removeClass('is-invalid is-valid');
// //         submitButton.prop('disabled', true);
// //         errors.hide();

// //         let info = {
// //             username: usernameInput.val().trim(),
// //             password: passwordInput.val().trim()
// //         };

// //         let hasErrors = false;
// //         if (!info.username || !info.password) {
// //             usernameInput.addClass('is-invalid');
// //             passwordInput.addClass('is-invalid');
// //             hasErrors = true;
// //         }

// //         if (!hasErrors) {
// //             loginForm.unbind().submit();
// //         } else {
// //             submitButton.prop('disabled', false);
// //         }
// //     });
// // })(jQuery);

// const data = require()
// (function () {
 
//     const myForm = document.getElementById("login-form");
//     let usernameInput = document.getElementById("username")
//     let passswordInput = document.getElementById("password")
//     let errorDiv = document.getElementById('error_username');
//     let passErrorDiv = document.getElementById('error_password')
    
//     // let myUl = document.getElementById('attempts');
//     // let frmLabel = document.getElementById('formLabel');
    
//     if (myForm) {
//       myForm.addEventListener("submit", (event) => {
//         event.preventDefault();
//         if(!usernameInput.value){
//           usernameInput.value = ''
//           errorDiv.hidden = false
//           errorDiv.innerHTML = 'User must enter username'  
//           myForm.reset()       
//         }
//          else{
//           errorDiv.hidden = true
//           usernameInput.value = usernameInput.value
//           // usernameInput.className = 'inputClass'
//         }
//         if(!passswordInput.value){
//           usernameInput.value = ''
//           passErrorDiv.hidden = false
//           passErrorDiv.innerHTML = 'User must enter password'
//         }

          // if(textInput.value.toLowerCase().trim()){
          //   textInput.classList.remove('inputClass');
          //   errorDiv.hidden = true;
          //   frmLabel.classList.remove('error');
          //   let li = document.createElement('li');
        
          //   if(isPalindrome(textInput.value) === true){
          //     li.innerHTML =  `${textInput.value} ` 
          //     myUl.appendChild(li);
          //     li.setAttribute("class", "is-palindrome");
          //   }else{
          //     li.innerHTML = `${textInput.value} `
          //     myUl.appendChild(li)
          //     li.setAttribute("class", "not-palindrome");
          //   }
         
          //   myForm.reset();
          //   textInput.focus();
          // }
          // else {
          //   textInput.value = '';
          //   errorDiv.hidden = false;
          //   errorDiv.innerHTML = 'You must enter a value';
          //   frmLabel.className = 'error';
          //   textInput.focus();
          //   textInput.className = 'inputClass';
          // }

  //     });
  //   }
  // })();