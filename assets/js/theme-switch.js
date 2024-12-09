// Sélectionner tous les éléments switch input et les éléments 'toggle-dark-mode' sur la page
const switchInputs = document.querySelectorAll('.switch__input');
const toggleElements = document.querySelectorAll('.toggle-dark-mode'); // Sélectionner les éléments avec la classe 'toggle-dark-mode'
const darkModeClass = 'dark-mode'; // Classe pour le mode sombre

// Lors du chargement de la page, vérifier l'état du mode sombre dans le localStorage
document.addEventListener('DOMContentLoaded', () => {
    const darkModeStatus = localStorage.getItem('darkMode'); // Récupérer l'état du mode sombre depuis le localStorage

    // Si le mode sombre a été activé auparavant, appliquer le mode sombre aux éléments 'toggle-dark-mode'
    if (darkModeStatus === 'enabled') {
        toggleElements.forEach(element => {
            element.classList.add(darkModeClass); // Appliquer le mode sombre aux autres éléments
        });
    } else {
        toggleElements.forEach(element => {
            element.classList.remove(darkModeClass); // Retirer le mode sombre des autres éléments
        });
    }

    // Mettre à jour les switches en fonction de l'état du mode sombre
    switchInputs.forEach(switchInput => {
        switchInput.checked = darkModeStatus === 'enabled'; // Si le mode sombre est activé, activer le switch
    });
});

// Ajouter un gestionnaire d'événements pour chaque switch
switchInputs.forEach(switchInput => {
    switchInput.addEventListener('change', () => {
        // Si l'utilisateur active un switch
        if (switchInput.checked) {
            toggleElements.forEach(element => {
                element.classList.add(darkModeClass); // Appliquer le mode sombre aux autres éléments
            });
            localStorage.setItem('darkMode', 'enabled'); // Sauvegarder l'état dans localStorage
        } else {
            // Si l'utilisateur désactive un switch
            toggleElements.forEach(element => {
                element.classList.remove(darkModeClass); // Retirer le mode sombre des autres éléments
            });
            localStorage.setItem('darkMode', 'disabled'); // Sauvegarder l'état dans localStorage
        }

        // Synchroniser tous les autres switches avec l'état du switch modifié
        switchInputs.forEach(input => {
            input.checked = switchInput.checked; // Synchroniser tous les switches
        });
    });
});
