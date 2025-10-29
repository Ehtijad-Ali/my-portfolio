// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 2000);
});

// Advanced Cursor Effect
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Add hover effect to cursor
const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .blog-card, .soft-skill-card');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Background Music Control
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const soundWave = document.getElementById('soundWave');
let isMusicPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicIcon.className = 'fas fa-play';
        soundWave.classList.remove('playing');
        soundWave.classList.add('paused');
    } else {
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
        musicIcon.className = 'fas fa-pause';
        soundWave.classList.remove('paused');
        soundWave.classList.add('playing');
    }
    isMusicPlaying = !isMusicPlaying;
});

// Sound Effects
const clickSound = document.getElementById('clickSound');
const hoverSound = document.getElementById('hoverSound');

// Add click sound to interactive elements
document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('click', () => {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log('Click sound failed:', e));
    });
});

// Font Animation on Icon Click
document.querySelectorAll('[data-sound]').forEach(element => {
    element.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Play sound
        hoverSound.currentTime = 0;
        hoverSound.play().catch(e => console.log('Hover sound failed:', e));
        
        // Add font animation
        this.classList.add('font-animate');
        
        // Change font temporarily
        const originalFont = this.style.fontFamily;
        const fonts = ['Orbitron', 'Rajdhani', 'Space Grotesk', 'Courier New', 'Arial'];
        const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
        this.style.fontFamily = `'${randomFont}', sans-serif`;
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'var(--gradient-primary)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            this.classList.remove('font-animate');
            this.style.fontFamily = originalFont;
            ripple.remove();
        }, 600);
        
        // Open link after animation
        setTimeout(() => {
            window.open(this.href, '_blank');
        }, 300);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Navigation Link
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth Scrolling
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Typing Effect
const typingTexts = [
    'CREATING INTELLIGENT SYSTEMS',
    'BUILDING AI-POWERED SOLUTIONS',
    'TRANSFORMING DATA INTO INSIGHTS',
    'DEVELOPING MACHINE LEARNING MODELS',
    'INTEGRATING AI WITH WEB TECHNOLOGIES'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeText() {
    const currentText = typingTexts[textIndex];
    const typingElement = document.getElementById('typingText');
    
    if (!isDeleting) {
        typingElement.textContent = currentText.slice(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeText, pauseTime);
            return;
        }
    } else {
        typingElement.textContent = currentText.slice(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
        }
    }
    
    setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
}

typeText();

// Particle Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random colors
        const colors = ['rgba(0, 212, 255, 0.5)', 'rgba(255, 0, 255, 0.5)', 'rgba(0, 255, 136, 0.5)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Scroll Indicator
document.getElementById('scrollIndicator').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
});

// Skills Progress Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const skill = bar.getAttribute('data-skill');
                setTimeout(() => {
                    bar.style.width = skill + '%';
                }, 200);
            });
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.technical-skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Experience Data (Cleaned and Professional)
const experienceData = [
    {
        title: 'DEEP LEARNING ENGINEER',
        company: 'IT DIRECTORATE GILGIT-BALTISTAN',
        period: '2023 - PRESENT',
        description: 'Leading AI initiatives and developing advanced deep learning solutions for government projects.',
        achievements: [
            'Developed AI-powered systems for public service optimization',
            'Implemented deep learning models for data analysis and prediction',
            'Led AI integration initiatives across government departments'
        ]
    },
    {
        title: 'AI AND ML ENGINEER',
        company: 'FREELANCE ON FIVERR',
        period: '2022 - PRESENT',
        description: 'Delivering cutting-edge AI solutions to international clients.',
        achievements: [
            'Completed 25+ AI/ML projects for global clients',
            'Specialized in custom model development and optimization',
            'Provided AI consulting and implementation strategies'
        ]
    },
    {
        title: 'MACHINE LEARNING INTERN',
        company: 'CODE ALPHA',
        period: '2021 - 2022',
        description: 'Gained hands-on experience in applied machine learning and model optimization.',
        achievements: [
            'Developed predictive models for business analytics',
            'Optimized ML algorithms for performance and accuracy',
            'Collaborated on end-to-end ML pipeline development'
        ]
    },
    {
        title: 'AI AND ML INTERN',
        company: 'CLOUDCREDITS TECHNOLOGIES',
        period: '2021',
        description: 'Awarded "Intern of the Month" for outstanding ML project performance.',
        achievements: [
            'Deployed ML models on cloud platforms (AWS, Azure)',
            'Optimized models for cloud performance and cost-efficiency',
            'Implemented MLOps practices for continuous deployment'
        ]
    }
];

// Render Experience Timeline with Correct Left-Right Layout
function renderExperience() {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';
    
    experienceData.forEach((exp, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.setAttribute('data-aos', 'fade-up');
        
        // Create the timeline content
        const timelineContent = document.createElement('div');
        timelineContent.className = 'timeline-content';
        timelineContent.innerHTML = `
            <h3 class="timeline-title">${exp.title}</h3>
            <div class="timeline-company">${exp.company}</div>
            <p class="timeline-description">${exp.description}</p>
            <ul class="timeline-achievements">
                ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
        `;
        
        // Create the timeline dot
        const timelineDot = document.createElement('div');
        timelineDot.className = 'timeline-dot';
        
        // Create the timeline date
        const timelineDate = document.createElement('div');
        timelineDate.className = 'timeline-date';
        timelineDate.textContent = exp.period;
        
        // Apply the alternating layout
        if (index % 2 === 0) {
            // Even index (0, 2): content on left, date on right
            timelineItem.style.flexDirection = 'row';
            timelineItem.appendChild(timelineContent);
            timelineItem.appendChild(timelineDot);
            timelineItem.appendChild(timelineDate);
        } else {
            // Odd index (1, 3): content on right, date on left
            timelineItem.style.flexDirection = 'row-reverse';
            timelineItem.appendChild(timelineDate);
            timelineItem.appendChild(timelineDot);
            timelineItem.appendChild(timelineContent);
        }
        
        timeline.appendChild(timelineItem);
    });
}

renderExperience();

// Blog Posts Data
const blogPosts = [
    {
        id: 1,
        title: 'GB Road Condition Detection Using YOLOv5',
        excerpt: 'A comprehensive guide to implementing YOLOv5 for detecting road conditions in Gilgit, Pakistan. This project addresses the unique challenges of mountainous terrain.',
        date: '2024-01-15',
        readTime: '8 min read',
        category: 'Computer Vision',
        image: 'https://iili.io/K61ZAmJ.jpg',
        link: 'https://medium.com/@ehtyalee1919/object-detection-using-yolov5-detecting-road-conditions-in-gilgit-pakistan-6e62f30cad2e'
    },
    {
        id: 2,
        title: 'Building AI Content Detection Systems',
        excerpt: 'A comprehensive guide to developing cutting-edge AI systems that can detect and classify various types of content with exceptional accuracy.',
        date: '2024-01-10',
        readTime: '10 min read',
        category: 'AI/ML',
        image: 'https://iili.io/K61LlQp.jpg',
        link: 'https://medium.com/@ehtyalee1919/building-ai-content-detection-systems-9f7f1c28fa0b'
    },
    {
        id: 3,
        title: 'Movies Recommendation Systems with Machine Learning',
        excerpt: 'Explore the advanced techniques behind building personalized music recommendation engines using collaborative filtering and deep learning.',
        date: '2024-01-05',
        readTime: '12 min read',
        category: 'Machine Learning',
        image: 'https://iili.io/K61QMoQ.png',
        link: 'https://medium.com/@ehtyalee1919/building-a-movie-recommendation-system-using-machine-learning-f00b33c051ac'
    }
];

// Render Blog Posts
function renderBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    blogGrid.innerHTML = blogPosts.map(post => `
        <div class="blog-card" data-aos="fade-up">
            <img src="${post.image}" alt="${post.title}" class="blog-image">
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-category">${post.category}</span>
                    <span>${post.readTime}</span>
                </div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="${post.link}" target="_blank" class="blog-link">
                    READ MORE <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `).join('');
}

renderBlogPosts();

// Projects Data
const projects = [
    {
        id: 1,
        title: 'AI Content Detection System',
        description: 'Advanced AI system for detecting and classifying various types of content with 99% accuracy using state-of-the-art deep learning models.',
        image: 'https://iili.io/K61LcjR.jpg',
        techStack: ['Python', 'TensorFlow', 'NLP', 'Deep Learning'],
        category: 'ai-ml',
        github: 'https://github.com/Ehtijad-Ali',
        demo: 'https://github.com/Ehtijad-Ali/AI_Content_Detector'
    },
    {
        id: 2,
        title: 'Jarvis Chatbot',
        description: 'Intelligent conversational AI assistant capable of understanding context, learning from interactions, and providing human-like responses.',
        image: 'https://iili.io/K61QWiB.png',
        techStack: ['Python', 'NLP', 'Transformers', 'React'],
        category: 'ai-ml',
        github: 'https://github.com/Ehtijad-Ali',
        demo: 'https://github.com/Ehtijad-Ali/Virtual_Assistant'
    },
    {
        id: 3,
        title: 'AI Music Recommendation Model',
        description: 'Sophisticated machine learning system that analyzes user preferences and listening patterns to recommend personalized music with 95% accuracy.',
        image: 'https://iili.io/K61QEDx.jpg',
        techStack: ['Python', 'Scikit-learn', 'Pandas', 'Spotify API'],
        category: 'ai-ml',
        github: 'https://github.com/Ehtijad-Ali',
        demo: '#'
    },
    {
        id: 4,
        title: 'Data Science Salaries Dashboard',
        description: 'Interactive Tableau dashboard visualizing data science salary trends across different regions, experience levels, and specializations.',
        image: 'https://iili.io/K61QlHu.jpg',
        techStack: ['Tableau', 'Data Visualization', 'Analytics'],
        category: 'data-science',
        tableau: 'https://public.tableau.com/app/profile/ehtijad.ali1919/vizzes',
        demo: 'https://public.tableau.com/app/profile/ehtijad.ali1919/viz/DataScienceSalariesAcrossWorldWide/Dashboard1'
    },
    {
        id: 5,
        title: 'Netflix Data Dashboard',
        description: 'Comprehensive analytics dashboard for Netflix content and user data, providing insights into viewing patterns and content performance.',
        image: 'https://iili.io/K61Qjl1.jpg',
        techStack: ['Tableau', 'Data Analysis', 'Visualization'],
        category: 'data-science',
        tableau: 'https://public.tableau.com/app/profile/ehtijad.ali1919/vizzes',
        demo: 'https://public.tableau.com/app/profile/ehtijad.ali1919/viz/NetflixTvShowsAndMoviesAnalysisDashboard/Dashboard1'
    },
    {
        id: 6,
        title: 'AI Weather Reporter',
        description: 'An AI-powered web app that predicts and analyzes weather patterns using machine learning, offering visual insights and model performance metrics.',
        image: 'https://iili.io/K61QKPI.png',
        techStack: ['Python', 'Flask', 'JavaScript', 'ML Libraries'],
        category: 'web-apps',
        github: 'https://github.com/Ehtijad-Ali',
        demo: 'https://github.com/Ehtijad-Ali/AI-Weather-Reporter'
    }
];

// Render Projects
function renderProjects(filter = 'all') {
    const projectsGrid = document.getElementById('projectsGrid');
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);
    
    projectsGrid.innerHTML = filteredProjects.map(project => {
        // Check if this is a Tableau project
        const isTableauProject = project.techStack.includes('Tableau');
        
        return `
        <div class="project-card" data-aos="fade-up">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${isTableauProject ? 
                        `<a href="${project.tableau}" target="_blank" class="project-link">
                            <svg class="tableau-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.5 12.5c0 1.58-.875 2.95-2.148 3.56.84.38 1.543 1.02 2.003 1.81.459.79.704 1.698.704 2.624C23 22.43 21.43 24 19.494 24c-1.936 0-3.506-1.57-3.506-3.506 0-.926.245-1.834.704-2.624.46-.79 1.163-1.43 2.003-1.81.447-.203.938-.33 1.45-.36.506-.03 1.018.025 1.504.158.486.133.945.342 1.353.618.408.276.76.61 1.042.99.282.38.49.808.618 1.263.128.455.174.93.136 1.403zM12.5 22.5c0 .927-.245 1.835-.704 2.625-.46.79-1.163 1.43-2.003 1.81-.447.203-.938.33-1.45.36-.506.03-1.018-.025-1.504-.158-.486-.133-.945-.342-1.353-.618-.408-.276-.76-.61-1.042-.99-.282-.38-.49-.808-.618-1.263-.128-.455-.174-.93-.136-1.403.038-.474.162-.935.363-1.357.201-.422.474-.797.803-1.106.329-.31.708-.548 1.12-.702.412-.154.848-.22 1.283-.194.435.026.86.13 1.25.303.39.173.74.411 1.032.702.292.291.521.632.674 1.007.153.375.227.776.217 1.18v4.5zm-10 0c0 .927-.245 1.835-.704 2.625-.46.79-1.163 1.43-2.003 1.81-.447.203-.938.33-1.45.36-.506.03-1.018-.025-1.504-.158-.486-.133-.945-.342-1.353-.618-.408-.276-.76-.61-1.042-.99-.282-.38-.49-.808-.618-1.263-.128-.455-.174-.93-.136-1.403.038-.474.162-.935.363-1.357.201-.422.474-.797.803-1.106.329-.31.708-.548 1.12-.702.412-.154.848-.22 1.283-.194.435.026.86.13 1.25.303.39.173.74.411 1.032.702.292.291.521.632.674 1.007.153.375.227.776.217 1.18v4.5z"/>
                            </svg> TABLEAU
                        </a>` :
                        `<a href="${project.github}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i> CODE
                        </a>`
                    }
                    <a href="${project.demo}" class="project-link">
                        <i class="fas fa-external-link-alt"></i> DEMO
                    </a>
                </div>
            </div>
        </div>
    `;
    }).join('');
}

renderProjects();

// Project Filter
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProjects(btn.getAttribute('data-filter'));
    });
});

// Contact Form
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formMessage = document.getElementById('formMessage');
    
    // Simulate form submission
    formMessage.textContent = 'MESSAGE SENT SUCCESSFULLY! I\'LL GET BACK TO YOU SOON.';
    formMessage.className = 'form-message success';
    
    // Play success sound
    hoverSound.currentTime = 0;
    hoverSound.play().catch(e => console.log('Success sound failed:', e));
    
    // Reset form
    e.target.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
});

// Newsletter Form
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Play success sound
    hoverSound.currentTime = 0;
    hoverSound.play().catch(e => console.log('Success sound failed:', e));
    
    alert('THANK YOU FOR SUBSCRIBING TO OUR NEWSLETTER!');
    e.target.reset();
});

// Download CV
document.getElementById('downloadCV').addEventListener('click', (e) => {
    e.preventDefault();
    
    // Play click sound
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log('Click sound failed:', e));
    
    // Simulate CV download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Ehtijad_Ali_CV.pdf';
    link.click();
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Play click sound
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log('Click sound failed:', e));
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinksContainer = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinksContainer.style.display = navLinksContainer.style.display === 'flex' ? 'none' : 'flex';
    navLinksContainer.style.position = 'absolute';
    navLinksContainer.style.top = '100%';
    navLinksContainer.style.left = '0';
    navLinksContainer.style.right = '0';
    navLinksContainer.style.background = 'var(--bg-primary)';
    navLinksContainer.style.flexDirection = 'column';
    navLinksContainer.style.padding = '1rem';
    navLinksContainer.style.boxShadow = 'var(--shadow-lg)';
});

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-related functions here
}, 10));

// Add page visibility API to pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations
        document.querySelectorAll('.particle').forEach(p => {
            p.style.animationPlayState = 'paused';
        });
        
        // Pause music if playing
        if (isMusicPlaying) {
            bgMusic.pause();
        }
        
        // Cancel speech synthesis
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    } else {
        // Resume animations
        document.querySelectorAll('.particle').forEach(p => {
            p.style.animationPlayState = 'running';
        });
        
        // Resume music if it was playing
        if (isMusicPlaying) {
            bgMusic.play().catch(e => console.log('Audio resume failed:', e));
        }
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press 'M' to toggle music
    if (e.key === 'm' || e.key === 'M') {
        musicToggle.click();
    }
    
    // Press 'T' to toggle theme
    if (e.key === 't' || e.key === 'T') {
        themeToggle.click();
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-content');
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});