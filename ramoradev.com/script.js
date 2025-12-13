// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // 1. MOBILE MENU TOGGLE
    // ===========================================
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        });
    }

    // ===========================================
    // 2. NAVBAR SCROLL EFFECT
    // ===========================================
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow');
            } else {
                navbar.classList.remove('shadow');
            }
        });
    }

    // ===========================================
    // 3. HERO CANVAS ANIMATION (Homepage Only)
    // ===========================================
    const canvas = document.getElementById('hero-canvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 60;
        const connectionDistance = 150;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.fillStyle = 'rgba(6, 182, 212, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animateCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < connectionDistance) {
                        const opacity = 0.2 * (1 - distance / connectionDistance);
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateCanvas);
        }

        initParticles();
        animateCanvas();
    }

    
    // ===========================================
    // 5. COUNTER ANIMATION FOR STATS
    // ===========================================
    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        const stats = [
            { id: 'stat-projects', end: 150, suffix: '+' },
            { id: 'stat-clients', end: 50, suffix: '+' },
            { id: 'stat-exp', end: 10, suffix: '+' },
            { id: 'stat-team', end: 25, suffix: '+' }
        ];

        let statsAnimated = false;
        function animateValue(id, start, end, duration, suffix) {
            const obj = document.getElementById(id);
            if (!obj) return;
            const startTime = performance.now();
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                obj.textContent = value + suffix;
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
        }

        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    stats.forEach(stat => animateValue(stat.id, 0, stat.end, 2000, stat.suffix));
                    statsObserver.unobserve(statsSection);
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // ===========================================
    // 6. PORTFOLIO FILTERING
    // ===========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter');
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.classList.remove('hidden');
                        void item.offsetWidth; 
                        item.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ===========================================
    // 7. CONTACT FORM SUBMISSION
    // ===========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const form = e.target;
            const data = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    alert('Thank you! We have received your message and will contact you shortly.');
                    form.reset();
                } else {
                    const jsonData = await response.json();
                    let errorMessage = 'Oops! There was a problem submitting your form.';
                    if (jsonData.errors) errorMessage = jsonData.errors.map(error => error.message).join(", ");
                    alert(errorMessage);
                }
            } catch (error) {
                alert('Error: Could not connect to the server.');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // ===========================================
    // 8. SMOOTH SCROLL FOR ANCHOR LINKS
    // ===========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // ===========================================
    // 9. SERVICE DETAILS PAGE LOGIC
    // ===========================================
    const detailsPageTitle = document.getElementById('page-title');
    if (detailsPageTitle) {
        const servicesDB = {
            'mobile': {
                title: 'Mobile App Development',
                short: 'Native & Cross-Platform Solutions',
                full: 'We craft intuitive and high-performance mobile applications for both iOS and Android platforms. Whether you need a native app for maximum performance or a cross-platform solution for faster time-to-market, our team covers the entire lifecycle from UI/UX design to App Store deployment.',
                tech: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'],
                projects: [
                    { title: 'E-Commerce Pro', desc: 'A shopping app with secure payment integration.' },
                    { title: 'HealthTracker', desc: 'Fitness app connected to wearable devices.' }
                ],
                roles: [
                    { title: "iOS Expert", desc: "Senior Swift developers for Apple ecosystem." },
                    { title: "Android Dev", desc: "Kotlin specialists for scalable Android apps." },
                    { title: "Flutter Dev", desc: "Cross-platform experts for rapid deployment." }
                ]
            },
            'iot': {
                title: 'IoT Solutions',
                short: 'Smart Connected Ecosystems',
                full: 'Our end-to-end IoT services help businesses connect their physical assets to the digital world. We design custom hardware, develop secure firmware, and build cloud dashboards for real-time monitoring and control.',
                tech: ['MQTT', 'AWS IoT', 'Raspberry Pi', 'ESP32', 'Zigbee'],
                projects: [
                    { title: 'Smart Factory', desc: 'Real-time machinery sensor tracking.' },
                    { title: 'AgriSmart', desc: 'Automated irrigation based on soil data.' }
                ],
                roles: [
                    { title: "IoT Architect", desc: "System design, cloud strategy & security." },
                    { title: "Firmware Eng", desc: "Low-level C/C++ coding for sensors." },
                    { title: "PCB Designer", desc: "Hardware schematics and board layout." }
                ]
            },
            'firmware': {
                title: 'Firmware & Hardware',
                short: 'Embedded Intelligence',
                full: 'We specialize in low-level programming for microcontrollers. Our firmware is optimized for low power consumption, high reliability, and real-time performance.',
                tech: ['C/C++', 'FreeRTOS', 'STM32', 'AVR', 'PCB Design'],
                projects: [
                    { title: 'ECG Monitor', desc: 'High-precision medical device firmware.' },
                    { title: 'BMS Logic', desc: 'Battery management for EV packs.' }
                ],
                roles: [
                    { title: "Embedded Eng", desc: "RTOS and bare-metal programming experts." },
                    { title: "Hardware Eng", desc: "Circuit design and component selection." },
                    { title: "Driver Dev", desc: "Low-level peripheral driver development." }
                ]
            },
            'ble': {
                title: 'BLE App Development',
                short: 'Bluetooth Low Energy Experts',
                full: 'We build apps that communicate seamlessly with external hardware, wearables, and sensors using custom GATT profiles. Our expertise ensures stable connectivity and efficient data transfer.',
                tech: ['Bluetooth 5.0', 'GATT', 'Nordic Semi', 'Beacons'],
                projects: [
                    { title: 'Smart Lock', desc: 'Keyless entry using secure tokens.' },
                    { title: 'Beacon Finder', desc: 'Indoor navigation system.' }
                ],
                roles: [
                    { title: "BLE Protocol Expert", desc: "Specialist in GATT profiles & advertising." },
                    { title: "Mobile BLE Dev", desc: "Connecting apps to hardware seamlessly." },
                    { title: "Nordic Dev", desc: "Expertise in nRF52/nRF53 series chips." }
                ]
            },
            'qa': {
                title: 'Quality Assurance',
                short: 'Testing & Validation',
                full: 'Ensure your product is bug-free before launch. We offer both manual and automated testing services to verify functionality, usability, performance, and security across all devices.',
                tech: ['Selenium', 'Appium', 'Jira', 'LoadRunner'],
                projects: [
                    { title: 'Bank App Audit', desc: 'Security penetration testing.' },
                    { title: 'Web Portal', desc: 'Automated UI/UX stress testing.' }
                ],
                roles: [
                    { title: "QA Automation", desc: "Scripting automated test suites." },
                    { title: "Manual Tester", desc: "Detailed bug hunting and reporting." },
                    { title: "Security Analyst", desc: "Penetration testing and vulnerability scans." }
                ]
            },
            'integration': {
                title: 'System Integration',
                short: 'Connecting Technologies',
                full: 'We connect disparate software subsystems and hardware components to function as one cohesive unit. We handle API development, database migration, and legacy system modernization.',
                tech: ['Docker', 'Kubernetes', 'REST APIs', 'GraphQL'],
                projects: [
                    { title: 'ERP Sync', desc: 'SAP to Web inventory synchronization.' },
                    { title: 'Cloud Migration', desc: 'Moving legacy servers to AWS.' }
                ],
                roles: [
                    { title: "Backend Architect", desc: "Designing scalable server infrastructure." },
                    { title: "DevOps Eng", desc: "CI/CD pipelines and cloud management." },
                    { title: "API Specialist", desc: "Building secure and fast REST/GraphQL APIs." }
                ]
            }
        };

        const params = new URLSearchParams(window.location.search);
        const serviceID = params.get('id');
        const data = servicesDB[serviceID];

        if (data) {
            detailsPageTitle.innerText = data.title;
            document.getElementById('page-desc').innerText = data.short;
            document.getElementById('full-description').innerText = data.full;
            document.title = data.title + " | Ramora";

            const techContainer = document.getElementById('tech-container');
            if (techContainer) {
                techContainer.innerHTML = '';
                data.tech.forEach(t => {
                    const badge = document.createElement('span');
                    badge.className = 'tech-badge';
                    badge.innerText = t;
                    techContainer.appendChild(badge);
                });
            }

            const projContainer = document.getElementById('project-container');
            if (projContainer) {
                projContainer.innerHTML = '';
                data.projects.forEach(p => {
                    const card = document.createElement('div');
                    card.className = 'project-mini-card';
                    card.innerHTML = `<h4>${p.title}</h4><p>${p.desc}</p>`;
                    projContainer.appendChild(card);
                });
            }

            // Fill Hire Section (DETAILS PAGE)
            const hireContainer = document.getElementById('hire-grid');
            if (hireContainer && data.roles) {
                hireContainer.innerHTML = '';
                data.roles.forEach(role => {
                    const div = document.createElement('div');
                    div.className = 'hire-card';
                    div.innerHTML = `
                        <h3 class="hire-role">${role.title}</h3>
                        <p class="hire-desc">${role.desc}</p>
                        <a href="index.html#contact" class="btn-hire">Hire Now</a>
                    `;
                    hireContainer.appendChild(div);
                });
            }
        } else {
            detailsPageTitle.innerText = "Service Not Found";
            document.getElementById('page-desc').innerText = "Please return to the home page.";
        }
    }

    // ===========================================
    // 10. HOMEPAGE HIRE TABS LOGIC (WITH IMAGES)
    // ===========================================
    const homeHireContainer = document.getElementById('hire-dynamic-grid');
    const homeHireTabs = document.querySelectorAll('.hire-tab');

    if (homeHireContainer) {
        // Icon URLs (Using DevIcons)
        const icons = {
            apple: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
            android: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
            flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
            java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
            python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            c: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
            arduino: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
            react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            vue: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
            nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
            docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
            linux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
        };

        const hireData = {
            'mobile': [
                { img: icons.apple, title: 'iOS Developer', desc: 'Expert Swift developers for the Apple ecosystem.' },
                { img: icons.android, title: 'Android Developer', desc: 'Kotlin specialists for scalable Android apps.' },
                { img: icons.flutter, title: 'Flutter Developer', desc: 'Cross-platform wizards for rapid deployment.' }
            ],
            'iot': [
                { img: icons.c, title: 'Firmware Engineer', desc: 'Low-level C/C++ coding for STM32 and ESP32.' },
                { img: icons.arduino, title: 'Arduino/Espressif', desc: 'Rapid prototyping for IoT sensors.' },
                { img: icons.python, title: 'IoT Python Dev', desc: 'Edge computing scripts and data processing.' }
            ],
            'backend': [
                { img: icons.java, title: 'Java Developer', desc: 'Robust backend systems using Spring Boot.' },
                { img: icons.python, title: 'Python Django', desc: 'Secure and fast API development.' },
                { img: icons.docker, title: 'DevOps Engineer', desc: 'Containerization and cloud infrastructure.' }
            ],
            'frontend': [
                { img: icons.react, title: 'React Developer', desc: 'Dynamic dashboards for IoT data.' },
                { img: icons.vue, title: 'Vue.js Developer', desc: 'Lightweight interfaces for device management.' }
            ]
        };

        function renderHomeHireCards(category) {
            homeHireContainer.innerHTML = '';
            const roles = hireData[category] || hireData['mobile']; // Fallback
            
            roles.forEach(role => {
                const card = document.createElement('div');
                card.className = 'role-card';
                card.style.animation = 'fadeInUp 0.5s ease-out';
                
                card.innerHTML = `
                    <img src="${role.img}" alt="${role.title}" class="role-icon-img">
                    <h3 class="role-title">${role.title}</h3>
                    <p class="role-desc">${role.desc}</p>
                    <a href="#contact" class="role-link">Hire Now <span>→</span></a>
                `;
                homeHireContainer.appendChild(card);
            });
        }

        // Initialize with first category
        renderHomeHireCards('mobile');

        // Event Listeners
        homeHireTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                homeHireTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderHomeHireCards(tab.getAttribute('data-target'));
            });
        });
    }

    // Dynamic Footer Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});