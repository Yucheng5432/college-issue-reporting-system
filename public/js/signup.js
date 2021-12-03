(function ($) {
    let usernameSignup = $('#username');
    let passwordSignup = $('#password');
    let loginForm = $('#signup-form')
    let submitButton = $('#signup_button');

    let userAlert = $('#error_username')
    let passAlert = $('#error_password')  
    let firstAlert = $('#error_firstname')
    let lastAlert = $('#error_lastname')
    let emailAlert = $('#error_email')
    let yearAlert = $('#error_year')

    loginForm.submit((event) => {
        event.preventDefault();
        
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
            userAlert.text('You must enter username')
            userAlert.removeClass('hidden')
            usernameSignup.focus()
            return
        }
        if (/\s/.test(userNameStr)) {
            userAlert.text('Username has spaces')
            userAlert.removeClass('hidden')
            usernameSignup.focus()
            return
        }
        if (!userNameStr.match(/^[a-z0-9]+$/i)) {
            userAlert.text('Only alphanueric values allowed for username')
            userAlert.removeClass('hidden')
            usernameSignup.focus()
            return
        }
        //password
        if(!passwordStr){
            passAlert.text('Please enter password')
            passAlert.removeClass('hidden')
            passwordSignup.focus()
            return
        }
        //firstname
        if(!firstnameStr){
            firstAlert.text('You must enter firstname')
            firstAlert.removeClass('hidden')
            firstnameSignup.focus()
            return
        }
        if (/\s/.test(firstnameStr)) {
            firstAlert.text('firstname has spaces')
            firstAlert.removeClass('hidden')
            firstnameStr.focus()
            return
        }
        if (!firstnameStr.match(/^[a-z]+$/i)) {
            firstAlert.text('only alpabets allowed for firstname')
            firstAlert.removeClass('hidden')
            firstnameStr.focus()
            return
        }
        //lastname
        if(!lastnameStr){
            lastAlert.text('You must enter lastname')
            lastAlert.removeClass('hidden')
            lastnameStr.focus()
            return
        }
        if (/\s/.test(firstnameStr)) {
            lastAlert.text('lastname has spaces')
            lastAlert.removeClass('hidden')
            lastnameStr.focus()
            return
        }
        if (!lastnameStr.match(/^[a-z]+$/i)) {
            lastAlert.text('only alpabets allowed for lastname')
            lastAlert.removeClass('hidden')
            lastnameStr.focus()
            return
        }
        //email
        if(!emailStr){
            emailAlert.text('Please enter your email address')
            emailAlert.removeClass('hidden')
            emailStr.focus()
            return
        }

        if (!emailStr.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            emailAlert.text('entered email address format not valid')
            emailAlert.removeClass('hidden')
            emailStr.focus()
            return 
        }
        //year     
        if(!yearStr){
            yearAlert.text('Please enter your the year you are expected to graduate')
            yearAlert.removeClass('hidden')
            yearStr.focus()
            return
        }

        if(parseInt(yearStr)<2021){
            yearAlert.text('please enter valid graduation year')
            yearAlert.removeClass('hidden')
            yearStr.focus()
            return
        }   
        loginForm.unbind().submit()
    });
  
})(jQuery);
(function ($) {
    let loginForm = $('#login-form')
    let usernameInput = $('#username');
    let passwordInput = $('#password');
    let submitButton = $('#loginButton');
    let errors = $('.error');

    loginForm.submit((event) => {
        event.preventDefault();
        usernameInput.removeClass('is-invalid is-valid');
        passwordInput.removeClass('is-invalid is-valid');
        submitButton.prop('disabled', true);
        errors.hide();

        let info = {
            username: usernameInput.val().trim(),
            password: passwordInput.val().trim()
        };

        let hasErrors = false;
        if (!info.username || !info.password) {
            usernameInput.addClass('is-invalid');
            passwordInput.addClass('is-invalid');
            hasErrors = true;
        }

        if (!hasErrors) {
            loginForm.unbind().submit();
        } else {
            submitButton.prop('disabled', false);
        }
    });
})(jQuery);



