// ========== GESTION DU THÈME ========== //
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Charger le thème depuis localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

// Toggle du thème
themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// ========== VALIDATION DU FORMULAIRE ========== //
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Fonction de validation de l'email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fonction pour afficher les erreurs
function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Fonction pour cacher les erreurs
function hideError(input, errorElement) {
    input.classList.remove('error');
    errorElement.classList.remove('show');
}

// Validation en temps réel pour l'email
emailInput.addEventListener('blur', () => {
    const email = emailInput.value.trim();
    if (!email) {
        showError(emailInput, emailError, 'L\'adresse e-mail est requise');
    } else if (!validateEmail(email)) {
        showError(emailInput, emailError, 'Format d\'e-mail invalide');
    } else {
        hideError(emailInput, emailError);
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        hideError(emailInput, emailError);
    }
});

// Validation en temps réel pour le mot de passe
passwordInput.addEventListener('blur', () => {
    const password = passwordInput.value;
    if (!password) {
        showError(passwordInput, passwordError, 'Le mot de passe est requis');
    } else {
        hideError(passwordInput, passwordError);
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.classList.contains('error')) {
        hideError(passwordInput, passwordError);
    }
});

// ========== SOUMISSION DU FORMULAIRE ========== //
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset des erreurs
    hideError(emailInput, emailError);
    hideError(passwordInput, passwordError);

    let isValid = true;

    // Validation de l'email
    const email = emailInput.value.trim();
    if (!email) {
        showError(emailInput, emailError, 'L\'adresse e-mail est requise');
        isValid = false;
    } else if (!validateEmail(email)) {
        showError(emailInput, emailError, 'Format d\'e-mail invalide');
        isValid = false;
    }

    // Validation du mot de passe
    const password = passwordInput.value;
    if (!password) {
        showError(passwordInput, passwordError, 'Le mot de passe est requis');
        isValid = false;
    }

    // Si validation OK, redirection selon le rôle
    if (isValid) {
        const selectedRole = document.querySelector('input[name="role"]:checked').value;
        
        // Sauvegarder le rôle dans localStorage pour l'utiliser dans les autres pages
        localStorage.setItem('userRole', selectedRole);
        localStorage.setItem('userEmail', email);
        
        // Simulation d'authentification avec un léger délai
        setTimeout(() => {
            if (selectedRole === 'patient') {
                window.location.href = 'home-patient.html';
            } else {
                window.location.href = 'home-medecin.html';
            }
        }, 300);
    }
});