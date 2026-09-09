document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Right click prevent (Copy & Paste Prevention)
    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });
    document.addEventListener("copy", function(e) {
        e.preventDefault();
    });

    // 2. Hamburger Menu
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeBtn = document.getElementById("close-btn");
    const menuLinks = document.querySelectorAll("#mobile-menu a");

    function openMenu() {
        mobileMenu.classList.remove("hidden");
        setTimeout(() => {
            mobileMenu.classList.remove("opacity-0");
            mobileMenu.classList.add("opacity-100");
        }, 10);
    }
    function closeMenu() {
        mobileMenu.classList.remove("opacity-100");
        mobileMenu.classList.add("opacity-0");
        setTimeout(() => {
            mobileMenu.classList.add("hidden");
        }, 300);
    }

    if(menuBtn) menuBtn.addEventListener("click", openMenu);
    if(closeBtn) closeBtn.addEventListener("click", closeMenu);
    menuLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // 3. Header Scroll Behavior (No longer needed for sticky color)
    /* Section removed */

    // 4. Swiper: FV
    const fvSwiper = new Swiper('.fv-swiper', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        loop: true,
        speed: 2000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        allowTouchMove: true, // swipe switch
    });

    // 5. Swiper: Gallery - Section removed (Replaced by CSS Marquee)

    // 6. Swiper: Voice (Testimonial)
    const voiceSwiper = new Swiper('.voice-swiper', {
        slidesPerView: 1.2,
        spaceBetween: 20,
        loop: false, 
        centeredSlides: true,
        watchSlidesProgress: true, // Equalize slide heights
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: { 
                slidesPerView: 2, 
                spaceBetween: 30,
                centeredSlides: false 
            },
            1024: { 
                slidesPerView: 3, 
                spaceBetween: 40,
                centeredSlides: false
            }
        }
    });

    // 7. Luminous Lightbox for Gallery (Professional Setup)
    // To prevent double initialization if script runs twice
    if(!window.luminousInitialized) {
        const luminousItems = document.querySelectorAll('.luminous');
        if(luminousItems.length > 0) {
            new LuminousGallery(luminousItems, {
                arrowNavigation: true
            }, {
                caption: (trigger) => trigger.querySelector('img').getAttribute('alt'),
                _defaultOptions: {
                    className: 'lum-gallery-container',
                }
            });
        }
        window.luminousInitialized = true;
    }

    // 8. Scroll to Top
    const ptBtn = document.getElementById("pagetop-btn");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            ptBtn.classList.remove("opacity-0", "pointer-events-none");
            ptBtn.classList.add("opacity-100", "pointer-events-auto");
        } else {
            ptBtn.classList.remove("opacity-100", "pointer-events-auto");
            ptBtn.classList.add("opacity-0", "pointer-events-none");
        }
    });
    ptBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
