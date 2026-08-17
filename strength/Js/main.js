document.addEventListener('DOMContentLoaded', () => {
    // Prevent Right-Click, Copying, and Text Selection
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('copy', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());
    document.addEventListener('keydown', e => {
        if (e.ctrlKey && !e.shiftKey && (e.key === 'c' || e.key === 'C' || e.key === 'x' || e.key === 'X')) {
            e.preventDefault();
        }
    });

    // Auto-break lines at every Japanese period "。"
    document.querySelectorAll('p, dd, li').forEach(el => {
        if (el.innerHTML) {
            el.innerHTML = el.innerHTML.replace(/。/g, '。<br>');
        }
    });

    // Hamburger Menu Logic
    const btn = document.getElementById('hamburger-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    if (btn && menu) {
        const toggleMenu = () => {
            btn.classList.toggle('hamburger-active');
            menu.classList.toggle('open');
            if (menu.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        btn.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                if (menu.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });
    }

    // Intersection Observer for Fade-in animation
    const faders = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const appearOptions = {
            threshold: 0.05,
            rootMargin: "0px 0px 50px 0px"
        };

        const appearOnScroll = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    observer.unobserve(entry.target);
                }
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    } else {
        faders.forEach(fader => {
            fader.classList.add('appear');
        });
    }

    // Initialize Swiper for FV
    if (typeof Swiper !== 'undefined') {
        const fvSwiperEl = document.querySelector('.fv-swiper');
        if (fvSwiperEl) {
            new Swiper('.fv-swiper', {
                effect: 'fade',
                fadeEffect: {
                    crossFade: true
                },
                loop: true,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
                speed: 1500,
            });
        }

        // Initialize Swiper for Gallery (Optimized for iPhone Safari)
        const gallerySwiperEl = document.querySelector('.gallery-swiper');
        if (gallerySwiperEl) {
            const swiper = new Swiper('.gallery-swiper', {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                loop: true,
                speed: 800,
                watchSlidesProgress: true,
                passiveListeners: true,
                autoplay: {
                    delay: 3000, // 自動スライドの間隔（3秒）
                    disableOnInteraction: false, // ユーザーが操作しても自動スライドを止めない
                    pauseOnMouseEnter: true, // マウスホバーで一時停止
                },
                coverflowEffect: {
                    rotate: 15, // 回転角度
                    stretch: 0,
                    depth: 120, // 奥行き
                    modifier: 1.2,
                    slideShadows: false, // Safariの描画遅延を防止
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }
    }

    // Scroll events for Back to Top and Mobile CTA
    const backToTopBtn = document.getElementById('back-to-top');
    const mobileCta = document.getElementById('mobile-fixed-cta');
    const fvSection = document.getElementById('fv');

    window.addEventListener('scroll', () => {
        // Back to top logic
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'translate-y-10', 'scale-90', 'pointer-events-none');
                backToTopBtn.classList.add('opacity-100', 'translate-y-0', 'scale-100');
            } else {
                backToTopBtn.classList.add('opacity-0', 'translate-y-10', 'scale-90', 'pointer-events-none');
                backToTopBtn.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
            }
        }

        // Mobile fixed CTA logic (shows exactly when FV ends)
        if (mobileCta && fvSection) {
            const fvHeight = fvSection.offsetHeight;
            if (window.scrollY > (fvHeight * 0.9)) {
                mobileCta.classList.remove('translate-y-full', 'opacity-0', 'pointer-events-none');
                mobileCta.classList.add('translate-y-0', 'opacity-100');
            } else {
                mobileCta.classList.add('translate-y-full', 'opacity-0', 'pointer-events-none');
                mobileCta.classList.remove('translate-y-0', 'opacity-100');
            }
        }
    }, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
