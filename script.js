/* ==========================================================
   MOHD SUHAIL - PORTFOLIO
   script.js - All interactive functionality
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
    // Play on hover
    vid.addEventListener('mouseenter', () => {
        vid.play().catch(err => console.log('Autoplay blocked:', err));
    });

    // Pause and reset on mouse leave
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
   6. CONTACT FORM HANDLING
   ========================================================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Success message
        alert(`Thank you ${name}! Your message has been received. I'll get back to you soon.`);

        // Reset form
        this.reset();

        /* ==========================================
           NOTE: To make this form actually send emails:
           
           OPTION 1: Use Formspree (Free)
           - Sign up at formspree.io
           - Get your form endpoint
           - Change action in HTML: <form action="https://formspree.io/f/YOUR_ID" method="POST">
           - Remove e.preventDefault();
           
           OPTION 2: Use EmailJS (Free)
           - Sign up at emailjs.com
           - Add EmailJS SDK in HTML
           - Use emailjs.send() in this function
           
           OPTION 3: WordPress Plugin
           - Use Contact Form 7 or WPForms plugin
           ========================================== */
    });
}

/* ==========================================================
   7. SMOOTH SCROLL FOR NAV LINKS
   ========================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if href is just "#"
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

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
        header.style.padding = '0.8rem 0';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.04)';
        header.style.padding = '1rem 0';
    }
});

/* ==========================================================
   9. ACTIVE NAV LINK ON SCROLL (Optional - Highlight current section)
   ========================================================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#nav-menu a');

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

/* ==========================================================
   10. LAZY LOAD IMAGES (Fallback for older browsers)
   ========================================================== */
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading natively
    console.log('✅ Native lazy loading supported');
} else {
    // Fallback: Load all images
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
}

/* ==========================================================
   11. CONSOLE MESSAGE
   ========================================================== */
console.log('%c🎨 Portfolio Loaded Successfully!', 
    'color: #b87333; font-size: 16px; font-weight: bold;');
console.log('%cMohd Suhail | 2D Animator & Graphics Designer', 
    'color: #6b5a4a; font-size: 12px;');
console.log('%c📧 Suhail@65gmail.com | 📱 +91 8700264519', 
    'color: #6b5a4a; font-size: 12px;');