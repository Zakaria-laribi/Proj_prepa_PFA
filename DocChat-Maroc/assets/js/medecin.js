// ========== SCRIPT SPÉCIFIQUE POUR L'ESPACE MÉDECIN ========== //

// ========== AFFICHAGE DU NOM DU MÉDECIN ========== //
const doctorNameElement = document.getElementById('doctorName');
const userEmail = localStorage.getItem('userEmail');

if (doctorNameElement && userEmail) {
    const userName = userEmail.split('@')[0];
    const capitalizedName = userName.charAt(0).toUpperCase() + userName.slice(1);
    doctorNameElement.textContent = capitalizedName;
}

// ========== AFFICHAGE DE LA DATE ACTUELLE ========== //
const todayDateElement = document.getElementById('todayDate');
if (todayDateElement) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const formattedDate = today.toLocaleDateString('fr-FR', options);
    todayDateElement.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
}

// ========== GESTION DES DEMANDES URGENTES ========== //
const respondButtons = document.querySelectorAll('.btn-respond');
respondButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const urgentItem = btn.closest('.urgent-item');
        const patientName = urgentItem.querySelector('.patient-info h4').textContent;
        const patientIssue = urgentItem.querySelector('.patient-info p').textContent;
        
        console.log(`Réponse à la demande urgente de ${patientName} pour ${patientIssue}`);
        
        // Confirmation et animation
        if (confirm(`Voulez-vous répondre à la demande urgente de ${patientName} ?\n\nMotif: ${patientIssue}`)) {
            // Animation de suppression
            urgentItem.style.opacity = '0';
            urgentItem.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                urgentItem.remove();
                
                // Mettre à jour le badge de compteur
                const badge = document.querySelector('.urgent-card .badge');
                if (badge) {
                    const remainingCount = document.querySelectorAll('.urgent-item').length;
                    badge.textContent = `${remainingCount} nouvelle${remainingCount > 1 ? 's' : ''}`;
                    
                    if (remainingCount === 0) {
                        badge.textContent = 'Aucune';
                        badge.style.background = '#28a745';
                    }
                }
                
                alert(`Consultation démarrée avec ${patientName}`);
            }, 300);
        }
    });
});

// ========== GESTION DES RENDEZ-VOUS DU PLANNING ========== //
const planningItems = document.querySelectorAll('.planning-item');
planningItems.forEach((item) => {
    item.addEventListener('click', () => {
        // Retirer la classe active de tous les items
        planningItems.forEach(i => i.classList.remove('active'));
        
        // Ajouter la classe active à l'item cliqué
        item.classList.add('active');
        
        // Récupérer les informations du rendez-vous
        const time = item.querySelector('.planning-time').textContent;
        const patientName = item.querySelector('.planning-details h4').textContent;
        const details = item.querySelector('.planning-details p').textContent;
        
        console.log(`Rendez-vous sélectionné: ${time} - ${patientName}`);
        
        // Afficher les détails (à personnaliser selon vos besoins)
        const statusBadge = item.querySelector('.status-badge');
        if (statusBadge && statusBadge.classList.contains('upcoming')) {
            // Option pour démarrer la consultation
            const startConsult = confirm(`Démarrer la consultation avec ${patientName.replace('Consultation - ', '')} ?\n\nHeure: ${time}\nMotif: ${details}`);
            if (startConsult) {
                alert('Ouverture de la salle de consultation...');
                // Ici, ajoutez la logique pour ouvrir la consultation
            }
        }
    });
});

// ========== MISE À JOUR DES STATISTIQUES (SIMULATION) ========== //
// Cette fonction simule une mise à jour en temps réel des statistiques
function updateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((stat) => {
        const currentValue = parseInt(stat.textContent);
        // Animation de compteur (optionnelle)
        stat.style.transform = 'scale(1.1)';
        setTimeout(() => {
            stat.style.transform = 'scale(1)';
        }, 200);
    });
}

// ========== ANIMATIONS D'ENTRÉE ========== //
// Animation progressive des cartes de statistiques
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
});

// ========== NOTIFICATIONS (SIMULATION) ========== //
// Fonction pour simuler l'arrivée d'une nouvelle demande urgente
function simulateNewUrgentRequest() {
    const badge = document.querySelector('.urgent-card .badge');
    if (badge) {
        const currentCount = parseInt(badge.textContent);
        badge.textContent = `${currentCount + 1} nouvelles`;
        
        // Animation de notification
        badge.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            badge.style.animation = '';
        }, 500);
    }
}

// Animation pulse pour les notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
    }
`;
document.head.appendChild(style);

// ========== GESTION DE L'ÉTAT DE DISPONIBILITÉ ========== //
// Fonction pour basculer l'état de disponibilité du médecin
let isAvailable = true;

function toggleAvailability() {
    isAvailable = !isAvailable;
    
    if (isAvailable) {
        console.log('Médecin maintenant disponible');
        // Mettre à jour l'interface pour montrer la disponibilité
    } else {
        console.log('Médecin maintenant indisponible');
        // Mettre à jour l'interface pour montrer l'indisponibilité
    }
}

// ========== FILTRAGE ET TRI DU PLANNING ========== //
// Fonction pour trier les rendez-vous par statut ou heure
function sortPlanning(criteria = 'time') {
    const planningList = document.querySelector('.planning-list');
    const items = Array.from(document.querySelectorAll('.planning-item'));
    
    items.sort((a, b) => {
        if (criteria === 'time') {
            const timeA = a.querySelector('.planning-time').textContent;
            const timeB = b.querySelector('.planning-time').textContent;
            return timeA.localeCompare(timeB);
        }
    });
    
    // Réorganiser les éléments dans le DOM
    items.forEach(item => planningList.appendChild(item));
}

// ========== RECHERCHE RAPIDE DE PATIENT ========== //
function searchPatient(searchTerm) {
    const urgentItems = document.querySelectorAll('.urgent-item');
    
    urgentItems.forEach(item => {
        const patientName = item.querySelector('.patient-info h4').textContent.toLowerCase();
        const patientIssue = item.querySelector('.patient-info p').textContent.toLowerCase();
        
        if (patientName.includes(searchTerm.toLowerCase()) || 
            patientIssue.includes(searchTerm.toLowerCase())) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// ========== CONSOLE LOG POUR DEBUG ========== //
console.log('Script médecin chargé avec succès');
console.log('Nombre de demandes urgentes:', document.querySelectorAll('.urgent-item').length);
console.log('Nombre de rendez-vous planifiés:', document.querySelectorAll('.planning-item').length);