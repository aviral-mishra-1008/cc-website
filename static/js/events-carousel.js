/**
 * Events Carousel - Animated Image Slider
 * CC Club Landing Page
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEventsCarousel);
    } else {
        initEventsCarousel();
    }

    function initEventsCarousel() {
        const imageContainer = document.getElementById('eventsImageContainer');
        const textContent = document.getElementById('eventsTextContent');
        const nameEl = document.getElementById('eventName');
        const designationEl = document.getElementById('eventDesignation');
        const quoteEl = document.getElementById('eventQuote');
        const prevBtn = document.getElementById('eventPrevBtn');
        const nextBtn = document.getElementById('eventNextBtn');

        if (!imageContainer || !textContent) return; // Exit if elements don't exist

        // Events data will be injected from the template
        const eventsData = window.eventsCarouselData || [];

        if (eventsData.length === 0) return;

        let active = 0;
        let images = [];

        function randomRotate() {
            return Math.floor(Math.random() * 21) - 10;
        }

        function createImages() {
            eventsData.forEach((event, index) => {
                const img = document.createElement('img');
                img.src = event.image;
                img.alt = event.name;
                img.className = 'event-image';
                img.draggable = false;
                imageContainer.appendChild(img);
                images.push(img);
            });
        }

        function updateImages() {
            images.forEach((img, index) => {
                const isActive = index === active;
                img.style.opacity = isActive ? '1' : '0.7';
                img.style.scale = isActive ? '1' : '0.95';
                img.style.zIndex = isActive ? '40' : (eventsData.length + 2 - index);
                img.style.transform = isActive ?
                    'translateZ(0) rotate(0deg)' :
                    `translateZ(-100px) rotate(${randomRotate()}deg)`;
            });
        }

        function animateText(text) {
            const words = text.split(' ');
            quoteEl.innerHTML = '';

            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word + '\u00A0';
                span.style.animationDelay = `${0.02 * index}s`;
                quoteEl.appendChild(span);
            });
        }

        function updateContent() {
            textContent.style.animation = 'none';
            setTimeout(() => {
                textContent.style.animation = '';
                nameEl.textContent = eventsData[active].name;
                designationEl.textContent = eventsData[active].type;
                animateText(eventsData[active].description);
            }, 10);
        }

        function handleNext() {
            active = (active + 1) % eventsData.length;
            updateImages();
            updateContent();
        }

        function handlePrev() {
            active = (active - 1 + eventsData.length) % eventsData.length;
            updateImages();
            updateContent();
        }

        // Event listeners
        if (prevBtn) prevBtn.addEventListener('click', handlePrev);
        if (nextBtn) nextBtn.addEventListener('click', handleNext);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') handlePrev();
            else if (e.key === 'ArrowRight') handleNext();
        });

        // Initialize
        createImages();
        updateImages();
        updateContent();

        // Autoplay every 5 seconds
        setInterval(handleNext, 5000);
    }
})();
