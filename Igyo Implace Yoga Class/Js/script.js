document.addEventListener('DOMContentLoaded', () => {
      // Initialize Lucide icons
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      // Scroll Reveal Animation (Intersection Observer)
      const revealElements = document.querySelectorAll('.reveal');
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      revealElements.forEach(el => revealObserver.observe(el));

      // Hamburger Menu Logic
      const hamburgerBtn = document.querySelector('.hamburger-btn');
      const navLinks = document.querySelector('.nav-links');
      const navItems = document.querySelectorAll('.nav-links a');

      if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
          hamburgerBtn.classList.toggle('is-open');
          navLinks.classList.toggle('is-open');
        });

        navItems.forEach(item => {
          item.addEventListener('click', () => {
            hamburgerBtn.classList.remove('is-open');
            navLinks.classList.remove('is-open');
          });
        });
      }

      // Voice Read More Logic
      const voiceCards = document.querySelectorAll('.voice-card');
      voiceCards.forEach(card => {
        const textElement = card.querySelector('.voice-text');
        const readMoreBtn = card.querySelector('.voice-read-more');
        if (!textElement || !readMoreBtn) return;
        
        // 最初は3行に制限するクラスを付与
        textElement.classList.add('is-clamped');
        
        // 実際のテキストの高さが制限された高さより大きい場合のみボタンを表示
        if (textElement.scrollHeight > textElement.clientHeight) {
          readMoreBtn.style.display = 'inline-flex';
          readMoreBtn.addEventListener('click', () => {
            textElement.classList.toggle('is-clamped');
            readMoreBtn.classList.toggle('is-open');
            const btnText = readMoreBtn.querySelector('.btn-text');
            if (readMoreBtn.classList.contains('is-open')) {
              btnText.textContent = '閉じる';
            } else {
              btnText.textContent = '続きを読む';
            }
          });
        } else {
          // 3行以下の場合はボタンを隠す
          readMoreBtn.style.display = 'none';
          textElement.classList.remove('is-clamped');
        }
      });

      // Pricing Parallax Logic (iOS/SP/PC共通)
      const pricingBgJs = document.querySelector('.pricing-bg-js');
      const pricingSec = document.querySelector('#pricing');
      if (pricingBgJs && pricingSec) {
        const updateParallax = () => {
          const rect = pricingSec.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (rect.top <= windowHeight && rect.bottom >= 0) {
            // 移動量を0.15から0.4に増やし、よりはっきりとパララックスが分かるように調整
            const scrollDistance = windowHeight - rect.top;
            pricingBgJs.style.transform = `translate3d(0, ${scrollDistance * 0.4}px, 0)`;
          }
        };
        // 初期化時とスクロール時に実行
        updateParallax();
        window.addEventListener('scroll', updateParallax, { passive: true });
      }

      // Pricing Swiper Initialization
      const pricingSwiper = new Swiper('.pricing-swiper', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
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

      // Back to Top Button Logic
      const backToTopBtn = document.getElementById('back-to-top');
      if (backToTopBtn) {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 300) {
            backToTopBtn.classList.add('is-visible');
          } else {
            backToTopBtn.classList.remove('is-visible');
          }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        });
      }

      // Lightbox Logic
      const galleryItems = document.querySelectorAll('.gallery-item');
      const lightbox = document.getElementById('gallery-lightbox');
      const lightboxImg = document.getElementById('lightbox-img');
      const lightboxClose = document.querySelector('.lightbox-close');
      const lightboxPrev = document.querySelector('.lightbox-prev');
      const lightboxNext = document.querySelector('.lightbox-next');
      
      let currentGalleryIndex = 0;
      const galleryImages = [
        "img/gallery1.jpg",
        "img/gallery2.jpg",
        "img/gallery3.jpg",
        "img/gallery4.jpg",
        "img/gallery5.jpg",
        "img/gallery6.jpg"
      ];

      if (lightbox && galleryItems.length > 0) {
        const openLightbox = (index) => {
          currentGalleryIndex = index;
          lightboxImg.src = galleryImages[currentGalleryIndex];
          lightbox.classList.add('is-active');
          document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
          lightbox.classList.remove('is-active');
          document.body.style.overflow = '';
        };

        const showPrevImage = (e) => {
          e.stopPropagation();
          currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
          lightboxImg.src = galleryImages[currentGalleryIndex];
        };

        const showNextImage = (e) => {
          e.stopPropagation();
          currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
          lightboxImg.src = galleryImages[currentGalleryIndex];
        };

        galleryItems.forEach((item, index) => {
          item.addEventListener('click', () => {
            openLightbox(index);
          });
        });

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', closeLightbox);
        lightboxImg.addEventListener('click', (e) => e.stopPropagation());
        
        lightboxPrev.addEventListener('click', showPrevImage);
        lightboxNext.addEventListener('click', showNextImage);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
          if (!lightbox.classList.contains('is-active')) return;
          if (e.key === 'Escape') closeLightbox();
          if (e.key === 'ArrowLeft') showPrevImage(e);
          if (e.key === 'ArrowRight') showNextImage(e);
        });
      }

      // Pricing slider image click logic to change Recommended Menu Box image
      const pricingSliderImgs = document.querySelectorAll('.pricing-slider-img');
      const mainPricingImg = document.querySelector('.pricing-img img');
      if (mainPricingImg && pricingSliderImgs.length > 0) {
        pricingSliderImgs.forEach(img => {
          img.addEventListener('click', () => {
            const newSrc = img.getAttribute('src');
            const newAlt = img.getAttribute('alt');
            
            // Add a smooth fade-out and fade-in transition
            mainPricingImg.style.transition = 'opacity 0.2s ease-in-out';
            mainPricingImg.style.opacity = '0';
            
            setTimeout(() => {
              mainPricingImg.src = newSrc;
              mainPricingImg.alt = newAlt;
              mainPricingImg.style.opacity = '1';
            }, 200);
          });
        });
      }
    });
