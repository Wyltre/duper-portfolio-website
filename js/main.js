/*
* Duper Portfolio Website JavaScript
* Author: Wyltre
* Version: 1.0
*/

// DOM Elements
const preloader = document.querySelector('.preloader');
const header = document.querySelector('.header');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');
const themeToggle = document.querySelector('.theme-toggle');
const backToTop = document.querySelector('.back-to-top');
const skillBars = document.querySelectorAll('.skill-progress');
const projectCards = document.querySelectorAll('.project-card');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectModal = document.querySelector('.project-modal');
const closeModal = document.querySelector('.close-modal');
const modalContent = document.getElementById('modal-content');
const projectLinks = document.querySelectorAll('.project-card');
const body = document.body;

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('fade-out');
        
        // Initialize animations after preloader
        initTyped();
        initParticles();
        animateSkillBars();
        
        // Add loaded class to body after preloader disappears
        setTimeout(() => {
            document.body.classList.add('loaded');
            animateOnScroll();
        }, 500);
    }, 1500);
});

// Particles.js Configuration
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#748CAB'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#748CAB',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
}

// Typed.js Initialization
function initTyped() {
    new Typed('#typed', {
        strings: [
            'Frontend Developer',
            'API Designer',
            'Chrome Extension Developer',
            'Web Developer'
        ],
        typeSpeed: 70,
        backSpeed: 50,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        smartBackspace: true
    });
}

// Mobile Navigation
burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');
    
    // Toggle Burger Animation
    burger.classList.toggle('toggle');
    
    // Animate Links
    navItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            navItems.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/Hide Back to Top Button
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
    
    // Call animation on scroll function
    animateOnScroll();
});

// Dark/Light Theme Toggle
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    
    // Change icon based on theme
    if (body.classList.contains('light-theme')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    // Store theme preference in localStorage
    if (body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Animate skill bars on scroll
function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Animate elements when they come into view
function animateOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    
    // Animate project cards
    projectCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        
        if (cardTop < triggerBottom) {
            card.classList.add('animate');
        }
    });
    
    // Animate any element with .lazy-load class
    const lazyElements = document.querySelectorAll('.lazy-load');
    lazyElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('loaded');
        }
    });
}

// Project Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(filterBtn => {
            filterBtn.classList.remove('active');
        });
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            // İlk olarak tüm kartların görünürlüğünü resetle
            card.classList.remove('animate');
            
            // Geçiş efekti için küçük bir gecikme
            setTimeout(() => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    // Eşleşen kartları göster
                    card.style.display = 'block';
                    
                    // Küçük bir gecikme ile animasyonu ekle
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, 50);
                } else {
                    // Eşleşmeyen kartları gizle
                    card.style.display = 'none';
                }
            }, 100);
        });
    });
});

// Project Modal
projectLinks.forEach(card => {
    card.addEventListener('click', (e) => {
        // Only open modal if clicked on the card but not on the external links
        if (!e.target.closest('.project-links')) {
            const title = card.querySelector('.project-title').textContent;
            const description = card.querySelector('.project-description').textContent;
            const image = card.querySelector('.project-img img').src;
            const tags = card.querySelector('.project-tags').innerHTML;
            const category = card.getAttribute('data-category');
            
            // Kategoriye göre daha spesifik detaylar ekle
            let additionalDetails = '';
            let customFeatures = '';
            
            if (category === 'api') {
                additionalDetails = 'Bu API projesi geliştirici dostu bir arayüz ve güçlü performans sunuyor. Tüm ülke kodlarını içeren kapsamlı bir veri seti ile çalışıyor.';
                customFeatures = `
                    <li>250+ ülke kodu desteği</li>
                    <li>Farklı piksel boyutunda bayraklar (64, 48, 32, 16px)</li>
                    <li>Düz ve parlak stil seçenekleri</li>
                    <li>Hızlı yanıt süresi</li>
                    <li>Kolay entegrasyon</li>
                `;
            } else if (category === 'extension') {
                additionalDetails = 'Bu Chrome uzantısı, düzenli bağlantılarınıza hızlı erişim sağlamak için tasarlanmıştır. Kullanıcı dostu arayüzü ile favori sitelerinize anında erişin.';
                customFeatures = `
                    <li>Ctrl+Shift+E klavye kısayolu</li>
                    <li>Bağlantıları kategorilere ayırma</li>
                    <li>Özelleştirilebilir arayüz</li>
                    <li>Hızlı erişim menüsü</li>
                    <li>Tarayıcı senkronizasyonu</li>
                `;
            } else {
                additionalDetails = 'Bu proje modern web teknolojileri kullanılarak geliştirilmiştir. Kullanıcı deneyimi ön planda tutularak tasarlanan bu çalışma, performans ve estetik açısından optimize edilmiştir.';
                customFeatures = `
                    <li>Responsive tasarım</li>
                    <li>Modern UI/UX</li>
                    <li>Performans optimizasyonu</li>
                    <li>SEO dostu yapı</li>
                `;
            }
            
            modalContent.innerHTML = `
                <div class="modal-image">
                    <img src="${image}" alt="${title}">
                </div>
                <div class="modal-details">
                    <h2>${title}</h2>
                    <div class="modal-tags">${tags}</div>
                    <p><strong>Özet:</strong> ${description}</p>
                    <p>${additionalDetails}</p>
                    <div class="modal-features">
                        <h3>Özellikler</h3>
                        <ul>
                            ${customFeatures}
                        </ul>
                    </div>
                </div>
            `;
            
            projectModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close Modal
closeModal.addEventListener('click', () => {
    projectModal.classList.remove('open');
    document.body.style.overflow = 'auto';
});

// Close Modal on Outside Click
projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        projectModal.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple form validation
        if (name && email && subject && message) {
            // Here you would typically send the data to a server
            // For demo purposes, we'll just log it and show a success message
            console.log({ name, email, subject, message });
            
            // Reset form
            contactForm.reset();
            
            // Show success message (you could enhance this with a proper notification)
            alert('Mesajınız gönderildi! Teşekkürler.');
        } else {
            alert('Lütfen tüm alanları doldurun.');
        }
    });
}

// Create img directory structure if needed for showing images
function checkDirectoryStructure() {
    console.log('Note: Make sure to create the following directories for images:');
    console.log('- img/ (Main images directory)');
    console.log('- img/projects/ (Project images directory)');
    console.log('- Add profile.jpg in img/ directory (300x300px)');
    console.log('- Add project1.jpg (Flags API image - 600x400px) in img/projects/ directory');
    console.log('- Add project2.jpg (WLink image - 600x400px) in img/projects/ directory');
}

// Initialize on document ready
document.addEventListener('DOMContentLoaded', () => {
    checkDirectoryStructure();
    
    // Sayfa yüklendiğinde tüm proje kartlarını görünür yap
    setTimeout(() => {
        projectCards.forEach(card => {
            card.classList.add('animate');
        });
    }, 1000); // Preloader'dan sonra göster
    
    // Parallax scroll effect
    document.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Apply parallax effect to background elements
        document.querySelectorAll('.parallax').forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
}); 