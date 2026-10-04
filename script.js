/* ==========================================================
   MOHD SUHAIL - PORTFOLIO
   script.js - All interactive functionality
   Theme: Sage Green Nature Professional
   Formspree Integration: https://formspree.io/f/mppwvbzq
   ========================================================== */

// ========== GSAP REGISTER ==========
gsap.registerPlugin(ScrollTrigger);

/* ==========================================================
   1. HERO SECTION ANIMATIONS
   ========================================================== */
gsap.from('.hero-tag', {
    duration: 1,
    y: 60,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.1
});

gsap.from('.hero-content h1', {
    duration: 1.2,
    y: 80,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.3
});

gsap.from('.hero-subtitle', {
    duration: 1,
    y: 60,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.5
});

gsap.from('.hero-content p', {
    duration: 1,
    y: 60,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.7
});

gsap.from('.hero-btns', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.9
});

gsap.from('.hero-avatar', {
    duration: 1.2,
    scale: 0.6,
    opacity: 0,
    ease: 'power3.out',
    delay: 0.6,
    rotate: 15
});

/* ==========================================================
   2. SCROLL REVEAL ANIMATIONS
   ========================================================== */
const revealItems = document.querySelectorAll('.reveal');

revealItems.forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.06
    });
});

/* ==========================================================
   3. HAMBURGER MENU (Mobile)
   ========================================================== */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        }
    });
}

/* ==========================================================
   4. PORTFOLIO VIDEO HOVER PLAY
   ========================================================== */
document.querySelectorAll('.portfolio-thumb video').forEach(vid => {
    vid.addEventListener('mouseenter', () => {
        vid.play().catch(err => console.log('Autoplay blocked:', err));
    });

    vid.addEventListener('mouseleave', () => {
        vid.pause();
        vid.currentTime = 0;
    });
});

/* ==========================================================
   5. CLICK TO FULLSCREEN VIDEO
   ========================================================== */
document.querySelectorAll('.portfolio-thumb video').forEach(vid => {
    vid.addEventListener('click', () => {
        if (vid.requestFullscreen) {
            vid.requestFullscreen();
        } else if (vid.webkitRequestFullscreen) {
            vid.webkitRequestFullscreen();
        } else if (vid.msRequestFullscreen) {
            vid.msRequestFullscreen();
        }
    });
});

/* ==========================================================
   6. CONTACT FORM - FORMSPREE INTEGRATION
   Form ID: https://formspree.io/f/mppwvbzq
   ========================================================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnHTML = submitBtn.innerHTML;

        // Get form values
        const name = this.querySelector('input[name="name"]')?.value.trim() 
                  || this.querySelector('input[type="text"]')?.value.trim();
        const email = this.querySelector('input[name="email"]')?.value.trim() 
                   || this.querySelector('input[type="email"]')?.value.trim();
        const message = this.querySelector('textarea[name="message"]')?.value.trim() 
                     || this.querySelector('textarea')?.value.trim();

        // ========== VALIDATION (Form ke neeche message) ==========
        
        // Check empty fields
        if (!name || !email || !message) {
            showFormMessage(
                'error',
                '⚠️ Please fill in all required fields.'
            );
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage(
                'error',
                '⚠️ Please enter a valid email address.'
            );
            return;
        }

        // ========== LOADING STATE ==========
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';

        try {
            // Send to Formspree
            const formData = new FormData(this);

            const response = await fetch(this.action || 'https://formspree.io/f/mppwvbzq', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // ========== SUCCESS ==========
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #2d4a2b, #7fa06d)';

                showFormMessage(
                    'success',
                    `✅ Thank you ${name}! Your message has been sent. I'll get back to you soon.`
                );

                // Reset form after 2.5 seconds
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalBtnHTML;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.cursor = 'pointer';
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2500);

            } else {
                // Server error
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'Form submission failed');
            }

        } catch (error) {
            // ========== ERROR ==========
            console.error('Form error:', error);

            submitBtn.innerHTML = '<i class="fas fa-times"></i> Failed';
            submitBtn.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';

            showFormMessage(
                'error',
                '❌ Oops! Something went wrong. Please try again or contact me on WhatsApp.'
            );

            // Reset button after 2.5 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnHTML;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2500);
        }
    });

    // ========== REAL-TIME VALIDATION ==========
    // User jab typing kare, toh error message hat jaye
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', () => {
            const existingMsg = document.querySelector('.form-message-error');
            if (existingMsg) {
                existingMsg.style.opacity = '0';
                setTimeout(() => existingMsg.remove(), 300);
            }
        });
    });
}

/* ==========================================================
   FORM MESSAGE HELPER (Single, Clean Version)
   Shows success/error message below the form
   ========================================================== */
function showFormMessage(type, message) {
    // Remove existing message
    const existingMsg = document.querySelector('.form-message');
    if (existingMsg) existingMsg.remove();

    // Create message element
    const msgDiv = document.createElement('div');
    msgDiv.className = `form-message form-message-${type}`;
    msgDiv.textContent = message;

    // Colors based on type
    const styles = {
        success: {
            bg: 'rgba(127, 160, 109, 0.15)',
            color: '#2d4a2b',
            border: '#7fa06d'
        },
        error: {
            bg: 'rgba(220, 53, 69, 0.1)',
            color: '#c82333',
            border: '#dc3545'
        }
    };

    const style = styles[type] || styles.error;

    // Apply inline styles
    msgDiv.style.cssText = `
        margin-top: 1rem;
        padding: 1rem 1.2rem;
        border-radius: 12px;
        font-size: 0.95rem;
        font-weight: 500;
        background: ${style.bg};
        color: ${style.color};
        border-left: 4px solid ${style.border};
        animation: slideDown 0.3s ease;
        transition: opacity 0.3s ease;
        line-height: 1.5;
    `;

    // Insert after form
    contactForm.parentNode.insertBefore(msgDiv, contactForm.nextSibling);

    // Auto remove after 6 seconds (success) or 5 seconds (error)
    const timeout = type === 'success' ? 6000 : 5000;
    setTimeout(() => {
        if (msgDiv.parentNode) {
            msgDiv.style.opacity = '0';
            setTimeout(() => msgDiv.remove(), 300);
        }
    }, timeout);

    // Scroll message into view (smooth)
    setTimeout(() => {
        msgDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/* ==========================================================
   7. SMOOTH SCROLL FOR NAV LINKS
   ========================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;

        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ==========================================================
   8. HEADER SCROLL EFFECT
   ========================================================== */
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 30px rgba(45, 74, 43, 0.1)';
            header.style.padding = '0.8rem 0';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(45, 74, 43, 0.04)';
            header.style.padding = '1rem 0';
        }
    });
}

/* ==========================================================
   9. ACTIVE NAV LINK ON SCROLL
   ========================================================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#nav-menu a');

if (sections.length && navLinks.length) {
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop && 
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/* ==========================================================
   10. LAZY LOAD IMAGES (Fallback for older browsers)
   ========================================================== */
if ('loading' in HTMLImageElement.prototype) {
    console.log('✅ Native lazy loading supported');
} else {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
}

/* ==========================================================
   11. WHATSAPP LINK - Console Log
   ========================================================== */
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('📱 Opening WhatsApp...');
    });
});

/* ==========================================================
   12. CONSOLE MESSAGE
   ========================================================== */
console.log('%c🌿 Portfolio Loaded Successfully!', 
    'color: #2d4a2b; font-size: 16px; font-weight: bold;');
console.log('%cMohd Suhail | 2D Animator & Graphics Designer', 
    'color: #5a6b52; font-size: 12px;');
console.log('%c📧 Suhail@65gmail.com | 📱 +91 8700264519', 
    'color: #5a6b52; font-size: 12px;');
console.log('%c📝 Formspree: Active (mppwvbzq)', 
    'color: #7fa06d; font-size: 11px;');