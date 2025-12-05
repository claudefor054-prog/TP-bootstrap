// ===== CONFIGURATION =====
const CONFIG = {
    imageBasePath: 'assets/images/', // Chemin de base pour les images
    placeholderImage: 'https://via.placeholder.com/400x300/ff6b6b/ffffff?text=',
    animationDuration: 300,
    notificationTimeout: 5000
};

// ===== DONNÉES DES PRODUITS (CORRIGÉES) =====
const products = [
    {
        id: 1,
        name: "T-shirt Homme Premium",
        category: "Homme",
        price: 34.99,
        oldPrice: 49.99,
        discount: 30,
        image: "img1.png", // Chemin relatif seulement
        description: "T-shirt en coton biologique, confort exceptionnel et coupe moderne. Idéal pour toutes les occasions."
    },
    {
        id: 2,
        name: "Robe Élégante Soirée",
        category: "Femme",
        price: 89.99,
        oldPrice: null,
        discount: 0,
        image: "img2.png",
        description: "Robe cocktail en soie naturelle, coupe ajustée pour une silhouette parfaite. Parfaite pour les événements spéciaux."
    },
    {
        id: 3,
        name: "Ensemble Sport Élégant",
        category: "Homme",
        price: 79.99,
        oldPrice: 99.99,
        discount: 20,
        image: "img3.png",
        description: "Ensemble complet pour vos séances de sport. Matières techniques respirantes et design moderne."
    },
    {
        id: 4,
        name: "Manteau d'Hiver Luxe",
        category: "Femme",
        price: 159.99,
        oldPrice: 199.99,
        discount: 20,
        image: "img4.png",
        description: "Manteau en laine mérinos, doublure chaude. Protection optimale contre le froid avec style."
    },
    {
        id: 5,
        name: "Ensemble Casual Urbain",
        category: "Homme",
        price: 64.99,
        oldPrice: 84.99,
        discount: 24,
        image: "img5.png",
        description: "Look urbain tendance : sweat à capuche et pantalon jogging en coton premium."
    },
    {
        id: 6,
        name: "Veste en Cuir Véritable",
        category: "Femme",
        price: 199.99,
        oldPrice: 249.99,
        discount: 20,
        image: "img1.png",
        description: "Veste en cuir véritable, tannage végétal. Pièce intemporelle de qualité exceptionnelle."
    }
];

// ===== DONNÉES DES ARTICLES (CORRIGÉES) =====
const articles = [
    { id: 1, designation: "T-shirt Homme Premium", categorie: "Homme", pu: 34.99, stock: 42, disponibilite: "En stock", image: "img1.png" },
    { id: 2, designation: "Robe Élégante Soirée", categorie: "Femme", pu: 89.99, stock: 18, disponibilite: "En stock", image: "img2.png" },
    { id: 3, designation: "Ensemble Sport Élégant", categorie: "Homme", pu: 79.99, stock: 25, disponibilite: "En stock", image: "img3.png" },
    { id: 4, designation: "Manteau d'Hiver Luxe", categorie: "Femme", pu: 159.99, stock: 6, disponibilite: "Stock limité", image: "img4.png" },
    { id: 5, designation: "Ensemble Casual Urbain", categorie: "Homme", pu: 64.99, stock: 35, disponibilite: "En stock", image: "img5.png" },
    { id: 6, designation: "Veste en Cuir Véritable", categorie: "Femme", pu: 199.99, stock: 3, disponibilite: "Stock limité", image: "img1.png" },
    { id: 7, designation: "Chaussures de Ville", categorie: "Homme", pu: 129.99, stock: 22, disponibilite: "En stock", image: "img2.png" },
    { id: 8, designation: "Sac à Main Designer", categorie: "Accessoire", pu: 149.99, stock: 8, disponibilite: "En stock", image: "img3.png" },
    { id: 9, designation: "Chemise sur-mesure", categorie: "Homme", pu: 74.99, stock: 15, disponibilite: "En stock", image: "img4.png" },
    { id: 10, designation: "Jupe en Soie", categorie: "Femme", pu: 59.99, stock: 0, disponibilite: "Rupture", image: "img5.png" },
    { id: 11, designation: "Bonnet Cachemire", categorie: "Accessoire", pu: 29.99, stock: 48, disponibilite: "En stock", image: "img1.png" },
    { id: 12, designation: "Costume Affaires", categorie: "Homme", pu: 299.99, stock: 4, disponibilite: "Stock limité", image: "img2.png" }
];

// ===== UTILITAIRES =====

/**
 * Obtient le chemin complet d'une image
 */
function getImagePath(imageName) {
    return `${CONFIG.imageBasePath}${imageName}`;
}

/**
 * Obtient l'URL du placeholder pour une image
 */
function getPlaceholderUrl(text, category) {
    return `${CONFIG.placeholderImage}${encodeURIComponent(text || category)}`;
}

/**
 * Crée un élément image avec gestion d'erreur
 */
function createImageElement(src, alt, className = '') {
    const img = document.createElement('img');
    img.src = getImagePath(src);
    img.alt = alt;
    img.className = className;
    img.loading = 'lazy';
    
    // Gestion d'erreur améliorée
    img.onerror = function() {
        console.warn(`⚠️ Image non trouvée: ${src}, tentative de correction...`);
        
        // Tentative de correction automatique
        const correctedPath = src.replace('img', 'image');
        this.src = correctedPath.includes('assets/images/') ? correctedPath : getImagePath(correctedPath);
        
        this.onerror = function() {
            console.error(`❌ Image DEFINITIVEMENT non trouvée: ${src}, utilisation du placeholder`);
            this.src = getPlaceholderUrl(alt, 'Produit');
            this.classList.add('placeholder-img');
        };
    };
    
    return img;
}

// ===== FONCTIONS POUR LA PAGE D'ACCUEIL =====

/**
 * Génère les cartes de produits sur la page d'accueil (VERSION AMÉLIORÉE)
 */
function generateProductCards() {
    const container = document.getElementById('product-grid');
    if (!container) return;
    
    console.log('🔄 Génération des cartes produits...');
    container.innerHTML = '';
    
    products.forEach(product => {
        console.log(`📦 Chargement produit: ${product.name}, Image: ${getImagePath(product.image)}`);
        
        const card = createProductCard(product);
        container.appendChild(card);
    });
    
    console.log('✅ Cartes produits générées avec succès');
    setupAddToCartButtons();
}

/**
 * Crée une carte produit (VERSION OPTIMISÉE)
 */
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';
    
    // Card container
    const card = document.createElement('div');
    card.className = 'card h-100 shadow-lg';
    
    // Image container avec overlay
    const imageContainer = document.createElement('div');
    imageContainer.className = 'position-relative overflow-hidden';
    
    // Image
    const img = createImageElement(product.image, product.name, 'card-img-top');
    imageContainer.appendChild(img);
    
    // Discount badge
    if (product.discount > 0) {
        const discountBadge = document.createElement('div');
        discountBadge.className = 'discount-badge';
        discountBadge.innerHTML = `-${product.discount}%`;
        imageContainer.appendChild(discountBadge);
    }
    
    // Category badge
    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'category-badge badge bg-dark';
    categoryBadge.textContent = product.category;
    imageContainer.appendChild(categoryBadge);
    
    card.appendChild(imageContainer);
    
    // Card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body d-flex flex-column';
    
    // Title
    const title = document.createElement('h5');
    title.className = 'card-title fw-bold';
    title.textContent = product.name;
    cardBody.appendChild(title);
    
    // Description
    const description = document.createElement('p');
    description.className = 'card-text flex-grow-1';
    description.textContent = product.description;
    cardBody.appendChild(description);
    
    // Price and button container
    const priceContainer = document.createElement('div');
    priceContainer.className = 'd-flex justify-content-between align-items-center mt-auto';
    
    // Price section
    const priceSection = document.createElement('div');
    priceSection.className = 'd-flex align-items-center';
    
    const currentPrice = document.createElement('span');
    currentPrice.className = 'price-tag';
    currentPrice.textContent = `${product.price.toFixed(2)}€`;
    priceSection.appendChild(currentPrice);
    
    if (product.oldPrice) {
        const oldPrice = document.createElement('small');
        oldPrice.className = 'old-price ms-2';
        oldPrice.textContent = `${product.oldPrice.toFixed(2)}€`;
        priceSection.appendChild(oldPrice);
    }
    
    priceContainer.appendChild(priceSection);
    
    // Add to cart button
    const button = document.createElement('button');
    button.className = 'btn btn-danger add-to-cart';
    button.setAttribute('data-id', product.id);
    button.innerHTML = '<i class="fas fa-cart-plus me-2"></i>Ajouter';
    priceContainer.appendChild(button);
    
    cardBody.appendChild(priceContainer);
    card.appendChild(cardBody);
    col.appendChild(card);
    
    return col;
}

/**
 * Configure les événements pour les boutons "Ajouter au panier"
 */
function setupAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            
            if (product) {
                addToCart(product);
                animateButton(this);
                showNotification(`✅ ${product.name} a été ajouté à votre panier !`, 'success');
            }
        });
    });
}

/**
 * Anime le bouton lors de l'ajout au panier
 */
function animateButton(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check me-2"></i>Ajouté !';
    button.classList.add('btn-success');
    button.classList.remove('btn-danger');
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.classList.remove('btn-success');
        button.classList.add('btn-danger');
        button.disabled = false;
    }, 1500);
}

/**
 * Ajoute un produit au panier
 */
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('stylemode-cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1
        });
    }
    
    localStorage.setItem('stylemode-cart', JSON.stringify(cart));
    updateCartCounter();
}

/**
 * Met à jour le compteur du panier
 */
function updateCartCounter() {
    const cartBadges = document.querySelectorAll('.navbar .badge.bg-danger');
    if (cartBadges.length > 0) {
        const cart = JSON.parse(localStorage.getItem('stylemode-cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadges.forEach(badge => {
            badge.textContent = totalItems;
            if (totalItems > 0) {
                badge.classList.add('pulse-animation');
                setTimeout(() => badge.classList.remove('pulse-animation'), 500);
            }
        });
    }
}

// ===== FONCTIONS POUR LA PAGE CATALOGUE =====

/**
 * Génère les lignes du tableau (VERSION AMÉLIORÉE)
 */
function generateTableRows(data) {
    const tbody = document.getElementById('tableBody');
    if (!tbody) return;
    
    console.log('🔄 Génération du tableau...');
    tbody.innerHTML = '';
    
    data.forEach(article => {
        const row = createTableRow(article);
        tbody.appendChild(row);
    });
    
    console.log('✅ Tableau généré avec succès');
    setupTableActionButtons();
}

/**
 * Crée une ligne de tableau (VERSION OPTIMISÉE)
 */
function createTableRow(article) {
    const tr = document.createElement('tr');
    
    // ID
    const tdId = document.createElement('th');
    tdId.scope = 'row';
    tdId.className = 'fw-bold';
    tdId.textContent = article.id;
    tr.appendChild(tdId);
    
    // Image
    const tdImage = document.createElement('td');
    const img = createImageElement(article.image, article.designation, '');
    img.style.width = '50px';
    img.style.height = '50px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '8px';
    tdImage.appendChild(img);
    tr.appendChild(tdImage);
    
    // Désignation
    const tdDesignation = document.createElement('td');
    tdDesignation.className = 'fw-bold text-primary';
    tdDesignation.textContent = article.designation;
    tr.appendChild(tdDesignation);
    
    // Catégorie
    const tdCategorie = document.createElement('td');
    const categorieBadge = document.createElement('span');
    categorieBadge.className = 'badge bg-info px-3 py-2';
    categorieBadge.textContent = article.categorie;
    tdCategorie.appendChild(categorieBadge);
    tr.appendChild(tdCategorie);
    
    // Prix
    const tdPrix = document.createElement('td');
    tdPrix.className = 'fw-bold';
    tdPrix.textContent = `${article.pu.toFixed(2)} €`;
    tr.appendChild(tdPrix);
    
    // Stock
    const tdStock = document.createElement('td');
    const stockSpan = document.createElement('span');
    stockSpan.className = `fw-bold ${article.stock < 10 ? 'text-danger' : 'text-success'}`;
    stockSpan.textContent = article.stock;
    tdStock.appendChild(stockSpan);
    tr.appendChild(tdStock);
    
    // Disponibilité
    const tdDispo = document.createElement('td');
    const dispoBadge = document.createElement('span');
    dispoBadge.className = 'badge badge-stock';
    
    if (article.disponibilite === "En stock") {
        dispoBadge.classList.add('bg-success');
    } else if (article.disponibilite === "Stock limité") {
        dispoBadge.classList.add('bg-warning');
    } else {
        dispoBadge.classList.add('bg-danger');
    }
    
    dispoBadge.textContent = article.disponibilite;
    tdDispo.appendChild(dispoBadge);
    tr.appendChild(tdDispo);
    
    // Actions
    const tdActions = document.createElement('td');
    tdActions.innerHTML = `
        <button class="btn btn-action btn-outline-primary view-product" data-id="${article.id}" title="Voir détails">
            <i class="fas fa-eye"></i>
        </button>
        <button class="btn btn-action btn-outline-success edit-product" data-id="${article.id}" title="Modifier">
            <i class="fas fa-edit"></i>
        </button>
        <button class="btn btn-action btn-outline-danger delete-product" data-id="${article.id}" title="Supprimer">
            <i class="fas fa-trash"></i>
        </button>
    `;
    tr.appendChild(tdActions);
    
    return tr;
}

/**
 * Filtre le tableau
 */
function filterTable() {
    const categoryFilter = document.getElementById('categoryFilter');
    const stockFilter = document.getElementById('stockFilter');
    const searchText = document.getElementById('searchTable');
    
    if (!categoryFilter || !stockFilter || !searchText) return;
    
    const categoryValue = categoryFilter.value;
    const stockValue = stockFilter.value;
    const searchValue = searchText.value.toLowerCase();
    
    let filteredData = [...articles];
    
    if (categoryValue !== 'all') {
        filteredData = filteredData.filter(article => article.categorie === categoryValue);
    }
    
    if (stockValue !== 'all') {
        filteredData = filteredData.filter(article => article.disponibilite === stockValue);
    }
    
    if (searchValue) {
        filteredData = filteredData.filter(article => 
            article.designation.toLowerCase().includes(searchValue) || 
            article.id.toString().includes(searchValue) ||
            article.categorie.toLowerCase().includes(searchValue)
        );
    }
    
    generateTableRows(filteredData);
    updateStockSummary(filteredData);
    
    // Notification si aucun résultat
    if (filteredData.length === 0) {
        showNotification('Aucun produit ne correspond à vos critères de recherche', 'warning');
    }
}

/**
 * Met à jour le résumé des stocks
 */
function updateStockSummary(data) {
    const totalProducts = data.length;
    const inStock = data.filter(a => a.disponibilite === "En stock").length;
    const limitedStock = data.filter(a => a.disponibilite === "Stock limité").length;
    const outOfStock = data.filter(a => a.disponibilite === "Rupture").length;
    
    const updateElement = (selector, value) => {
        const el = document.querySelector(selector);
        if (el) {
            el.textContent = value;
            el.classList.add('pulse-animation');
            setTimeout(() => el.classList.remove('pulse-animation'), 500);
        }
    };
    
    updateElement('.total-products', totalProducts);
    updateElement('.in-stock', inStock);
    updateElement('.limited-stock', limitedStock);
    updateElement('.out-of-stock', outOfStock);
}

/**
 * Configure les événements du tableau
 */
function setupTableActionButtons() {
    // Voir détails
    document.querySelectorAll('.view-product').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const article = articles.find(a => a.id === productId);
            if (article) {
                showProductDetails(article);
            }
        });
    });
    
    // Modifier
    document.querySelectorAll('.edit-product').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            showNotification(`✏️ Modification du produit #${productId} en cours...`, 'warning');
        });
    });
    
    // Supprimer
    document.querySelectorAll('.delete-product').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const article = articles.find(a => a.id === productId);
            
            if (article && confirm(`Êtes-vous sûr de vouloir supprimer "${article.designation}" ?\nCette action est irréversible.`)) {
                showNotification(`🗑️ Produit "${article.designation}" supprimé avec succès`, 'danger');
                // Ici vous pouvez ajouter la logique de suppression réelle
            }
        });
    });
}

/**
 * Affiche les détails d'un produit dans une modal
 */
function showProductDetails(article) {
    const modalContent = `
        <div class="text-center mb-3">
            <img src="${getImagePath(article.image)}" 
                 alt="${article.designation}" 
                 style="max-width: 200px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);"
                 onerror="this.src='${getPlaceholderUrl(article.designation, article.categorie)}'">
        </div>
        <h5 class="mb-3">${article.designation}</h5>
        <div class="row">
            <div class="col-6">
                <p><strong><i class="fas fa-tag me-2 text-primary"></i>Catégorie:</strong><br>${article.categorie}</p>
            </div>
            <div class="col-6">
                <p><strong><i class="fas fa-euro-sign me-2 text-success"></i>Prix:</strong><br>${article.pu.toFixed(2)}€</p>
            </div>
            <div class="col-6">
                <p><strong><i class="fas fa-box me-2 text-info"></i>Stock:</strong><br>${article.stock} unités</p>
            </div>
            <div class="col-6">
                <p><strong><i class="fas fa-info-circle me-2 text-warning"></i>Disponibilité:</strong><br>
                    <span class="badge ${article.disponibilite === 'En stock' ? 'bg-success' : article.disponibilite === 'Stock limité' ? 'bg-warning' : 'bg-danger'}">${article.disponibilite}</span>
                </p>
            </div>
        </div>
    `;
    showModal('Détails du produit', modalContent);
}

// ===== FONCTIONS POUR LA PAGE CONTACT =====

/**
 * Configure le formulaire de contact
 */
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        if (!firstName || !lastName || !email || !subject || !message) {
            showNotification('⚠️ Veuillez remplir tous les champs obligatoires (*)', 'danger');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('⚠️ Veuillez entrer une adresse email valide', 'danger');
            return;
        }
        
        // Simulation d'envoi
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification(`🎉 Merci ${firstName} ${lastName} ! Votre message a été envoyé. Nous vous répondrons bientôt à ${email}.`, 'success');
            
            this.reset();
            submitBtn.innerHTML = '<i class="fas fa-check me-2"></i>Message envoyé !';
            submitBtn.classList.add('btn-success');
            submitBtn.classList.remove('btn-contact');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-success');
                submitBtn.classList.add('btn-contact');
            }, 3000);
        }, 1500);
    });
}

/**
 * Validation email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== FONCTIONS UTILITAIRES =====

/**
 * Affiche une notification (VERSION AMÉLIORÉE)
 */
function showNotification(message, type = 'info') {
    document.querySelectorAll('.custom-notification').forEach(n => n.remove());
    
    const iconMap = {
        success: 'fa-check-circle',
        danger: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const notification = document.createElement('div');
    notification.className = `custom-notification alert alert-${type} alert-dismissible fade show`;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 9999;
        min-width: 350px;
        max-width: 400px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        border-radius: 10px;
        border: none;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas ${iconMap[type]} me-3 fs-5"></i>
            <div class="flex-grow-1">${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => notification.remove(), CONFIG.animationDuration);
        }
    }, CONFIG.notificationTimeout);
}

/**
 * Affiche une modal
 */
function showModal(title, content) {
    let modal = document.getElementById('customModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'customModal';
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="fas fa-times me-2"></i>Fermer
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-body').innerHTML = content;
    
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

/**
 * Configure la recherche navbar
 */
function setupNavbarSearch() {
    const searchForm = document.querySelector('.navbar form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="search"]');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                if (window.location.pathname.includes('listeArticles.html')) {
                    document.getElementById('searchTable').value = searchTerm;
                    filterTable();
                    showNotification(`🔍 Recherche : "${searchTerm}"`, 'info');
                } else {
                    window.location.href = `listeArticles.html?search=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }
}

/**
 * Vérifie les paramètres URL
 */
function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    
    if (searchParam && document.getElementById('searchTable')) {
        document.getElementById('searchTable').value = searchParam;
        filterTable();
        showNotification(`🔍 Résultats pour "${searchParam}"`, 'info');
    }
}

/**
 * Ajoute les styles dynamiques pour les animations
 */
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .pulse-animation {
            animation: pulse 0.5s ease-in-out;
        }
        
        .fade-in {
            animation: fadeIn 0.6s ease-out;
        }
        
        .placeholder-img {
            filter: brightness(0.95);
            background-color: #f8f9fa;
        }
        
        .card {
            animation: fadeIn 0.6s ease-out;
        }
        
        .card:nth-child(1) { animation-delay: 0.1s; }
        .card:nth-child(2) { animation-delay: 0.2s; }
        .card:nth-child(3) { animation-delay: 0.3s; }
        .card:nth-child(4) { animation-delay: 0.4s; }
        .card:nth-child(5) { animation-delay: 0.5s; }
        .card:nth-child(6) { animation-delay: 0.6s; }
        
        /* Loading skeleton */
        .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
        
        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }
        
        /* Transition pour les filtres */
        .filter-section {
            transition: all 0.3s ease;
        }
        
        .filter-section:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.12);
        }
        
        /* Animation pour les badges */
        .badge {
            transition: all 0.3s ease;
        }
        
        .badge:hover {
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Affiche un loader pendant le chargement
 */
function showLoader() {
    const loader = document.createElement('div');
    loader.id = 'global-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    loader.innerHTML = `
        <div class="text-center">
            <div class="spinner-border text-danger" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Chargement...</span>
            </div>
            <p class="mt-3 fw-bold text-dark">Chargement de StyleMode...</p>
        </div>
    `;
    document.body.appendChild(loader);
}

/**
 * Cache le loader
 */
function hideLoader() {
    const loader = document.getElementById('global-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
}

/**
 * Initialise le lazy loading pour les images
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('fade-in');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Gère le scroll pour ajouter des effets
 */
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}

/**
 * Initialise tous les event listeners
 */
function initEventListeners() {
    // Scroll effects
    window.addEventListener('scroll', handleScroll);
    
    // Filtres de catalogue
    ['categoryFilter', 'stockFilter', 'searchTable'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            if (id === 'searchTable') {
                element.addEventListener('input', debounce(filterTable, 300));
            } else {
                element.addEventListener('change', filterTable);
            }
        }
    });
    
    // Bouton de recherche navbar
    setupNavbarSearch();
    
    // Vérification des paramètres URL
    checkUrlParams();
}

/**
 * Fonction debounce pour optimiser la recherche
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Vérifie si toutes les images sont chargées
 */
function checkImagesLoaded() {
    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;
    
    if (totalImages === 0) {
        hideLoader();
        return;
    }
    
    images.forEach(img => {
        if (img.complete) {
            loadedCount++;
        } else {
            img.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    hideLoader();
                }
            });
            img.addEventListener('error', () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    hideLoader();
                }
            });
        }
    });
    
    if (loadedCount === totalImages) {
        hideLoader();
    }
}

/**
 * Initialise le site (FONCTION PRINCIPALE)
 */
function initSite() {
    console.log('🚀 Initialisation de StyleMode E-commerce...');
    
    // Afficher le loader
    showLoader();
    
    // Ajouter les styles dynamiques
    addDynamicStyles();
    
    // Mettre à jour le compteur du panier
    updateCartCounter();
    
    // Générer les cartes produits (page d'accueil)
    if (document.getElementById('product-grid')) {
        console.log('📦 Génération des produits...');
        generateProductCards();
    }
    
    // Générer le tableau (page catalogue)
    if (document.getElementById('tableBody')) {
        console.log('📋 Génération du catalogue...');
        generateTableRows(articles);
        updateStockSummary(articles);
    }
    
    // Configurer le formulaire de contact
    setupContactForm();
    
    // Initialiser tous les event listeners
    initEventListeners();
    
    // Initialiser le lazy loading
    initLazyLoading();
    
    // Vérifier le chargement des images
    setTimeout(() => {
        checkImagesLoaded();
    }, 100);
    
    console.log('✨ StyleMode E-commerce initialisé avec succès !');
    console.log(`📊 ${products.length} produits chargés`);
    console.log(`📋 ${articles.length} articles dans le catalogue`);
}

// ===== INITIALISATION AU CHARGEMENT DE LA PAGE =====
document.addEventListener('DOMContentLoaded', initSite);

// ===== GESTION DES ERREURS GLOBALES =====
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.error('❌ Erreur de chargement image:', e.target.src);
    }
});

// ===== EXPORT POUR UTILISATION EXTERNE (optionnel) =====
window.StyleMode = {
    products,
    articles,
    addToCart,
    updateCartCounter,
    showNotification,
    filterTable
};