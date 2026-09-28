document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".js-hamburger");
  const drawer = document.querySelector(".js-drawer");
  const drawerLinks = document.querySelectorAll(".js-drawer a");
  const body = document.body;

  function toggleMenu() {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
    drawer.classList.toggle("is-open");
    
    if (!isExpanded) {
      body.classList.add("is-scroll-locked");
    } else {
      body.classList.remove("is-scroll-locked");
    }
  }

  if (hamburger && drawer) {
    hamburger.addEventListener("click", toggleMenu);

    drawerLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (drawer.classList.contains("is-open")) {
          toggleMenu();
        }
      });
    });

    // Close when clicking on the drawer background or the explicit close button
    drawer.addEventListener("click", (e) => {
      if (e.target === drawer || e.target.classList.contains("drawer__nav") || e.target.classList.contains("js-drawer-close")) {
        toggleMenu();
      }
    });

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) {
        toggleMenu();
      }
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Handle resize to remove mobile menu state on PC
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && drawer && drawer.classList.contains("is-open")) {
      hamburger.setAttribute("aria-expanded", "false");
      drawer.classList.remove("is-open");
      body.classList.remove("is-scroll-locked");
    }
  });

  // Lightbox for Gallery
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.querySelector(".lightbox__close");
  const galleryItems = document.querySelectorAll(".gallery__item img");

  if (lightbox && lightboxImg && galleryItems.length > 0) {
    galleryItems.forEach(img => {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        body.classList.add("is-scroll-locked");
      });
    });

    const closeLightbox = () => {
      lightbox.style.display = "none";
      lightboxImg.src = "";
      body.classList.remove("is-scroll-locked");
    };

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    lightbox.addEventListener("click", (e) => {
      if (e.target !== lightboxImg) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.style.display === "flex") {
        closeLightbox();
      }
    });
  } // End of lightbox logic

  // Gallery More Button (SP)
  const galleryMoreBtn = document.querySelector('.js-gallery-more');
  const galleryGrid = document.querySelector('.gallery__grid');
  if (galleryMoreBtn && galleryGrid) {
    galleryMoreBtn.addEventListener('click', () => {
      galleryGrid.classList.add('is-expanded');
      galleryMoreBtn.parentElement.classList.add('is-hidden');
    });
  }

  // Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.js-fade-up, .js-slide-left, .js-slide-right, .js-zoom-in');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
});
