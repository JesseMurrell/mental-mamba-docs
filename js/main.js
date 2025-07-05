
// Mental Mamba - Vanilla JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mental Mamba website loaded successfully!');
    
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Snake demo animation
    function animateSnakeDemo() {
        const snakeSegments = document.querySelectorAll('.snake-segment');
        const food = document.querySelector('.food');
        
        if (snakeSegments.length > 0 && food) {
            let position = 0;
            
            setInterval(() => {
                position = (position + 20) % 160;
                
                snakeSegments.forEach((segment, index) => {
                    const offset = index * 20;
                    segment.style.left = `${80 + position - offset}px`;
                });
                
                // Move food randomly occasionally
                if (Math.random() < 0.1) {
                    const randomX = Math.floor(Math.random() * 160) + 20;
                    const randomY = Math.floor(Math.random() * 160) + 20;
                    food.style.left = `${randomX}px`;
                    food.style.top = `${randomY}px`;
                }
            }, 500);
        }
    }
    
    // Start snake demo animation
    animateSnakeDemo();
    
    // Add glow effect to buttons on hover
    const buttons = document.querySelectorAll('.btn, .download-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('disabled')) {
                this.style.filter = 'brightness(1.1)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe feature cards for animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Console easter egg for developers
    console.log(`
    🐍 Mental Mamba Developer Console 🐍
    
    Welcome to the Mental Mamba website!
    This site is built with pure HTML, CSS, and vanilla JavaScript.
    
    Game Features:
    - Snake gameplay with math challenges
    - Global leaderboards
    - Heart-based lives system
    - Multiple difficulty levels
    
    Contact: support@mentalmamba.com
    `);
});

// Utility function for future features
function showToast(message, type = 'info') {
    console.log(`Toast: ${message} (${type})`);
    // Could be extended to show actual toast notifications
}

// Export for potential future use
window.MentalMamba = {
    showToast: showToast,
    version: '1.0.0'
};
