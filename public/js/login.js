
(function () {
 
    const myForm = document.getElementById("login-form");
    let usernameInput = document.getElementById("username")
    let passswordInput = document.getElementById("password")
    let errorDiv = document.getElementById('error_username');
    let passErrorDiv = document.getElementById('error_password')
    
    // let myUl = document.getElementById('attempts');
    // let frmLabel = document.getElementById('formLabel');
    
    if (myForm) {
      myForm.addEventListener("submit", (event) => {
        valid = true
        

        if(!usernameInput.value.trim()){
          event.preventDefault();
          valid = false
          usernameInput.value = ''
          errorDiv.hidden = false
          errorDiv.innerHTML = 'User must enter username' 
          return 
        }
         else{
           valid = true
          errorDiv.hidden = true
        }

        if(usernameInput.value.trim().length < 4){
          event.preventDefault();
          valid = false
          usernameInput.value = ''
          errorDiv.hidden = false
          errorDiv.innerHTML = 'Length of username must be greater than 4'  
          return
        }
         else{
           valid = true
          errorDiv.hidden = true
        }

        if(usernameInput.value.trim().match(/\s/)){
          event.preventDefault();
          valid = false
          usernameInput.value = ''
          errorDiv.hidden = false
          errorDiv.innerHTML = 'Username contains spacess'  
          return
        }
         else{
           valid = true
          errorDiv.hidden = true
        }

        

       
        if(!usernameInput.value.trim().match(/^[a-z0-9]+$/i)){
          event.preventDefault();
          valid = false
          usernameInput.value = ''
          errorDiv.hidden = false
          errorDiv.innerHTML = 'Username can only be alphanumeric values'  
          return
        }
         else{
           valid = true
          errorDiv.hidden = true
        }
        

        if(!passswordInput.value.trim()){
          event.preventDefault();
          valid = false
          passswordInput.value = ''
          passErrorDiv.hidden = false
          passErrorDiv.innerHTML = 'User must enter password'
          return
        }else{
          valid = true
          passErrorDiv.hidden = true
        }

        // if(!passswordInput.value.length < 6){
        //   event.preventDefault();
        //   valid = false
        //   passswordInput.value = ''
        //   passErrorDiv.hidden = false
        //   passErrorDiv.innerHTML = 'Password length is lesser than 6'
        //   return
        // }else{
        //   valid = true
        //   passErrorDiv.hidden = true
        // }
      });
    }
  })();