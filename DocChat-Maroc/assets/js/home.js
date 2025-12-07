// ========== VÉRIFICATION DE LA CONNEXION ========== //
// Vérifier si l'utilisateur est connecté
const userRole = localStorage.getItem('userRole');
const userEmail = localStorage.getItem('userEmail');

if (!userRole || !userEmail) {
    // Rediriger vers la page de connexion si pas connecté
    window.location.href = 'login.html';
}

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

// ========== MESSAGE DE BIENVENUE PERSONNALISÉ ========== //
const welcomeMessage = document.getElementById('welcomeMessage');
if (welcomeMessage && userEmail) {
    const userName = userEmail.split('@')[0];
    const capitalizedName = userName.charAt(0).toUpperCase() + userName.slice(1);
    welcomeMessage.textContent = `Bienvenue ${capitalizedName}, trouvez et consultez un médecin en quelques clics`;
}

// ========== DÉCONNEXION ========== //
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        // Confirmation de déconnexion
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            // Effacer les données de session
            localStorage.removeItem('userRole');
            localStorage.removeItem('userEmail');
            
            // Rediriger vers la page de connexion
            window.location.href = 'login.html';
        }
    });
}

// ========== RECHERCHE ========== //
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

if (searchBtn && searchInput) {
    // Fonction de recherche
    const performSearch = () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            console.log('Recherche pour:', searchTerm);
            // Ici, vous pouvez ajouter la logique de recherche réelle
            alert(`Recherche de médecins pour: "${searchTerm}"`);
        }
    };

    // Recherche au clic
    searchBtn.addEventListener('click', performSearch);

    // Recherche avec la touche Entrée
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// ========== BOUTON CONSULTER MAINTENANT ========== //
const ctaConsult = document.getElementById('ctaConsult');
if (ctaConsult) {
    ctaConsult.addEventListener('click', () => {
        console.log('Consultation rapide demandée');
        alert('Redirection vers la page de consultation...');
        // Ici, ajoutez la redirection vers votre page de consultation
    });
}

// ========== BOUTONS DE CONSULTATION DES MÉDECINS ========== //
const consultBtns = document.querySelectorAll('.btn-consult');
consultBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const doctorCard = btn.closest('.doctor-card');
        const doctorName = doctorCard.querySelector('.doctor-name').textContent;
        console.log(`Consultation demandée avec ${doctorName}`);
        alert(`Demande de consultation avec ${doctorName}`);
        // Ici, ajoutez la logique pour démarrer une consultation
    });
});

// ========== ANIMATION AU SCROLL ========== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les cartes d'information
document.querySelectorAll('.info-card, .doctor-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ========== GESTION DES LIENS DE NAVIGATION ========== //
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Retirer la classe active de tous les liens
        navLinks.forEach(l => l.classList.remove('active'));
        // Ajouter la classe active au lien cliqué
        e.target.classList.add('active');
    });
});