/**
 * Portfolio Animations - GSAP & AOS Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // 1. Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // 2. GSAP Hero Animations
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    heroTimeline
        .from('.hero .code-badge', { opacity: 0, y: 20, duration: 0.6, delay: 0.2 })
        .from('.hero h1', { opacity: 0, y: 30, duration: 0.8 }, '-=0.4')
        .from('.hero .lead', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
        .from('.hero .btn-group', { opacity: 0, y: 20, duration: 0.6 }, '-=0.6')
        .from('.trust-metrics', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4');

    // 3. Floating Animation for Hero (if illustration exists)
    gsap.to('.float-animation', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // 4. Stagger Reveal removed to ensure visibility


    // 5. Number Counter Animation
    const counters = document.querySelectorAll('.counter-value');
    
    const countUp = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                let startValue = 0;
                let startTime = null;

                const step = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    target.innerText = Math.floor(progress * endValue);
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        target.innerText = endValue;
                    }
                };

                window.requestAnimationFrame(step);
                observer.unobserve(target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(countUp, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // 6. Final CTA Subtle Background Animation (handled in CSS but can be enhanced)

    // 7. Header Scroll Logic
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
