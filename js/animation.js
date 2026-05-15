// js/animation.js

document.addEventListener('DOMContentLoaded', () => {
    // Welcome Screen Logic
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) {
        // Hide welcome screen after 2.5 seconds (after typing animation)
        setTimeout(() => {
            welcomeScreen.classList.add('fade-out');
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
            }, 500);
        }, 2500);
    }

    // Scroll Reveal Animation using IntersectionObserver
    const revealElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Page Transition Logic
    const pageTransitionOverlay = document.createElement('div');
    pageTransitionOverlay.className = 'page-transition';
    document.body.appendChild(pageTransitionOverlay);

    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="."] , a[href^="index"], a[href^="profile"], a[href^="experience"], a[href^="portfolio"], a[href^="certificate"], a[href^="contact"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to actual page links, not hash links or blank targets
            if (this.getAttribute('href').startsWith('#') || this.getAttribute('target') === '_blank') return;
            
            e.preventDefault();
            const target = this.href;

            pageTransitionOverlay.classList.add('active');

            setTimeout(() => {
                window.location.href = target;
            }, 500);
        });
    });
});
