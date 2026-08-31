document.addEventListener('DOMContentLoaded', () => {
    // FV Slider (Swiper)
    const fvSwiper = new Swiper('.fv-swiper', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        speed: 2000,
    });
    // Voice Slider
    const voiceSwiper = new Swiper('.voice-swiper', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false, // Disabled for 3 slides to avoid layout issues
        breakpoints: { 768: { slidesPerView: 3 } },
        autoplay: { delay: 4000, disableOnInteraction: false },
    });
    // GLightbox (Modern Portfolio Lightbox)
    const lightbox = GLightbox({
        selector: '.gallery-link',
        loop: true,
        width: '90vw',
        height: 'auto',
    });
    // Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuLinks = document.querySelectorAll('.menu-link');
    const toggleMenu = (active) => {
        if (active) {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    };
    hamburger.addEventListener('click', () => toggleMenu(true));
    closeMenu.addEventListener('click', () => toggleMenu(false));
    menuLinks.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });
    // Problems Gallery Slider
    const problemThumbs = document.querySelectorAll('.thumb');
    const mainImg = document.getElementById('main-problem-img');

    if (problemThumbs.length > 0 && mainImg) {
        let currentIdx = 0;
        let autoFadeInterval;

        const updateGallery = (index) => {
            const thumb = problemThumbs[index];
            const newSrc = thumb.getAttribute('data-src');
            
            problemThumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            mainImg.style.opacity = '0';
            
            setTimeout(() => {
                mainImg.src = newSrc;
                mainImg.style.opacity = '1';
                
                mainImg.classList.remove('fade-in');
                void mainImg.offsetWidth;
                mainImg.classList.add('fade-in');
            }, 200);
            currentIdx = index;
        };

        const startAutoFade = () => {
            autoFadeInterval = setInterval(() => {
                let nextIdx = (currentIdx + 1) % problemThumbs.length;
                updateGallery(nextIdx);
            }, 4000); // 4 seconds
        };

        problemThumbs.forEach((thumb, idx) => {
            thumb.addEventListener('click', () => {
                clearInterval(autoFadeInterval);
                updateGallery(idx);
                startAutoFade();
            });
        });
        startAutoFade();
    }

    /*
    // Disable Right Click, Copy, Cut, Select, and Drag
    document.addEventListener('contextmenu', (e) => e.preventDefault(), false);
    document.addEventListener('copy', (e) => e.preventDefault(), false);
    document.addEventListener('cut', (e) => e.preventDefault(), false);
    document.addEventListener('selectstart', (e) => e.preventDefault(), false);
    document.addEventListener('dragstart', (e) => e.preventDefault(), false);
    document.addEventListener('keydown', (e) => {
        // Block Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+U, F12
        if (
            (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'a' || e.key === 'u' || e.key === 'C' || e.key === 'X' || e.key === 'A' || e.key === 'U')) ||
            e.key === 'F12'
        ) {
            e.preventDefault();
            return false;
        }
    });
    */

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.closest('.faq-item');
            item.classList.toggle('active');
        });
    });

    // Fade Animation Observer
    const fadeElements = document.querySelectorAll('section:not(.fv-section):not(.cta-section), footer, .section-header');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => {
        el.classList.add('fade-up');
        fadeObserver.observe(el);
    });
});
