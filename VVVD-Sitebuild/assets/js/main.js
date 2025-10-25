/**
 * VVVDigitals Main JavaScript
 * Handles navigation, animations, and interactions
 * Version: 1.0.0
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const elements = {
        header: document.getElementById('nav-header'),
        mobileToggle: document.querySelector('.mobile-toggle'),
        navMenu: document.querySelector('.nav-menu'),
        navLinks: document.querySelectorAll('.nav-link'),
        animatedElements: document.querySelectorAll('[data-animate]')
    };

    // ============================================
    // Mobile Navigation
    // ============================================
    function initMobileNav() {
        if (!elements.mobileToggle || !elements.navMenu) return;

        let isOpen = false;

        elements.mobileToggle.addEventListener('click', function() {
            isOpen = !isOpen;
            elements.navMenu.classList.toggle('active', isOpen);
            elements.mobileToggle.classList.toggle('active', isOpen);
            document.body.classList.toggle('nav-open', isOpen);
        });

        // Close mobile menu on link click
        elements.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                isOpen = false;
                elements.navMenu.classList.remove('active');
                elements.mobileToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) {
                isOpen = false;
                elements.navMenu.classList.remove('active');
                elements.mobileToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }

    // ============================================
    // Sticky Navigation
    // ============================================
    function initStickyNav() {
        if (!elements.header) return;

        let lastScroll = 0;
        const scrollThreshold = 100;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Add/remove scrolled class
            if (currentScroll > scrollThreshold) {
                elements.header.classList.add('scrolled');
            } else {
                elements.header.classList.remove('scrolled');
            }

            // Hide/show on scroll direction
            if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
                elements.header.classList.add('hidden');
            } else {
                elements.header.classList.remove('hidden');
            }

            lastScroll = currentScroll;
        });
    }

    // ============================================
    // Smooth Scroll
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();
                const offset = 80; // Header height
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    // ============================================
    // Intersection Observer for Animations
    // ============================================
    function initScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe animated elements
        document.querySelectorAll('.value-card, .service-card, .process-step').forEach(el => {
            el.classList.add('animate-target');
            observer.observe(el);
        });
    }

    // ============================================
    // Gradient Animation
    // ============================================
    function initGradientAnimation() {
        const gradientElements = document.querySelectorAll('.gradient-text');
        if (gradientElements.length === 0) return;

        let hue = 0;
        const animateGradient = () => {
            hue = (hue + 0.5) % 360;
            const color1 = `hsl(${hue}, 70%, 50%)`;
            const color2 = `hsl(${(hue + 60) % 360}, 70%, 50%)`;
            
            // This is subtle - only on hover
            gradientElements.forEach(el => {
                if (el.matches(':hover')) {
                    el.style.background = `linear-gradient(90deg, ${color1}, ${color2})`;
                    el.style.webkitBackgroundClip = 'text';
                    el.style.webkitTextFillColor = 'transparent';
                    el.style.backgroundClip = 'text';
                }
            });
            
            requestAnimationFrame(animateGradient);
        };
        
        // Only animate on desktop
        if (window.matchMedia('(min-width: 768px)').matches) {
            requestAnimationFrame(animateGradient);
        }
    }

    // ============================================
    // Form Handling
    // ============================================
    function initForms() {
        const forms = document.querySelectorAll('form[data-ajax]');
        
        forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const button = form.querySelector('button[type="submit"]');
                const originalText = button.textContent;
                
                // Update button state
                button.disabled = true;
                button.textContent = 'Sending...';
                button.classList.add('loading');
                
                try {
                    // Simulate API call (replace with actual endpoint)
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    // Success state
                    button.textContent = 'Success!';
                    button.classList.remove('loading');
                    button.classList.add('success');
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'form-success';
                    successMsg.textContent = 'Message sent successfully!';
                    form.appendChild(successMsg);
                    
                    // Reset form
                    setTimeout(() => {
                        form.reset();
                        button.disabled = false;
                        button.textContent = originalText;
                        button.classList.remove('success');
                        successMsg.remove();
                    }, 3000);
                    
                } catch (error) {
                    // Error state
                    button.textContent = 'Error - Try Again';
                    button.classList.remove('loading');
                    button.classList.add('error');
                    button.disabled = false;
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.classList.remove('error');
                    }, 3000);
                }
            });
        });
    }

    // ============================================
    // Performance Monitoring
    // ============================================
    function initPerformanceMonitoring() {
        if (!window.performance || !performance.getEntriesByType) return;
        
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('VVVDigitals Performance Metrics:');
                console.log(`DNS Lookup: ${Math.round(perfData.domainLookupEnd - perfData.domainLookupStart)}ms`);
                console.log(`TCP Connection: ${Math.round(perfData.connectEnd - perfData.connectStart)}ms`);
                console.log(`Request Time: ${Math.round(perfData.responseEnd - perfData.requestStart)}ms`);
                console.log(`DOM Interactive: ${Math.round(perfData.domInteractive)}ms`);
                console.log(`Total Load Time: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
            }
        });
    }

    // ============================================
    // Theme Toggle (future feature)
    // ============================================
    function initThemeToggle() {
        const themeToggle = document.querySelector('[data-theme-toggle]');
        if (!themeToggle) return;
        
        const currentTheme = localStorage.getItem('vvv-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('vvv-theme', newTheme);
        });
    }

    // ============================================
    // Lazy Loading
    // ============================================
    function initLazyLoading() {
        if (!('IntersectionObserver' in window)) return;
        
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // ============================================
    // Copy to Clipboard
    // ============================================
    function initClipboard() {
        document.querySelectorAll('[data-copy]').forEach(button => {
            button.addEventListener('click', () => {
                const text = button.dataset.copy;
                navigator.clipboard.writeText(text).then(() => {
                    const originalText = button.textContent;
                    button.textContent = 'Copied!';
                    button.classList.add('success');
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.classList.remove('success');
                    }, 2000);
                });
            });
        });
    }

    // ============================================
    // Initialize Everything
    // ============================================
    function init() {
        initMobileNav();
        initStickyNav();
        initSmoothScroll();
        initScrollAnimations();
        initGradientAnimation();
        initForms();
        initThemeToggle();
        initLazyLoading();
        initClipboard();
        initPerformanceMonitoring();
        
        // Add loaded class to body
        document.body.classList.add('loaded');
        
        console.log('VVVDigitals: Systems initialized. Velocity achieved.');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

// ============================================
// Utility Functions (Global)
// ============================================
window.VVV = {
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Format numbers with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
};
