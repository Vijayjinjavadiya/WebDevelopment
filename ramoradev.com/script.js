// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // 1. MOBILE MENU TOGGLE
    // ===========================================
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
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
    // 3. HERO CANVAS ANIMATION (Particles)
    // ===========================================
    const canvas = document.getElementById('hero-canvas');
    
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 60; // Adjust for density
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
                // Bounce off edges
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
                // Draw connections
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
    // 4. COUNTER ANIMATION FOR STATS
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
    // 5. PORTFOLIO FILTERING
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
                        void item.offsetWidth; // Trigger reflow for animation
                        item.style.animation = 'fadeInUp 0.5s ease-out';
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ===========================================
    // 6. CONTACT FORM SUBMISSION
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
    // 7. SMOOTH SCROLL FOR ANCHOR LINKS
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
//   8 SERVICE DETAILS PAGE LOGIC (FIXED)
// ===========================================
 

    // ===========================================
    // 9. HOMEPAGE HIRE TABS LOGIC
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
            const roles = hireData[category] || hireData['mobile']; 
            
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

    // ===========================================
    // 10. PROJECT DETAILS PAGE LOGIC
    // ===========================================
    const projTitle = document.getElementById('proj-title');
    if (projTitle) {
        const projectsDB = {
            'asset-tracking': {
                title: 'Asset Tracking Solution',
                category: 'Industrial IoT',
                subtitle: 'Real-time visibility for high-value logistics and supply chain management.',
                industry: 'Logistics',
                service: 'IoT & Cloud',
                challenge: 'The client faced significant losses due to misplaced cargo and lack of real-time visibility in their supply chain. They needed a rugged, low-power solution to track assets across continents with precise location data.',
                solution: 'We engineered a comprehensive tracking ecosystem using cellular IoT (LTE-M/NB-IoT) and GPS. The solution included custom hardware design optimized for 5-year battery life, and a cloud dashboard for real-time monitoring and geofence alerts.',
                features: ['Global GPS/GLONASS Tracking', '5-Year Battery Life', 'Real-time Cloud Dashboard', 'Tamper Alerts', 'Historical Route Playback', 'API Integration with SAP'],
                tech: ['LTE-M', 'Nordic nRF9160', 'AWS IoT Core', 'React.js', 'PostgreSQL']
            },
            'diver-safety': {
                title: 'Underwater Driver Safety System',
                category: 'Marine Safety',
                subtitle: 'A critical communication backbone for professional underwater operations.',
                industry: 'Marine / Defense',
                service: 'Embedded Systems',
                challenge: 'Communication between surface teams and underwater divers is notoriously difficult due to signal attenuation. The client needed a fail-safe text and telemetry system for divers operating at depths up to 100 meters.',
                solution: 'We developed a proprietary acoustic communication protocol coupled with a wrist-worn diver unit. The system monitors the divers depth, tank pressure, and heart rate, transmitting this data to the surface in real-time via ultrasonic waves.',
                features: ['Ultrasonic Communication', 'Tank Pressure Monitoring', 'SOS Distress Mode', '100m Depth Rating', 'OLED High-Contrast Display', 'Surface Control Station'],
                tech: ['Ultrasonic Transducers', 'STM32 MCU', 'Custom PCB', 'Signal Processing', 'C++']
            },
            'temp-pill': {
                title: 'Ingestible Core Temp Pill',
                category: 'MedTech',
                subtitle: 'Monitoring internal body temperature for athletes and high-risk workers.',
                industry: 'Healthcare / Sports',
                service: 'Bio-Medical IoT',
                challenge: 'Heatstroke is a major risk for firefighters and elite athletes. External thermometers are inaccurate during intense activity. The goal was to create a safe, ingestible sensor to monitor core temperature from within.',
                solution: 'We designed a biocompatible, ingestible capsule containing a micro-sensor and a harmless transmission coil. The pill transmits core body temperature data to an external receiver patch worn on the body as it passes through the digestive tract.',
                features: ['Medical Grade Biocompatibility', '±0.1°C Accuracy', 'Real-time Data Transmission', '24-48 Hour Operational Life', 'Swallowable Form Factor', 'Encrypted Data Link'],
                tech: ['Micro-Electronics', 'Bio-Safe Materials', 'Near Field Communication', 'Low Power RF', 'Medical Compliance']
            },
            'geofence': {
                title: 'Intelligent Geofence System',
                category: 'Asset Tracking',
                subtitle: 'Automated perimeter security and asset movement alerts.',
                industry: 'Construction / Mining',
                service: 'Software Development',
                challenge: 'Managing heavy machinery on large construction sites is chaotic. The client needed to ensure specific vehicles stayed within designated zones and received alerts if they entered restricted areas.',
                solution: 'We built a dynamic polygon geofencing engine. Users can draw complex zones on a map. The on-board hardware checks its GPS coordinates against these zones locally, ensuring sub-second alert latency without relying on server round-trips.',
                features: ['Custom Polygon Zones', 'On-Edge Processing', 'Instant SMS/Email Alerts', 'Driver Behavior Scoring', 'Theft Prevention Mode', 'Fleet Management API'],
                tech: ['Google Maps API', 'Python', 'Firmware Edge Logic', 'GSM Modems', 'Redis']
            },
            'railroad': {
                title: 'Sub-Centimeter Positioning System',
                category: 'Worker Safety',
                subtitle: 'High-precision RTK-GPS solution for Railroad Worker Safety in the UK.',
                industry: 'Transportation',
                service: 'High-Precision IoT',
                challenge: 'Railroad workers are at high risk when working near live tracks. Standard GPS (5-10m accuracy) is not precise enough to determine which track a worker is standing on. The client required centimeter-level accuracy.',
                solution: 'We utilized RTK (Real-Time Kinematic) GNSS technology. By using a base station and rover setup, we achieved <2cm accuracy. The system alerts workers via a wearable if they drift outside the "Safe Zone" of the specific track they are repairing.',
                features: ['< 2cm Positioning Accuracy', 'RTK GNSS Technology', 'Haptic & Audio Alerts', 'Safety Zone Mapping', 'Integrity Monitoring', 'Rugged IP67 Design'],
                tech: ['RTK GNSS Modules', 'LoRaWAN Correction Data', 'Embedded C', 'Safety Critical Firmware', 'GIS Mapping']
            },
            'crab-logger': {
                title: 'Underwater Depth & Temp Logger',
                category: 'Marine Tech',
                subtitle: 'Optimizing crab harvesting yields through environmental data analysis.',
                industry: 'Commercial Fishing',
                service: 'Data Logging Hardware',
                challenge: 'Crab fisherman drop pots blindly, hoping for a catch. They needed data on temperature thermoclines and depth to understand where crabs are migrating to improve harvest efficiency.',
                solution: 'We created a pressure-resistant, puck-sized logger that attaches to crab pots. It automatically wakes up upon submersion, logs depth and temperature every minute, and wirelessly offloads data to the captains tablet when pulled onto the boat.',
                features: ['Automatic Wet/Dry Detection', '2000m Depth Rating', 'Bluetooth Data Offload', '1-Year Battery Life', 'Data Visualization App', 'Extreme Durability'],
                tech: ['Pressure Sensors', 'BLE 5.0', 'Low Power Logging', 'Mobile App (Android)', 'Data Analytics']
            },
            'fishermen-gear': {
                title: 'Fishermen Gear Accountability',
                category: 'Inventory System',
                subtitle: 'RFID-based tracking system to prevent gear loss and ghost fishing.',
                industry: 'Environmental / Fishing',
                service: 'RFID Solutions',
                challenge: 'Lost fishing gear ("ghost gear") is a major financial loss and environmental hazard. The client needed a system to scan gear in and out of the vessel to ensure 100% accountability.',
                solution: 'We implemented a ruggedized UHF RFID system. RFID tags were embedded into ropes and nets. A gantry scanner on the boat automatically tallies gear as it is deployed and retrieved, generating discrepancy reports instantly.',
                features: ['UHF RFID Integration', 'Automated Scanning', 'Cloud Inventory Sync', 'Loss Reporting', 'Regulatory Compliance Logs', 'Offline Mode Support'],
                tech: ['UHF RFID Readers', 'Raspberry Pi Industrial', 'Local Database', 'Sync Algorithm', 'Web Portal']
            },
            'beacon': {
                title: 'Lightweight Asset Beacon',
                category: 'Hardware Design',
                subtitle: 'Miniature tracking beacon with extended battery life for small assets.',
                industry: 'Logistics',
                service: 'Hardware Engineering',
                challenge: 'Standard trackers are too bulky for small tools or packages. The client needed a device smaller than a matchbox that could beacon its location for 3+ years without a battery change.',
                solution: 'We engineered a custom BLE beacon using the nRF52 series. By optimizing the advertising interval and sleep modes, and using a high-density primary cell battery, we achieved the size and power targets.',
                features: ['Coin-Cell Form Factor', '3-Year Battery Life', 'Advertising Only Mode', 'Motion Activation', 'Configurable Power Output', 'IP67 Waterproof'],
                tech: ['Nordic nRF52', 'Altium Designer', 'Power Profiling', 'Injection Molding', 'Bluetooth LE']
            },
            'mtb-timing': {
                title: 'BLE Portable Timing System',
                category: 'Sports Tech',
                subtitle: 'Professional race timing system for mountain bike events.',
                industry: 'Sports',
                service: 'Mobile & BLE',
                challenge: 'Professional timing systems are expensive and heavy. Local MTB clubs needed a cheap, portable, and accurate way to time downhill races using just smartphones.',
                solution: 'We developed "start" and "finish" gates using BLE beams. When a rider breaks the beam, it sends a microsecond-precise timestamp to the paired smartphone app. The app handles rider IDs and calculates results instantly.',
                features: ['Millisecond Precision', 'Wireless Gate Connection', 'CSV Result Export', 'Leaderboard App', 'Portable Battery Power', 'Multi-Rider Support'],
                tech: ['Bluetooth Low Energy', 'IR Beam Sensors', 'iOS/Android App', 'Cloud Sync', 'Real-time Database']
            },
            'lign-light': {
                title: 'Lign Light Oxygen Indicator',
                category: 'Diver Safety',
                subtitle: 'Visual LED-based oxygen partial pressure indicator for rebreather divers.',
                industry: 'Marine / Diving',
                service: 'Embedded Safety',
                challenge: 'Rebreather divers risk oxygen toxicity if levels get too high. Reading a small LCD screen in dark water is hard. They needed an intuitive, "at-a-glance" visual indicator of their oxygen status.',
                solution: 'We created "Lign Light," a heads-up display (HUD) that clips to the dive mask. It uses a color-coded LED sequence (Green = OK, Red = High/Low ppO2) to communicate sensor data directly to the divers peripheral vision.',
                features: ['Heads-Up Display (HUD)', 'Color Coded Alerts', 'Fiber Optic Light Pipe', 'Sensor Integration', 'Fail-Safe Logic', 'Redundant Battery'],
                tech: ['Microchip PIC', 'Analog Sensor Interface', 'LED Control Logic', 'Potting/Sealing', 'Safety Critical Code']
            }
        };

        const params = new URLSearchParams(window.location.search);
        const projectID = params.get('id');
        const projData = projectsDB[projectID];

        if (projData) {
            document.title = projData.title + " | Ramora Portfolio";
            
            // Hero Section
            document.getElementById('proj-category').textContent = projData.category;
            document.getElementById('proj-title').textContent = projData.title;
            document.getElementById('proj-subtitle').textContent = projData.subtitle;

            // Main Content
            document.getElementById('proj-challenge').textContent = projData.challenge;
            document.getElementById('proj-solution').textContent = projData.solution;

            // Features List
            const featureList = document.getElementById('proj-features');
            if(featureList) {
                featureList.innerHTML = '';
                projData.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.className = 'feature-item';
                    li.innerHTML = `<span class="check-icon">✓</span> <span>${feature}</span>`;
                    featureList.appendChild(li);
                });
            }

            // Sidebar Metadata
            document.getElementById('meta-industry').textContent = projData.industry;
            document.getElementById('meta-service').textContent = projData.service;
            
            // Tech Tags
            const techContainer = document.getElementById('meta-tech');
            if(techContainer) {
                techContainer.innerHTML = '';
                projData.tech.forEach(tech => {
                    const span = document.createElement('span');
                    span.className = 'tech-tag';
                    span.textContent = tech;
                    techContainer.appendChild(span);
                });
            }

        } else {
            document.getElementById('proj-title').innerText = "Project Not Found";
            document.getElementById('proj-subtitle').innerText = "Please return to the portfolio page.";
        }
    }
});


document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".service-hero");
    if (!hero) return;
  
    const backgrounds = {
      mobile: "images/OIP.jpeg",
      firmware: "images/firmware.jpg",
      iot: "images/unnamed.jpg",
      ble: "images/ble.jpg"
    };
  
    const params = new URLSearchParams(window.location.search);
    const service = params.get("id");
  
    if (backgrounds[service]) {
      hero.style.background = `
        linear-gradient(rgba(5,22,45,.9), rgba(17,38,69,.9)),
        url('${backgrounds[service]}')
      `;
      hero.style.backgroundSize = "cover";
      hero.style.backgroundPosition = "center";
      hero.style.backdropFilter = "blur(6px)";
    }
  
  });
  