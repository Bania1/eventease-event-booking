// Common functionality
document.addEventListener('DOMContentLoaded', () => {
    // 0) Check localStorage for theme preference
    const storedTheme = localStorage.getItem('theme'); // e.g. 'light' or null
    if (storedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
    }

    // Ripple effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', createRipple);
    });

    // Form validation
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', validateForm);
    });

    // THEME TOGGLE
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // Toggles .light-mode on <html> element
            const isNowLight = document.documentElement.classList.toggle('light-mode');

            // If user turned on light mode, store it
            if (isNowLight) {
                localStorage.setItem('theme', 'light');
            } else {
                // Otherwise remove the item to default dark
                localStorage.removeItem('theme');
            }
        });
    }
});

function createRipple(e) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.left = `${e.offsetX}px`;
    ripple.style.top = `${e.offsetY}px`;
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

function validateForm(e) {
    const form = e.target;
    if (!form.checkValidity()) {
        e.preventDefault();
        form.classList.add('was-validated');
    }
}

// Booking functionality
document.querySelectorAll('.quantity-selector').forEach(selector => {
    selector.querySelector('.plus').addEventListener('click', () => {
        const count = selector.querySelector('.count');
        count.textContent = parseInt(count.textContent) + 1;
    });
    
    selector.querySelector('.minus').addEventListener('click', () => {
        const count = selector.querySelector('.count');
        if (parseInt(count.textContent) > 0) {
            count.textContent = parseInt(count.textContent) - 1;
        }
    });
});

// Booking Page Quantity Selector
document.querySelectorAll('.quantity-selector').forEach(selector => {
    const plus = selector.querySelector('.plus');
    const minus = selector.querySelector('.minus');
    const count = selector.querySelector('.count');
    
    plus.addEventListener('click', () => {
        count.textContent = parseInt(count.textContent) + 1;
        updateOrderSummary();
    });
    
    minus.addEventListener('click', () => {
        if (parseInt(count.textContent) > 0) {
            count.textContent = parseInt(count.textContent) - 1;
            updateOrderSummary();
        }
    });
});

function updateOrderSummary() {
    const ticketPrice = 199.99;
    const serviceFee = 40.00;
    const ticketCount = parseInt(document.querySelector('.count').textContent);
    const total = (ticketCount * ticketPrice) + serviceFee;
    
    document.querySelector('.order-summary .total').textContent = `$${total.toFixed(2)}`;
}

// Form Validation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        if (isValid) {
            showLoadingSpinner();
            // Simulate API call
            setTimeout(() => {
                window.location.href = 'confirmation.html';
            }, 1500);
        }
    });
});

// Filter functionality
document.addEventListener('DOMContentLoaded', () => {
    // Price range display
    const priceRange = document.querySelector('input[type="range"]');
    if (priceRange) {
        const priceDisplay = document.createElement('div');
        priceDisplay.className = 'text-end text-muted small mb-2';
        priceRange.parentElement.prepend(priceDisplay);

        priceRange.addEventListener('input', () => {
            priceDisplay.textContent = `$${priceRange.value}`;
        });
    }

    // Category filtering
    document.querySelectorAll('.form-check-input').forEach(checkbox => {
        checkbox.addEventListener('change', filterEvents);
    });
});

function filterEvents() {
    const activeCategories = Array.from(
        document.querySelectorAll('.form-check-input:checked')
    ).map(cb => cb.id);

    document.querySelectorAll('.event-card').forEach(card => {
        const category = card.querySelector('.badge')?.textContent.toLowerCase();
        const matches = activeCategories.length === 0 || 
                        activeCategories.includes(category);
        
        card.style.display = matches ? 'block' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
});

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe')?.checked;

    // Here you would typically send a request to your backend
    // For demonstration, we'll just log the values and simulate a login
    console.log('Login attempt:', { email, password, rememberMe });

    // Simulate API call
    simulateLogin(email, password)
        .then(response => {
            if (response.success) {
                // Redirect to dashboard or home page
                window.location.href = 'dashboard.html';
            } else {
                // Show error message
                alert('Login failed: ' + response.message);
            }
        })
        .catch(error => {
            console.error('Login error:', error);
            alert('An error occurred. Please try again.');
        });
}

function simulateLogin(email, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate a successful login (replace with actual authentication logic)
            if (email && password) {
                resolve({ success: true, message: 'Login successful' });
            } else {
                resolve({ success: false, message: 'Invalid credentials' });
            }
        }, 1000); // Simulate network delay
    });
}

function handleSignup(e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms')?.checked;

    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
    }

    if (!agreeTerms) {
        alert("Please agree to the Terms and Conditions");
        return;
    }

    // Here you would typically send a request to your backend
    // For demonstration, we'll just log the values and simulate a signup
    console.log('Signup attempt:', { fullName, email, password, agreeTerms });

    // Simulate API call
    simulateSignup(fullName, email, password)
        .then(response => {
            if (response.success) {
                alert('Signup successful! Please log in.');
                window.location.href = 'login.html';
            } else {
                alert('Signup failed: ' + response.message);
            }
        })
        .catch(error => {
            console.error('Signup error:', error);
            alert('An error occurred. Please try again.');
        });
}

function simulateSignup(fullName, email, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Simulate a successful signup (replace with actual logic)
            if (fullName && email && password) {
                resolve({ success: true, message: 'Signup successful' });
            } else {
                resolve({ success: false, message: 'Invalid information' });
            }
        }, 1000); // Simulate network delay
    });
}
