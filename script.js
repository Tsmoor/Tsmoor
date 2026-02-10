/**
 * =====================================================
 * MAZEN HAMDY PORTFOLIO - JAVASCRIPT
 * Author: Mazen Hamdy
 * Version: 2.0
 * =====================================================
 */

'use strict';

// ===== Configuration =====
const CONFIG = {
    TYPING_SPEED: 100,
    DELETING_SPEED: 50,
    PAUSE_DURATION: 2000,
    STATS_ANIMATION_DURATION: 2000,
    SKILLS_ANIMATION_DELAY: 200
};

// ===== Portfolio Projects Data =====
const PROJECTS = [
    {
        title: "Product Visualization",
        subtitle: "3D Modeling, Blender",
        category: "3d",
        icon: "🎨",
        media: [
            { type: "image", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=900&fit=crop" },
            { type: "video", src: "https://drive.google.com/file/d/1AcVqMUAoMlLQ08x9f9zt7wbnqcYwqC7B/view?usp=drive_link" },
            { type: "image", src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=900&fit=crop" }
        ]
    },
    {
        title: "Motion Graphics Reel",
        subtitle: "After Effects, Animation",
        category: "motion",
        icon: "🎬",
        media: [
            { type: "image", src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=900&fit=crop" },
            { type: "image", src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&h=900&fit=crop" }
        ]
    },
    {
        title: "Character Design",
        subtitle: "3D Sculpting, Blender",
        category: "3d",
        icon: "👾",
        media: [
            { type: "image", src: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=1200&h=900&fit=crop" },
            { type: "image", src: "https://images.unsplash.com/photo-1614854262340-ab1ca7d079c7?w=1200&h=900&fit=crop" },
            { type: "image", src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1200&h=900&fit=crop" }
        ]
    },
    {
        title: "Brand Animation",
        subtitle: "Motion Design, Video",
        category: "motion",
        icon: "✨",
        media: [
            { type: "image", src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=900&fit=crop" },
            { type: "image", src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=900&fit=crop" }
        ]
    },
    {
        title: "Environment Design",
        subtitle: "3D Modeling, Lighting",
        category: "3d",
        icon: "🏔️",
        media: [
            { type: "image", src: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1200&h=900&fit=crop" },
            { type: "image", src: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=1200&h=900&fit=crop" }
        ]
    },
    {
        title: "Editorial Video",
        subtitle: "Premiere Pro, Editing",
        category: "video",
        icon: "🎥",
        media: [
            { type: "image", src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200&h=900&fit=crop" },
            { type: "image", src: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=900&fit=crop" },
            { type: "image", src: "https://images.unsplash.com/photo-1574717025058-2f8737d2d83e?w=1200&h=900&fit=crop" }
        ]
    }
];

// ===== Discord OAuth Settings =====
const DISCORD_OAUTH_DEFAULTS = {
    clientId: 'YOUR_DISCORD_CLIENT_ID',
    redirectUri: window.location.origin + window.location.pathname,
    scope: ['identify'],
    // Use "token" to connect directly from static website (no backend required)
    responseType: 'token'
};

// ===== Utility Functions =====
const Utils = {
    /**
     * Get Google Drive preview link from various URL formats
     */
    getGoogleDrivePreviewLink(url) {
        let fileId = null;
        
        if (url.includes('/file/d/')) {
            fileId = url.split('/d/')[1].split('/')[0];
        } else if (url.includes('open?id=')) {
            fileId = url.split('id=')[1].split('&')[0];
        } else if (url.includes('drive.google.com')) {
            const parts = url.split('/').filter(Boolean);
            fileId = parts[parts.length - 1];
        }
        
        return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url;
    },

    /**
     * Debounce function
     */
    debounce(func, wait) {
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

    /**
     * Throttle function
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Animate number counting
     */
    animateValue(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        const step = (timestamp) => {
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    }
};

// ===== Preloader =====
class Preloader {
    constructor() {
        this.preloader = document.getElementById('preloader');
    }

    hide() {
        if (this.preloader) {
            setTimeout(() => {
                this.preloader.classList.add('hidden');
            }, 1500);
        }
    }
}

// ===== Custom Cursor =====
class CustomCursor {
    constructor() {
        this.dot = document.getElementById('cursorDot');
        this.ring = document.getElementById('cursorRing');
        
        if (!this.dot || !this.ring || window.innerWidth <= 768) return;
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.dotX = 0;
        this.dotY = 0;
        this.ringX = 0;
        this.ringY = 0;
        
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        this.animate();
        this.setupInteractions();
    }

    animate() {
        this.dotX += (this.mouseX - this.dotX) * 0.9;
        this.dotY += (this.mouseY - this.dotY) * 0.9;
        this.ringX += (this.mouseX - this.ringX) * 0.15;
        this.ringY += (this.mouseY - this.ringY) * 0.15;
        
        this.dot.style.left = `${this.dotX}px`;
        this.dot.style.top = `${this.dotY}px`;
        this.ring.style.left = `${this.ringX}px`;
        this.ring.style.top = `${this.ringY}px`;
        
        requestAnimationFrame(() => this.animate());
    }

    setupInteractions() {
        const interactiveElements = document.querySelectorAll('a, button, .portfolio-item, .filter-btn');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.expand());
            el.addEventListener('mouseleave', () => this.shrink());
        });
    }

    expand() {
        this.ring.style.width = '60px';
        this.ring.style.height = '60px';
    }

    shrink() {
        this.ring.style.width = '40px';
        this.ring.style.height = '40px';
    }
}

// ===== Navigation =====
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.menuToggle = document.getElementById('menuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        this.setupScrollEffect();
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupActiveLink();
    }

    setupScrollEffect() {
        const handleScroll = Utils.throttle(() => {
            if (window.pageYOffset > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }

    setupMobileMenu() {
        this.menuToggle.addEventListener('click', () => {
            const isActive = this.menuToggle.classList.toggle('active');
            this.navMenu.classList.toggle('active');
            this.menuToggle.setAttribute('aria-expanded', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navHeight = this.navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                this.menuToggle.classList.remove('active');
                this.navMenu.classList.remove('active');
                this.menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    setupActiveLink() {
        const handleScroll = Utils.throttle(() => {
            const scrollPos = window.pageYOffset + 150;
            const sections = document.querySelectorAll('section[id]');
            
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');
                
                if (scrollPos >= top && scrollPos < top + height) {
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }
}

// ===== Theme Toggle =====
class ThemeToggle {
    constructor() {
        this.toggle = document.getElementById('themeToggle');
        this.icon = document.getElementById('themeIcon');
        this.html = document.documentElement;
        
        this.init();
    }

    init() {
        const currentTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(currentTheme);
        
        this.toggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        this.html.setAttribute('data-theme', theme);
        this.icon.textContent = theme === 'dark' ? '☀' : '☾';
        this.toggle.setAttribute('aria-pressed', theme === 'dark');
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const currentTheme = this.html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// ===== Scroll Progress =====
class ScrollProgress {
    constructor() {
        this.progressBar = document.getElementById('scrollProgress');
        this.init();
    }

    init() {
        const updateProgress = Utils.throttle(() => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            this.progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
            this.progressBar.setAttribute('aria-valuenow', Math.round(scrollPercent));
        }, 10);

        window.addEventListener('scroll', updateProgress);
    }
}

// ===== Typing Effect =====
class TypingEffect {
    constructor() {
        this.typedText = document.querySelector('.typed-text');
        if (!this.typedText) return;
        
        this.texts = [
            '3D Artist & Graphic Designer',
            'Motion Graphics Expert',
            'Visual Storyteller',
            'Creative Professional'
        ];
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.typedText.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.typedText.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.isDeleting ? CONFIG.DELETING_SPEED : CONFIG.TYPING_SPEED;
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = CONFIG.PAUSE_DURATION;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// ===== Particles Background =====
class ParticlesBackground {
    init() {
        if (typeof particlesJS === 'undefined') return;
        
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: { enable: true, value_area: 800 }
                },
                color: { value: '#6366f1' },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: { enable: true, speed: 1, opacity_min: 0.1 }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 2, size_min: 0.1 }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#6366f1',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.5 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
}

// ===== Stats Animation =====
class StatsAnimation {
    constructor() {
        this.stats = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStat(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.stats.forEach(stat => observer.observe(stat));
    }

    animateStat(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const suffix = target === 100 ? '%' : '+';
        Utils.animateValue(element, 0, target, CONFIG.STATS_ANIMATION_DURATION, suffix);
    }
}

// ===== Skills Animation =====
class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkill(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.skillBars.forEach(bar => observer.observe(bar));
    }

    animateSkill(element) {
        const progress = element.getAttribute('data-progress');
        const progressBar = element.closest('.skill-bar');
        
        if (progressBar) {
            progressBar.setAttribute('aria-valuenow', progress);
        }
        
        setTimeout(() => {
            element.style.width = progress + '%';
        }, CONFIG.SKILLS_ANIMATION_DELAY);
    }
}

// ===== Portfolio =====
class Portfolio {
    constructor() {
        this.grid = document.getElementById('portfolioGrid');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.init();
    }

    init() {
        this.render();
        this.setupFilter();
    }

    render() {
        PROJECTS.forEach((project, index) => {
            const item = this.createItem(project, index);
            this.grid.appendChild(item);
        });
    }

    createItem(project, index) {
        const item = document.createElement('article');
        item.className = 'portfolio-item';
        item.setAttribute('data-category', project.category);
        item.setAttribute('data-aos', 'fade-up');
        item.setAttribute('data-aos-delay', (index % 3) * 100);
        item.setAttribute('role', 'listitem');
        
        const thumbnail = document.createElement('div');
        thumbnail.className = 'portfolio-thumbnail';
        
        const firstMedia = project.media[0];
        if (firstMedia?.src) {
            const img = document.createElement('img');
            img.src = firstMedia.src;
            img.alt = project.title;
            img.loading = 'lazy';
            img.onerror = () => {
                thumbnail.classList.add('placeholder');
                thumbnail.innerHTML = project.icon || '🎨';
            };
            thumbnail.appendChild(img);
        } else {
            thumbnail.classList.add('placeholder');
            thumbnail.innerHTML = project.icon || '🎨';
        }
        
        const caption = document.createElement('div');
        caption.className = 'portfolio-caption';
        caption.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.subtitle}</p>
        `;
        
        item.appendChild(thumbnail);
        item.appendChild(caption);
        item.addEventListener('click', () => modal.open(index));
        
        return item;
    }

    setupFilter() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.filter(btn));
        });
    }

    filter(activeBtn) {
        const filter = activeBtn.getAttribute('data-filter');
        
        // Update active button
        this.filterBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
        });
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-pressed', 'true');
        
        // Filter items
        const items = document.querySelectorAll('.portfolio-item');
        items.forEach(item => {
            const category = item.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }
}

// ===== Modal =====
class Modal {
    constructor() {
        this.modal = document.getElementById('modal');
        this.overlay = document.getElementById('modalOverlay');
        this.closeBtn = document.getElementById('modalClose');
        this.mediaContainer = document.getElementById('modalMediaContainer');
        this.title = document.getElementById('modalTitle');
        this.subtitle = document.getElementById('modalSubtitle');
        this.counter = document.getElementById('modalCounter');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        this.currentProject = 0;
        this.currentMediaIndex = 0;
        this.previousActiveElement = null;
        
        this.init();
    }

    init() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
        this.prevBtn.addEventListener('click', () => this.navigate(-1));
        this.nextBtn.addEventListener('click', () => this.navigate(1));
        
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        this.setupSwipe();
    }

    open(projectIndex) {
        this.currentProject = projectIndex;
        this.currentMediaIndex = 0;
        this.showMedia();
        this.modal.classList.add('active');
        this.modal.setAttribute('aria-hidden', 'false');
        this.previousActiveElement = document.activeElement;
        this.closeBtn.focus();
        document.body.style.overflow = 'hidden';
    }

    close() {
        const video = this.mediaContainer.querySelector('video');
        if (video) video.pause();
        
        const iframe = this.mediaContainer.querySelector('iframe');
        if (iframe) iframe.src = '';
        
        this.modal.classList.remove('active');
        this.modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
        }
    }

    showMedia() {
        const project = PROJECTS[this.currentProject];
        const media = project.media[this.currentMediaIndex];
        
        this.mediaContainer.innerHTML = '';
        
        if (media.type === 'video' && media.src) {
            if (media.src.includes('drive.google.com')) {
                const preview = Utils.getGoogleDrivePreviewLink(media.src);
                const iframe = document.createElement('iframe');
                iframe.className = 'modal-media';
                iframe.src = preview;
                iframe.allow = 'autoplay; fullscreen';
                iframe.allowFullscreen = true;
                iframe.title = project.title;
                this.mediaContainer.appendChild(iframe);
            } else {
                const video = document.createElement('video');
                video.className = 'modal-media';
                video.controls = true;
                video.src = media.src;
                video.onerror = () => {
                    this.mediaContainer.innerHTML = '<div class="modal-media placeholder">🎬</div>';
                };
                this.mediaContainer.appendChild(video);
            }
        } else if (media.src) {
            const img = document.createElement('img');
            img.className = 'modal-media';
            img.src = media.src;
            img.alt = project.title;
            img.onerror = () => {
                this.mediaContainer.innerHTML = `<div class="modal-media placeholder">${project.icon || '🖼️'}</div>`;
            };
            this.mediaContainer.appendChild(img);
        } else {
            this.mediaContainer.innerHTML = `<div class="modal-media placeholder">${project.icon || '🖼️'}</div>`;
        }
        
        this.title.textContent = project.title;
        this.subtitle.textContent = project.subtitle;
        this.counter.textContent = `${this.currentMediaIndex + 1} / ${project.media.length}`;
        
        this.prevBtn.disabled = this.currentMediaIndex === 0;
        this.nextBtn.disabled = this.currentMediaIndex === project.media.length - 1;
    }

    navigate(direction) {
        const video = this.mediaContainer.querySelector('video');
        if (video) video.pause();
        
        const iframe = this.mediaContainer.querySelector('iframe');
        if (iframe) iframe.src = '';
        
        this.currentMediaIndex += direction;
        this.showMedia();
    }

    handleKeyboard(e) {
        if (!this.modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') this.close();
        if (e.key === 'ArrowLeft' && !this.prevBtn.disabled) this.navigate(-1);
        if (e.key === 'ArrowRight' && !this.nextBtn.disabled) this.navigate(1);
    }

    setupSwipe() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.mediaContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.mediaContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && !this.nextBtn.disabled) {
                    this.navigate(1);
                } else if (diff < 0 && !this.prevBtn.disabled) {
                    this.navigate(-1);
                }
            }
        });
    }
}

// ===== Contact Form =====
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;
        
        this.submitBtn = this.form.querySelector('.btn-submit');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        
        // Clear previous errors
        formGroup.classList.remove('error');
        field.classList.remove('error');
        
        // Validate
        let error = '';
        
        if (!field.value.trim()) {
            error = 'This field is required';
        } else if (field.type === 'email' && !this.isValidEmail(field.value)) {
            error = 'Please enter a valid email address';
        } else if (field.hasAttribute('minlength')) {
            const minLength = parseInt(field.getAttribute('minlength'));
            if (field.value.length < minLength) {
                error = `Minimum ${minLength} characters required`;
            }
        }
        
        if (error) {
            formGroup.classList.add('error');
            field.classList.add('error');
            errorMessage.textContent = error;
            return false;
        }
        
        return true;
    }

    clearError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        field.classList.remove('error');
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const fields = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) return;
        
        // Show loading state
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        try {
            await this.simulateSubmit();
            this.showSuccess();
            this.form.reset();
        } catch (error) {
            this.showError();
        } finally {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    simulateSubmit() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    showSuccess() {
        alert('✅ Thank you for your message! I will get back to you soon.');
    }

    showError() {
        alert('❌ Something went wrong. Please try again later.');
    }
}

// ===== Discord OAuth =====
class DiscordAuth {
    constructor() {
        this.heroButton = document.getElementById('discordAuthorizeBtn');
        this.contactButton = document.getElementById('discordAuthorizeBtnContact');
        this.disconnectButton = document.getElementById('discordDisconnectBtn');
        this.statusElement = document.getElementById('discordAuthStatus');
        this.noteElement = document.getElementById('discordAuthNote');
        this.userCard = document.getElementById('discordUser');
        this.userAvatar = document.getElementById('discordUserAvatar');
        this.userName = document.getElementById('discordUserName');
        this.userMeta = document.getElementById('discordUserMeta');
        this.redirectText = document.getElementById('discordRedirectText');
        this.clientIdInput = document.getElementById('discordClientIdInput');
        this.redirectInput = document.getElementById('discordRedirectInput');
        this.saveConfigButton = document.getElementById('discordSaveConfigBtn');
        this.tokenStorageKey = 'discord_access_token';
        this.oauthStateKey = 'discord_oauth_state';
        this.clientIdStorageKey = 'discord_client_id';
        this.redirectStorageKey = 'discord_redirect_uri';

        if (!this.heroButton && !this.contactButton) return;

        this.init();
    }

    init() {
        const config = this.getConfig();

        if (this.redirectText) {
            this.redirectText.textContent = config.redirectUri;
        }

        if (this.clientIdInput) {
            this.clientIdInput.value = config.clientId === 'YOUR_DISCORD_CLIENT_ID' ? '' : config.clientId;
        }

        if (this.redirectInput) {
            this.redirectInput.value = config.redirectUri;
        }

        this.heroButton?.addEventListener('click', () => this.authorize());
        this.contactButton?.addEventListener('click', () => this.authorize());
        this.disconnectButton?.addEventListener('click', () => this.disconnect());
        this.saveConfigButton?.addEventListener('click', () => this.saveLocalConfig());

        this.syncTokenFromUrl();
        this.hydrateFromStorage();
    }

    buildAuthUrl() {
        const config = this.getConfig();
        const state = this.generateState();
        sessionStorage.setItem(this.oauthStateKey, state);

        const params = new URLSearchParams({
            client_id: config.clientId,
            response_type: config.responseType,
            redirect_uri: config.redirectUri,
            scope: config.scope.join(' '),
            prompt: 'consent',
            state
        });

        return `https://discord.com/oauth2/authorize?${params.toString()}`;
    }

    authorize() {
        const config = this.getConfig();

        if (config.clientId === 'YOUR_DISCORD_CLIENT_ID') {
            alert('Add your Discord Client ID in the form first, then save local config.');
            return;
        }

        window.location.assign(this.buildAuthUrl());
    }

    getConfig() {
        const storedClientId = localStorage.getItem(this.clientIdStorageKey);
        const storedRedirect = localStorage.getItem(this.redirectStorageKey);

        return {
            ...DISCORD_OAUTH_DEFAULTS,
            clientId: storedClientId || DISCORD_OAUTH_DEFAULTS.clientId,
            redirectUri: storedRedirect || DISCORD_OAUTH_DEFAULTS.redirectUri
        };
    }

    saveLocalConfig() {
        const clientId = this.clientIdInput?.value.trim();
        const redirectUri = this.redirectInput?.value.trim();

        if (!clientId) {
            alert('Please enter Discord Client ID first.');
            return;
        }

        if (!redirectUri) {
            alert('Please enter Redirect URI first.');
            return;
        }

        localStorage.setItem(this.clientIdStorageKey, clientId);
        localStorage.setItem(this.redirectStorageKey, redirectUri);

        if (this.redirectText) {
            this.redirectText.textContent = redirectUri;
        }

        this.noteElement.textContent = 'Local config saved in this browser. You can connect Discord now without editing code.';
    }

    generateState() {
        return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
    }

    syncTokenFromUrl() {
        const hashParams = new URLSearchParams(window.location.hash.slice(1));
        const token = hashParams.get('access_token');
        const state = hashParams.get('state');
        const expectedState = sessionStorage.getItem(this.oauthStateKey);

        if ((state && expectedState && state !== expectedState) || (state && !expectedState)) {
            this.setDisconnected('Security check failed (invalid OAuth state). Please try connect again.');
            history.replaceState({}, document.title, window.location.pathname + window.location.search);
            return;
        }

        if (!token) return;

        sessionStorage.setItem(this.tokenStorageKey, token);
        sessionStorage.removeItem(this.oauthStateKey);
        history.replaceState({}, document.title, window.location.pathname + window.location.search);
    }

    async hydrateFromStorage() {
        const token = sessionStorage.getItem(this.tokenStorageKey);

        if (!token) return;

        try {
            const profile = await this.fetchDiscordProfile(token);
            this.setConnected(profile);
        } catch (error) {
            this.setDisconnected('Session expired. Please connect Discord again.');
        }
    }

    async fetchDiscordProfile(token) {
        const response = await fetch('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Discord profile');
        }

        return response.json();
    }

    setConnected(profile) {
        if (!this.statusElement || !this.noteElement) return;

        const avatarUrl = profile.avatar
            ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=128`
            : 'https://cdn.discordapp.com/embed/avatars/0.png';

        this.statusElement.textContent = 'Connected';
        this.statusElement.classList.add('connected');
        this.noteElement.textContent = 'Discord connected successfully. Visitors can now trust this profile is linked.';

        if (this.userCard && this.userAvatar && this.userName && this.userMeta) {
            this.userCard.hidden = false;
            this.userAvatar.src = avatarUrl;
            this.userName.textContent = `${profile.username}${profile.discriminator && profile.discriminator !== '0' ? `#${profile.discriminator}` : ''}`;
            this.userMeta.textContent = `User ID: ${profile.id}`;
        }
    }

    setDisconnected(message = 'Not connected yet.') {
        sessionStorage.removeItem(this.tokenStorageKey);
        sessionStorage.removeItem(this.oauthStateKey);

        if (!this.statusElement || !this.noteElement) return;

        this.statusElement.textContent = 'Not Connected';
        this.statusElement.classList.remove('connected');
        this.noteElement.textContent = message;

        if (this.userCard) {
            this.userCard.hidden = true;
        }
    }

    disconnect() {
        this.setDisconnected('Disconnected. You can connect again anytime.');
    }
}

// ===== Scroll to Top =====
class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scrollToTop');
        this.init();
    }

    init() {
        const handleScroll = Utils.throttle(() => {
            if (window.pageYOffset > 500) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);
        
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== Scroll Animations =====
class ScrollAnimations {
    init() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            const delay = el.getAttribute('data-aos-delay');
            if (delay) {
                el.style.transitionDelay = `${delay}ms`;
            }
            
            observer.observe(el);
        });
    }
}

// ===== Performance Monitoring =====
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            domReady: 0,
            firstPaint: 0
        };
    }

    init() {
        window.addEventListener('load', () => {
            this.collectMetrics();
        });
    }

    collectMetrics() {
        if (!window.performance) return;

        const navEntry = performance.getEntriesByType('navigation')[0];

        if (navEntry) {
            this.metrics = {
                loadTime: Math.round(navEntry.loadEventEnd),
                connectTime: Math.round(navEntry.connectEnd - navEntry.connectStart),
                renderTime: Math.round(navEntry.domComplete - navEntry.domInteractive)
            };
            console.log('Performance Metrics:', this.metrics);
            return;
        }

        const timing = performance.timing;
        const loadTime = timing.loadEventEnd > 0
            ? timing.loadEventEnd - timing.navigationStart
            : timing.domComplete - timing.navigationStart;
        const connectTime = timing.responseEnd - timing.requestStart;
        const renderTime = timing.domComplete - timing.domInteractive;

        this.metrics = {
            loadTime: Math.max(0, loadTime),
            connectTime: Math.max(0, connectTime),
            renderTime: Math.max(0, renderTime)
        };

        console.log('Performance Metrics:', this.metrics);
    }
}

// ===== Update Current Year =====
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== App Initialization =====
class App {
    constructor() {
        this.components = {};
    }

    async init() {
        try {
            // Update year
            updateCurrentYear();
            
            // Initialize components
            this.components.preloader = new Preloader();
            this.components.cursor = new CustomCursor();
            this.components.navigation = new Navigation();
            this.components.theme = new ThemeToggle();
            this.components.scrollProgress = new ScrollProgress();
            this.components.typing = new TypingEffect();
            this.components.particles = new ParticlesBackground();
            this.components.stats = new StatsAnimation();
            this.components.skills = new SkillsAnimation();
            this.components.portfolio = new Portfolio();
            this.components.contactForm = new ContactForm();
            this.components.discordAuth = new DiscordAuth();
            this.components.scrollToTop = new ScrollToTop();
            this.components.scrollAnimations = new ScrollAnimations();
            this.components.performanceMonitor = new PerformanceMonitor();
            
            // Initialize particles
            this.components.particles.init();
            
            // Initialize scroll animations
            this.components.scrollAnimations.init();
            
            // Initialize performance monitoring
            this.components.performanceMonitor.init();
            
            console.log('✅ App initialized successfully');
        } catch (error) {
            console.error('❌ App initialization error:', error);
        }
    }
}

// ===== Global Modal Instance =====
let modal;

// ===== DOM Ready =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function initApp() {
    const app = new App();
    app.init();
    
    // Initialize modal globally
    modal = new Modal();
}

// ===== Window Load =====
window.addEventListener('load', () => {
    // Hide preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500);
    }
    
    console.log('✅ Page fully loaded');
});

// ===== Error Handling =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// ===== Export for debugging =====
if (typeof window !== 'undefined') {
    window.Portfolio = {
        version: '2.0',
        components: {}
    };
}
