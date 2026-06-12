document.addEventListener('DOMContentLoaded', function() {

    // ===== PAGE FADE IN ON LOAD =====
    document.body.style.opacity = '0';
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 50);

    // ===== SMOOTH PAGE TRANSITIONS FOR INTERNAL LINKS =====
    document.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href');
        
        // Skip if no href, javascript, external, target blank, or hash only
        if (!href || href === '#' || href.startsWith('javascript') || link.hasAttribute('target')) {
            return;
        }
        
        // External links - skip
        if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
            return;
        }
        
        // Same-page anchor links - smooth scroll
        if (href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
            return;
        }
        
        // Internal page links - fade transition (but NOT for dropdown parent links on mobile)
        link.addEventListener('click', function(e) {
            // Don't intercept if this is a dropdown parent on mobile
            if (window.innerWidth <= 968 && link.closest('.nav-item.dropdown')) {
                return;
            }
            e.preventDefault();
            const destination = href;
            document.body.classList.add('fade-out');
            setTimeout(function() {
                window.location.href = destination;
            }, 400);
        });
    });

    // ===== MOBILE NAV TOGGLE =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Mobile dropdown toggle
        const dropdownItems = navMenu.querySelectorAll('.nav-item.dropdown');
        dropdownItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 968) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdownItems.forEach(other => {
                        if (other !== item) {
                            other.classList.remove('open');
                        }
                    });
                    
                    // Toggle this dropdown
                    item.classList.toggle('open');
                }
            });
        });

        // Dropdown submenu links - navigate and close
        const dropdownLinks = navMenu.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 968) {
                    // Let the transition happen, then close
                    setTimeout(function() {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        dropdownItems.forEach(item => item.classList.remove('open'));
                    }, 100);
                }
            });
        });

        // Close nav when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                dropdownItems.forEach(item => item.classList.remove('open'));
            }
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }

    // ===== SCROLL REVEAL ANIMATION =====
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ===== FOOTER FORM =====
    const footerForm = document.getElementById('footerForm');
    if (footerForm) {
        const footerNameInput = document.getElementById('footerName');
        
        footerNameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
        });

        footerNameInput.addEventListener('input', function() {
            this.style.borderColor = '#444';
            this.style.background = '#2a2a2a';
        });

        footerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = footerNameInput.value.trim();
            
            if (name === '' || name.length < 2) {
                footerNameInput.style.borderColor = '#cc0000';
                footerNameInput.style.background = '#3a1a1a';
                footerNameInput.value = '';
                footerNameInput.placeholder = name === '' ? 'Please enter your name' : 'Name must be at least 2 characters';
                return;
            }
            
            footerNameInput.style.borderColor = '#444';
            footerNameInput.style.background = '#2a2a2a';
            footerNameInput.value = '';
            footerNameInput.placeholder = 'Thank you!';
        });
    }

    // ===== MISSION REPORT FORM =====
    const missionReportForm = document.getElementById('missionReportForm');
    if (missionReportForm) {
        const mrSuccess = document.getElementById('mrSuccess');
        const mrNameInput = document.getElementById('mrName');
        const mrEmailInput = document.getElementById('mrEmail');
        
        mrNameInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
        });

        [mrNameInput, mrEmailInput].forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#e0e0e0';
                this.style.background = '#ffffff';
            });
        });

        missionReportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let hasError = false;
            const name = mrNameInput.value.trim();
            const email = mrEmailInput.value.trim();
            
            if (name === '' || name.length < 2) {
                mrNameInput.style.borderColor = '#cc0000';
                mrNameInput.style.background = '#fff5f5';
                mrNameInput.value = '';
                mrNameInput.placeholder = name === '' ? 'Please enter your name' : 'Name must be at least 2 characters';
                hasError = true;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '' || !emailRegex.test(email)) {
                mrEmailInput.style.borderColor = '#cc0000';
                mrEmailInput.style.background = '#fff5f5';
                mrEmailInput.value = '';
                mrEmailInput.placeholder = email === '' ? 'Please enter your email' : 'Enter a valid email';
                hasError = true;
            }
            
            if (hasError) return;
            
            missionReportForm.style.display = 'none';
            mrSuccess.style.display = 'block';
            mrSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

});