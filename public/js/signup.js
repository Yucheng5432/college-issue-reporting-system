
// // (function ($) {

// // // const data = require("");
// // // const userFunctions = data.users;

// //     let hasErrors = false;
// //     function validString(str) {
// //         if (!str) {
// //             hasErrors = true;
// //             return false
// //         }
// //         return true;
// //     }

// //     let signupForm =$('#signup-form');
// //     let usernameInput = $('#username');
// //     let passwordInput = $('#password');
// //     let firstNameInput = $('#firstname')
// //     let lastNameInput = $('#lastname')
// //     let emailInput = $('#email');
// //     let yearInput = $('#year')
// //     let submitButton = $('#submitButton');
// //     let formAlert = $('#form-alert')

// //     signupForm.submit((event) => {
// //         event.preventDefault();
        
// //         formAlert.addClass('hidden')
// //         formAlert.text('')

// //         var userNameStr = usernameInput.val()
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
// //         if(!passwordInput.val()){
// //             formAlert.text('Please enter passsword')
// //             formAlert.removeClass('hidden')
// //             passwordInput.focus()
// //             return
// //         }
// //         if(!firstNameInput.val()){
// //             formAlert.text('Please enter First name')
// //             formAlert.removeClass('hidden')
// //             firstNameInput.focus()
// //             return
// //         }
// //         if(!lastNameInput.val()){
// //             formAlert.text('Please enter Last name')
// //             formAlert.removeClass('hidden')
// //             lastNameInput.focus()
// //             return
// //         }
// //         if(!emailInput.val()){
// //             formAlert.text('Please enter email')
// //             formAlert.removeClass('hidden')
// //             emailInput.focus()
// //             return
// //         }
// //         if(!yearInput.val()){
// //             formAlert.text('Please enter year')
// //             formAlert.removeClass('hidden')
// //             yearInput.focus()
// //             return
// //         }
// //         signupForm.unbind().submit()
// //     });
  
// // })(jQuery);

// (function ($) {
//     let hasErrors = false;
//     function validString(str) {
//         if (!str) {
//             hasErrors = true;
//             return false
//         }
//         return true;
//     }

//     let signupForm =$('#signup-form');
//     let usernameInput = $('#username');
//     let passwordInput = $('#password');
//     let firstNameInput = $('#firstname')
//     let lastNameInput = $('#lastname')
//     let emailInput = $('#email');
//     let yearInput = $('#year')
//     let submitButton = $('#submitButton');
//     let formAlert = $('#form-alert')

//     signupForm.submit((event) => {
//         event.preventDefault();
//         hasErrors = false;
//         $('.error').hide();

//         firstNameInput.removeClass('is-invalid is-valid');
//         lastNameInput.removeClass('is-invalid is-valid');
//         usernameInput.removeClass('is-invalid is-valid');
//         passwordInput.removeClass('is-invalid is-valid');
//         emailInput.removeClass('is-invalid is-valid');
//         yearInput.removeClass('is-invalid is-valid');

//         submitButton.prop('disabled', true);
//         let info = {
//             firstName: firstNameInput.val().trim(),
//             lastName: lastNameInput.val().trim(),
//             username: usernameInput.val().trim(),
//             password: passwordInput.val().trim(),
//             email: emailInput.val().trim(),
//             year: yearInput.val()
//         };
        
//         if (!validString(info.firstName)) firstNameInput.addClass('is-invalid');
//         if (!validString(info.lastName)) lastNameInput.addClass('is-invalid');
//         if (!validString(info.username)) usernameInput.addClass('is-invalid');
//         if (!validString(info.password)) passwordInput.addClass('is-invalid');
//         if (!validString(info.email)) emailInput.addClass('is-invalid');
//         if (!validString(info.year)) yearInput.addClass('is-invalid');

//         if (!hasErrors) {
//             signupForm.unbind().submit();
//         } else {
//             submitButton.prop('disabled', false);
//         }
//     });
// })(jQuery);

   
// // (function($) {
// // 	// Let's start writing AJAX calls!

// //     let signupForm =$('#signup-form');
// //     let usernameInput = $('#username');
// //     let passwordInput = $('#password');
// //     let firstNameInput = $('#firstname')
// //     let lastNameInput = $('#lastname')
// //     let emailInput = $('#email');
// //     let yearInput = $('#year')
// //     let submitButton = $('#submitButton');
// //     let formAlert = $('#form-alert')

// // 	// var myNewTaskForm = $('#new-item-form'),
// // 	// 	newNameInput = $('#new-task-name'),
// // 	// 	newDecriptionArea = $('#new-task-description'),
// // 	// 	todoArea = $('#todo-area');

// // 	function bindEventsToTodoItem(todoItem) {
// // 		todoItem.find('.signup_button').on('click', function(event) {
// // 			event.preventDefault();
// // 			var currentLink = $(this);
// // 			var currentId = currentLink.data('id');

// // 			var requestConfig = {
// // 				method: 'POST',
// // 				url: '/signup'
// // 			};

// // 			$.ajax(requestConfig).then(function(responseMessage) {
// // 				var newElement = $(responseMessage);
// // 				bindEventsToTodoItem(newElement);
// // 				todoItem.replaceWith(newElement);
// // 			});
// // 		});
// // 	}

// // 	todoArea.children().each(function(index, element) {
// // 		bindEventsToTodoItem($(element));
// // 	});

// // 	signupForm.submit(function(event) {
// // 		event.preventDefault();

// // 		var newUSerame = usernameInput.val();
// // 		var newPass = passwordInput.val();
// //         var newFirst = firstNameInput.val();
// //         var newLast = lastNameInput.val();
// // 		var newEmail = emailInput.val();
// //         var newYear = yearInput.val();

// 		// var newDescription = newDecriptionArea.val();
// 		// var newContent = $('#new-content');

// 		// if (newUSerame && newPass && newFirst && newLast && newEmail && newYear) {
// 		// 	var useJson = true;
// 		// 	if (useJson) {
// 		// 		var requestConfig = {
// 		// 			method: 'POST',
// 		// 			url: '/signup',
// 		// 			contentType: 'application/json',
// 		// 			data: JSON.stringify({
// 		// 				username: newUSerame,
//         //                 password: newPass,
//         //                 firstName: newFirst,
//         //                 lastName: newLast,
//         //                 email: newEmail,
//         //                 year: newYear
// 		// 			})
// 		// 		};

// 		// 		$.ajax(requestConfig).then(function(responseMessage) {
// 		// 			console.log(responseMessage);
// 		// 			// newContent.html(responseMessage.message);

// 		// 		});
// 		// 	} 
//             // else {
// 			// 	var requestConfig = {
// 			// 		method: 'POST',
// 			// 		url: '/api/todo.html',
// 			// 		contentType: 'application/json',
// 			// 		data: JSON.stringify({
// 			// 			name: newName,
// 			// 			description: newDescription
// 			// 		})
// 			// 	};

// 			// 	$.ajax(requestConfig).then(function(responseMessage) {
// 			// 		console.log(responseMessage);
// 			// 		var newElement = $(responseMessage);
// 			// 		bindEventsToTodoItem(newElement);

// 			// 		todoArea.append(newElement);
// 			// 	});
// 			// }
// // 		}
// // 	});
// // })(window.jQuery);