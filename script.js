// StyleShop - JavaScript Principal
// Variables globales
const ADMIN_PASSWORD = 'kouame';
const WHATSAPP_NUMBER = '+22967924076';
const STORAGE_KEY = 'styleshop_products';

// État de l'application
let products = [];
let isAdminLoggedIn = false;

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Fonction d'initialisation principale
function initializeApp() {
    loadProducts();
    
    // Initialiser selon la page actuelle
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'index':
            initializeHomePage();
            break;
        case 'vetements':
            initializeVetementsPage();
            break;
        case 'admin':
            initializeAdminPage();
            break;
    }
    
    // Initialiser les animations de scroll
    initializeScrollAnimations();
    
    // Initialiser les statistiques animées si sur la page d'accueil
    if (currentPage === 'index') {
        initializeStatsAnimation();
    }
}

// Obtenir la page actuelle
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('vetements.html')) return 'vetements';
    if (path.includes('admin.html')) return 'admin';
    return 'index';
}

// Initialiser la page d'accueil
function initializeHomePage() {
    displayFeaturedProducts();
    
    // Animer les éléments de la page d'accueil
    setTimeout(() => {
        animateHeroElements();
    }, 500);
}

// Animer les éléments du hero
function animateHeroElements() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        heroTitle.classList.add('animate-slide-up');
    }
    
    if (heroDescription) {
        setTimeout(() => {
            heroDescription.classList.add('animate-slide-up');
        }, 300);
    }
    
    if (heroButtons) {
        setTimeout(() => {
            heroButtons.classList.add('animate-slide-up');
        }, 600);
    }
}

// Afficher les produits en vedette sur la page d'accueil
function displayFeaturedProducts() {
    const carousel = document.getElementById('featuredCarousel');
    if (!carousel) return;
    
    if (products.length === 0) {
        carousel.innerHTML = `
            <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <div class="no-products-icon">🛍️</div>
                <h3>Bientôt disponible</h3>
                <p>Des produits exceptionnels arrivent prochainement !</p>
            </div>
        `;
        return;
    }
    
    // Afficher jusqu'à 6 produits en vedette
    const featuredProducts = products.slice(0, 6);
    carousel.innerHTML = featuredProducts.map(product => createProductCard(product, false)).join('');
}

// Initialiser la page des vêtements
function initializeVetementsPage() {
    displayAllProducts();
    initializeFilters();
}

// Afficher tous les produits
function displayAllProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    const noProducts = document.getElementById('noProducts');
    
    if (!grid) return;
    
    let filteredProducts = products;
    
    // Appliquer le filtre
    if (filter !== 'all') {
        filteredProducts = products.filter(product => product.category === filter);
    }
    
    if (filteredProducts.length === 0) {
        grid.style.display = 'none';
        if (noProducts) noProducts.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        if (noProducts) noProducts.style.display = 'none';
        grid.innerHTML = filteredProducts.map(product => createProductCard(product, true)).join('');
    }
}

// Créer une carte produit
function createProductCard(product, showDelete = false) {
    const imageSrc = product.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNhbnMgaW1hZ2U8L3RleHQ+PC9zdmc+';
    
    return `
        <div class="product-card animate-on-scroll" data-category="${product.category}">
            <img src="${imageSrc}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <span class="product-category">${getCategoryLabel(product.category)}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
                <div class="product-actions">
                    <button class="btn-order" onclick="orderProduct('${product.id}')">
                        📱 Commander
                    </button>
                    ${showDelete ? `<button class="btn-delete" onclick="deleteProduct('${product.id}')" title="Supprimer">🗑️</button>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Obtenir le label de la catégorie
function getCategoryLabel(category) {
    const labels = {
        'homme': 'Homme',
        'femme': 'Femme',
        'enfant': 'Enfant',
        'accessoire': 'Accessoire'
    };
    return labels[category] || category;
}

// Formater le prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0
    }).format(price);
}

// Initialiser les filtres
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Appliquer le filtre
            const filter = this.dataset.filter;
            displayAllProducts(filter);
        });
    });
}

// Commander un produit (ouvrir WhatsApp)
function orderProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const message = `Bonjour, je suis intéressé(e) par l'article suivant:\n\n` +
                   `📦 Article: ${product.name}\n` +
                   `💰 Prix: ${formatPrice(product.price)}\n` +
                   `🏷️ Catégorie: ${getCategoryLabel(product.category)}\n\n` +
                   `Je souhaite passer commande. Merci!`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${encodeURIComponent(message)}`;
    
    // Ouvrir WhatsApp dans un nouvel onglet
    window.open(whatsappUrl, '_blank');
    
    // Afficher un message de confirmation
    showToast('Redirection vers WhatsApp...', 'success');
}

// Initialiser la page admin
function initializeAdminPage() {
    checkAdminSession();
    
    if (isAdminLoggedIn) {
        showAdminPanel();
    } else {
        showAdminLogin();
    }
    
    // Gérer le formulaire de connexion
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleAdminLogin);
    }
    
    // Gérer le formulaire d'ajout de produit
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', handleAddProduct);
    }
    
    // Gérer la déconnexion
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleAdminLogout);
    }
}

// Vérifier la session admin
function checkAdminSession() {
    const session = localStorage.getItem('adminSession');
    if (session) {
        const sessionData = JSON.parse(session);
        const now = new Date().getTime();
        
        // Session valide pendant 24 heures
        if (now - sessionData.timestamp < 24 * 60 * 60 * 1000) {
            isAdminLoggedIn = true;
        } else {
            localStorage.removeItem('adminSession');
        }
    }
}

// Afficher le formulaire de connexion admin
function showAdminLogin() {
    const loginSection = document.getElementById('adminLogin');
    const panelSection = document.getElementById('adminPanel');
    
    if (loginSection) loginSection.style.display = 'block';
    if (panelSection) panelSection.style.display = 'none';
}

// Afficher le panneau admin
function showAdminPanel() {
    const loginSection = document.getElementById('adminLogin');
    const panelSection = document.getElementById('adminPanel');
    
    if (loginSection) loginSection.style.display = 'none';
    if (panelSection) panelSection.style.display = 'block';
    
    displayAdminProducts();
    updateProductsStats();
}

// Gérer la connexion admin
function handleAdminLogin(e) {
    e.preventDefault();
    
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('loginError');
    
    if (password === ADMIN_PASSWORD) {
        isAdminLoggedIn = true;
        
        // Créer une session
        const sessionData = {
            loggedIn: true,
            timestamp: new Date().getTime()
        };
        localStorage.setItem('adminSession', JSON.stringify(sessionData));
        
        // Afficher le panneau admin
        showAdminPanel();
        
        // Réinitialiser le formulaire
        document.getElementById('loginForm').reset();
        if (errorMsg) errorMsg.style.display = 'none';
        
        showToast('Connexion réussie !', 'success');
    } else {
        if (errorMsg) errorMsg.style.display = 'block';
        showToast('Mot de passe incorrect', 'error');
    }
}

// Gérer la déconnexion admin
function handleAdminLogout() {
    isAdminLoggedIn = false;
    localStorage.removeItem('adminSession');
    showAdminLogin();
    showToast('Déconnexion réussie', 'success');
}

// Gérer l'ajout d'un produit
function handleAddProduct(e) {
    e.preventDefault();
    
    if (!isAdminLoggedIn) {
        showToast('Vous devez être connecté en tant qu\'administrateur', 'error');
        return;
    }
    
    const formData = new FormData(e.target);
    const productName = formData.get('productName').trim();
    const productPrice = parseInt(formData.get('productPrice'));
    const productCategory = formData.get('productCategory');
    const productDescription = formData.get('productDescription')?.trim();
    const productImage = document.getElementById('productImage').files[0];
    
    // Validation
    if (!productName || !productPrice || !productCategory) {
        showToast('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }
    
    if (productPrice <= 0) {
        showToast('Le prix doit être supérieur à 0', 'error');
        return;
    }
    
    // Créer le produit
    const product = {
        id: generateId(),
        name: productName,
        price: productPrice,
        category: productCategory,
        description: productDescription || '',
        image: null,
        createdAt: new Date().toISOString()
    };
    
    // Gérer l'image si fournie
    if (productImage) {
        if (productImage.size > 5 * 1024 * 1024) { // 5MB max
            showToast('L\'image ne doit pas dépasser 5MB', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            product.image = e.target.result;
            addProductToStorage(product);
        };
        reader.readAsDataURL(productImage);
    } else {
        addProductToStorage(product);
    }
}

// Ajouter le produit au stockage
function addProductToStorage(product) {
    products.unshift(product);
    saveProducts();
    
    // Mettre à jour l'affichage
    displayAdminProducts();
    updateProductsStats();
    
    // Réinitialiser le formulaire
    document.getElementById('addProductForm').reset();
    
    showToast('Produit ajouté avec succès !', 'success');
}

// Afficher les produits dans le panneau admin
function displayAdminProducts() {
    const productsList = document.getElementById('productsList');
    if (!productsList) return;
    
    if (products.length === 0) {
        productsList.innerHTML = `
            <div class="no-products" style="grid-column: 1 / -1;">
                <div class="no-products-icon">📦</div>
                <h3>Aucun produit</h3>
                <p>Ajoutez votre premier produit ci-dessus</p>
            </div>
        `;
        return;
    }
    
    productsList.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPlNhbnMgaW1hZ2U8L3RleHQ+PC9zdmc+'}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <span class="product-category">${getCategoryLabel(product.category)}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">${formatPrice(product.price)}</div>
                ${product.description ? `<p class="product-description">${product.description}</p>` : ''}
                <div class="product-actions">
                    <button class="btn-order" onclick="orderProduct('${product.id}')">
                        📱 Commander
                    </button>
                    <button class="btn-delete" onclick="deleteProduct('${product.id}')" title="Supprimer">
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Mettre à jour les statistiques des produits
function updateProductsStats() {
    const statsContainer = document.getElementById('productsStats');
    if (!statsContainer) return;
    
    const totalProducts = products.length;
    const categories = {};
    let totalValue = 0;
    
    products.forEach(product => {
        categories[product.category] = (categories[product.category] || 0) + 1;
        totalValue += product.price;
    });
    
    statsContainer.innerHTML = `
        <div class="stat-card">
            <h3>${totalProducts}</h3>
            <p>Total articles</p>
        </div>
        <div class="stat-card">
            <h3>${Object.keys(categories).length}</h3>
            <p>Catégories</p>
        </div>
        <div class="stat-card">
            <h3>${formatPrice(totalValue)}</h3>
            <p>Valeur totale</p>
        </div>
    `;
}

// Supprimer un produit
function deleteProduct(productId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        return;
    }
    
    products = products.filter(p => p.id !== productId);
    saveProducts();
    
    // Mettre à jour l'affichage
    displayAdminProducts();
    updateProductsStats();
    
    // Si on est sur la page des vêtements, mettre à jour aussi
    if (getCurrentPage() === 'vetements') {
        displayAllProducts();
    }
    
    // Si on est sur la page d'accueil, mettre à jour aussi
    if (getCurrentPage() === 'index') {
        displayFeaturedProducts();
    }
    
    showToast('Produit supprimé avec succès', 'success');
}

// Initialiser les animations de scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments avec la classe animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Initialiser l'animation des statistiques
function initializeStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateNumber = (element) => {
        const target = parseInt(element.dataset.target);
        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Fonctions utilitaires
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function loadProducts() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        products = stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        products = [];
    }
}

function saveProducts() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
        console.error('Erreur lors de la sauvegarde des produits:', error);
    }
}

// Système de notifications (Toast)
function showToast(message, type = 'success') {
    // Supprimer les toasts existants
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Créer le nouveau toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span>${type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'}</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Afficher le toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Masquer le toast après 3 secondes
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Gestion du scroll de la navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// Gestion du bouton de retour en haut
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Créer le bouton de retour en haut
setTimeout(createBackToTopButton, 1000);

// Protection contre la perte de données du formulaire
function protectFormData() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Restaurer les valeurs sauvegardées
            const savedValue = localStorage.getItem(`form_${form.id}_${input.name}`);
            if (savedValue && input.type !== 'file' && input.type !== 'password') {
                input.value = savedValue;
            }
            
            // Sauvegarder les valeurs en temps réel
            input.addEventListener('input', () => {
                if (input.type !== 'file' && input.type !== 'password') {
                    localStorage.setItem(`form_${form.id}_${input.name}`, input.value);
                }
            });
        });
        
        // Nettoyer les données du formulaire après soumission
        form.addEventListener('submit', () => {
            inputs.forEach(input => {
                if (input.type !== 'file' && input.type !== 'password') {
                    localStorage.removeItem(`form_${form.id}_${input.name}`);
                }
            });
        });
    });
}

// Activer la protection des formulaires
document.addEventListener('DOMContentLoaded', protectFormData);

// Mode hors ligne
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Ajouter des produits d'exemple (pour la démonstration)
function addSampleProducts() {
    const sampleProducts = [
        {
            id: 'sample1',
            name: 'T-shirt Nike Classic',
            price: 15000,
            category: 'homme',
            description: 'T-shirt confortable en coton 100%',
            image: null,
            createdAt: new Date().toISOString()
        },
        {
            id: 'sample2',
            name: 'Robe élégante',
            price: 25000,
            category: 'femme',
            description: 'Robe parfaite pour les occasions spéciales',
            image: null,
            createdAt: new Date().toISOString()
        },
        {
            id: 'sample3',
            name: 'Chemise formelle',
            price: 20000,
            category: 'homme',
            description: 'Chemise idéale pour le bureau',
            image: null,
            createdAt: new Date().toISOString()
        }
    ];
    
    // Ajouter les produits d'exemple s'il n'y a pas de produits
    if (products.length === 0) {
        products = sampleProducts;
        saveProducts();
        
        // Rafraîchir l'affichage
        if (getCurrentPage() === 'index') {
            displayFeaturedProducts();
        } else if (getCurrentPage() === 'vetements') {
            displayAllProducts();
        } else if (getCurrentPage() === 'admin' && isAdminLoggedIn) {
            displayAdminProducts();
            updateProductsStats();
        }
        
        showToast('Produits d\'exemple ajoutés !', 'success');
    }
}

// Ajouter des produits d'exemple si nécessaire (décommenter pour la démo)
// setTimeout(addSampleProducts, 2000);
