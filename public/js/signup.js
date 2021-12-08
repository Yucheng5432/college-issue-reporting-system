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
    let searchPostForm = $("#signup-form")
    
        // username
    searchPostForm.submit(function(event){
        event.preventDefault()
    // usernameSignup.blur(function(event){
        var userNameStr = usernameSignup.val().trim()
        if(!userNameStr){
            valid = false
            userAlert.show() 
            userAlert.html('You need to enter username')
            return
        }
        else{
            valid = true
            userAlert.hide()
        }
       
        if (/\s/.test(userNameStr)) {
            valid = false
            
            userAlert.show() 
            userAlert.html('user name has space')
            return
        }
        else{
            valid = true
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
        if(userNameStr.length < 4){
            valid = false
            userAlert.show() 
            userAlert.html('Length of username must be atleast 4')
            return
        }
        else{
            valid = true
            userAlert.hide()
        }
    // })
        //password
        // passwordSignup.blur(function(event){
            var passwordStr = passwordSignup.val().trim()
            if(!passwordStr){
                valid = false
                passAlert.show() 
                passAlert.html('You need to enter your password')
          
                return
            }
            else{ 
                valid = true
                passAlert.hide()
            }
            if (/\s/.test(passwordStr)) {
                valid = false
                
                passAlert.show() 
                passAlert.html('Password has space')
                return
            }
            else{
                valid = true
                userAlert.hide()
            }
            if(passwordStr.length < 6){
                valid = false
                passAlert.show() 
                passAlert.html('Length of password must be atleast 6')
                return
            }
            else{
                valid = true
                userAlert.hide()
            }

    // })
        //firstname
        // firstname.blur(function(event){
            var firstnameStr = firstname.val().trim()
            if(!firstnameStr){
                valid = false
                firstAlert.show() 
                firstAlert.html('You need to enter your firstname')
                return
            }
        else{
            valid = true
            firstAlert.hide()
        }
        if (/\s/.test(firstnameStr)) {
            valid = false
            firstAlert.show() 
            firstAlert.html('firstname has spaces')
       
            return
        }
        else{
            valid = true
            firstAlert.hide()
        }
   
        if (!firstnameStr.match(/^[a-z]+$/i)) {
            valid = false
            firstAlert.show() 
            firstAlert.html('only alpabets allowed for firstname')
           
            return
        }
        else{
            valid = true
            firstAlert.hide()
        }
    // })

        //lastname
        // lastname.blur(function(event){
            var lastnameStr = lastname.val().trim()
            if(!lastnameStr){
                valid = false
                lastAlert.show() 
                lastAlert.html('You need to enter your lastname')
          
                return
            }
            else{
                valid = true
                lastAlert.hide()
            }
        if (/\s/.test(lastnameStr)) {
            valid = false

            lastAlert.show() 
            lastAlert.html('lastname cannot have spaces')

            return
        }
        else{
            valid = true
            lastAlert.hide()
        }
        if (!lastnameStr.match(/^[a-z]+$/i)) {
            valid = false

  
            lastAlert.show() 
            lastAlert.html('only alphabets allowed for lastname')
 
            return
        }
        else{
            valid = true
            lastAlert.hide()
        }
    // })
        //email
        // email.blur(function(event){
            var emailStr = email.val().trim()
            if(!emailStr){
                valid = false
                emailAlert.show() 
                emailAlert.html('You need to enter your email address')

                return
            }
            else{
                valid = true
                emailAlert.hide()
            }
            if (/\s/.test(emailStr)) {
                valid = false
                
                emailAlert.show() 
                emailAlert.html('email cannot have spaces')
                return
            }
            else{
                valid = true
                userAlert.hide()
            }

            if (!emailStr.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                valid = false

                emailAlert.show() 
                emailAlert.html('entered email address format not valid')

                return 
            }
            else{
                valid = true
                emailAlert.hide()
            }
        // })
        //year
        // year.blur(function(event){
        var yearStr = year.val().trim()     
        if(!yearStr){
            valid = false

            yearAlert.show() 
            yearAlert.html('You need to enter the year from which you are studying in the university.')

            return
        }
        else{
            valid = true
            yearAlert.hide()
        }
        if (/\s/.test(yearStr)) {
            valid = false
            
            yearAlert.show() 
            yearAlert.html('Year cannot have spaces')
            return
        }
        else{
            valid = true
            userAlert.hide()
        }

        if(parseInt(yearStr)<2017){
            valid = false
            event.preventDefault();
            yearAlert.show()
            yearAlert.html('Only users between 2017 to 2021 can signup.')
            return
        } 
        else{
            valid = true
            yearAlert.hide()
        } 

        if(parseInt(yearStr)>2021){
            valid = false
            event.preventDefault();
            yearAlert.show()
            yearAlert.html('Only users between 2017 to 2021 can signup.')
            return
        } 
        else{
            valid = true
            yearAlert.hide()
        } 
    // });
        // signupForm.submit(function (event) {
            if(valid===false)
            {
              event.preventDefault();
            }
            else{
              signupForm.unbind().submit();
            }
        //   })
   
});
})(window.jQuery);