// Initialize AOS
AOS.init({
    once: true,
    easing: 'ease-out-cubic',
    offset: 80
});

// Initialize Lucide icons
lucide.createIcons();

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Animate skill bars on scroll
const skillFills = document.querySelectorAll('.skill-fill');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.style.getPropertyValue('--fill');
        }
    });
}, { threshold: 0.5 });

skillFills.forEach(fill => {
    fill.style.width = '0%';
    observer.observe(fill);
});

// Testimonials drag-to-scroll
const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
if (testimonialsWrapper) {
    const track = testimonialsWrapper.querySelector('.testimonials-track');
    let isDragging = false;
    let startX;
    let scrollLeft;

    testimonialsWrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        testimonialsWrapper.classList.add('is-dragging');
        startX = e.pageX - testimonialsWrapper.offsetLeft;
        scrollLeft = testimonialsWrapper.scrollLeft;
    });

    testimonialsWrapper.addEventListener('mouseleave', () => {
        isDragging = false;
        testimonialsWrapper.classList.remove('is-dragging');
    });

    testimonialsWrapper.addEventListener('mouseup', () => {
        isDragging = false;
        testimonialsWrapper.classList.remove('is-dragging');
    });

    testimonialsWrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - testimonialsWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        testimonialsWrapper.scrollLeft = scrollLeft - walk;
    });

    // Touch support for mobile
    testimonialsWrapper.addEventListener('touchstart', (e) => {
        isDragging = true;
        testimonialsWrapper.classList.add('is-dragging');
        startX = e.touches[0].pageX - testimonialsWrapper.offsetLeft;
        scrollLeft = testimonialsWrapper.scrollLeft;
    }, { passive: true });

    testimonialsWrapper.addEventListener('touchend', () => {
        isDragging = false;
        testimonialsWrapper.classList.remove('is-dragging');
    });

    testimonialsWrapper.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - testimonialsWrapper.offsetLeft;
        const walk = (x - startX) * 2;
        testimonialsWrapper.scrollLeft = scrollLeft - walk;
    }, { passive: true });
}
