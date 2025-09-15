// Enhanced smooth scrolling and animations
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links with enhanced easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced button animations with ripple effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        btn.addEventListener('mousedown', function(e) {
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add click scale animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1.02)';
            }, 100);
        });
        
        btn.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.02)';
        });
    });

    // Enhanced navbar with smooth transitions
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let scrollTimer = null;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Clear previous timer
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 150) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.opacity = '0.95';
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
        }
        
        // Add glass effect when scrolling
        if (scrollTop > 50) {
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.background = 'rgba(15, 12, 41, 0.98)';
        } else {
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.background = 'rgba(15, 12, 41, 0.95)';
        }
        
        lastScrollTop = scrollTop;
        
        // Reset navbar after scroll stops
        scrollTimer = setTimeout(() => {
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
        }, 1000);
    });

    // Enhanced intersection observer with staggered animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animations
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.classList.add('animated');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe elements with enhanced animations
    document.querySelectorAll('.feature-card, .command-card, .legal-text h2, .legal-text p').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(card);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // Add hover effects to cards
    document.querySelectorAll('.feature-card, .command-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
        });
    });

    // Smooth page transitions
    const links = document.querySelectorAll('a[href$=".html"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Fade out animation
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });

    // Fade in animation on page load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Add custom CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .animated {
            animation-play-state: running !important;
        }
    `;
    document.head.appendChild(style);

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            const isActive = mobileMenu.classList.contains('active');
            
            if (isActive) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            } else {
                mobileMenu.classList.add('active');
                mobileMenuBtn.classList.add('active');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuItems = mobileMenu.querySelectorAll('.mobile-menu-item');
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }

    // Color theme functionality
    const themeButtons = document.querySelectorAll('.theme-btn');
    const colorToggle = document.getElementById('colorToggle');
    
    // Define color themes
    const themes = {
        cyberpunk: {
            '--primary-color': '#00ffff',
            '--secondary-color': '#ff00ff',
            '--bg-start': '#0f0c29',
            '--bg-middle': '#24243e',
            '--bg-end': '#302b63',
            '--text-primary': '#e0e0e0',
            '--accent-color': '#00ffff'
        },
        neon: {
            '--primary-color': '#ff0080',
            '--secondary-color': '#00ff80',
            '--bg-start': '#1a0033',
            '--bg-middle': '#330066',
            '--bg-end': '#660099',
            '--text-primary': '#ffffff',
            '--accent-color': '#ff0080'
        },
        dark: {
            '--primary-color': '#666666',
            '--secondary-color': '#999999',
            '--bg-start': '#000000',
            '--bg-middle': '#1a1a1a',
            '--bg-end': '#333333',
            '--text-primary': '#cccccc',
            '--accent-color': '#666666'
        },
        purple: {
            '--primary-color': '#9d4edd',
            '--secondary-color': '#c77dff',
            '--bg-start': '#240046',
            '--bg-middle': '#3c096c',
            '--bg-end': '#5a189a',
            '--text-primary': '#e0aaff',
            '--accent-color': '#9d4edd'
        }
    };
    
    // Load saved theme
    const savedTheme = localStorage.getItem('selectedTheme') || 'cyberpunk';
    applyTheme(savedTheme);
    
    // Theme button functionality
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedTheme = this.dataset.theme;
            
            // Remove active class from all buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Apply theme
            applyTheme(selectedTheme);
            
            // Save to localStorage
            localStorage.setItem('selectedTheme', selectedTheme);
        });
    });
    
    // Color toggle functionality
    if (colorToggle) {
        colorToggle.addEventListener('click', function() {
            const currentTheme = localStorage.getItem('selectedTheme') || 'cyberpunk';
            const themeKeys = Object.keys(themes);
            const currentIndex = themeKeys.indexOf(currentTheme);
            const nextIndex = (currentIndex + 1) % themeKeys.length;
            const nextTheme = themeKeys[nextIndex];
            
            // Update active button
            themeButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.theme === nextTheme);
            });
            
            // Apply new theme
            applyTheme(nextTheme);
            localStorage.setItem('selectedTheme', nextTheme);
        });
    }
    
    function applyTheme(themeName) {
        const theme = themes[themeName];
        if (theme) {
            const root = document.documentElement;
            Object.keys(theme).forEach(property => {
                root.style.setProperty(property, theme[property]);
            });
            
            // Update active button
            themeButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.theme === themeName);
            });
        }
    }
});
