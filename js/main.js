document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav');

    burgerMenu.addEventListener('click', function () {
        console.log('Burger menu clicked');
        nav.classList.toggle('open');
        console.log('Nav classes:', nav.classList);
    });

    document.addEventListener('click', function (event) {
        if (!nav.contains(event.target) && !burgerMenu.contains(event.target)) {
            nav.classList.remove('open');
        }
    });

    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
            header.style.background = 'rgba(0, 0, 0, 0.8)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'transparent';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('auth-modal');
    const closeModal = document.querySelector('.close-btn');
    const loginButton = document.querySelector('.login');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const showLoginPassword = document.getElementById('show-login-password');
    const showSignupPassword = document.getElementById('show-signup-password');

    loginButton.addEventListener('click', function () {
        modal.style.display = 'flex';
        showLoginForm();
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });
 
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    loginBtn.addEventListener('click', showLoginForm);
    signupBtn.addEventListener('click', showSignupForm);

    function showLoginForm() {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        loginBtn.classList.add('active');
        signupBtn.classList.remove('active');
    }

    function showSignupForm() {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        loginBtn.classList.remove('active');
        signupBtn.classList.add('active');
    }

    showLoginPassword.addEventListener('change', function () {
        const passwordField = document.getElementById('login-password');
        if (this.checked) {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    });

    showSignupPassword.addEventListener('change', function () {
        const passwordField = document.getElementById('signup-password');
        if (this.checked) {
            passwordField.type = 'text';
        } else {
            passwordField.type = 'password';
        }
    });

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('signup-name').value;
        const surname = document.getElementById('signup-surname').value;
        const email = document.getElementById('signup-email').value;
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
     
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!emailRegex.test(email)) {
            alert('Invalid email address.');
            return;
        }

        if (!usernameRegex.test(username)) {
            alert('Username can only contain letters, numbers, and underscores.');
            return;
        }

        if (!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters long and contain at least one letter and one number.');
            return;
        }

        const user = {
            name,
            surname,
            email,
            username,
            password,
        };

        localStorage.setItem('user', JSON.stringify(user));
        alert('Signup successful! You can now log in.');
        showLoginForm();
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.username === username && storedUser.password === password) {
            alert('Login successful!');
            modal.style.display = 'none';
        } else {
            alert('Invalid username or password.');
        }
    });
});
