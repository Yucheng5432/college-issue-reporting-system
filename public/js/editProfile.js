
// (function () {
 
//     const myForm = document.getElementById("edit-form");
//     let firstNameInput = document.getElementById("firstname")
//     let lastNameInput = document.getElementById("lastname")
//     let passswordInput = document.getElementById("password")
//     let emailInput = document.getElementById("email")
//     let yearInput = document.getElementById("year")


//     let errorDivFirst = document.getElementById('error_firstname');
//     let errorDivLast = document.getElementById('error_lastname');
//     let ErrorDivPass = document.getElementById('error_password')
//     let errorDivEmail = document.getElementById('error_email');
//     let errorDivYear = document.getElementById('error_year');
//      let some = document.getElementById('editPostbtn')
//      console.log(some)
    
//     if (myForm) {
//       myForm.addEventListener("submit", (event) => {
//         valid = true


//         if(!passswordInput.value.trim()){
//             event.preventDefault();
//             valid = false
//             ErrorDivPass.hidden = false
//             ErrorDivPass.innerHTML = 'User must enter password'
//             passswordInput.focus()
//             return
//           }else{
//             valid = true
//             ErrorDivPass.hidden = true
//           }
          

//         if(passswordInput.value.trim().match(/\s/)){
//             event.preventDefault();
//             valid = false
//             ErrorDivPass.hidden = false
//             ErrorDivPass.innerHTML = 'Password cannot contain spaces'
//             passswordInput.focus()  
//             return
//           }
//            else{
//              valid = true
//              ErrorDivPass.hidden = true
//           }

//           if(passswordInput.value.length < 6){
//             event.preventDefault();
//             valid = false
//             ErrorDivPass.hidden = false
//             ErrorDivPass.innerHTML = 'Password length is lesser than 6'
//             passswordInput.focus()
//             return
//           }else{
//             valid = true
//             ErrorDivPass.hidden = true
//           }

//         if(firstNameInput.value.trim().length == 0){
//           event.preventDefault();
//           valid = false
//           errorDivFirst.hidden = false
//           errorDivFirst.innerHTML = 'User must enter firstname' 
//           firstNameInput.focus()
//           return 
//         }
//          else{
//           valid = true
//           errorDivFirst.hidden = true
//         }


//         if(firstNameInput.value.trim().match(/\s/)){
//             event.preventDefault();
//             valid = false
//             errorDivFirst.hidden = false
//             errorDivFirst.innerHTML = 'Firstname cannot contain spaces' 
//             passswordInput.focus() 
//             return
//           }
//            else{
//              valid = true
//              errorDivFirst.hidden = true
//           }


//         if(lastNameInput.value.trim().length == 0){
//             event.preventDefault();
//             valid = false
//             errorDivLast.hidden = false
//             errorDivLast.innerHTML = 'User must enter lastname' 
//             lastNameInput.focus()
//             return 
//           }
//            else{
//             valid = true
//             errorDivLast.hidden = true
//           }

//           if(lastNameInput.value.trim().match(/\s/)){
//             event.preventDefault();
//             valid = false
//             errorDivLast.hidden = false
//             errorDivLast.innerHTML = 'Lastname cannot contain spaces'  
//             lastNameInput.focus()
//             return
//           }
//            else{
//              valid = true
//              errorDivLast.hidden = true
//           }

//         if(emailInput.value.trim().length == 0){
//             event.preventDefault();
//             valid = false
//             errorDivEmail.hidden = false
//             errorDivEmail.innerHTML = 'User must enter email' 
//             emailInput.focus()
//             return 
//           }
//            else{
//             valid = true
//             errorDivEmail.hidden = true
//           }

//           if(emailInput.value.trim().match(/\s/)){
//             event.preventDefault();
//             valid = false
//             errorDivEmail.hidden = false
//             errorDivEmail.innerHTML = 'Email cannot contain spaces'  
//             emailInput.focus()
//             return
//           }
//            else{
//              valid = true
//              errorDivEmail.hidden = true
//           }


//           if(!emailInput.value.trim().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
//             event.preventDefault();
//             valid = false
//             errorDivEmail.hidden = false
//             errorDivEmail.innerHTML = 'Enter a valid email id.'  
//             emailInput.focus()
//             return
//           }
//            else{
//              valid = true
//              errorDivEmail.hidden = true
//           }
        

//           if(yearInput.value.trim().length == 0){
//             event.preventDefault();
//             valid = false
//             errorDivYear.hidden = false
//             errorDivYear.innerHTML = 'User must enter year' 
//             yearInput.focus()
//             return 
//           }
//            else{
//             valid = true
//             errorDivYear.hidden = true
//           }

//           if(yearInput.value.trim().match(/\s/)){
//             event.preventDefault();
//             valid = false
//             errorDivYear.hidden = false
//             errorDivYear.innerHTML = 'Year cannot contain spaces' 
//             yearInput.focus()
//             return
//           }
//            else{
//              valid = true
//              errorDivYear.hidden = true
//           }
          
//           if(!yearInput.value.trim().match('^[0-9]+$')){
//             event.preventDefault();
//             valid = false
//             errorDivYear.hidden = false
//             errorDivYear.innerHTML = 'Year must be only numeric spaces'  
//             yearInput.focus()
//             return
//           }
//            else{
//              valid = true
//              errorDivYear.hidden = true
//           }

//           if(yearInput.value.trim() < 2017){
//             event.preventDefault();
//             valid = false
//             errorDivYear.hidden = false
//             errorDivYear.innerHTML = 'Year cannot be less than 2017' 
//             yearInput.focus() 
//             return
//           }
//            else{
//              valid = true
//              errorDivYear.hidden = true
//           }

//           if(yearInput.value.trim() > 2021){
//             event.preventDefault();
//             valid = false
//             errorDivYear.hidden = false
//             errorDivYear.innerHTML = 'Year cannot be gretaer than 2021'  
//             yearInput.focus()
//             return
//           }
//            else{
//              valid = true
//              errorDivYear.hidden = true
//           }
//       });
//     }
//   })();
