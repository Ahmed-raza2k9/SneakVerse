document.addEventListener('DOMContentLoaded', function () {

    // Overlay div inject karo automatically
    const overlay = document.createElement("div");
    overlay.className = "transition-overlay";
    document.body.appendChild(overlay);

    // Saare links pakdo
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", e => {
            const href = link.getAttribute("href");

            // Same page ya # link pe effect nahi chale
            if (!href || href.startsWith("#") || link.target === "_blank") return;

            e.preventDefault();

            // Overlay activate
            overlay.classList.add("active");
            overlay.classList.add("active2");

            // Delay ke baad page change
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });

    // ===== Size Guide: Simplified =====
    const convertBtn = document.getElementById('sg-convert');
    if (convertBtn) {
        convertBtn.addEventListener('click', () => {
            const gender = (document.getElementById('sg-gender')?.value) || 'male';
            const region = (document.getElementById('sg-region')?.value) || 'US';
            const size = parseFloat(document.getElementById('sg-size')?.value || '0');
            if (!size || size <= 0) {
                const res = document.getElementById('sg-results');
                if (res) res.innerHTML = '<div class="result-pill">Please enter a valid size</div>';
                return;
            }
            // Simple conversion logic
            const us = region === 'US' ? size : region === 'UK' ? size + 1 : region === 'EU' ? Math.round(size / 1.5 - 33) : Math.round(size / 2.54);
            const map = {
                US: us,
                UK: Math.max(1, us - 1),
                EU: Math.round((us + 33) * 1.5),
                CM: Math.round(us * 2.54)
            };
            const res = document.getElementById('sg-results');
            if (res) {
                res.innerHTML = `
                    <div class="result-pill"><strong>US:</strong> ${map.US}</div>
                    <div class="result-pill"><strong>UK:</strong> ${map.UK}</div>
                    <div class="result-pill"><strong>EU:</strong> ${map.EU}</div>
                    <div class="result-pill"><strong>CM:</strong> ${map.CM}</div>
                `;
            }
        });
    }

    // Quick size chips -> fill input (and keep user in control to press Convert)
    const sgChips = document.querySelectorAll('.sg-chip');
    if (sgChips && sgChips.length) {
        sgChips.forEach(chip => {
            chip.addEventListener('click', () => {
                const val = parseFloat(chip.getAttribute('data-size') || '0');
                const input = document.getElementById('sg-size');
                if (input && !Number.isNaN(val) && val > 0) {
                    input.value = String(val);
                    input.focus();
                }
            });
        });
    }

    // Fit Advisor: compute recommendation from foot length/width and preference
    const adviseBtn = document.getElementById('sg-advise');
    if (adviseBtn) {
        adviseBtn.addEventListener('click', () => {
            const lengthEl = document.getElementById('sg-foot-l');
            const widthEl = document.getElementById('sg-foot-w');
            const prefEl = document.getElementById('sg-fit-pref');
            const meter = document.getElementById('sg-meter');
            const out = document.getElementById('sg-advice');

            const lengthCm = parseFloat(lengthEl?.value || '0');
            const widthCm = parseFloat(widthEl?.value || '0');
            const pref = prefEl?.value || 'regular';

            if (!out) return;
            if (!lengthCm || lengthCm < 15 || lengthCm > 35) {
                out.innerHTML = '<div class="result-pill"><i class="fa-solid fa-circle-exclamation"></i> Enter valid foot length in cm (15 - 35)</div>';
                if (meter) meter.style.width = '0%';
                return;
            }

            // Rough US conversion from foot length (cm). This is approximate for demo.
            // US size ≈ (cm - 18) / 0.667
            let usSize = Math.round(((lengthCm - 18) / 0.667) * 2) / 2; // round to nearest 0.5

            // Adjust for fit preference
            if (pref === 'snug') usSize -= 0.5;
            if (pref === 'loose') usSize += 0.5;

            // Width category
            let widthNote = 'Regular width recommended';
            let meterPct = 50;
            if (widthCm && widthCm > 0) {
                if (widthCm < 9.5) { widthNote = 'Consider narrow fit (N)'; meterPct = 35; }
                else if (widthCm > 10.5) { widthNote = 'Consider wide fit (W)'; meterPct = 70; }
                else { widthNote = 'Regular width recommended'; meterPct = 50; }
            }

            if (meter) meter.style.width = `${meterPct}%`;

            const uk = Math.max(1, usSize - 1);
            const eu = Math.round((usSize + 33) * 1.5);
            const cm = Math.round(usSize * 2.54);

            out.innerHTML = `
                <div class="result-pill"><i class="fa-solid fa-shoe-prints"></i> Recommended US: <strong>${usSize}</strong></div>
                <div class="result-pill">UK: <strong>${uk}</strong> &nbsp; EU: <strong>${eu}</strong> &nbsp; CM: <strong>${cm}</strong></div>
                <div class="result-pill"><i class="fa-solid fa-ruler-horizontal"></i> ${widthNote}</div>
            `;
        });
    }
    // Jab page load hoga to overlay hatao
    window.addEventListener("load", () => {
        overlay.classList.remove("active");
    });

    // ==================== CART SIDEBAR SETUP ====================
    window.cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartBtn = document.getElementById("cart-btn");
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCart = document.getElementById("close-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartIconContainer = document.querySelector('.cart-icon');
    const clearCartBtn = document.getElementById("clear-cart");
    // Buy modal elements
    const buyModal = document.getElementById('buy-modal');
    const buyClose = document.getElementById('buy-close');
    const buyModalItem = document.getElementById('buyModalItem');
    const checkoutForm = document.getElementById('checkout-form');
    cartCount.addEventListener('click', () => { cartBtn.click(); });
    if (cartIconContainer && cartBtn) {
        cartIconContainer.addEventListener('click', (e) => {
            if (e.target === cartIconContainer) { cartBtn.click(); }
        });
    }

    // ==================== UPDATE CART UI ====================
    window.updateCartUI = function() {
        cartItemsContainer.innerHTML = "";

        cart.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
  <img src="${item.image}" alt="${item.name}">
  <div class="cart-item-info">
    <h4>${item.name}</h4>
    <p>$${item.price} x ${item.quantity}</p>
    <button class="buy-now-btn" data-index="${index}">Buy</button>
  </div>
  <span class="cart-item-remove">&times;</span>
`;


            // ❌ Button Functionality
            const removeBtn = div.querySelector(".cart-item-remove");
            removeBtn.addEventListener("click", () => {
                removeFromCart(index);
            });


            cartItemsContainer.appendChild(div);
        });

        // Attach buy handlers
        document.querySelectorAll('.buy-now-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(btn.getAttribute('data-index'));
                const selected = cart[idx];
                if (buyModal) buyModal.dataset.singleIndex = String(idx);
                openBuyModal(selected);
            });
        });

        // Badge update
        cartCount.textContent = cart.length;

        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // ==================== ADD TO CART ====================
    window.addToCart = function(product) {
        // Check if product already exists (by name, size, and color)
        const existing = cart.find(item => 
            item.name === product.name && 
            item.size === product.size && 
            item.color === product.color
        );

        if (existing) {
            // If product exists with same size and color, add to quantity
            existing.quantity += (product.quantity || 1);
        } else {
            // Add new product with specified quantity
            const newProduct = {
                ...product,
                quantity: product.quantity || 1
            };
            cart.push(newProduct);
        }

        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart UI
        updateCartUI();
        
        // Update cart count in navigation
        updateCartCount();
    }

    // ==================== UPDATE CART COUNT ====================
    window.updateCartCount = function() {
        const cartCount = document.getElementById('cart-count');
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    // ==================== REMOVE SPECIFIC ITEM ====================
    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCartUI();
    }

    // ==================== CLEAR CART ====================
    function clearCart() {
        cart = [];
        updateCartUI();
    }

    // ==================== BUY ALL ====================
    const buyAllBtn = document.getElementById('buy-all');
    if (buyAllBtn) {
        buyAllBtn.addEventListener('click', () => {
            if (!cart.length) {
                showNotification('Your cart is empty', 'warning');
                return;
            }
            
            // Open buy modal with all cart items
            openBuyModalFromCart(cart);
        });
    }

    // ==================== BUY MODAL HELPERS ====================
    function openBuyModalFromCart(cartItems) {
        const buyModal = document.getElementById('buy-modal');
        if (!buyModal) return;
        
        buyModal.classList.remove('hidden');
        buyModal.setAttribute('aria-hidden', 'false');
        
        // Show multi-select panel for multiple items
        const selectBox = document.getElementById('buySelect');
        const selectList = document.getElementById('buySelectList');
        
        if (cartItems.length > 1 && selectBox && selectList) {
            selectBox.classList.remove('hidden');
            selectList.innerHTML = '';
            
            cartItems.forEach((item, index) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'buy-select-item';
                itemDiv.innerHTML = `
                    <input type="checkbox" id="item-${index}" data-index="${index}" checked>
                    <label for="item-${index}">
                        <img src="${item.image}" alt="${item.name}">
                        <div>
                            <h4>${item.name}</h4>
                            <p>$${item.price} x ${item.quantity}</p>
                        </div>
                    </label>
                `;
                selectList.appendChild(itemDiv);
            });
        } else {
            if (selectBox) selectBox.classList.add('hidden');
            if (selectList) selectList.innerHTML = '';
        }
        // Clear any single selection index when in multi-select mode
        if (buyModal) delete buyModal.dataset.singleIndex;
        
        // Update modal content with first item or total
        const buyModalItem = document.getElementById('buyModalItem');
        const buyModalPrice = document.getElementById('buyModalPrice');
        const buyModalImage = document.getElementById('buyModalImage');
        
        if (cartItems.length === 1) {
            const item = cartItems[0];
            if (buyModalItem) buyModalItem.textContent = item.name;
            if (buyModalPrice) buyModalPrice.textContent = `$${item.price} x ${item.quantity}`;
            if (buyModalImage && item.image) buyModalImage.src = item.image;
            updateBuyTotal(item);
        } else {
            if (buyModalItem) buyModalItem.textContent = `${cartItems.length} items in cart`;
            if (buyModalPrice) buyModalPrice.textContent = 'Multiple items';
            if (buyModalImage) buyModalImage.src = cartItems[0].image;
            
            // Calculate total for all items with currency conversion
            updateMultiItemTotal(cartItems);
        }
        
        // Focus on name input
        const nameInput = document.getElementById('checkout-name');
        if (nameInput) nameInput.focus();
    }

    function openBuyModal(selectedItem) {
        if (!buyModal) return;
        buyModal.classList.remove('hidden');
        buyModal.setAttribute('aria-hidden', 'false');
        // Ensure single-item mode: hide multi-select panel if it was left open
        const selectBox = document.getElementById('buySelect');
        const selectList = document.getElementById('buySelectList');
        if (selectBox) selectBox.classList.add('hidden');
        if (selectList) selectList.innerHTML = '';
        if (selectedItem) {
            if (buyModalItem) buyModalItem.textContent = selectedItem.name;
            const buyModalPrice = document.getElementById('buyModalPrice');
            if (buyModalPrice) buyModalPrice.textContent = `$${selectedItem.price} x ${selectedItem.quantity}`;
            const img = document.getElementById('buyModalImage');
            if (img && selectedItem.image) img.src = selectedItem.image;
            updateBuyTotal(selectedItem);
        }
        const nameInput = document.getElementById('checkout-name');
        if (nameInput) nameInput.focus();
    }

    function closeBuyModal() {
        if (!buyModal) return;
        buyModal.classList.add('hidden');
        buyModal.setAttribute('aria-hidden', 'true');
        // Reset multi-select state
        const selectBox = document.getElementById('buySelect');
        const selectList = document.getElementById('buySelectList');
        if (selectBox) selectBox.classList.add('hidden');
        if (selectList) selectList.innerHTML = '';
    }

    // ==================== SIDEBAR TOGGLE ====================
    cartBtn.addEventListener("click", () => {
        cartSidebar.classList.add("active");
        cartOverlay.classList.add("active");
    });

    closeCart.addEventListener("click", () => {
        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");
    });

    cartOverlay.addEventListener("click", () => {
        cartSidebar.classList.remove("active");
        cartOverlay.classList.remove("active");
    });

    // Close buy modal via X and backdrop
    if (buyClose) buyClose.addEventListener('click', closeBuyModal);
    if (buyModal) buyModal.addEventListener('click', (e) => {
        if (e.target === buyModal) closeBuyModal();
    });
    // ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeBuyModal();
            cartSidebar.classList.remove("active");
            cartOverlay.classList.remove("active");
        }
    });

    // Checkout form submit
    function showFieldError(inputEl, message) {
        if (!inputEl) return;
        inputEl.classList.add('field-error');
        let helper = inputEl.parentElement.querySelector('.error-text');
        if (!helper) {
            helper = document.createElement('div');
            helper.className = 'error-text';
            inputEl.parentElement.appendChild(helper);
        }
        helper.textContent = message;
    }

    function clearFieldError(inputEl) {
        if (!inputEl) return;
        inputEl.classList.remove('field-error');
        const helper = inputEl.parentElement.querySelector('.error-text');
        if (helper) helper.remove();
    }

    function validateCheckoutForm() {
        const name = document.getElementById('checkout-name');
        const email = document.getElementById('checkout-email');
        const phone = document.getElementById('checkout-phone');
        const address = document.getElementById('checkout-address');
        const payment = document.getElementById('checkout-payment');

        let isValid = true;

        // Clear previous
        [name, email, phone, address, payment].forEach(clearFieldError);

        // Name: at least 2 characters
        if (!name || name.value.trim().length < 2) {
            showFieldError(name, 'Please enter your full name.');
            isValid = false;
        }

        // Email: simple regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!email || !emailRegex.test(email.value.trim())) {
            showFieldError(email, 'Please enter a valid email address.');
            isValid = false;
        }

        // Pakistani mobile: 03XXXXXXXXX (11 digits starting with 03)
        const pkPhoneRegex = /^03\d{9}$/;
        if (!phone || !pkPhoneRegex.test(phone.value.trim())) {
            showFieldError(phone, 'Enter valid Pakistani number e.g. 03443090603');
            isValid = false;
        }

        // Address: at least 20 characters
        if (!address || address.value.trim().length < 20) {
            showFieldError(address, 'Address must be at least 20 characters.');
            isValid = false;
        }

        // Payment selected
        if (!payment || !payment.value) {
            showFieldError(payment, 'Please select a payment method.');
            isValid = false;
        }

        return isValid;
    }

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!validateCheckoutForm()) return;

            // Show order success modal
            const orderModal = document.getElementById('orderSuccessModal');
            const orderClose = document.getElementById('orderCloseModal');
            if (orderModal) {
                setTimeout(() => {
                    orderModal.style.display = 'flex';
                    orderModal.setAttribute('aria-hidden', 'false');
                }, 300);
                if (orderClose) {
                    orderClose.onclick = () => {
                        orderModal.style.display = 'none';
                        orderModal.setAttribute('aria-hidden', 'true');
                    };
                }
                window.addEventListener('click', (evt) => {
                    if (evt.target === orderModal) {
                        orderModal.style.display = 'none';
                        orderModal.setAttribute('aria-hidden', 'true');
                    }
                });
            }
            
            // Remove purchased items from cart
            const selectBox = document.getElementById('buySelect');
            const isMulti = selectBox && !selectBox.classList.contains('hidden');
            if (isMulti) {
                const checks = Array.from(document.querySelectorAll('#buySelectList input[type="checkbox"]'));
                const selectedIndices = checks
                    .filter(c => c.checked)
                    .map(c => parseInt(c.dataset.index))
                    .filter(n => !Number.isNaN(n));
                if (selectedIndices.length) {
                    cart = cart.filter((_, idx) => !selectedIndices.includes(idx));
                    updateCartUI();
                }
            } else {
                const singleIndexAttr = buyModal?.dataset?.singleIndex;
                if (singleIndexAttr !== undefined) {
                    const idx = parseInt(singleIndexAttr);
                    if (!Number.isNaN(idx)) {
                        cart.splice(idx, 1);
                        updateCartUI();
                    }
                } else {
                    const currentName = buyModalItem?.textContent || '';
                    if (currentName) {
                        cart = cart.filter(item => item.name !== currentName);
                        updateCartUI();
                    }
                }
            }
            closeBuyModal();
            cartSidebar.classList.remove("active");
            cartOverlay.classList.remove("active");
            checkoutForm.reset();
        });

        // Realtime validation clears
        ['input', 'change', 'blur'].forEach(evt => {
            checkoutForm.addEventListener(evt, (e) => {
                const target = e.target;
                if (!(target instanceof HTMLElement)) return;
                if (target.id?.startsWith('checkout-')) clearFieldError(target);
            });
        });
    }

    // ==================== CURRENCY & TOTAL ====================
    function updateBuyTotal(item) {
        const totalEl = document.getElementById('buyTotal');
        const currencyEl = document.getElementById('buyCurrency');
        if (!totalEl || !item) return;
        
        const qty = item.quantity || 1;
        const base = parseFloat(item.price) * qty;
        const code = currencyEl ? currencyEl.value : 'USD';
        
        // Currency rates
        const currencyRates = {
            USD: 1,
            PKR: 277,
            AED: 3.67,
            EUR: 0.92,
            GBP: 0.78,
            INR: 83.1
        };
        
        const rate = currencyRates[code] || 1;
        const converted = base * rate;
        
        // Format currency
        const symbolMap = { USD: '$', PKR: '₨', AED: 'د.إ', EUR: '€', GBP: '£', INR: '₹' };
        const symbol = symbolMap[code] || code + ' ';
        
        if (code === 'PKR') {
            totalEl.textContent = `${symbol}${Math.round(converted).toLocaleString()}`;
        } else {
            totalEl.textContent = `${symbol}${converted.toFixed(2)}`;
        }
    }
    
    // Update total for multiple items with currency conversion
    function updateMultiItemTotal(cartItems) {
        const totalEl = document.getElementById('buyTotal');
        const currencyEl = document.getElementById('buyCurrency');
        if (!totalEl || !cartItems) return;
        
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const code = currencyEl ? currencyEl.value : 'USD';
        
        // Currency rates
        const currencyRates = {
            USD: 1,
            PKR: 277,
            AED: 3.67,
            EUR: 0.92,
            GBP: 0.78,
            INR: 83.1
        };
        
        const rate = currencyRates[code] || 1;
        const converted = total * rate;
        
        // Format currency
        const symbolMap = { USD: '$', PKR: '₨', AED: 'د.إ', EUR: '€', GBP: '£', INR: '₹' };
        const symbol = symbolMap[code] || code + ' ';
        
        if (code === 'PKR') {
            totalEl.textContent = `${symbol}${Math.round(converted).toLocaleString()}`;
        } else {
            totalEl.textContent = `${symbol}${converted.toFixed(2)}`;
        }
    }
    
    // Currency change handler
    const currencySelect = document.getElementById('buyCurrency');
    if (currencySelect) {
        currencySelect.addEventListener('change', () => {
            // Get current item from modal
            const buyModalItem = document.getElementById('buyModalItem');
            if (buyModalItem && buyModalItem.textContent) {
                // Check if it's multiple items
                if (buyModalItem.textContent.includes('items in cart')) {
                    // Handle multiple items
                    const cart = JSON.parse(localStorage.getItem('cart')) || [];
                    updateMultiItemTotal(cart);
                } else {
                    // Try to find the single item in cart
                    const cart = JSON.parse(localStorage.getItem('cart')) || [];
                    const currentItem = cart.find(item => item.name === buyModalItem.textContent);
                    if (currentItem) {
                        updateBuyTotal(currentItem);
                    } else {
                        // If not in cart, create a temporary item from modal data
                        const buyModalPrice = document.getElementById('buyModalPrice');
                        if (buyModalPrice) {
                            const priceText = buyModalPrice.textContent;
                            const priceMatch = priceText.match(/\$(\d+(?:\.\d+)?)/);
                            if (priceMatch) {
                                const price = parseFloat(priceMatch[1]);
                                const quantityMatch = priceText.match(/x (\d+)/);
                                const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
                                
                                const tempItem = {
                                    name: buyModalItem.textContent,
                                    price: price,
                                    quantity: quantity
                                };
                                updateBuyTotal(tempItem);
                            }
                        }
                    }
                }
            }
        });
    }

    // ==================== CLEAR CONFIRMATION ====================
    clearCartBtn.addEventListener("click", () => {
        clearCart();
    });
    // ==================== ATTACH ADD TO CART BUTTONS ====================
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    
    addToCartButtons.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            
            const productCard = btn.closest(".product-card, .card, .hero-ctn");
            
            const name =
                productCard.querySelector("h3, h1")?.textContent || "Sneaker";
            // Robust price extraction: look for common price selectors, then fallback to any $ text
            let priceText = "";
            const priceEl = 
                productCard.querySelector('.cx-price') ||
                productCard.querySelector('.price') ||
                productCard.querySelector('.rating-price strong') ||
                productCard.querySelector('.nc-meta .price') ||
                productCard.querySelector('[class*="price"]');
            if (priceEl && priceEl.textContent) {
                priceText = priceEl.textContent;
            } else {
                // Fallback: find the first element containing a $ amount
                const candidate = Array.from(productCard.querySelectorAll('*'))
                    .map(el => el.textContent || '')
                    .find(t => /\$\s*\d/.test(t));
                if (candidate) priceText = candidate;
            }
            const priceMatch = priceText.match(/([\d.,]+)(?=\s*$|[^\d.,])/);
            let price = 0;
            if (priceMatch) {
                price = parseFloat(priceMatch[1].replace(/,/g, ''));
            }
            const image = productCard.querySelector("img")?.src || "";
            const productId = btn.getAttribute("data-product-id") || name.toLowerCase().replace(/\s+/g, '-');

            const product = { 
                id: productId,
                name, 
                price: price, 
                image,
                originalPrice: price ? price * 1.25 : undefined
            };
            
            openAddToCartModal(product);
        });
    });

    // ==================== ATTACH VIEW DETAILS BUTTONS ====================
    document.querySelectorAll(".view-details-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const productId = btn.getAttribute("data-product-id");
            if (productId) {
                window.location.href = `product-detail.html?id=${productId}`;
            }
        });
    });


    // ==================== INIT ====================
    updateCartUI();
    
    // Listen for cart updates from other pages
    window.addEventListener('cartUpdated', () => {
        updateCartUI();
    });

    // ==================== WISHLIST FUNCTIONALITY ====================
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const wishlistBtn = document.getElementById('wishlist-btn');
    const wishlistSidebar = document.getElementById('wishlist-sidebar');
    const wishlistOverlay = document.getElementById('wishlist-overlay');
    const closeWishlist = document.getElementById('close-wishlist');
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const wishlistCount = document.getElementById('wishlist-count');
    const wishlistIconContainer = document.querySelector('.wishlist-icon');
    if (wishlistCount && wishlistBtn) {
        wishlistCount.addEventListener('click', () => { wishlistBtn.click(); });
    }
    if (wishlistIconContainer && wishlistBtn) {
        wishlistIconContainer.addEventListener('click', (e) => {
            if (e.target === wishlistIconContainer) { wishlistBtn.click(); }
        });
    }
    const clearWishlistBtn = document.getElementById('clear-wishlist');

    // Update wishlist count
    function updateWishlistCount() {
        if (wishlistCount) {
            wishlistCount.textContent = wishlist.length;
        }
    }

    // Update wishlist UI
    function updateWishlistUI() {
        if (!wishlistItemsContainer) return;
        
        wishlistItemsContainer.innerHTML = "";
        
        if (wishlist.length === 0) {
            wishlistItemsContainer.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; color: var(--text-color);">
                    <i class="fa-solid fa-heart" style="font-size: 48px; color: #ef4444; margin-bottom: 16px; opacity: 0.5;"></i>
                    <h3 style="margin: 0 0 8px 0; font-size: 18px;">Your wishlist is empty</h3>
                    <p style="margin: 0; opacity: 0.7; font-size: 14px;">Add products you love to your wishlist</p>
                </div>
            `;
            return;
        }
        
        wishlist.forEach((item, index) => {
            const div = document.createElement("div");
            div.classList.add("wishlist-item");
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="wishlist-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price}${item.originalPrice ? ` <span style="text-decoration: line-through; opacity: 0.6;">$${item.originalPrice}</span>` : ''}</p>
                </div>
                <div class="wishlist-item-actions">
                    <button class="view-details-from-wishlist" data-product-id="${item.id}">View Details</button>
                    <button class="wishlist-item-remove" data-product-id="${item.id}">
                        <i class="fa-solid fa-times"></i>
                    </button>
                </div>
            `;
            
            // View details from wishlist
            const viewDetailsBtn = div.querySelector('.view-details-from-wishlist');
            viewDetailsBtn.addEventListener('click', () => {
                // Close wishlist sidebar
                wishlistSidebar.classList.remove('active');
                wishlistOverlay.classList.remove('active');
                
                // Navigate to product detail page
                window.location.href = `product-detail.html?id=${item.id}`;
            });
            
            // Remove from wishlist
            const removeBtn = div.querySelector('.wishlist-item-remove');
            removeBtn.addEventListener('click', () => {
                removeFromWishlist(item.id);
            });
            
            wishlistItemsContainer.appendChild(div);
        });
    }

    // Add to wishlist
    function addToWishlist(product) {
        const existing = wishlist.find(item => item.id === product.id);
        
        if (!existing) {
            const wishlistItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                originalPrice: product.originalPrice
            };
            wishlist.push(wishlistItem);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistCount();
            updateWishlistUI();
            showNotification('Added to wishlist', 'success');
        }
    }

    // Remove from wishlist
    function removeFromWishlist(productId) {
        wishlist = wishlist.filter(item => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
        updateWishlistUI();
        showNotification('Removed from wishlist', 'info');
    }

    // Show notification
    window.showNotification = function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Wishlist sidebar functionality
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            wishlistSidebar.classList.add('active');
            wishlistOverlay.classList.add('active');
            updateWishlistUI();
        });
    }

    if (closeWishlist) {
        closeWishlist.addEventListener('click', () => {
            wishlistSidebar.classList.remove('active');
            wishlistOverlay.classList.remove('active');
        });
    }

    if (wishlistOverlay) {
        wishlistOverlay.addEventListener('click', () => {
            wishlistSidebar.classList.remove('active');
            wishlistOverlay.classList.remove('active');
        });
    }

    if (clearWishlistBtn) {
        clearWishlistBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear your wishlist?')) {
                wishlist = [];
                localStorage.removeItem('wishlist');
                updateWishlistCount();
                updateWishlistUI();
                showNotification('Wishlist cleared', 'info');
            }
        });
    }

    // Initialize wishlist
    updateWishlistCount();
    updateWishlistUI();

    var menuBar = document.getElementById('menu-bar');
    var menuClose = document.getElementById('menu-close');
    var menu = document.getElementById('menu');
    var menuOverlay = document.getElementById('menu-overlay');
    var menuIconContainer = document.querySelector('.menu-icon');

    // Function to open menu
    function openMenu() {
        menu.style.display = 'block';
        menuOverlay.style.display = 'block';

        // Trigger reflow before adding transitions
        menu.offsetHeight;
        menuOverlay.offsetHeight;

        // Add active class for CSS animations
        menu.classList.add('active');
        menuOverlay.style.opacity = '1';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    }

    // Function to close menu
    function closeMenu() {
        // Remove active class for CSS animations
        menu.classList.remove('active');
        menuOverlay.style.opacity = '0';
        document.body.style.overflow = ''; // Re-enable scrolling

        // Wait for transition to finish before hiding elements
        setTimeout(function () {
            menu.style.display = 'none';
            menuOverlay.style.display = 'none';
        }, 400); // Match CSS transition duration
    }

    // Event listeners
    menuBar.addEventListener('click', openMenu);
    if (menuIconContainer && menuBar) {
        menuIconContainer.addEventListener('click', function(e){
            if (e.target === menuIconContainer) { menuBar.click(); }
        });
    }
    menuClose.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on menu links (for mobile)
    var menuLinks = document.querySelectorAll('.menu-links a');
    menuLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    // Close menu on window resize if it gets to desktop size
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && menu.style.display === 'block') {
            closeMenu();
        }
    });
    const contactForm = document.getElementById("contactForm");
    const successModal = document.getElementById("successModal");
    const closeModalBtn = document.getElementById("closeModal");

    if (contactForm && successModal && closeModalBtn) {
        function showFieldErr(el, msg) {
            if (!el) return;
            el.classList.add('field-error');
            let help = el.nextElementSibling;
            if (!help || !help.classList || !help.classList.contains('error-text')) {
                help = document.createElement('div');
                help.className = 'error-text';
                el.insertAdjacentElement('afterend', help);
            }
            help.textContent = msg;
        }
        function clearFieldErr(el) {
            if (!el) return;
            el.classList.remove('field-error');
            const help = el.nextElementSibling;
            if (help && help.classList && help.classList.contains('error-text')) help.remove();
        }
        function validateContact() {
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            let ok = true;
            [name, email, subject, message].forEach(clearFieldErr);
            if (!name || name.value.trim().length < 2) { showFieldErr(name, 'Name must be at least 2 characters.'); ok = false; }
            const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
            if (!email || !emailRx.test(email.value.trim())) { showFieldErr(email, 'Enter a valid email address.'); ok = false; }
            if (!subject || subject.value.trim().length < 3) { showFieldErr(subject, 'Subject must be at least 3 characters.'); ok = false; }
            if (!message || message.value.trim().length < 10) { showFieldErr(message, 'Message must be at least 10 characters.'); ok = false; }
            return ok;
        }
        ['input','blur'].forEach(evt => {
            contactForm.addEventListener(evt, (e) => {
                const t = e.target;
                if (t && (t.id === 'name' || t.id === 'email' || t.id === 'subject' || t.id === 'message')) {
                    clearFieldErr(t);
                }
            });
        });
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            if (!validateContact()) return;
            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData
                });
                const result = await response.json();
                if (result.success) {
                    setTimeout(() => { successModal.style.display = "flex"; }, 500);
                    contactForm.reset();
                } else {
                    alert("⚠️ Something went wrong. Please try again.");
                }
            } catch (error) {
                alert("⚠️ Network error. Please try again later.");
            }
        });
        closeModalBtn.addEventListener("click", () => { successModal.style.display = "none"; });
        window.addEventListener("click", (e) => { if (e.target === successModal) successModal.style.display = "none"; });
    }
    const detectBtn = document.getElementById("detectLocation");
    const mapFrame = document.getElementById("mapFrame");

    if (detectBtn && mapFrame) {
        detectBtn.addEventListener("click", () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const lat = pos.coords.latitude;
                    const lng = pos.coords.longitude;

                    // Update map src with live location
                    mapFrame.src = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;


                    const notify = document.createElement("div");
                    notify.className = "notification";
                    notify.innerHTML = `<i class=\"fa-solid fa-location-dot\"></i> Location detected successfully!`;
                    document.body.appendChild(notify);
                    setTimeout(() => notify.remove(), 3000);
                }, () => {
                    alert("⚠️ Location access denied!");
                });
            } else {
                alert("⚠️ Geolocation is not supported by this browser.");
            }
        });
    }

    // If URL has #faq on contact page, expand and scroll to it
    try {
        if (window.location.hash === '#faq') {
            const faqSection = document.getElementById('faq');
            if (faqSection) {
                // open first item for context
                const firstItem = faqSection.querySelector('.faq-item');
                if (firstItem) firstItem.setAttribute('aria-expanded', 'true');
                setTimeout(() => {
                    faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
            }
        }
    } catch (e) {}
    // ===== FAQ Accordion (Contact, Shipping & Returns, etc.) =====
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isOpen = item.getAttribute('aria-expanded') === 'true';
            document.querySelectorAll('.faq-item[aria-expanded="true"]').forEach(open => {
                if (open !== item) {
                    open.setAttribute('aria-expanded', 'false');
                    const ans = open.querySelector('.faq-answer');
                    if (ans) { ans.style.maxHeight = '0'; ans.style.padding = '0'; }
                }
            });
            item.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
            const answer = item.querySelector('.faq-answer');
            if (answer) {
                if (item.getAttribute('aria-expanded') === 'true') {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.padding = '0 0 14px 38px';
                } else {
                    answer.style.maxHeight = '0';
                    answer.style.padding = '0';
                }
            }
        });
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
    // Initialize pre-expanded items (e.g., Return Window on Shipping page)
    faqItems.forEach(item => {
        if (item.getAttribute('aria-expanded') === 'true') {
            const answer = item.querySelector('.faq-answer');
            if (answer) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '0 0 14px 38px';
            }
        }
    });
    // Disable zoom on Sketchfab iframe while allowing rotation/move
    try {
        const sketchfabIframe = document.querySelector('.sketchfab-embed-wrapper iframe');
        if (sketchfabIframe) {
            // Block mouse wheel zoom
            sketchfabIframe.addEventListener('wheel', function (e) {
                e.preventDefault();
            }, { passive: false });

            // Block pinch-zoom (multi-touch) but allow single-finger drag/rotate
            sketchfabIframe.addEventListener('touchmove', function (e) {
                if (e.touches && e.touches.length > 1) {
                    e.preventDefault();
                }
            }, { passive: false });

            // iOS Safari specific gesture events
            ['gesturestart', 'gesturechange', 'gestureend'].forEach(function(evt){
                sketchfabIframe.addEventListener(evt, function (e) {
                    e.preventDefault();
                }, { passive: false });
            });

            // AR overlay open/close behavior
            const openBtn = document.getElementById('ar-overlay-open');
            const closeBtn = document.getElementById('ar-overlay-close');
            const blocker = document.querySelector('.ar-blocker');
            if (openBtn && closeBtn && blocker) {
                openBtn.addEventListener('click', function(e){
                    e.preventDefault();
                    blocker.style.display = 'none';
                    closeBtn.style.display = 'inline-flex';
                });
                closeBtn.addEventListener('click', function(){
                    blocker.style.display = 'flex';
                    closeBtn.style.display = 'none';
                });
            }
        }
    } catch (e) {}
});
// Sneaker AR Preview Rotation (guarded when image controls are absent)
document.addEventListener("DOMContentLoaded", () => {
    const sneakerImg = document.getElementById("sneaker-img");
    const rotateLeft = document.getElementById("rotate-left");
    const rotateRight = document.getElementById("rotate-right");
    const viewArBtn = document.getElementById("view-ar-btn");
    let angle = 0;
    let rotating = false;
    let rotationInterval;

    if (sneakerImg && rotateLeft && rotateRight && viewArBtn) {
        rotateLeft.addEventListener("click", () => {
            angle -= 15;
            sneakerImg.style.transform = `rotateY(${angle}deg)`;
        });

        rotateRight.addEventListener("click", () => {
            angle += 15;
            sneakerImg.style.transform = `rotateY(${angle}deg)`;
        });

        viewArBtn.addEventListener("click", () => {
            if (!rotating) {
                rotationInterval = setInterval(() => {
                    angle += 2;
                    sneakerImg.style.transform = `rotateY(${angle}deg)`;
                }, 50);
                rotating = true;
                viewArBtn.textContent = "Stop AR";
            } else {
                clearInterval(rotationInterval);
                rotating = false;
                viewArBtn.textContent = "View in AR";
            }
        });
    }
});
// Products Filter Functionality
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    // Filter products based on category
    function filterProducts(category) {
        productCards.forEach(card => {
            // First remove all cards from view with a fade out
            card.classList.remove('show');
            card.classList.add('hide');

            // Show all products if 'all' category is selected
            // or show only products that match the selected category
            setTimeout(() => {
                if (category === 'all' || card.dataset.category === category) {
                    card.classList.remove('hide');
                    card.classList.add('show');
                }
            }, 300); // Short delay for animation effect
        });
    }

    // Add click event to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get selected category and filter products
            const category = this.dataset.filter;
            filterProducts(category);
        });
    });

    // Initialize with 'all' filter active
    filterProducts('all');
});

// ==================== ADD TO CART MODAL FUNCTIONALITY ====================
function openAddToCartModal(product) {
    const modal = document.getElementById('add-to-cart-modal');
    const overlay = document.getElementById('add-to-cart-overlay');
    
    if (!modal) return;
    
    // Show modal and overlay
    modal.classList.remove('hidden');
    if (overlay) {
        overlay.classList.add('active');
    }
    
    // Update modal content
    document.getElementById('add-to-cart-product-name').textContent = product.name;
    document.getElementById('add-to-cart-product-image').src = product.image;
    document.getElementById('add-to-cart-product-image').alt = product.name;
    
    // Generate size options
    generateAddToCartSizeOptions();
    
    // Generate color options
    generateAddToCartColorOptions(product);
    
    // Reset quantity
    document.getElementById('add-to-cart-quantity-display').textContent = '1';
    
    // Update total price
    updateAddToCartTotal(product.price, 1);
    
    // Setup event listeners
    setupAddToCartModalEvents(product);
}

function generateAddToCartSizeOptions() {
    const sizeContainer = document.getElementById('add-to-cart-size-options');
    if (!sizeContainer) return;
    
    const sizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15];
    sizeContainer.innerHTML = '';
    
    sizes.forEach(size => {
        const sizeBtn = document.createElement('button');
        sizeBtn.className = 'add-to-cart-size-option';
        sizeBtn.textContent = size;
        sizeBtn.dataset.size = size;
        sizeContainer.appendChild(sizeBtn);
    });
    
    // Auto-select first size
    const firstSize = sizeContainer.querySelector('.add-to-cart-size-option');
    if (firstSize) {
        firstSize.classList.add('active');
    }
}

function generateAddToCartColorOptions(product) {
    const colorContainer = document.getElementById('add-to-cart-color-options');
    if (!colorContainer) return;
    
    // Default colors for products
    const defaultColors = [
        { name: 'White/Black', value: '#ffffff' },
        { name: 'Black/White', value: '#000000' },
        { name: 'Navy/White', value: '#1e3a8a' },
        { name: 'Grey/White', value: '#6b7280' }
    ];
    
    colorContainer.innerHTML = '';
    
    defaultColors.forEach((color, index) => {
        const colorBtn = document.createElement('button');
        colorBtn.className = 'add-to-cart-color-option';
        colorBtn.style.backgroundColor = color.value;
        colorBtn.title = color.name;
        colorBtn.dataset.color = color.name;
        if (index === 0) colorBtn.classList.add('active');
        colorContainer.appendChild(colorBtn);
    });
}

function setupAddToCartModalEvents(product) {
    // Size selection
    const sizeContainer = document.getElementById('add-to-cart-size-options');
    if (sizeContainer) {
        sizeContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-size-option')) {
                // Remove active class from all size options
                sizeContainer.querySelectorAll('.add-to-cart-size-option').forEach(btn => {
                    btn.classList.remove('active');
                });
                // Add active class to clicked size
                e.target.classList.add('active');
                
                // Clear any size selection error
                clearFieldError(sizeContainer);
            }
        });
    }
    
    // Color selection
    const colorContainer = document.getElementById('add-to-cart-color-options');
    if (colorContainer) {
        colorContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart-color-option')) {
                // Remove active class from all color options
                colorContainer.querySelectorAll('.add-to-cart-color-option').forEach(btn => {
                    btn.classList.remove('active');
                });
                // Add active class to clicked color
                e.target.classList.add('active');
            }
        });
    }
    
    // Quantity controls
    const quantityDisplay = document.getElementById('add-to-cart-quantity-display');
    const decreaseBtn = document.getElementById('add-to-cart-quantity-decrease');
    const increaseBtn = document.getElementById('add-to-cart-quantity-increase');
    let quantity = 1;
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
                updateAddToCartTotal(product.price, quantity);
            }
        });
    }
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
            updateAddToCartTotal(product.price, quantity);
        });
    }
    
    // Confirm button
            setTimeout(() => {
        const confirmBtn = document.getElementById('add-to-cart-confirm');
        
        if (confirmBtn) {
            confirmBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const selectedSize = document.querySelector('.add-to-cart-size-option.active')?.dataset.size;
                const selectedColor = document.querySelector('.add-to-cart-color-option.active')?.dataset.color;
                
                if (!selectedSize) {
                    // Show error on size container
                    const sizeContainer = document.getElementById('add-to-cart-size-options');
                    if (sizeContainer) {
                        showFieldError(sizeContainer, 'Please select a size first!');
                    }
                    return false;
                }
                
                const cartItem = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: quantity,
                    size: selectedSize,
                    color: selectedColor
                };
                
                addToCart(cartItem);
                showNotification('Product added to cart successfully!', 'success');
                closeAddToCartModal();
                
                return false;
            };
        }
    }, 100);
    
    // Close button
    const closeBtn = document.getElementById('add-to-cart-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeAddToCartModal();
        });
    }
    
    // Overlay click
    const overlay = document.getElementById('add-to-cart-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            closeAddToCartModal();
        });
    }
}

function updateAddToCartTotal(price, quantity) {
    const totalEl = document.getElementById('add-to-cart-total-price');
    if (totalEl) {
        const total = price * quantity;
        totalEl.textContent = `$${total.toFixed(2)}`;
    }
}

function closeAddToCartModal() {
    const modal = document.getElementById('add-to-cart-modal');
    const overlay = document.getElementById('add-to-cart-overlay');
    
    if (modal) modal.classList.add('hidden');
    if (overlay) overlay.classList.remove('active');
}

// Simplified notification system
function showProfessionalNotification(message, type = 'info') {
    showNotification(message, type);
}


document.addEventListener("DOMContentLoaded", () => {
    // Remove the old alert-based add to cart functionality
    // The new modal-based functionality is handled above
    // Testimonials Slider Functionality

    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let autoSlideInterval;

    // Function to show testimonial
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Next testimonial
    function nextTestimonial() {
        let nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }

    // Previous testimonial
    function prevTestimonial() {
        let prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prevIndex);
    }

    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextTestimonial, 5000);
    }

    // Stop auto slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        nextTestimonial();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        prevTestimonial();
        startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showTestimonial(index);
            startAutoSlide();
        });
    });

    // Initialize auto slide
    startAutoSlide();

    // Pause auto slide on hover
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    const feedbackForm = document.getElementById('feedback-form');
    const feedbacksContainer = document.getElementById('feedbacks-container');

    // Load existing feedbacks from localStorage
    loadFeedbacks();

    // Feedback form validation functions
    function showFeedbackFieldError(inputEl, message) {
        if (!inputEl) return;
        inputEl.classList.add('field-error');
        let helper = inputEl.parentElement.querySelector('.error-text');
        if (!helper) {
            helper = document.createElement('div');
            helper.className = 'error-text';
            inputEl.parentElement.appendChild(helper);
        }
        helper.textContent = message;
    }

    function clearFeedbackFieldError(inputEl) {
        if (!inputEl) return;
        inputEl.classList.remove('field-error');
        const helper = inputEl.parentElement.querySelector('.error-text');
        if (helper) helper.remove();
    }

    function validateFeedbackForm() {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const rating = document.querySelector('input[name="rating"]:checked');
        const message = document.getElementById('message');

        let isValid = true;

        // Clear previous errors
        [name, email, message].forEach(clearFeedbackFieldError);

        // Name validation: at least 2 characters
        if (!name || name.value.trim().length < 2) {
            showFeedbackFieldError(name, 'Name must be at least 2 characters.');
            isValid = false;
        }

        // Email validation: simple regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!email || !emailRegex.test(email.value.trim())) {
            showFeedbackFieldError(email, 'Please enter a valid email address.');
            isValid = false;
        }

        // Rating validation: must select a rating
        if (!rating) {
            const ratingContainer = document.querySelector('.rating-input');
            if (ratingContainer) {
                showFeedbackFieldError(ratingContainer, 'Please select a rating.');
                isValid = false;
            }
        }

        // Message validation: at least 10 characters
        if (!message || message.value.trim().length < 10) {
            showFeedbackFieldError(message, 'Feedback must be at least 10 characters.');
            isValid = false;
        }

        return isValid;
    }

    // Form submission handler
    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate form before proceeding
        if (!validateFeedbackForm()) {
            return;
        }

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const rating = document.querySelector('input[name="rating"]:checked').value;
        const message = document.getElementById('message').value;
        const date = new Date().toLocaleDateString();

        // Create feedback object
        const feedback = {
            name,
            email,
            rating,
            message,
            date,
            id: Date.now() // Unique ID
        };

        // Save feedback
        saveFeedback(feedback);

        // Add feedback to display
        addFeedbackToDisplay(feedback);

        // Reset form
        feedbackForm.reset();

        // Show success message
        showNotification('Thank you for your feedback!');
    });

    // Real-time validation for feedback form
    ['input', 'change', 'blur'].forEach(evt => {
        feedbackForm.addEventListener(evt, (e) => {
            const target = e.target;
            if (!(target instanceof HTMLElement)) return;
            if (target.id === 'name' || target.id === 'email' || target.id === 'message') {
                clearFeedbackFieldError(target);
            }
        });
    });

    // Rating selection validation
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(input => {
        input.addEventListener('change', () => {
            const ratingContainer = document.querySelector('.rating-input');
            if (ratingContainer) {
                clearFeedbackFieldError(ratingContainer);
            }
        });
    });

    // Save feedback to localStorage
    function saveFeedback(feedback) {
        let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        feedbacks.unshift(feedback); // Add to beginning of array
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    }

    // Load feedbacks from localStorage
    function loadFeedbacks() {
        let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        feedbacks.forEach(feedback => {
            addFeedbackToDisplay(feedback);
        });
    }

    // Add feedback to display
    function addFeedbackToDisplay(feedback) {
        const feedbackItem = document.createElement('div');
        feedbackItem.className = 'feedback-item';
        feedbackItem.innerHTML = `
            <div class="feedback-header-row">
                <div class="feedback-author">${feedback.name}</div>
                <div class="feedback-rating">${getStarRating(feedback.rating)}</div>
            </div>
            <p class="feedback-text">"${feedback.message}"</p>
            <div class="feedback-date">${feedback.date}</div>
        `;

        // Add to top of container
        if (feedbacksContainer.firstChild) {
            feedbacksContainer.insertBefore(feedbackItem, feedbacksContainer.firstChild);
        } else {
            feedbacksContainer.appendChild(feedbackItem);
        }
    }

    // Generate star rating HTML
    function getStarRating(rating) {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--secondary-color);
            color: var(--primary-color);
            padding: 12px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    };

});
const form = document.getElementById("newsletter-form");
const modal = document.getElementById("success-modal");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    let response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        // Show modal
        modal.style.display = "flex";
        // Reset form
        form.reset();

        // Hide modal after 3 sec
        setTimeout(() => {
            modal.style.display = "none";
        }, 3000);
    } else {
        alert("Something went wrong. Please try again.");
    }
});
