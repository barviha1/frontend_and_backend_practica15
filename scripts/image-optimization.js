document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        lazyImages.forEach(img => {
            img.classList.add('loaded');
        });
    }
    function checkRetina() {
        if (window.devicePixelRatio > 1) {
            document.documentElement.classList.add('retina');
        }
    }
    
    checkRetina();
    function preloadCriticalImages() {
        const criticalImages = [
            '../images/121.jpg',
            '../images/1.png',
            '../images/2.svg'
        ];
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    if (navigator.connection && navigator.connection.effectiveType === '4g') {
        preloadCriticalImages();
    }
});