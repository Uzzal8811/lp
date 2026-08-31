document.addEventListener('DOMContentLoaded', () => {
    // FV Swiper Initialization
    const fvSwiper = new Swiper('.swiper-fv', {
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 2000,
        autoHeight: true,
    });

    // Gallery Swiper Initialization
    const gallerySwiper = new Swiper('.swiper-gallery', {
        slidesPerView: 1.2,
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                centeredSlides: false,
            }
        }
    });

    // Mens Swiper Initialization
    const mensSwiper = new Swiper('.swiper-mens', {
        slidesPerView: 1.2,
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-mens .swiper-pagination', // Using specific selector to avoid conflicts
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 4,
                centeredSlides: false,
                spaceBetween: 24,
            }
        }
    });

    // Voice Swiper Initialization
    const voiceSwiper = new Swiper('.swiper-voice', {
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-voice-next',
            prevEl: '.swiper-voice-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                autoplay: false, // Stop autoplay on PC/Tablet
            }
        }
    });

    // Before & After Swiper Initialization
    const baSwiper = new Swiper('.swiper-before-after', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-ba-next',
            prevEl: '.swiper-ba-prev',
        }
    });

    // Toggle Review Function
    window.toggleReview = function(btn) {
        const content = btn.previousElementSibling;
        const isExpanded = content.classList.toggle('expanded');
        
        if (isExpanded) {
            btn.textContent = '閉じる';
        } else {
            btn.textContent = '...もっと見る';
        }
        
        // Update Swiper height for layout shifts
        setTimeout(() => {
            voiceSwiper.update();
        }, 350);
    };

    // Auto-hide "Read More" if content is short
    function checkReadMore() {
        document.querySelectorAll('.voice-content').forEach(content => {
            const btn = content.nextElementSibling;
            if (btn && btn.classList.contains('read-more-btn')) {
                // Check if text is actually clamped/overflowing
                if (content.scrollHeight > content.offsetHeight) {
                    btn.classList.remove('hidden');
                } else {
                    btn.classList.add('hidden');
                }
            }
        });
    }

    // Run check after a short delay to ensure rendering is complete
    window.addEventListener('load', checkReadMore);
    window.addEventListener('resize', checkReadMore);

    // Mobile Menu Toggle
    const menuOpen = document.getElementById('menu-open');
    const menuClose = document.getElementById('menu-close');
    const spMenu = document.getElementById('sp-menu');
    const spLinks = document.querySelectorAll('.sp-link');

    menuOpen.addEventListener('click', () => {
        spMenu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    menuClose.addEventListener('click', () => {
        spMenu.classList.add('hidden');
        document.body.style.overflow = '';
    });

    spLinks.forEach(link => {
        link.addEventListener('click', () => {
            spMenu.classList.add('hidden');
            document.body.style.overflow = '';
        });
    });

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Right-click and selection prevention
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    }, false);

    document.addEventListener('selectstart', (e) => {
        e.preventDefault();
    }, false);
});

// Gallery Modal Functions
function openModal(imgSrc) {
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    modalImg.src = imgSrc;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('gallery-modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.pageYOffset > 50) {
        header.classList.add('py-2');
        header.classList.remove('py-4');
    } else {
        header.classList.add('py-4');
        header.classList.remove('py-2');
    }
});
