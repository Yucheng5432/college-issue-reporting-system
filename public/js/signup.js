(function ($) {
    let usernameSignup = $('#username');
    let passwordSignup = $('#password');
    let firstname = $('#firstname')
    let lastname = $('#lastname')
    let year = $('#year')
    let email =$('#email')
    let signupForm = $('#signup-form')
    //let submitButton = $('#signup_button');

    let userAlert = $('#error_username')
    let passAlert = $('#error_password')  
    let firstAlert = $('#error_firstname')
    let lastAlert = $('#error_lastname')
    let emailAlert = $('#error_email')
    let yearAlert = $('#error_year')

    let valid =true
    
    /**userAlert.addClass('hidden')
    userAlert.text('')
    passAlert.addClass('hidden')
    passAlert.text('')
    firstAlert.addClass('hidden')
    firstAlert.text('')
    lastAlert.addClass('hidden')
    lastAlert.text('')
    emailAlert.addClass('hidden')
    emailAlert.text('')
    yearAlert.addClass('hidden')
    yearAlert.text('')**/

    
        // username
    usernameSignup.blur(function(event){
        var userNameStr = usernameSignup.val()
        if(!userNameStr){
            valid = false
            userAlert.show() 
            userAlert.html('You need to enter username')
            return
        }
        else{
            userAlert.hide()
        }
       
        if (/\s/.test(userNameStr)) {
            valid = false
            
            userAlert.show() 
            userAlert.html('user name has space')
            return
        }
        else{
            userAlert.hide()
        }
        if (!userNameStr.match(/^[a-z0-9]+$/i)) {
            valid = false
           

            userAlert.show() 
            userAlert.html('Only alphanueric values allowed for username')
            return
        }
        else{
            valid = true
        }
    })
        //password
        passwordSignup.blur(function(event){
            var passwordStr = passwordSignup.val()
            if(!passwordStr){
                valid = false
                passAlert.show() 
                passAlert.html('You need to enter your password')
          
                return
            }
            else{
                passAlert.hide()
        }
    })
        //firstname
        firstname.blur(function(event){
            var firstnameStr = firstname.val()
            if(!firstnameStr){
                valid = false
                firstAlert.show() 
                firstAlert.html('You need to enter your firstname')
                return
            }
        else{
            firstAlert.hide()
        }
        if (/\s/.test(firstnameStr)) {
            valid = false
            firstAlert.show() 
            firstAlert.html('firstname has spaces')
       
            return
        }
        else{
            firstAlert.hide()
        }
   
        if (!firstnameStr.match(/^[a-z]+$/i)) {
            valid = false
            firstAlert.show() 
            firstAlert.html('only alpabets allowed for firstname')
           
            return
        }
        else{
            firstAlert.hide()
        }
    })

        //lastname
        lastname.blur(function(event){
            var lastnameStr = lastname.val()
            if(!lastnameStr){
                valid = false
                lastAlert.show() 
                lastAlert.html('You need to enter your lastname')
          
                return
            }
            else{
                lastAlert.hide()
            }
        if (/\s/.test(lastnameStr)) {
            valid = false

            lastAlert.show() 
            lastAlert.html('lastname cannot have spaces')

            return
        }
        else{
            lastAlert.hide()
        }
        if (!lastnameStr.match(/^[a-z]+$/i)) {
            valid = false

  
            lastAlert.show() 
            lastAlert.html('only alpabets allowed for lastname')
 
            return
        }
        else{
            lastAlert.hide()
        }
    })
        //email
        email.blur(function(event){
            var emailStr = email.val()
            if(!emailStr){
                valid = false
                emailAlert.show() 
                emailAlert.html('You need to enter your email address')

                return
            }
            else{
                emailAlert.hide()
            }

            if (!emailStr.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                valid = false

                emailAlert.show() 
                emailAlert.html('entered email address format not valid')

                return 
            }
            else{
                emailAlert.hide()
            }
        })
        //year
        year.blur(function(event){
            var yearStr = year.val()     
        if(!yearStr){
            valid = false

            yearAlert.show() 
            yearAlert.html('You need to enter the expected graduation year')

            return
        }
        else{
            yearAlert.hide()
        }

        if(parseInt(yearStr)<2021){
            valid = false
            event.preventDefault();
            yearAlert.text('please enter valid graduation year')
            yearAlert.removeClass('hidden')
  
            return
        } 
        else{
            yearAlert.hide()
        } 
    });
        signupForm.submit(function (event) {
            if(valid===false)
            {
              event.preventDefault();
            }
            else{
              signupForm.unbind().submit();
            }
          })
   
  
})(window.jQuery);