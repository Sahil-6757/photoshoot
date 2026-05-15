document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Update active link
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                if (this.closest('.nav-links')) {
                    this.classList.add('active');
                }

                // Close mobile menu if open
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Simple scroll spy to update active nav link
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Testimonial Slider
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('sliderDots');

    if (track && dotsContainer) {
        const cards = Array.from(track.children);
        let currentIndex = 0;
        let cardsPerView = 3;

        const updateCardsPerView = () => {
            if (window.innerWidth <= 768) {
                cardsPerView = 1;
            } else if (window.innerWidth <= 992) {
                cardsPerView = 2;
            } else {
                cardsPerView = 3;
            }
        };

        const initSlider = () => {
            updateCardsPerView();
            const totalDots = Math.max(1, cards.length - cardsPerView + 1);

            // Generate dots
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.dataset.index = i;

                dot.addEventListener('click', () => {
                    goToSlide(i);
                });

                dotsContainer.appendChild(dot);
            }

            // Reset position if out of bounds
            if (currentIndex >= totalDots) {
                currentIndex = totalDots - 1;
            }
            goToSlide(currentIndex);
        };

        const goToSlide = (index) => {
            updateCardsPerView();
            const totalDots = Math.max(1, cards.length - cardsPerView + 1);
            if (index < 0) index = 0;
            if (index >= totalDots) index = totalDots - 1;

            currentIndex = index;

            // Update dots
            Array.from(dotsContainer.children).forEach((dot, i) => {
                if (i === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });

            // Move track
            const cardWidth = cards[0].offsetWidth;
            const gap = 30; // matches CSS gap
            const moveAmount = currentIndex * (cardWidth + gap);
            track.style.transform = `translateX(-${moveAmount}px)`;
        };

        // Initialize and handle resize
        initSlider();

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                initSlider();
            }, 250);
        });

        // Auto play
        setInterval(() => {
            updateCardsPerView();
            const totalDots = Math.max(1, cards.length - cardsPerView + 1);
            let nextIndex = currentIndex + 1;
            if (nextIndex >= totalDots) {
                nextIndex = 0;
            }
            goToSlide(nextIndex);
        }, 5000);
    }
});

let book_creater = document.getElementById("book_creater");
book_creater.addEventListener("click", () => {
    location.href = "./enquiry.html";
});