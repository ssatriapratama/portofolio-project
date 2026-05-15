// js/portfolio.js

document.addEventListener('DOMContentLoaded', () => {
    // Portfolio Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Modal Popup Logic for Portfolio & Certificate
    const modal = document.getElementById('item-modal');
    const modalClose = document.querySelector('.modal-close');
    const openModalBtns = document.querySelectorAll('.open-modal');

    if (modal && modalClose) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Populate modal content based on data attributes or specific logic
                const title = btn.getAttribute('data-title');
                const desc = btn.getAttribute('data-desc');
                const img = btn.getAttribute('data-img');
                const tech = btn.getAttribute('data-tech');
                
                if (title) document.getElementById('modal-title').textContent = title;
                if (desc) document.getElementById('modal-desc').innerHTML = desc;
                if (img) document.getElementById('modal-img').src = img;
                
                if (tech) {
                    const techContainer = document.getElementById('modal-tech');
                    if(techContainer){
                        techContainer.innerHTML = '';
                        tech.split(',').forEach(t => {
                            const span = document.createElement('span');
                            span.textContent = t.trim();
                            span.className = 'tech-badge';
                            techContainer.appendChild(span);
                        });
                    }
                }

                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});
