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

    // ===== Size Guide: Converter & Fit Advisor =====
    function roundTo(value, decimals) {
        const p = Math.pow(10, decimals);
        return Math.round((value + Number.EPSILON) * p) / p;
    }
    function cmToUS(cm, gender) {
        // Approx Nike last mapping (simplified): US = (cm * 0.3937 / 0.333) - offset
        const base = cm / 0.846; // tuned constant for sneakers
        const offset = gender === 'female' ? 1.5 : 1;
        return Math.round(base - offset);
    }
    function usToEU(us) { return Math.round((us + 33) * 1.5); }
    function usToUK(us) { return Math.max(1, us - 1); }
    function usToCM(us, gender) { return roundTo((us + (gender === 'female' ? 1.5 : 1)) * 0.846, 1); }

    function convertFrom(region, size, gender) {
        const us = region === 'US' ? size : region === 'UK' ? size + 1 : region === 'EU' ? Math.round(size / 1.5 - 33) : cmToUS(size, gender);
        return {
            US: us,
            UK: usToUK(us),
            EU: usToEU(us),
            CM: usToCM(us, gender)
        };
    }
    function renderResults(map) {
        const res = document.getElementById('sg-results');
        if (!res) return;
        res.innerHTML = '';
        const entries = [
            { k: 'US', icon: 'fa-flag-usa' },
            { k: 'UK', icon: 'fa-flag' },
            { k: 'EU', icon: 'fa-earth-europe' },
            { k: 'CM', icon: 'fa-ruler' },
        ];
        entries.forEach(e => {
            const pill = document.createElement('div');
            pill.className = 'result-pill';
            pill.innerHTML = `<i class="fa-solid ${e.icon}"></i><strong>${e.k}:</strong> <span>${map[e.k]}</span>`;
            res.appendChild(pill);
        });
    }

    const convertBtn = document.getElementById('sg-convert');
    if (convertBtn) {
        convertBtn.addEventListener('click', () => {
            const gender = (document.getElementById('sg-gender')?.value) || 'male';
            const region = (document.getElementById('sg-region')?.value) || 'US';
            const size = parseFloat(document.getElementById('sg-size')?.value || '0');
            if (!size || size <= 0) {
                renderResults({ US: '-', UK: '-', EU: '-', CM: '-' });
                return;
            }
            const map = convertFrom(region, size, gender);
            renderResults(map);
            try { localStorage.setItem('sg-last', JSON.stringify({ gender, region, size })); } catch (e) {}
        });
    }

    // Preset chips + live restore
    document.querySelectorAll('.sg-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const input = document.getElementById('sg-size');
            if (!input) return;
            input.value = chip.dataset.size || '';
            convertBtn?.click();
        });
    });
    try {
        const last = JSON.parse(localStorage.getItem('sg-last') || 'null');
        if (last) {
            const g = document.getElementById('sg-gender');
            const r = document.getElementById('sg-region');
            const s = document.getElementById('sg-size');
            if (g) g.value = last.gender;
            if (r) r.value = last.region;
            if (s) s.value = last.size;
            convertBtn?.click();
        }
    } catch (e) {}

    function classifyWidth(widthCm, gender) {
        const base = gender === 'female' ? 9.2 : 9.6; // average forefoot width at US 9
        if (widthCm <= base - 0.4) return 'Narrow';
        if (widthCm >= base + 0.6) return 'Wide';
        return 'Regular';
    }

    function fitAdvice(lenCm, widthCm, pref, gender) {
        const usApprox = cmToUS(lenCm, gender);
        let rec = usApprox;
        if (pref === 'snug') rec -= 0;
        if (pref === 'regular') rec += 0;
        if (pref === 'loose') rec += 0.5;
        const widthCat = classifyWidth(widthCm, gender);
        return {
            us: roundTo(rec, 1),
            uk: roundTo(usToUK(rec), 1),
            eu: Math.round(usToEU(rec)),
            cm: roundTo(usToCM(rec, gender), 1),
            width: widthCat,
            note: widthCat === 'Wide' ? 'Consider Wide (W) variants if available.' : widthCat === 'Narrow' ? 'Consider Narrow (N) variants.' : 'Regular width should be fine.'
        };
    }

    const adviseBtn = document.getElementById('sg-advise');
    if (adviseBtn) {
        adviseBtn.addEventListener('click', () => {
            const gender = (document.getElementById('sg-gender')?.value) || 'male';
            const len = parseFloat(document.getElementById('sg-foot-l')?.value || '0');
            const wid = parseFloat(document.getElementById('sg-foot-w')?.value || '0');
            const pref = (document.getElementById('sg-fit-pref')?.value) || 'regular';
            const out = document.getElementById('sg-advice');
            if (!out) return;
            if (!len || !wid) { out.innerHTML = ''; return; }
            const a = fitAdvice(len, wid, pref, gender);
            out.innerHTML = `
                <div class="result-pill"><i class="fa-solid fa-shoe-prints"></i> <strong>US:</strong> ${a.us} &nbsp; <strong>UK:</strong> ${a.uk} &nbsp; <strong>EU:</strong> ${a.eu} &nbsp; <strong>CM:</strong> ${a.cm}</div>
                <div class="result-pill"><i class="fa-solid fa-maximize"></i> <strong>Width:</strong> ${a.width} — ${a.note}</div>
            `;
            const meter = document.getElementById('sg-meter');
            if (meter) {
                // map preference roughly to meter fill
                const pct = pref === 'snug' ? 33 : pref === 'regular' ? 66 : 100;
                meter.style.width = pct + '%';
            }
        });
    }
    // Jab page load hoga to overlay hatao
    window.addEventListener("load", () => {
        overlay.classList.remove("active");
    });

    // ==================== CART SIDEBAR SETUP ====================
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartBtn = document.getElementById("cart-btn");
    const cartSidebar = document.getElementById("cart-sidebar");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCart = document.getElementById("close-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const clearCartBtn = document.getElementById("clear-cart");
    // Buy modal elements
    const buyModal = document.getElementById('buy-modal');
    const buyClose = document.getElementById('buy-close');
    const buyModalItem = document.getElementById('buyModalItem');
    const checkoutForm = document.getElementById('checkout-form');
    cartCount.addEventListener('click', () => {
        cartBtn.click();
    });

    // ==================== UPDATE CART UI ====================
    function updateCartUI() {
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
                openBuyModal(selected);
            });
        });

        // Badge update
        cartCount.textContent = cart.length;

        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // ==================== ADD TO CART ====================
    function addToCart(product) {
        // Check if product already exists (by name)
        const existing = cart.find(item => item.name === product.name);

        if (existing) {
            // Agar product pehle se hai to uski quantity ++
            existing.quantity += 1;
        } else {
            // Naya product add karo with quantity = 1
            product.quantity = 1;
            cart.push(product);
        }

        updateCartUI();
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
    function renderBuySelectList() {
        const container = document.getElementById('buySelectList');
        if (!container) return;
        container.innerHTML = '';
        cart.forEach((item, idx) => {
            const row = document.createElement('div');
            row.className = 'buy-select-item';
            row.innerHTML = `
                <input type="checkbox" id="sel-${idx}" data-index="${idx}" checked>
                <img src="${item.image}" alt="${item.name}">
                <label for="sel-${idx}">${item.name} — $${item.price} x ${item.quantity}</label>
            `;
            container.appendChild(row);
        });
    }
    function openBuyAllModal() {
        if (!cart.length) return;
        const selectBox = document.getElementById('buySelect');
        if (selectBox) selectBox.classList.remove('hidden');
        // Show a synthetic "All Items" header in modal
        const header = document.getElementById('buyModalItem');
        if (header) header.textContent = 'Multiple Items';
        const price = document.getElementById('buyModalPrice');
        if (price) price.textContent = '';
        const img = document.getElementById('buyModalImage');
        if (img) img.src = cart[0]?.image || '';
        renderBuySelectList();
        updateCombinedTotal();
        buyModal.classList.remove('hidden');
        buyModal.setAttribute('aria-hidden', 'false');
    }
    function updateCombinedTotal() {
        const checks = Array.from(document.querySelectorAll('#buySelectList input[type="checkbox"]'));
        const selected = checks.filter(c => c.checked).map(c => cart[parseInt(c.dataset.index)]);
        const currencyEl = document.getElementById('buyCurrency');
        const totalEl = document.getElementById('buyTotal');
        if (!currencyEl || !totalEl) return;
        const base = selected.reduce((sum, it) => sum + (parseFloat(it.price) * (it.quantity || 1)), 0);
        const code = currencyEl.value || 'USD';
        const rate = currencyRates[code] || 1;
        totalEl.textContent = formatCurrency(base * rate, code);
    }
    if (buyAllBtn) {
        buyAllBtn.addEventListener('click', () => {
            openBuyAllModal();
        });
    }

    // ==================== BUY MODAL HELPERS ====================
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

            // Show order success modal (same pattern as contact)
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
                const selectedNames = checks
                    .filter(c => c.checked)
                    .map(c => {
                        const idx = parseInt(c.dataset.index);
                        return cart[idx]?.name;
                    })
                    .filter(Boolean);
                if (selectedNames.length) {
                    cart = cart.filter(item => !selectedNames.includes(item.name));
                    updateCartUI();
                }
            } else {
                const currentName = buyModalItem?.textContent || '';
                if (currentName) {
                    cart = cart.filter(item => item.name !== currentName);
                    updateCartUI();
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
    const currencyRates = {
        USD: 1,
        PKR: 277,
        AED: 3.67,
        EUR: 0.92,
        GBP: 0.78,
        INR: 83.1
    };

    function formatCurrency(value, code) {
        const symbolMap = { USD: '$', PKR: '₨', AED: 'د.إ', EUR: '€', GBP: '£', INR: '₹' };
        const symbol = symbolMap[code] || code + ' ';
        if (code === 'PKR') return `${symbol}${Math.round(value).toLocaleString()}`;
        return `${symbol}${value.toFixed(2)}`;
    }

    function updateBuyTotal(item) {
        const totalEl = document.getElementById('buyTotal');
        const currencyEl = document.getElementById('buyCurrency');
        if (!totalEl || !currencyEl || !item) return;
        const qty = item.quantity || 1;
        const base = parseFloat(item.price) * qty; // price assumed in USD
        const code = currencyEl.value || 'USD';
        const rate = currencyRates[code] || 1;
        const converted = base * rate;
        totalEl.textContent = formatCurrency(converted, code);
    }

    const currencySelect = document.getElementById('buyCurrency');
    if (currencySelect) {
        currencySelect.addEventListener('change', () => {
            const name = buyModalItem?.textContent;
            // If multi-select is visible, recompute combined
            const selectBox = document.getElementById('buySelect');
            if (selectBox && !selectBox.classList.contains('hidden')) {
                updateCombinedTotal();
                return;
            }
            const found = (cart || []).find(ci => ci.name === name);
            if (found) updateBuyTotal(found);
        });
        document.addEventListener('change', (e) => {
            const target = e.target;
            if (target && target.closest && target.closest('#buySelectList')) {
                updateCombinedTotal();
            }
        });
    }

    // ==================== CLEAR CONFIRMATION ====================
    clearCartBtn.addEventListener("click", () => {
        clearCart();
    });
    // ==================== ATTACH ADD TO CART BUTTONS ====================
    document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const productCard = btn.closest(".product-card, .card, .hero-ctn");
            const name =
                productCard.querySelector("h3, h1")?.textContent || "Sneaker";
            const price =
                productCard.querySelector("p, h4")?.textContent.replace("$", "") || 0;
            const image = productCard.querySelector("img")?.src || "";

            const product = { name, price, image };
            addToCart(product);
        });
    });


    // ==================== INIT ====================
    updateCartUI();

    var menuBar = document.getElementById('menu-bar');
    var menuClose = document.getElementById('menu-close');
    var menu = document.getElementById('menu');
    var menuOverlay = document.getElementById('menu-overlay');

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
});
// Sneaker AR Preview Rotation
document.addEventListener("DOMContentLoaded", () => {
    const sneakerImg = document.getElementById("sneaker-img");
    const rotateLeft = document.getElementById("rotate-left");
    const rotateRight = document.getElementById("rotate-right");
    let angle = 0;

    if (sneakerImg && rotateLeft && rotateRight) {
        rotateLeft.addEventListener("click", () => {
            angle -= 15;
            sneakerImg.style.transform = `rotateY(${angle}deg)`;
        });

        rotateRight.addEventListener("click", () => {
            angle += 15;
            sneakerImg.style.transform = `rotateY(${angle}deg)`;
        });
    }
    const viewArBtn = document.getElementById("view-ar-btn");
    let rotating = false;
    let rotationInterval;


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


document.addEventListener("DOMContentLoaded", () => {
    const cartModal = document.getElementById("cart-modal");
    const buttons = document.querySelectorAll(".add-to-cart-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Show modal
            cartModal.classList.remove("hidden");
            setTimeout(() => {
                cartModal.classList.add("show");
                // Play sound only when the message becomes visible
                const addSound = new Audio("./videos/Cute Pop Sound Effects(MP3_160K)-[AudioTrimmer.com].mp3");
                addSound.play();
            }, 10);
            // Hide modal after 3s
            setTimeout(() => {
                cartModal.classList.remove("show");
                setTimeout(() => cartModal.classList.add("hidden"), 400); // wait for animation
            }, 1000);
        });
    });
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

    // Form submission handler
    feedbackForm.addEventListener('submit', function (e) {
        e.preventDefault();

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
