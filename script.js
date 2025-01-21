document.addEventListener('DOMContentLoaded', () => {
    // Modal functionality
    const modal = document.getElementById('contact-modal');
    const contactBtn = document.getElementById('contact-btn');
    const closeBtn = document.querySelector('.close-modal');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const message = document.getElementById('message').value;
            const email = 'jakestevens082@gmail.com';
            const subject = 'Portfolio Contact';
            
            // Open default mail client
            window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
            
            // Close modal after sending
            modal.style.display = 'none';
            contactForm.reset();
        });
    }

    // Handle project tile clicks (on projects page)
    document.querySelectorAll('.project-tile').forEach(tile => {
        const carousel = tile.querySelector('.image-carousel');
        if (!carousel) return;
        
        const images = carousel.querySelectorAll('img');
        let currentImageIndex = 0;

        // Single click for image carousel
        let clickTimer = null;
        tile.addEventListener('click', (e) => {
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                // Single click - cycle through images
                if (images.length > 1) {
                    images[currentImageIndex].style.opacity = '0';
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    images[currentImageIndex].style.opacity = '1';
                }

                // If project is live, navigate to demo
                const demoUrl = tile.dataset.demo;
                if (demoUrl && currentImageIndex === 0) {
                    window.open(demoUrl, '_blank');
                }
            }, 200);
        });

        // Double click for GitHub repository
        tile.addEventListener('dblclick', (e) => {
            clearTimeout(clickTimer);
            const repoUrl = tile.dataset.repo;
            if (repoUrl) {
                window.open(repoUrl, '_blank');
            }
        });
    });

    // Add rocket cursor effect
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2300ff9d"><path d="M12 2.5c0 0-7.5 5.5-7.5 12.5 0 3.5 2.5 6 7.5 6s7.5-2.5 7.5-6c0-7-7.5-12.5-7.5-12.5zm0 18c-3.5 0-5.5-1.5-5.5-4 0-5 4.5-9.5 5.5-10.5 1 1 5.5 5.5 5.5 10.5 0 2.5-2 4-5.5 4z"/></svg>') center/contain no-repeat;
        transform: rotate(-45deg);
    `;
    document.body.appendChild(cursor);

    // Update rocket position
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
    });

    // Hide rocket when mouse leaves window
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
    });
}); 