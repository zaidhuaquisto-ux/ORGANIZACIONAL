document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const contactTrigger = document.querySelector('.contact-trigger');
    const contactPicker = document.getElementById('contactPicker');
    const contactClose = document.querySelector('.contact-close');
    const revealItems = document.querySelectorAll('.section, .team-member, .info-card, .service-card, .contact-card, .survey-card');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        });

        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Abrir menú');
            });
        });
    }

    if (contactTrigger && contactPicker) {
        const openPicker = () => {
            contactPicker.classList.add('is-open');
            contactPicker.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        const closePicker = () => {
            contactPicker.classList.remove('is-open');
            contactPicker.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        contactTrigger.addEventListener('click', openPicker);

        if (contactClose) {
            contactClose.addEventListener('click', closePicker);
        }

        contactPicker.addEventListener('click', (event) => {
            if (event.target instanceof HTMLElement && event.target.dataset.close === 'true') {
                closePicker();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && contactPicker.classList.contains('is-open')) {
                closePicker();
            }
        });
    }

    revealItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 80}ms`;
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    const sectionMap = [...document.querySelectorAll('main section[id]')];

    const updateActiveLink = () => {
        const scrollPosition = window.scrollY + 140;

        let currentSection = sectionMap[0]?.id;

        sectionMap.forEach((section) => {
            if (scrollPosition >= section.offsetTop) {
                currentSection = section.id;
            }
        });

        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${currentSection}`;
            link.classList.toggle('is-active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink, { passive: true });

    console.log('Página cargada correctamente');
});
