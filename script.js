document.addEventListener('DOMContentLoaded', () => {

    /* Nav scroll state */
    const nav = document.getElementById('siteNav');
    const onScrollNav = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    window.addEventListener('scroll', onScrollNav, { passive: true });
    onScrollNav();

    /* Comparador Antes / Después */
    function setStageState(stage, target) {
        stage.querySelectorAll('.compare-tab').forEach(tab => {
            const active = tab.dataset.target === target;
            tab.classList.toggle('is-active', active);
            tab.setAttribute('aria-selected', String(active));
        });
        stage.querySelectorAll('.compare-img').forEach(img => {
            img.classList.toggle('is-active', img.dataset.state === target);
        });
        stage.querySelector('.compare-toggle').classList.toggle('is-after', target === 'despues');
    }

    document.querySelectorAll('.compare-stage').forEach(stage => {
        stage.querySelectorAll('.compare-tab').forEach(tab => {
            tab.addEventListener('click', () => setStageState(stage, tab.dataset.target));
        });
    });

    const carouselEl = document.getElementById('carouselPortafolio');
    if (carouselEl) {
        carouselEl.addEventListener('slide.bs.carousel', e => {
            const nextStage = e.relatedTarget?.querySelector('.compare-stage');
            if (nextStage) setStageState(nextStage, 'antes');
        });
    }

    /* Scroll reveal */
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.10, rootMargin: '0px 0px -20px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    /* Formulario → WhatsApp */
    document.getElementById('contactForm')?.addEventListener('submit', e => {
        e.preventDefault();
        const name    = document.getElementById('fName').value.trim();
        const biz     = document.getElementById('fBusiness').value.trim();
        const service = document.getElementById('fService').value;
        const msg     = document.getElementById('fMessage').value.trim();
        if (!name) { document.getElementById('fName').focus(); return; }
        const text = `Hola Lucka! Soy ${name}${biz ? ' de ' + biz : ''}. Me interesa: ${service || 'orientación'}. ${msg}`.trim();
        window.open(`https://wa.me/524525269616?text=${encodeURIComponent(text)}`, '_blank');
    });

    /* Botones de plan → WhatsApp */
    document.querySelectorAll('.btnContacto').forEach(btn => {
        btn.addEventListener('click', () => {
            const plan = btn.getAttribute('data-plan');
            const text = `Hola, vi el portafolio de Lucka Art Design y me interesa el plan: ${plan}.`;
            window.open(`https://wa.me/524525269616?text=${encodeURIComponent(text)}`, '_blank');
        });
    });

    /* Paralaje ambiental */
    const sphere1 = document.querySelector('.bg-blur-sphere-1');
    const sphere2 = document.querySelector('.bg-blur-sphere-2');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHover = window.matchMedia('(hover: hover)').matches;

    if (sphere1 && sphere2 && !prefersReduced && hasHover) {
        let tx = 0, ty = 0, cx = 0, cy = 0;
        document.addEventListener('mousemove', e => {
            tx = (e.clientX / window.innerWidth) - 0.5;
            ty = (e.clientY / window.innerHeight) - 0.5;
        });
        (function anim() {
            cx += (tx - cx) * 0.06;
            cy += (ty - cy) * 0.06;
            sphere1.style.transform = `translate(${cx * 24}px, ${cy * 24}px)`;
            sphere2.style.transform = `translate(${cx * -28}px, ${cy * -18}px)`;
            requestAnimationFrame(anim);
        })();
    }
});
