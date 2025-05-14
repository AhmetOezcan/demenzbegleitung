document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.leistungen-slider');
    const container = document.querySelector('.leistungen-container');
    const slides = document.querySelectorAll('.leistung-slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;
    let slideWidth = slider.offsetWidth;
    let autoPlayInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    // Update slide width on window resize
    window.addEventListener('resize', () => {
        slideWidth = slider.offsetWidth;
        updateSliderPosition();
    });

    // Initialize slider
    function initSlider() {
        updateSliderPosition();
        updateDots();
        startAutoPlay();
    }

    // Update slider position
    function updateSliderPosition() {
        container.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    // Update active dot
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentSlide = index;
        updateSliderPosition();
        updateDots();
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSliderPosition();
        updateDots();
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSliderPosition();
        updateDots();
    }

    // Auto play
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }

    // Event Listeners
    prevButton.addEventListener('click', () => {
        prevSlide();
        startAutoPlay(); // Reset auto play timer
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        startAutoPlay(); // Reset auto play timer
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            startAutoPlay(); // Reset auto play timer
        });
    });

    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoPlay();
    });

    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        const difference = touchStartX - touchEndX;
        if (Math.abs(difference) > 50) { // Minimum swipe distance
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoPlay();
    });

    // Pause auto play when hovering over slider
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            startAutoPlay();
        }
    });

    // Initialize the slider
    initSlider();
}); 