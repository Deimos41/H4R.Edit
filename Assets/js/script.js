
// 1. SELECTORES PRINCIPALES
const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('#mobile-menu');
const navList = document.querySelector('.nav-links');
const cursor = document.querySelector('.cursor');

// 2. LÓGICA DEL MENÚ HAMBURGUESA
// Unificamos el botón para que abra/cierre y anime las barras
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('is-active');
        navList.classList.toggle('active');
    });
}

// Cerrar menú al hacer clic en cualquier enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('is-active');
        navList.classList.remove('active');
    });
});

// 3. SCROLL SUAVE (SMOOTH SCROLL)
// Una sola función para todos los links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// 4. EFECTO NAVBAR AL HACER SCROLL
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 5. CURSOR PERSONALIZADO (Solo PC)
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%, -50%) scale(0.7)');
    document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');

    document.querySelectorAll('a, button, .reel-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '50px';
            cursor.style.height = '50px';
            cursor.style.backgroundColor = 'rgba(255, 60, 60, 0.3)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'rgba(255, 60, 60, 0.1)';
        });
    });
}

// 6. ANIMACIONES DE REVELADO (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reel-card, .step-card, .cta-content, .hero-content').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
});

