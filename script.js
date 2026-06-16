document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Contacto vía WhatsApp ---------- */
    const botonesContacto = document.querySelectorAll('.btnContacto');
    botonesContacto.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const planSeleccionado = e.target.getAttribute('data-plan');
            const telefono = "524525269616";
            const mensaje = encodeURIComponent(`Hola, estuve revisando el portafolio digital de Lucka Art Design y me encuentro interesado en recibir más información sobre el esquema: ${planSeleccionado}.`);
            window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
        });
    });

    /* ---------- Navbar: estado al hacer scroll ---------- */
    const nav = document.getElementById('siteNav');
    const onScrollNav = () => {
        if (window.scrollY > 24) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScrollNav, { passive: true });
    onScrollNav();

    /* ---------- Comparador Antes / Después ---------- */
    function setStageState(stage, target) {
        const tabs = stage.querySelectorAll('.compare-tab');
        const imgs = stage.querySelectorAll('.compare-img');
        const toggle = stage.querySelector('.compare-toggle');

        tabs.forEach(tab => {
            const active = tab.dataset.target === target;
            tab.classList.toggle('is-active', active);
            tab.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        imgs.forEach(img => {
            img.classList.toggle('is-active', img.dataset.state === target);
        });
        toggle.classList.toggle('is-after', target === 'despues');
    }

    document.querySelectorAll('.compare-stage').forEach(stage => {
        stage.querySelectorAll('.compare-tab').forEach(tab => {
            tab.addEventListener('click', () => setStageState(stage, tab.dataset.target));
        });
    });

    /* Cada vez que el carrusel cambia de caso, reinicia su comparador en "Antes" */
    const carouselEl = document.getElementById('carouselPortafolio');
    if (carouselEl) {
        carouselEl.addEventListener('slide.bs.carousel', (event) => {
            const nextStage = event.relatedTarget ? event.relatedTarget.querySelector('.compare-stage') : null;
            if (nextStage) setStageState(nextStage, 'antes');
        });
    }

    /* ---------- Revelado progresivo al hacer scroll ---------- */
    const elementosReveal = document.querySelectorAll('.reveal');

    const opcionesConfig = {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -20px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, opcionesConfig);

    elementosReveal.forEach(elemento => {
        observer.observe(elemento);
    });

    /* ---------- Paralaje ambiental sutil (solo con mouse e intención de movimiento) ---------- */
    const sphere1 = document.querySelector('.bg-blur-sphere-1');
    const sphere2 = document.querySelector('.bg-blur-sphere-2');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHover = window.matchMedia('(hover: hover)').matches;

    if (sphere1 && sphere2 && !prefersReduced && hasHover) {
        let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

        document.addEventListener('mousemove', (e) => {
            targetX = (e.clientX / window.innerWidth) - 0.5;
            targetY = (e.clientY / window.innerHeight) - 0.5;
        });

        (function animateParallax() {
            currentX += (targetX - currentX) * 0.06;
            currentY += (targetY - currentY) * 0.06;
            sphere1.style.transform = `translate(${currentX * 24}px, ${currentY * 24}px)`;
            sphere2.style.transform = `translate(${currentX * -28}px, ${currentY * -18}px)`;
            requestAnimationFrame(animateParallax);
        })();
    }
});
