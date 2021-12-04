(function ($) {
    let usernameSignup = $('#username');
    let passwordSignup = $('#password');
    let signupForm = $('#signup-form')
    let submitButton = $('#signup_button');

    let userAlert = $('#error_username')
    let passAlert = $('#error_password')  
    let firstAlert = $('#error_firstname')
    let lastAlert = $('#error_lastname')
    let emailAlert = $('#error_email')
    let yearAlert = $('#error_year')

    signupForm.submit((event) => {
        valid =true
        
        userAlert.addClass('hidden')
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
        yearAlert.text('')

        var userNameStr = usernameSignup.val()
        var passwordStr = passwordSignup.val()
        var firstnameStr = firstAlert.val()
        var lastnameStr = lastAlert.val()
        var emailStr = emailAlert.val().toLowerCase()
        var yearStr = yearAlert.val()
        // username
        if(!userNameStr){
            valid = false
            event.preventDefault();
            userAlert.text('You must enter username')
            userAlert.removeClass('hidden')
            usernameSignup.focus()
            return
        }
        else{
            valid = true
        }
        if (/\s/.test(userNameStr)) {
            valid = false
            event.preventDefault();
            userAlert.text('Username has spaces')
            userAlert.removeClass('hidden')
            usernameSignup.focus()
            return
        }
        else{
            valid = true
        }
        if (!userNameStr.match(/^[a-z0-9]+$/i)) {
            valid = false
            event.preventDefault();
            userAlert.text('Only alphanueric values allowed for username')
            userAlert.removeClass('hidden')
            usernameSignup.focus()
            return
        }
        else{
            valid = true
        }
        //password
        if(!passwordStr){
            valid = false
            event.preventDefault();
            passAlert.text('Please enter password')
            passAlert.removeClass('hidden')
            passwordSignup.focus()
            return
        }
        else{
            valid = true
        }
        //firstname
        if(!firstnameStr){
            valid = false
            event.preventDefault();
            firstAlert.text('You must enter firstname')
            firstAlert.removeClass('hidden')
            firstnameSignup.focus()
            return
        }
        else{
            valid = true
        }
        if (/\s/.test(firstnameStr)) {
            valid = false
            event.preventDefault();
            firstAlert.text('firstname has spaces')
            firstAlert.removeClass('hidden')
            firstnameStr.focus()
            return
        }
        else{
            valid = true
        }
        if (!firstnameStr.match(/^[a-z]+$/i)) {
            valid = false
            event.preventDefault();
            firstAlert.text('only alpabets allowed for firstname')
            firstAlert.removeClass('hidden')
            firstnameStr.focus()
            return
        }
        else{
            valid = true
        }
        //lastname
        if(!lastnameStr){
            valid = false
            event.preventDefault();
            lastAlert.text('You must enter lastname')
            lastAlert.removeClass('hidden')
            lastnameStr.focus()
            return
        }
        else{
            valid = true
        }
        if (/\s/.test(firstnameStr)) {
            valid = false
            event.preventDefault();
            lastAlert.text('lastname has spaces')
            lastAlert.removeClass('hidden')
            lastnameStr.focus()
            return
        }
        else{
            valid = true
        }
        if (!lastnameStr.match(/^[a-z]+$/i)) {
            valid = false
            event.preventDefault();
            lastAlert.text('only alpabets allowed for lastname')
            lastAlert.removeClass('hidden')
            lastnameStr.focus()
            return
        }
        else{
            valid = true
        }
        //email
        if(!emailStr){
            valid = false
            event.preventDefault();
            emailAlert.text('Please enter your email address')
            emailAlert.removeClass('hidden')
            emailStr.focus()
            return
        }
        else{
            valid = true
        }

        if (!emailStr.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            valid = false
            event.preventDefault();
            emailAlert.text('entered email address format not valid')
            emailAlert.removeClass('hidden')
            emailStr.focus()
            return 
        }
        else{
            valid = true
        }
        //year     
        if(!yearStr){
            valid = false
            event.preventDefault();
            yearAlert.text('Please enter your the year you are expected to graduate')
            yearAlert.removeClass('hidden')
            yearStr.focus()
            return
        }
        else{
            valid = true
        }

        if(parseInt(yearStr)<2021){
            valid = false
            event.preventDefault();
            yearAlert.text('please enter valid graduation year')
            yearAlert.removeClass('hidden')
            yearStr.focus()
            return
        } 
        else{
            valid = true
        }  
        if (valid==true){
            signupForm.unbind().submit()
        }else{
            return
        }
    });
  
})(window.jQuery);