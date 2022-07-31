const name = document.getElementById('name');
const email = document.getElementById('email-address');
const password = document.getElementById('password');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

if (loginForm) {
	loginForm.onsubmit = (e) => {
		e.preventDefault();
		login();
		// Clear inputs using an IIFE
		eraseInputs();
	};
}

if (signupForm) {
	signupForm.onsubmit = (e) => {
		e.preventDefault();
		return signup();
	};
}

function login() {
	const data = {
		email: email.value,
		password: password.value,
	};

	fetch('http://localhost:8080/login', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			// convert response to json
			return response.json();
		})
		.then((result) => {
			// log the result to console
			console.log(result);
			localStorage.setItem('token', result.data.access_token);
			localStorage.setItem('user', JSON.stringify(result.data.user));
			(function getUsers() {
				const token = localStorage.getItem('token');
				fetch('http://localhost:8080/users', {
					method: 'GET',
					headers: {
						authorization: 'Bearer ' + token,
					},
				})
					.then((res) => res.json())
					.then((res) => {
						// console.log(res);
						// // TEST
						// localStorage.setItem('result',res);
						// Save data to Local Storage 
						localStorage.setItem('users', JSON.stringify(res.data));
					});
			})();
		});
		// Move to the list.html
		window.location.href = './list.html';
}

function signup() {
	const data = {
		name: name.value,
		email: email.value,
		password: password.value,
	};

	// send data to backend
	fetch('http://localhost:8080/signup', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
		});
	alert('User created successfully, proceeed to login');
	eraseInputs();
}

// Clear inputs using an IIFE
let eraseInputs = () => {
	name.value = '';
	email.value = '';
	password.value = '';
};