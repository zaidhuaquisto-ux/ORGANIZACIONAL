document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const contactTrigger = document.querySelector('.contact-trigger');
    const contactPicker = document.getElementById('contactPicker');
    const contactClose = document.querySelector('.contact-close');

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        });

        navMenu.querySelectorAll('a').forEach((link) => {
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
        };

        const closePicker = () => {
            contactPicker.classList.remove('is-open');
            contactPicker.setAttribute('aria-hidden', 'true');
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

    console.log('Página cargada correctamente');
});
