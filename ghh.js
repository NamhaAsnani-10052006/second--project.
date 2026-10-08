/* =========================================================
   SEON — LUXURY PERFUME WEBSITE
   ghh.js
   PART 1 — CORE EXPERIENCE
   =========================================================

   IMPORTANT:
   - This is the FIRST real SEON JS part.
   - Do not mix it with the old generic Part 1.
   - Future parts will be added BELOW this code.
   - Do not edit this part when adding future parts.

   FRONTEND FILE:
   ghh.js

   BACKEND:
   Node.js / Express will be connected later through API calls.
   It must NOT be placed inside browser-side ghh.js.
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. SEON GLOBAL CONFIGURATION
    ===================================================== */

    const SEON = {

        storage: {
            cart: "seon_cart_v1",
            wishlist: "seon_wishlist_v1",
            customer: "seon_customer_v1",
            newsletter: "seon_newsletter_v1"
        },

        routes: {

            home: "index.html",

            collection: "collection.html",

            signature: "signature.html",

            story: "story.html",

            reviews: "reviews.html",

            products: "products.html",

            cart: "cart.html",

            checkout: "checkout.html",

            account: "account.html",

            contact: "contact.html"

        },

        animation: {

            duration: 700,

            revealOffset: 0.7,

        }

    };


    /* =====================================================
       02. DOM HELPERS
    ===================================================== */

    const $ = (selector, parent = document) => {

        return parent.querySelector(selector);

    };


    const $$ = (selector, parent = document) => {

        return Array.from(
            parent.querySelectorAll(selector)
        );

    };


    const safeJSONParse = (value, fallback) => {

        try {

            return value ? JSON.parse(value) : fallback;

        } catch {

            return fallback;

        }

    };


    const getStorage = (key, fallback = []) => {

        return safeJSONParse(
            localStorage.getItem(key),
            fallback
        );

    };


    const setStorage = (key, value) => {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    };


    /* =====================================================
       03. BODY READY STATE
    ===================================================== */

    document.documentElement.classList.add("seon-js-ready");

    document.body.classList.add("seon-page-ready");


    /* =====================================================
       04. PAGE FADE-IN
    ===================================================== */

    const pageStyle = document.createElement("style");

    pageStyle.textContent = `

        html.seon-js-ready body{
            opacity:0;
            transition:
                opacity .7s cubic-bezier(.22,1,.36,1);
        }

        html.seon-js-ready body.seon-page-ready{
            opacity:1;
        }

        body.seon-page-leaving{
            opacity:0 !important;
            transition:
                opacity .35s ease !important;
        }

    `;

    document.head.appendChild(pageStyle);


    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            document.body.classList.add(
                "seon-page-ready"
            );

        });

    });


    /* =====================================================
       05. PREMIUM PAGE TRANSITION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    function goToPage(page, hash = "") {

        if (!page) return;

        const destination =
            hash
                ? `${page}${hash}`
                : page;


        if (
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase() === page.toLowerCase()
            &&
            !hash
        ) {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

            return;

        }


        document.body.classList.add(
            "seon-page-leaving"
        );


        setTimeout(() => {

            window.location.href = destination;

        }, 280);

    }


    /* =====================================================
       06. ROUTE DETECTION
    ===================================================== */

    function routeFromText(text) {

        const value =
            String(text)
                .trim()
                .toLowerCase();


        if (value === "home") {

            return SEON.routes.home;

        }


        if (
            value === "collection" ||
            value.includes("all fragrances") ||
            value.includes("for him") ||
            value.includes("for her") ||
            value.includes("view all fragrances")
        ) {

            return SEON.routes.collection;

        }


        if (
            value === "signature" ||
            value.includes("discover magnetic")
        ) {

            return SEON.routes.signature;

        }


        if (
            value.includes("our story") ||
            value.includes("discover seon")
        ) {

            return SEON.routes.story;

        }


        if (value === "reviews") {

            return SEON.routes.reviews;

        }


        if (
            value.includes("contact us") ||
            value === "contact"
        ) {

            return SEON.routes.contact;

        }


        return null;

    }


    /* =====================================================
       07. MAIN NAVIGATION
    ===================================================== */

    $$(".nav-links a").forEach(link => {

        link.addEventListener("click", event => {

            const label =
                link.textContent.trim();

            const route =
                routeFromText(label);


            if (!route) return;

            event.preventDefault();

            goToPage(route);

        });

    });


    /* =====================================================
       08. LOGO → HOME
    ===================================================== */

    $$(".logo").forEach(logo => {

        logo.addEventListener("click", event => {

            event.preventDefault();

            goToPage(SEON.routes.home);

        });
                            
    });


    /* =====================================================
       09. HERO BUTTONS
    ===================================================== */

    $$(".hero-buttons a").forEach(button => {

        button.addEventListener("click", event => {

            const text =
                button.textContent.trim();

            const route =
                routeFromText(text);


            if (!route) return;

            event.preventDefault();

            goToPage(route);

        });

    });


    /* =====================================================
       10. COLLECTION → COLLECTION PAGE
    ===================================================== */

    $$(".collection a").forEach(link => {

        link.addEventListener("click", event => {

            const text =
                link.textContent.trim().toLowerCase();


            if (
                text.includes("view all fragrances") ||
                link.getAttribute("href") === "#products"
            ) {

                event.preventDefault();

                goToPage(
                    SEON.routes.collection
                );

            }

        });

    });


    /* =====================================================
       11. STORY BUTTON
    ===================================================== */

    $$(".story-content a").forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            goToPage(
                SEON.routes.contact
            );

        });

    });


    /* =====================================================
       12. FOOTER SHOP LINKS
    ===================================================== */

    $$(".footer-column a").forEach(link => {

        link.addEventListener("click", event => {

            const text =
                link.textContent.trim();


            const route =
                routeFromText(text);


            if (route) {

                event.preventDefault();

                goToPage(route);

            }

        });

    });


    /* =====================================================
       13. MOBILE NAVIGATION
    ===================================================== */

    const mobileMenu =
        $(".mobile-menu");

    const navbar =
        $(".navbar");

    const navLinks =
        $(".nav-links");


    if (mobileMenu && navbar && navLinks) {

        const mobilePanel =
            document.createElement("div");

        mobilePanel.className =
            "seon-mobile-panel";


        mobilePanel.innerHTML = `

            <div class="seon-mobile-panel-inner">

                <div class="seon-mobile-head">

                    <span>SEON</span>

                    <button
                        type="button"
                        class="seon-mobile-close"
                        aria-label="Close menu"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                </div>


                <div class="seon-mobile-links">

                    <a href="index.html">
                        Home
                    </a>

                    <a href="collection.html">
                        Collection
                    </a>

                    <a href="signature.html">
                        Signature
                    </a>

                    <a href="story.html">
                        Our Story
                    </a>

                    <a href="reviews.html">
                        Reviews
                    </a>

                    <a href="contact.html">
                        Contact
                    </a>

                </div>


                <div class="seon-mobile-footer">

                    <span>
                        SEON
                    </span>

                    <small>
                        IRRESISTIBLE. UNMISTAKABLE.
                    </small>

                </div>

            </div>

        `;


        document.body.appendChild(
            mobilePanel
        );


        const mobileStyle =
            document.createElement("style");


        mobileStyle.textContent = `

            .seon-mobile-panel{

                position:fixed;

                inset:0;

                z-index:99999;

                background:
                    rgba(7,3,11,.98);

                backdrop-filter:
                    blur(25px);

                transform:
                    translateX(100%);

                opacity:0;

                pointer-events:none;

                transition:
                    transform .55s
                    cubic-bezier(.22,1,.36,1),
                    opacity .4s ease;

            }


            .seon-mobile-panel.open{

                transform:
                    translateX(0);

                opacity:1;

                pointer-events:auto;

            }


            .seon-mobile-panel-inner{

                min-height:100%;

                padding:
                    30px 25px;

                display:flex;

                flex-direction:column;

            }


            .seon-mobile-head{

                display:flex;

                justify-content:
                    space-between;

                align-items:center;

                padding-bottom:35px;

                border-bottom:
                    1px solid
                    rgba(255,255,255,.1);

            }


            .seon-mobile-head > span{

                font-family:
                    "Cormorant Garamond",
                    serif;

                font-size:30px;

                letter-spacing:7px;

            }


            .seon-mobile-close{

                width:42px;

                height:42px;

                display:grid;

                place-items:center;

                border:
                    1px solid
                    rgba(255,255,255,.15);

                background:
                    transparent;

                color:white;

                cursor:pointer;

            }


            .seon-mobile-links{

                display:flex;

                flex-direction:column;

                margin-top:35px;

            }


            .seon-mobile-links a{

                padding:18px 0;

                border-bottom:
                    1px solid
                    rgba(255,255,255,.08);

                color:white;

                text-decoration:none;

                font-family:
                    "Cormorant Garamond",
                    serif;

                font-size:32px;

                letter-spacing:2px;

                transition:
                    .35s ease;

            }


            .seon-mobile-links a:hover{

                color:#d7a24f;

                padding-left:12px;

            }


            .seon-mobile-footer{

                margin-top:auto;

                display:flex;

                flex-direction:column;

                gap:7px;

            }


            .seon-mobile-footer span{

                font-size:11px;

                letter-spacing:4px;

                color:#b14dff;

            }


            .seon-mobile-footer small{

                color:#766b79;

                letter-spacing:2px;

                font-size:8px;

            }

        `;


        document.head.appendChild(
            mobileStyle
        );


        const closeMenu =
            $(".seon-mobile-close");


        function openMobileMenu() {

            mobilePanel.classList.add(
                "open"
            );

            document.body.style.overflow =
                "hidden";

            mobileMenu.classList.add(
                "active"
            );

        }


        function closeMobileMenu() {

            mobilePanel.classList.remove(
                "open"
            );

            document.body.style.overflow =
                "";

            mobileMenu.classList.remove(
                "active"
            );

        }


        mobileMenu.addEventListener(
            "click",
            openMobileMenu
        );


        closeMenu.addEventListener(
            "click",
            closeMobileMenu
        );


        $$(".seon-mobile-links a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    event => {

                        event.preventDefault();

                        const page =
                            link.getAttribute(
                                "href"
                            );

                        closeMobileMenu();

                        setTimeout(() => {

                            goToPage(page);

                        }, 250);

                    }
                );

            });

    }


    /* =====================================================
       14. HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        $(".header");


    const headerStyle =
        document.createElement("style");


    headerStyle.textContent = `

        .header.seon-scrolled{

            background:
                rgba(7,3,11,.88);

            backdrop-filter:
                blur(18px);

            -webkit-backdrop-filter:
                blur(18px);

            box-shadow:
                0 12px 40px
                rgba(0,0,0,.28);

        }

    `;


    document.head.appendChild(
        headerStyle
    );


    function updateHeader() {

        if (!header) return;


        if (window.scrollY > 40) {

            header.classList.add(
                "seon-scrolled"
            );

        } else {

            header.classList.remove(
                "seon-scrolled"
            );

        }

    }


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive:true }
    );


    /* =====================================================
       15. PREMIUM CURSOR
    ===================================================== */

    const cursorStyle =
        document.createElement("style");


    cursorStyle.textContent = `

        @media (pointer:fine){

            body.seon-cursor-active,
            body.seon-cursor-active a,
            body.seon-cursor-active button{

                cursor:none !important;

            }


            .seon-cursor-dot{

                position:fixed;

                width:7px;

                height:7px;

                border-radius:50%;

                background:#ffffff;

                pointer-events:none;

                z-index:100000;

                transform:
                    translate(-50%,-50%);

                mix-blend-mode:difference;

            }


            .seon-cursor-ring{

                position:fixed;

                width:34px;

                height:34px;

                border-radius:50%;

                border:
                    1px solid
                    rgba(214,133,244,.75);

                pointer-events:none;

                z-index:99999;

                transform:
                    translate(-50%,-50%);

                transition:
                    width .25s ease,
                    height .25s ease,
                    border-color .25s ease,
                    background .25s ease;

            }


            .seon-cursor-ring.hover{

                width:58px;

                height:58px;

                border-color:#d7a24f;

                background:
                    rgba(215,162,79,.08);

            }

        }

    `;


    document.head.appendChild(
        cursorStyle
    );


    if (
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        document.body.classList.add(
            "seon-cursor-active"
        );


        const dot =
            document.createElement("div");

        dot.className =
            "seon-cursor-dot";


        const ring =
            document.createElement("div");

        ring.className =
            "seon-cursor-ring";


        document.body.appendChild(dot);

        document.body.appendChild(ring);


        let mouseX = -100;

        let mouseY = -100;

        let ringX = -100;

        let ringY = -100;


        window.addEventListener(
            "mousemove",
            event => {

                mouseX = event.clientX;

                mouseY = event.clientY;

                dot.style.left =
                    `${mouseX}px`;

                dot.style.top =
                    `${mouseY}px`;

            },
            { passive:true }
        );


        function animateCursor() {

            ringX +=
                (mouseX - ringX) * 0.16;

            ringY +=
                (mouseY - ringY) * 0.16;


            ring.style.left =
                `${ringX}px`;

            ring.style.top =
                `${ringY}px`;


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        const cursorTargets =
            "a, button, .product-card, .collection-card, .benefits article, .review-grid article";


        document.addEventListener(
            "mouseover",
            event => {

                if (
                    event.target.closest(
                        cursorTargets
                    )
                ) {

                    ring.classList.add(
                        "hover"
                    );

                }

            }
        );


        document.addEventListener(
            "mouseout",
            event => {

                if (
                    event.target.closest(
                        cursorTargets
                    )
                ) {

                    ring.classList.remove(
                        "hover"
                    );

                }

            }
        );

    }


    /* =====================================================
       16. HERO MOUSE PARALLAX
    ===================================================== */

    const hero =
        $(".hero");

    const heroGrid =
        $(".hero-grid");

    const heroVisual =
        $(".hero-visual");

    const perfumeCard =
        $(".perfume-card");


    if (
        hero &&
        heroVisual &&
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        hero.addEventListener(
            "mousemove",
            event => {

                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left -
                        rect.width / 2
                    ) / rect.width;


                const y =
                    (
                        event.clientY -
                        rect.top -
                        rect.height / 2
                    ) / rect.height;


                if (heroGrid) {

                    heroGrid.style.transform =
                        `translate(
                            ${x * -18}px,
                            ${y * -18}px
                        )`;

                }


                if (perfumeCard) {

                    perfumeCard.style.transform =
                        `perspective(1000px)
                         rotateY(${x * 7}deg)
                         rotateX(${y * -7}deg)
                         translateZ(12px)`;

                }

            },
            { passive:true }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                if (heroGrid) {

                    heroGrid.style.transform =
                        "";

                }


                if (perfumeCard) {

                    perfumeCard.style.transform =
                        "";

                }

            }
        );

    }


    /* =====================================================
       17. SCROLL REVEAL ENGINE
    ===================================================== */

    const revealStyle =
        document.createElement("style");


    revealStyle.textContent = `

        .seon-reveal{

            opacity:0;

            transform:
                translateY(45px);

            transition:
                opacity .9s
                cubic-bezier(.22,1,.36,1),
                transform .9s
                cubic-bezier(.22,1,.36,1);

        }


        .seon-reveal.seon-visible{

            opacity:1;

            transform:
                translateY(0);

        }


        .seon-reveal-delay-1{
            transition-delay:.08s;
        }


        .seon-reveal-delay-2{
            transition-delay:.16s;
        }


        .seon-reveal-delay-3{
            transition-delay:.24s;
        }


        .seon-reveal-delay-4{
            transition-delay:.32s;
        }

    `;


    document.head.appendChild(
        revealStyle
    );


    const revealElements =
        $$(
            ".collection-card, " +
            ".product-card, " +
            ".benefits article, " +
            ".review-grid article, " +
            ".story-content, " +
            ".why-heading, " +
            ".newsletter"
        );


    revealElements.forEach(
        (element, index) => {

            element.classList.add(
                "seon-reveal"
            );


            const delay =
                index % 4 + 1;


            element.classList.add(
                `seon-reveal-delay-${delay}`
            );

        }
    );


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "seon-visible"
                            );


                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {

                    threshold:0.12,

                    rootMargin:
                        "0px 0px -50px 0px"

                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "seon-visible"
                );

            }
        );

    }


    /* =====================================================
       18. PRODUCT CARD TILT
    ===================================================== */

    if (
        window.matchMedia(
            "(pointer:fine)"
        ).matches
    ) {

        $$(".product-card")
            .forEach(card => {

                card.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            card.getBoundingClientRect();


                        const x =
                            (
                                event.clientX -
                                rect.left
                            ) / rect.width;


                        const y =
                            (
                                event.clientY -
                                rect.top
                            ) / rect.height;


                        const rotateY =
                            (x - .5) * 7;


                        const rotateX =
                            (y - .5) * -7;


                        card.style.transform =
                            `perspective(900px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateY(-5px)`;

                    },
                    { passive:true }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            "";

                    }
                );

            });

    }


    /* =====================================================
       19. COLLECTION CARD HOVER
    ===================================================== */

    $$(".collection-card")
        .forEach(card => {

            card.addEventListener(
                "mouseenter",
                () => {

                    card.style.zIndex =
                        "5";

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.zIndex =
                        "";

                }
            );

        });


    /* =====================================================
       20. HEART / WISHLIST FOUNDATION
    ===================================================== */

    let wishlist =
        getStorage(
            SEON.storage.wishlist,
            []
        );


    function updateWishlistButton(
        button,
        active
    ) {

        if (!button) return;


        const icon =
            $("i", button);


        if (!icon) return;


        if (active) {

            icon.classList.remove(
                "fa-regular"
            );

            icon.classList.add(
                "fa-solid"
            );

            button.setAttribute(
                "aria-pressed",
                "true"
            );

        } else {

            icon.classList.remove(
                "fa-solid"
            );

            icon.classList.add(
                "fa-regular"
            );

            button.setAttribute(
                "aria-pressed",
                "false"
            );

        }

    }


    function getProductData(card) {

        if (!card) return null;


        const name =
            $(".product-details h3", card);


        const price =
            $(".product-details strong", card);


        const notes =
            $(".product-details > span", card);


        return {

            id:
                card.dataset.productId ||
                (
                    name
                        ? name.textContent
                            .trim()
                            .toLowerCase()
                            .replace(
                                /[^a-z0-9]+/g,
                                "-"
                            )
                        : `product-${Date.now()}`
                ),

            name:
                name
                    ? name.textContent.trim()
                    : "SEON Fragrance",

            price:
                price
                    ? price.textContent.trim()
                    : "₹0",

            notes:
                notes
                    ? notes.textContent.trim()
                    : "",

            element:
                card

        };

    }


    $$(".product-heart, .heart-button")
        .forEach(button => {

            const card =
                button.closest(
                    ".product-card, .signature"
                );


            const product =
                getProductData(card);


            if (
                product &&
                wishlist.some(
                    item =>
                        item.id === product.id
                )
            ) {

                updateWishlistButton(
                    button,
                    true
                );

            }


            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    if (!product) return;


                    const exists =
                        wishlist.some(
                            item =>
                                item.id ===
                                product.id
                        );


                    if (exists) {

                        wishlist =
                            wishlist.filter(
                                item =>
                                    item.id !==
                                    product.id
                            );

                        updateWishlistButton(
                            button,
                            false
                        );

                    } else {

                        wishlist.push({

                            id:
                                product.id,

                            name:
                                product.name,

                            price:
                                product.price,

                            notes:
                                product.notes

                        });


                        updateWishlistButton(
                            button,
                            true
                        );

                    }


                    setStorage(
                        SEON.storage.wishlist,
                        wishlist
                    );


                    showSEONToast(
                        exists
                            ? "Removed from wishlist"
                            : "Added to wishlist"
                    );

                }
            );

        });


    /* =====================================================
       21. CART FOUNDATION
    ===================================================== */

    let cart =
        getStorage(
            SEON.storage.cart,
            []
        );


    function updateCartCount() {

        const cartCount =
            $(".cart-icon span");


        if (!cartCount) return;


        const total =
            cart.reduce(
                (sum, item) =>
                    sum +
                    Number(
                        item.quantity || 0
                    ),
                0
            );


        cartCount.textContent =
            total > 99
                ? "99+"
                : String(total);

    }


    updateCartCount();


    function addProductToCart(card) {

        const product =
            getProductData(card);


        if (!product) return;


        const existing =
            cart.find(
                item =>
                    item.id === product.id
            );


        if (existing) {

            existing.quantity += 1;

        } else {

            cart.push({

                id:
                    product.id,

                name:
                    product.name,

                price:
                    product.price,

                notes:
                    product.notes,

                quantity:
                    1

            });

        }


        setStorage(
            SEON.storage.cart,
            cart
        );


        updateCartCount();


        showSEONToast(
            `${product.name} added to bag`
        );

    }


    /* =====================================================
       22. PRODUCT PLUS BUTTONS
    ===================================================== */

    $$(".product-card")
        .forEach(card => {

            const addButton =
                $(".product-details button", card);


            if (!addButton) return;


            addButton.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();

                    addProductToCart(card);

                }
            );

        });


    /* =====================================================
       23. CART BUTTON
    ===================================================== */

    const cartButton =
        $(".cart-icon");


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            () => {

                goToPage(
                    SEON.routes.cart
                );

            }
        );

    }


    /* =====================================================
       24. PREMIUM TOAST
    ===================================================== */

    const toastStyle =
        document.createElement("style");


    toastStyle.textContent = `

        .seon-toast-wrap{

            position:fixed;

            right:25px;

            bottom:25px;

            z-index:100001;

            display:flex;

            flex-direction:column;

            gap:10px;

            pointer-events:none;

        }


        .seon-toast{

            min-width:270px;

            padding:16px 20px;

            color:#fff;

            background:
                linear-gradient(
                    135deg,
                    rgba(35,10,48,.97),
                    rgba(10,4,15,.97)
                );

            border:
                1px solid
                rgba(214,133,244,.25);

            box-shadow:
                0 18px 60px
                rgba(0,0,0,.45);

            backdrop-filter:
                blur(18px);

            transform:
                translateY(20px);

            opacity:0;

            animation:
                seonToastIn .45s
                cubic-bezier(.22,1,.36,1)
                forwards;

            font-family:
                "Manrope",
                sans-serif;

            font-size:11px;

            letter-spacing:.6px;

        }


        .seon-toast::before{

            content:"✦";

            color:#d7a24f;

            margin-right:10px;

        }


        .seon-toast.hide{

            animation:
                seonToastOut .4s ease
                forwards;

        }


        @keyframes seonToastIn{

            to{

                opacity:1;

                transform:
                    translateY(0);

            }

        }


        @keyframes seonToastOut{

            to{

                opacity:0;

                transform:
                    translateY(15px);

            }

        }

    `;


    document.head.appendChild(
        toastStyle
    );


    let toastContainer =
        $(".seon-toast-wrap");


    if (!toastContainer) {

        toastContainer =
            document.createElement("div");

        toastContainer.className =
            "seon-toast-wrap";

        document.body.appendChild(
            toastContainer
        );

    }


    function showSEONToast(message) {

        const toast =
            document.createElement("div");

        toast.className =
            "seon-toast";

        toast.textContent =
            message;


        toastContainer.appendChild(
            toast
        );


        setTimeout(() => {

            toast.classList.add(
                "hide"
            );


            setTimeout(() => {

                toast.remove();

            }, 450);

        }, 2200);

    }


    /* =====================================================
       25. NEWSLETTER FRONTEND VALIDATION
    ===================================================== */

    const newsletter =
        $(".newsletter form");


    if (newsletter) {

        newsletter.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const input =
                    $("input[type='email']", newsletter);


                if (!input) return;


                const email =
                    input.value.trim();


                const validEmail =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!validEmail.test(email)) {

                    showSEONToast(
                        "Please enter a valid email"
                    );

                    input.focus();

                    return;

                }


                let subscribers =
                    getStorage(
                        SEON.storage.newsletter,
                        []
                    );


                if (
                    !subscribers.includes(email)
                ) {

                    subscribers.push(email);

                    setStorage(
                        SEON.storage.newsletter,
                        subscribers
                    );

                }


                input.value = "";


                showSEONToast(
                    "Welcome to the SEON world"
                );

            }
        );

    }


    /* =====================================================
       26. SEARCH FOUNDATION
    ===================================================== */

    const searchButton =
        $(
            '.header-icon[aria-label="Search"]'
        );


    if (searchButton) {

        const searchOverlay =
            document.createElement("div");


        searchOverlay.className =
            "seon-search-overlay";


        searchOverlay.innerHTML = `

            <div class="seon-search-box">

                <button
                    type="button"
                    class="seon-search-close"
                    aria-label="Close search"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>


                <p>
                    SEARCH SEON
                </p>


                <div class="seon-search-input-wrap">

                    <i class="fa-solid fa-magnifying-glass"></i>

                    <input
                        type="search"
                        placeholder="Search fragrances..."
                        autocomplete="off"
                    >

                </div>


                <div class="seon-search-results"></div>

            </div>

        `;


        document.body.appendChild(
            searchOverlay
        );


        const searchOverlayStyle =
            document.createElement("style");


        searchOverlayStyle.textContent = `

            .seon-search-overlay{

                position:fixed;

                inset:0;

                z-index:100000;

                display:grid;

                place-items:start center;

                padding-top:
                    18vh;

                background:
                    rgba(5,2,8,.88);

                backdrop-filter:
                    blur(25px);

                opacity:0;

                visibility:hidden;

                transition:
                    .35s ease;

            }


            .seon-search-overlay.open{

                opacity:1;

                visibility:visible;

            }


            .seon-search-box{

                width:
                    min(700px,90%);

                position:relative;

                padding:
                    35px;

                background:
                    linear-gradient(
                        145deg,
                        #1b0823,
                        #09030c
                    );

                border:
                    1px solid
                    rgba(255,255,255,.12);

                transform:
                    translateY(-20px);

                transition:
                    .45s
                    cubic-bezier(.22,1,.36,1);

            }


            .seon-search-overlay.open
            .seon-search-box{

                transform:
                    translateY(0);

            }


            .seon-search-close{

                position:absolute;

                top:18px;

                right:18px;

                width:40px;

                height:40px;

                border:
                    1px solid
                    rgba(255,255,255,.12);

                background:transparent;

                color:white;

                cursor:pointer;

            }


            .seon-search-box > p{

                color:#d7a24f;

                font-size:10px;

                letter-spacing:4px;

                margin-bottom:20px;

            }


            .seon-search-input-wrap{

                display:flex;

                align-items:center;

                gap:15px;

                border-bottom:
                    1px solid
                    rgba(255,255,255,.2);

            }


            .seon-search-input-wrap i{

                color:#b14dff;

            }


            .seon-search-input-wrap input{

                width:100%;

                height:60px;

                border:0;

                outline:0;

                background:transparent;

                color:white;

                font-family:
                    "Cormorant Garamond",
                    serif;

                font-size:30px;

            }


            .seon-search-results{

                display:grid;

                gap:8px;

                margin-top:20px;

                max-height:260px;

                overflow:auto;

            }


            .seon-search-result{

                display:flex;

                justify-content:space-between;

                align-items:center;

                padding:15px;

                color:white;

                background:
                    rgba(255,255,255,.04);

                cursor:pointer;

                transition:.25s ease;

            }


            .seon-search-result:hover{

                background:
                    rgba(177,77,255,.13);

                transform:
                    translateX(5px);

            }


            .seon-search-result small{

                color:#9f91a2;

            }

        `;


        document.head.appendChild(
            searchOverlayStyle
        );


        const searchInput =
            $(
                ".seon-search-input-wrap input",
                searchOverlay
            );


        const searchResults =
            $(".seon-search-results",
                searchOverlay
            );


        const searchClose =
            $(".seon-search-close",
                searchOverlay
            );


        function openSearch() {

            searchOverlay.classList.add(
                "open"
            );

            document.body.style.overflow =
                "hidden";

            setTimeout(() => {

                searchInput.focus();

            }, 250);

        }


        function closeSearch() {

            searchOverlay.classList.remove(
                "open"
            );

            document.body.style.overflow =
                "";

        }


        searchButton.addEventListener(
            "click",
            openSearch
        );


        searchClose.addEventListener(
            "click",
            closeSearch
        );


        searchOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    searchOverlay
                ) {

                    closeSearch();

                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    searchOverlay.classList.contains(
                        "open"
                    )
                ) {

                    closeSearch();

                }

            }
        );


        function searchProducts(value) {

            const query =
                value
                    .trim()
                    .toLowerCase();


            const cards =
                $$(".product-card");


            searchResults.innerHTML =
                "";


            if (!query) {

                return;

            }


            const matches =
                cards.filter(card => {

                    const name =
                        $(".product-details h3",
                            card
                        );


                    const notes =
                        $(".product-details > span",
                            card
                        );


                    const text =
                        `${name?.textContent || ""}
                         ${notes?.textContent || ""}`
                            .toLowerCase();


                    return text.includes(
                        query
                    );

                });


            if (!matches.length) {

                searchResults.innerHTML = `

                    <div
                        class="seon-search-result"
                    >
                        No fragrance found.
                    </div>

                `;

                return;

            }


            matches.forEach(card => {

                const name =
                    $(".product-details h3",
                        card
                    );


                const price =
                    $(".product-details strong",
                        card
                    );


                const result =
                    document.createElement("div");


                result.className =
                    "seon-search-result";


                result.innerHTML = `

                    <span>
                        ${name?.textContent.trim() || "SEON"}
                    </span>

                    <small>
                        ${price?.textContent.trim() || ""}
                    </small>

                `;


                result.addEventListener(
                    "click",
                    () => {

                        closeSearch();

                        card.scrollIntoView({
                            behavior:"smooth",
                            block:"center"
                        });

                    }
                );


                searchResults.appendChild(
                    result
                );

            });

        }


        searchInput.addEventListener(
            "input",
            () => {

                searchProducts(
                    searchInput.value
                );

            }
        );

    }


    /* =====================================================
       27. KEYBOARD SHORTCUTS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            /* CTRL + K / CMD + K → Search */

            if (
                (
                    event.ctrlKey ||
                    event.metaKey
                ) &&
                event.key.toLowerCase() === "k"
            ) {

                const search =
                    $(
                        '.header-icon[aria-label="Search"]'
                    );


                if (search) {

                    event.preventDefault();

                    search.click();

                }

            }

        }
    );


    /* =====================================================
       28. REDUCED MOTION SUPPORT
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reducedMotion) {

        document.documentElement.style
            .scrollBehavior = "auto";


        $$(".seon-reveal")
            .forEach(element => {

                element.classList.add(
                    "seon-visible"
                );

            });

    }


    /* =====================================================
       29. CART COUNT SYNC ACROSS TABS
    ===================================================== */

    window.addEventListener(
        "storage",
        event => {

            if (
                event.key ===
                SEON.storage.cart
            ) {

                cart =
                    safeJSONParse(
                        event.newValue,
                        []
                    );


                updateCartCount();

            }

        }
    );


    /* =====================================================
       30. FINAL INITIALIZATION
    ===================================================== */

    updateCartCount();


    console.log(
        "%cSEON",
        `
            color:#d7a24f;
            font-size:32px;
            font-weight:700;
            letter-spacing:8px;
        `
    );


    console.log(
        "%cLuxury experience initialized.",
        `
            color:#b14dff;
            font-size:12px;
        `
    );

});    



/* =========================================================
   SEON — JAVASCRIPT PART 2
   REAL PRODUCT + CART SYSTEM
   Works with existing SEON HTML
   ========================================================= */

(() => {

    "use strict";


    /* =====================================================
       1. SEON PRODUCTS
       ===================================================== */

    const SEON_PRODUCTS = {

        magnetic: {
            id: "magnetic",
            name: "SEON Magnetic",
            price: 399,
            category: "EAU DE PARFUM",
            notes: "Citrus · Spice · Amber",
            image: ""
        },

        noir: {
            id: "noir",
            name: "SEON Noir",
            price: 399,
            category: "EAU DE PARFUM",
            notes: "Oud · Leather · Musk",
            image: ""
        },

        aura: {
            id: "aura",
            name: "SEON Aura",
            price: 399,
            category: "EAU DE PARFUM",
            notes: "Rose · Vanilla · Musk",
            image: ""
        },

        ember: {
            id: "ember",
            name: "SEON Ember",
            price: 399,
            category: "EAU DE PARFUM",
            notes: "Spice · Amber · Wood",
            image: ""
        }

    };


    /* =====================================================
       2. GET CART
       ===================================================== */

    function getSEONCart() {

        try {

            return JSON.parse(
                localStorage.getItem("seon_cart_v1")
            ) || [];

        } catch (error) {

            console.error(
                "SEON Cart Error:",
                error
            );

            return [];

        }

    }


    /* =====================================================
       3. SAVE CART
       ===================================================== */

    function saveSEONCart(cart) {

        localStorage.setItem(
            "seon_cart_v1",
            JSON.stringify(cart)
        );

        updateSEONCartCount();

    }


    /* =====================================================
       4. FIND PRODUCT FROM CARD
       ===================================================== */

    function getProductFromCard(card) {

        const heading =
            card.querySelector(
                ".product-details h3"
            );


        if (!heading) {

            return null;

        }


        const name =
            heading.textContent
                .trim()
                .toLowerCase();


        if (
            name.includes("magnetic")
        ) {

            return SEON_PRODUCTS.magnetic;

        }


        if (
            name.includes("noir")
        ) {

            return SEON_PRODUCTS.noir;

        }


        if (
            name.includes("aura")
        ) {

            return SEON_PRODUCTS.aura;

        }


        if (
            name.includes("ember")
        ) {

            return SEON_PRODUCTS.ember;

        }


        return null;

    }


    /* =====================================================
       5. UPDATE CART NUMBER
       ===================================================== */

    function updateSEONCartCount() {

        const cart =
            getSEONCart();


        const totalItems =
            cart.reduce(
                (
                    total,
                    item
                ) => {

                    return total +
                        Number(
                            item.quantity || 0
                        );

                },
                0
            );


        document
            .querySelectorAll(
                ".cart-icon"
            )
            .forEach(
                cartButton => {

                    let counter =
                        cartButton.querySelector(
                            ".seon-cart-count"
                        );


                    if (!counter) {

                        counter =
                            document.createElement(
                                "span"
                            );

                        counter.className =
                            "seon-cart-count";


                        cartButton.appendChild(
                            counter
                        );

                    }


                    counter.textContent =
                        totalItems;


                    counter.style.cssText = `
                        position:absolute;
                        top:-7px;
                        right:-7px;
                        min-width:18px;
                        height:18px;
                        padding:0 5px;
                        border-radius:50%;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        background:#b14dff;
                        color:#fff;
                        font-size:9px;
                        font-weight:700;
                        line-height:1;
                        z-index:10;
                    `;

                }
            );

    }


    /* =====================================================
       6. ADD PRODUCT TO CART
       ===================================================== */

    
function addSEONProduct(
    product,
    quantity = 1
) {

    if (!product) {
        return;
    }

    const cart =
        getSEONCart();

    const existingProduct =
        cart.find(
            item =>
                item.id === product.id
        );

    quantity =
        Math.max(
            1,
            Number(quantity) || 1
        );


    if (existingProduct) {

        existingProduct.quantity +=
            quantity;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            category: product.category,

            notes: product.notes,

            image: product.image,

            quantity: quantity

        });

    }


    saveSEONCart(cart);


    showSEONPart2Message(
        `${product.name} added to cart × ${quantity}`
    );

}

    /* =====================================================
       7. CONNECT EXISTING ADD BUTTONS
       ===================================================== */

    document
        .querySelectorAll(
            ".product-card"
        )
        .forEach(
            card => {

                const product =
                    getProductFromCard(
                        card
                    );


                if (!product) {

                    return;

                }


                card.dataset.seonProduct =
                    product.id;


                const addButton =
                    card.querySelector(
                        ".product-details > div > button"
                    );


                if (!addButton) {

                    return;

                }


                addButton.addEventListener(
                    "click",
                    function(event) {

                        event.preventDefault();

                        event.stopPropagation();


                        addSEONProduct(
                            product
                        );

                    }
                );

            }
        );


    /* =====================================================
       8. CART ICON → CART PAGE
       ===================================================== */

    document
        .querySelectorAll(
            ".cart-icon"
        )
        .forEach(
            cartButton => {

                cartButton.addEventListener(
                    "click",
                    function(event) {

                        event.preventDefault();

                        window.location.href =
                            "cart.html";

                    }
                );

            }
        );


    /* =====================================================
       9. PRODUCT CARD → PRODUCT PAGE
       ===================================================== */

    document
        .querySelectorAll(
            ".product-card"
        )
        .forEach(
            card => {

                const product =
                    getProductFromCard(
                        card
                    );


                if (!product) {

                    return;

                }


                card.addEventListener(
                    "click",
                    function(event) {

                        /*
                         * Agar user Add button
                         * ya heart par click kare
                         * toh product page nahi khulega.
                         */

                        if (
                            event.target.closest(
                                ".product-heart"
                            )
                        ) {

                            return;

                        }


                        if (
                            event.target.closest(
                                ".product-details button"
                            )
                        ) {

                            return;

                        }


                        window.location.href =
                            `product.html?id=${product.id}`;

                    }
                );

            }
        );


    /* =====================================================
       10. PRODUCT PAGE DATA
       ===================================================== */

    function loadSEONProductPage() {

        const currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        if (
            currentPage !==
            "product.html"
        ) {

            return;

        }


        const params =
            new URLSearchParams(
                window.location.search
            );


        const productID =
            params.get("id");


        if (!productID) {

            return;

        }


        const product =
            SEON_PRODUCTS[
                productID
            ];


        if (!product) {

            console.error(
                "SEON Product Not Found:",
                productID
            );

            return;

        }


        /* ---------- PAGE TITLE ---------- */

        document.title =
            `${product.name} | SEON`;


        /* ---------- PRODUCT NAME ---------- */

        const nameElement =
            document.querySelector(
                "[data-product-name]"
            );


        if (nameElement) {

            nameElement.textContent =
                product.name;

        }


        /* ---------- PRICE ---------- */

        const priceElement =
            document.querySelector(
                "[data-product-price]"
            );


        if (priceElement) {

            priceElement.textContent =
                `₹${product.price}`;

        }


        /* ---------- CATEGORY ---------- */

        const categoryElement =
            document.querySelector(
                "[data-product-category]"
            );


        if (categoryElement) {

            categoryElement.textContent =
                product.category;

        }


        /* ---------- NOTES ---------- */

        const notesElement =
            document.querySelector(
                "[data-product-notes]"
            );


        if (notesElement) {

            notesElement.textContent =
                product.notes;

        }


    }

    /* =====================================================
   PRODUCT PAGE — QUANTITY
   ===================================================== */

let productQuantity = 1;

const quantityElement =
    document.querySelector(
        "#productQuantity"
    );

const decreaseButton =
    document.querySelector(
        "#decreaseQuantity"
    );

const increaseButton =
    document.querySelector(
        "#increaseQuantity"
    );


function updateProductQuantity() {

    if (quantityElement) {

        quantityElement.textContent =
            productQuantity;

    }


    if (decreaseButton) {

        decreaseButton.disabled =
            productQuantity <= 1;

    }


    if (increaseButton) {

        increaseButton.disabled =
            productQuantity >= 10;

    }

}


/* ---------- PLUS ---------- */

if (increaseButton) {

    increaseButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();
            event.stopPropagation();

            if (
                productQuantity < 10
            ) {

                productQuantity++;

                updateProductQuantity();

            }

        }
    );

}


/* ---------- MINUS ---------- */

if (decreaseButton) {

    decreaseButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();
            event.stopPropagation();

            if (
                productQuantity > 1
            ) {

                productQuantity--;

                updateProductQuantity();

            }

        }
    );

}


/* =====================================================
   ADD TO CART
   ===================================================== */

const addButton =
    document.querySelector(
        "#addToCart"
    );


if (addButton) {

    addButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();
            event.stopPropagation();

            addSEONProduct(
                product,
                productQuantity
            );

        }
    );

}


/* =====================================================
   BUY NOW
   ===================================================== */

const buyNowButton =
    document.querySelector(
        "#buyNow"
    );


if (buyNowButton) {

    buyNowButton.addEventListener(
        "click",
        function(event) {

            event.preventDefault();
            event.stopPropagation();

            addSEONProduct(
                product,
                productQuantity
            );

            setTimeout(
                function() {

                    window.location.href =
                        "cart.html";

                },
                300
            );

        }
    );

}


/* ---------- INITIAL VALUE ---------- */

updateProductQuantity();


    /* =====================================================
       11. TOAST MESSAGE
       ===================================================== */

    function showSEONPart2Message(
        message
    ) {

        const oldToast =
            document.querySelector(
                ".seon-part2-toast"
            );


        if (oldToast) {

            oldToast.remove();

        }


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            "seon-part2-toast";


        toast.textContent =
            message;


        toast.style.cssText = `
            position:fixed;
            right:25px;
            bottom:25px;
            z-index:999999;

            padding:15px 22px;

            background:
                linear-gradient(
                    135deg,
                    #17091f,
                    #08030b
                );

            border:
                1px solid
                rgba(177,77,255,.35);

            color:#fff;

            font-family:
                "Manrope",
                sans-serif;

            font-size:11px;

            letter-spacing:.8px;

            box-shadow:
                0 15px 50px
                rgba(0,0,0,.45);

            transform:
                translateY(20px);

            opacity:0;

            transition:
                .35s ease;
        `;


        document.body.appendChild(
            toast
        );


        requestAnimationFrame(
            () => {

                toast.style.opacity =
                    "1";

                toast.style.transform =
                    "translateY(0)";

            }
        );


        setTimeout(
            () => {

                toast.style.opacity =
                    "0";

                toast.style.transform =
                    "translateY(20px)";


                setTimeout(
                    () => {

                        toast.remove();

                    },
                    350
                );

            },
            2200
        );

    }


    /* =====================================================
       12. CART COUNT ON PAGE LOAD
       ===================================================== */

    updateSEONCartCount();


    /* =====================================================
       13. STORAGE SYNC
       ===================================================== */

    window.addEventListener(
        "storage",
        function(event) {

            if (
                event.key ===
                "seon_cart_v1"
            ) {

                updateSEONCartCount();

            }

        }  
    );


    /* =====================================================
       14. READY
       ===================================================== */

    console.log(
        "%cSEON PART 2 READY",
        `
            color:#b14dff;
            font-size:18px;
            font-weight:bold;
        `
    );

})(); 


/* =========================================================
   SEON — PART 3
   PAGE SYSTEM + REAL REVEAL FIX + PRODUCT PAGES
   CART / CHECKOUT FRONTEND
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. SEON PAGE CONFIG
    ===================================================== */

    const SEON_PART3 = {

        animation: {
            duration: 700,
            revealOffset: 0.78
        },

        routes: {
            home: "index.html",
            collection: "collection.html",
            signature: "signature.html",
            story: "story.html",
            reviews: "reviews.html",
            cart: "cart.html",
            checkout: "checkout.html",
            account: "account.html",
            contact: "contact.html"
        },

        storage: {
            cart: "seon_cart_v1"
        }

    };


    /* =====================================================
       02. HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));


    function readCart() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    SEON_PART3.storage.cart
                )
            ) || [];

        } catch {

            return [];

        }

    }


    function saveCart(cart) {

        localStorage.setItem(
            SEON_PART3.storage.cart,
            JSON.stringify(cart)
        );

    }


    /* =====================================================
       03. REAL REVEAL ANIMATION
    ===================================================== */

    const revealElements = $$(
        ".collection-card, " +
        ".product-card, " +
        ".benefits article, " +
        ".review-grid article, " +
        ".story-content, " +
        ".why-heading, " +
        ".newsletter"
    );


    /*
       IMPORTANT:

       Part 1 mein $() laga tha.

       $() = first element

       $$() = all elements

       Yahan hum $$() use kar rahe hain.
    */


    revealElements.forEach((element, index) => {

        element.classList.add(
            "seon-part3-reveal"
        );

        element.style.setProperty(
            "--seon-reveal-duration",
            `${SEON_PART3.animation.duration}ms`
        );

        element.style.setProperty(
            "--seon-reveal-delay",
            `${(index % 4) * 80}ms`
        );

    });


    const revealStyle =
        document.createElement("style");


    revealStyle.textContent = `

        .seon-part3-reveal {

            opacity: 0;

            transform:
                translateY(45px);

            transition:
                opacity
                var(--seon-reveal-duration)
                cubic-bezier(.22,1,.36,1)
                var(--seon-reveal-delay),

                transform
                var(--seon-reveal-duration)
                cubic-bezier(.22,1,.36,1)
                var(--seon-reveal-delay);

        }


        .seon-part3-reveal.seon-part3-visible {

            opacity: 1;

            transform:
                translateY(0);

        }

    `;


    document.head.appendChild(
        revealStyle
    );


    /*
       revealOffset = 0.78

       Means:

       element roughly reaches
       78% of viewport height
       → animation starts.
    */

    if ("IntersectionObserver" in window) {

        const bottomOffset =
            (1 - SEON_PART3.animation.revealOffset)
            * 100;


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "seon-part3-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0,

                    rootMargin:
                        `0px 0px -${bottomOffset}vh 0px`
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "seon-part3-visible"
            );

        });

    }


    /* =====================================================
       04. CURSOR / CLICKABLE ELEMENTS
    ===================================================== */

    $$(
        "a, button, .product-card, .collection-card"
    ).forEach(element => {

        element.style.cursor = "pointer";

    });


    /* =====================================================
       05. REAL PAGE NAVIGATION
    ===================================================== */

    const pageMap = {

        "home":
            SEON_PART3.routes.home,

        "collection":
            SEON_PART3.routes.collection,

        "signature":
            SEON_PART3.routes.signature,

        "our story":
            SEON_PART3.routes.story,

        "reviews":
            SEON_PART3.routes.reviews,

        "cart":
            SEON_PART3.routes.cart,

        "checkout":
            SEON_PART3.routes.checkout,

        "account":
            SEON_PART3.routes.account,

        "contact":
            SEON_PART3.routes.contact

    };


    function navigateTo(page) {

        if (!page) return;

        document.body.classList.add(
            "seon-page-leaving"
        );


        setTimeout(() => {

            window.location.href =
                page;

        }, 250);

    }


    /*
       Main navigation
    */

    $$(".nav-links a").forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const text =
                    link.textContent
                        .trim()
                        .toLowerCase();


                const page =
                    pageMap[text];


                if (!page) return;


                event.preventDefault();

                navigateTo(page);

            }
        );

    });


    /* =====================================================
       06. LOGO → HOME
    ===================================================== */

    $$(".logo").forEach(logo => {

        logo.addEventListener(
            "click",
            event => {

                event.preventDefault();

                navigateTo(
                    SEON_PART3.routes.home
                );

            }
        );

    });


    /* =====================================================
       07. CART ICON
    ===================================================== */

    $$(".cart-icon").forEach(cartButton => {

        cartButton.addEventListener(
            "click",
            event => {

                event.preventDefault();

                navigateTo(
                    SEON_PART3.routes.cart
                );

            }
        );

    });


    /* =====================================================
       08. PRODUCT CARD → PRODUCT PAGE
    ===================================================== */

    $$(".product-card").forEach(card => {

        card.addEventListener(
            "click",
            event => {

                /*
                   Don't open product page when
                   heart or plus button is clicked.
                */

                if (
                    event.target.closest(
                        ".product-heart"
                    )
                ) {
                    return;
                }


                if (
                    event.target.closest(
                        "button"
                    )
                ) {
                    return;
                }


                const nameElement =
                    $(".product-details h3", card);


                if (!nameElement) return;


                const name =
                    nameElement.textContent
                        .trim()
                        .toLowerCase()
                        .replace(
                            /[^a-z0-9]+/g,
                            "-"
                        );


                window.location.href =
                    `products.html?id=${encodeURIComponent(name)}`;

            }
        );

    });


    /* =====================================================
       09. COLLECTION CARD
    ===================================================== */

    $$(".collection-card").forEach(card => {

        const link =
            $("a", card);


        if (!link) return;


        card.addEventListener(
            "click",
            event => {

                if (
                    event.target.closest("a")
                ) {
                    return;
                }


                link.click();

            }
        );

    });


    /* =====================================================
       10. HOME / COLLECTION BUTTONS
    ===================================================== */

    $$(
        ".hero-buttons a, " +
        ".collection a, " +
        ".button-outline"
    ).forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const text =
                    button.textContent
                        .trim()
                        .toLowerCase();


                if (
                    text.includes(
                        "discover magnetic"
                    )
                ) {

                    event.preventDefault();

                    navigateTo(
                        SEON_PART3.routes.signature
                    );

                }


                else if (
                    text.includes(
                        "view all fragrances"
                    )
                ) {

                    event.preventDefault();

                    navigateTo(
                        SEON_PART3.routes.collection
                    );

                }

            }
        );

    });


    /* =====================================================
       11. CART PAGE RENDER
    ===================================================== */

    const cartContainer =
        $("#seon-cart-items");


    if (cartContainer) {

        renderCartPage();

    }


    function renderCartPage() {

        const cart =
            readCart();


        if (!cart.length) {

            cartContainer.innerHTML = `

                <div class="seon-empty-cart">

                    <h2>
                        Your Bag Is Empty
                    </h2>

                    <p>
                        Discover a fragrance
                        made to be remembered.
                    </p>

                    <a
                        href="collection.html"
                        class="button-primary"
                    >
                        EXPLORE COLLECTION
                    </a>

                </div>

            `;

            updateCartTotal();

            return;

        }


        cartContainer.innerHTML = "";


        cart.forEach((item, index) => {

            const itemElement =
                document.createElement("article");


            itemElement.className =
                "seon-cart-item";


            itemElement.innerHTML = `

                <div class="seon-cart-info">

                    <span class="seon-cart-number">
                        0${index + 1}
                    </span>

                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ${item.notes || "SEON Eau De Parfum"}
                        </p>

                        <strong>
                            ${item.price}
                        </strong>

                    </div>

                </div>


                <div class="seon-cart-controls">

                    <button
                        type="button"
                        data-action="minus"
                        data-id="${item.id}"
                    >
                        −
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        type="button"
                        data-action="plus"
                        data-id="${item.id}"
                    >
                        +
                    </button>


                    <button
                        type="button"
                        class="seon-remove"
                        data-action="remove"
                        data-id="${item.id}"
                    >
                        REMOVE
                    </button>

                </div>

            `;


            cartContainer.appendChild(
                itemElement
            );

        });


        $$(
            "[data-action]",
            cartContainer
        ).forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeCart(
                        button.dataset.id,
                        button.dataset.action
                    );

                }
            );

        });


        updateCartTotal();

    }


    /* =====================================================
       12. CART CHANGE
    ===================================================== */

    function changeCart(
        id,
        action
    ) {

        const cart =
            readCart();


        const item =
            cart.find(
                product =>
                    product.id === id
            );


        if (!item) return;


        if (
            action === "plus"
        ) {

            item.quantity += 1;

        }


        if (
            action === "minus"
        ) {

            item.quantity -= 1;


            if (
                item.quantity <= 0
            ) {

                const index =
                    cart.indexOf(item);

                cart.splice(index, 1);

            }

        }


        if (
            action === "remove"
        ) {

            const index =
                cart.indexOf(item);

            cart.splice(index, 1);

        }


        saveCart(cart);

        renderCartPage();

        updateHeaderCartCount();

    }


    /* =====================================================
       13. TOTAL
    ===================================================== */

    function getNumericPrice(price) {

        return Number(
            String(price)
                .replace(/[^\d.]/g, "")
        ) || 0;

    }


    function calculateCartTotal() {

        return readCart().reduce(
            (total, item) => {

                return total +
                    (
                        getNumericPrice(
                            item.price
                        ) *
                        Number(
                            item.quantity || 1
                        )
                    );

            },
            0
        );

    }


    function updateCartTotal() {

        const total =
            calculateCartTotal();


        const totalElement =
            $("#seon-cart-total");


        if (totalElement) {

            totalElement.textContent =
                `₹${total.toLocaleString("en-IN")}`;

        }


        const checkoutButton =
            $("#seon-checkout-button");


        if (
            checkoutButton
        ) {

            checkoutButton.disabled =
                total === 0;

        }

    }


    /* =====================================================
       14. HEADER CART COUNT
    ===================================================== */

    function updateHeaderCartCount() {

        const count =
            readCart().reduce(
                (
                    total,
                    item
                ) =>
                    total +
                    Number(
                        item.quantity || 0
                    ),
                0
            );


        $$(".cart-icon span")
            .forEach(counter => {

                counter.textContent =
                    count > 99
                        ? "99+"
                        : String(count);

            });

    }


    updateHeaderCartCount();


    /* =====================================================
       15. CHECKOUT BUTTON
    ===================================================== */

    const checkoutButton =
        $("#seon-checkout-button");


    if (checkoutButton) {

        checkoutButton.addEventListener(
            "click",
            () => {

                if (
                    !readCart().length
                ) {
                    return;
                }


                navigateTo(
                    SEON_PART3.routes.checkout
                );

            }
        );

    }


    /* =====================================================
       16. CHECKOUT PAYMENT UI
    ===================================================== */

    const paymentOptions =
        $$(".payment-option");


    paymentOptions.forEach(option => {

        option.addEventListener(
            "click",
            () => {

                paymentOptions.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                option.classList.add(
                    "active"
                );


                const radio =
                    $("input", option);


                if (radio) {

                    radio.checked =
                        true;

                }

            }
        );

    });


    /* =====================================================
       17. CHECKOUT FORM
    ===================================================== */

    const checkoutForm =
        $("#seon-checkout-form");


    if (checkoutForm) {

        checkoutForm.addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const cart =
                    readCart();


                if (!cart.length) {

                    alert(
                        "Your cart is empty."
                    );

                    return;

                }


                const formData =
                    new FormData(
                        checkoutForm
                    );


                const customer = {

                    name:
                        formData.get("name"),

                    email:
                        formData.get("email"),

                    phone:
                        formData.get("phone"),

                    address:
                        formData.get("address"),

                    paymentMethod:
                        formData.get(
                            "paymentMethod"
                        ),

                    items:
                        cart,

                    total:
                        calculateCartTotal()

                };


                try {

                    const response =
                        await fetch(
                            "/api/orders",
                            {

                                method:
                                    "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        customer
                                    )

                            }
                        );


                    if (!response.ok) {

                        throw new Error(
                            "Order request failed"
                        );

                    }


                    const result =
                        await response.json();


                    localStorage.removeItem(
                        SEON_PART3.storage.cart
                    );


                    alert(
                        `Order placed successfully. Order ID: ${result.orderId}`
                    );


                    window.location.href =
                        SEON_PART3.routes.home;


                } catch (error) {

                    console.error(
                        error
                    );


                    alert(
                        "Backend is not connected yet. Start the Node.js server first."
                    );

                }

            }
        );

    }


    /* =====================================================
       18. PRODUCT DETAIL PAGE
    ===================================================== */

    if (
        window.location.pathname
            .toLowerCase()
            .includes("products.html")
    ) {

        renderProductPage();

    }


    function renderProductPage() {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const productId =
            params.get("id");


        if (!productId) return;


        const productCards =
            $$(".product-card");


        /*
           We don't create a second
           SEON_PRODUCTS database.

           We use the existing HTML
           product information.
        */


        const matched =
            productCards.find(card => {

                const name =
                    $(".product-details h3", card);


                if (!name) return false;


                const id =
                    name.textContent
                        .trim()
                        .toLowerCase()
                        .replace(
                            /[^a-z0-9]+/g,
                            "-"
                        );


                return id === productId;

            });


        /*
           Product page can also be
           opened directly.

           If the card isn't on this
           page, show a safe fallback.
        */

        if (!matched) {

            const productTitle =
                $("#product-title");


            if (productTitle) {

                productTitle.textContent =
                    productId
                        .replace(
                            /-/g,
                            " "
                        )
                        .replace(
                            /\b\w/g,
                            letter =>
                                letter.toUpperCase()
                        );

            }

        }

    }


    /* =====================================================
       19. BACKEND STATUS CHECK
    ===================================================== */

    async function checkBackend() {

        try {

            const response =
                await fetch(
                    "/api/health"
                );


            if (!response.ok)
                return;


            const data =
                await response.json();


            console.log(
                "SEON Backend:",
                data.status
            );


        } catch {

            console.log(
                "SEON Backend is offline. Frontend mode is still running."
            );

        }

    }


    checkBackend();


    /* =====================================================
       20. PAGE READY
    ===================================================== */

    console.log(
        "%cSEON PART 3 READY",
        `
            color:#b14dff;
            font-size:18px;
            font-weight:700;
        `
    );

});

/* =====================================================
   21. BACKEND CHECKOUT API INTEGRATION
   ===================================================== */

async function placeOrder(orderPayload) {
    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderPayload)
        });

        const data = await response.json();

        if (data.success) {
            alert(`Order Placed Successfully! Order ID: ${data.orderId}`);
            
            // Local Cart clear karein
            localStorage.removeItem('seon_cart');
            window.location.reload();
        } else {
            alert(`Order Error: ${data.message}`);
        }
    } catch (error) {
        console.error("Order submission failed:", error);
        alert("Server error. Please try again later.");
    }
}

// Form submit ka event listener
document.addEventListener("DOMContentLoaded", () => {
    const checkoutForm = document.querySelector("#checkout-form");

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const orderData = {
                name: document.querySelector('#cust-name')?.value || "",
                email: document.querySelector('#cust-email')?.value || "",
                phone: document.querySelector('#cust-phone')?.value || "",
                address: document.querySelector('#cust-address')?.value || "",
                paymentMethod: document.querySelector('input[name="payment"]:checked')?.value || "COD",
                items: JSON.parse(localStorage.getItem('seon_cart') || '[]'),
                total: parseFloat(document.querySelector('#cart-total')?.innerText || "0")
            };

            placeOrder(orderData);
        });
    }
});


       /* =====================================================
       PRODUCT PAGE — QUANTITY + BUTTONS
       ===================================================== */

    let productQuantity = 1;

    const quantityElement =
        document.querySelector(
            "#productQuantity"
        );

    const decreaseButton =
        document.querySelector(
            "#decreaseQuantity"
        );

    const increaseButton =
        document.querySelector(
            "#increaseQuantity"
        );


    function updateProductQuantity() {

        if (quantityElement) {

            quantityElement.textContent =
                productQuantity;

        }


        if (decreaseButton) {

            decreaseButton.disabled =
                productQuantity <= 1;

        }


        if (increaseButton) {

            increaseButton.disabled =
                productQuantity >= 10;

        }

    }


    /* ---------- PLUS ---------- */

    if (increaseButton) {

        increaseButton.addEventListener(
            "click",
            function(event) {

                event.preventDefault();
                event.stopPropagation();

                if (
                    productQuantity < 10
                ) {

                    productQuantity++;

                    updateProductQuantity();

                }

            }
        );

    }


    /* ---------- MINUS ---------- */

    if (decreaseButton) {

        decreaseButton.addEventListener(
            "click",
            function(event) {

                event.preventDefault();
                event.stopPropagation();

                if (
                    productQuantity > 1
                ) {

                    productQuantity--;

                    updateProductQuantity();

                }

            }
        );

    }


    /* =====================================================
       ADD TO CART
       ===================================================== */

    const addButton =
        document.querySelector(
            "#addToCart"
        );


    if (addButton) {

        addButton.addEventListener(
            "click",
            function(event) {

                event.preventDefault();
                event.stopPropagation();

                addSEONProduct(
                    product,
                    productQuantity
                );

            }
        );

    }


    /* =====================================================
       BUY NOW
       ===================================================== */

    const buyNowButton =
        document.querySelector(
            "#buyNow"
        );


    if (buyNowButton) {

        buyNowButton.addEventListener(
            "click",
            function(event) {

                event.preventDefault();
                event.stopPropagation();

                addSEONProduct(
                    product,
                    productQuantity
                );

                setTimeout(
                    function() {

                        window.location.href =
                            "cart.html";

                    },
                    300
                );

            }
        );

    }


    /* ---------- INITIAL VALUE ---------- */

    updateProductQuantity();{
}
                                                                                
