// services.js
// Page-specific JS for service-details.html
document.addEventListener('DOMContentLoaded', function () {

    // defensive - run only on the service details page
    const detailsPageTitle = document.getElementById('page-title');
    if (!detailsPageTitle || document.getElementById('proj-title')) return;
  
    /* ===============================
       1) SERVICES DB
    =============================== */
    const servicesDB = {
      mobile: {
        title: 'MOBILE APP DEVELOPMENT SERVICES',
        image: 'images/mobile-app.webp',
        subtitle: 'RAMORA PROVIDES CROSS-PLATFORM APP DEVELOPMENT SERVICES, HELPING BUSINESSES CUT COSTS, ACCELERATE LAUNCHES, AND EXPAND THEIR AUDIENCE.',
        overview: 'Secure, scalable mobile applications built from MVP to production',
        overviewsub: 'Turning ideas into infrastructure',
        process: [
          { title: 'Discovery', desc: 'Requirement gathering & wireframing.' },
          { title: 'UI Design', desc: 'Pixel-perfect mockups & prototyping.' },
          { title: 'Development', desc: 'Agile coding sprints & integration.' },
          { title: 'Launch', desc: 'App Store submission & support.' }
        ],
        tech: ['Swift', 'Kotlin', 'Flutter', 'Firebase', 'REST APIs', 'Figma']
      },
  
      ble: {
        title: 'Bluetooth Low Energy (BLE) Development',
        image: 'images/ble.jpg',
        subtitle: 'Stable BLE communication engineered for performance and power efficiency',
        overview: 'Stable BLE communication engineered for performance and power efficiency',
        overviewsub: 'Smart BLE Communication for Connected Devices',
        process: [
          { title: 'Protocol Design', desc: 'Services & characteristics.' },
          { title: 'Firmware Logic', desc: 'BLE stack coding.' },
          { title: 'App Integration', desc: 'Mobile communication.' },
          { title: 'Testing', desc: 'Battery & range tests.' }
        ],
        tech: ['Nordic nRF52', 'ESP32', 'Bluetooth 5.0', 'GATT']
      },
  
      iot: {
        title: 'Smart IoT Device Development',
        image: 'images/iot.jpg',
        subtitle: 'Complete IoT solutions, including device design and cloud integration.',
        overview: 'Connecting devices. Powering decisions.',
        overviewsub: 'From prototype to production-scale IoT',
        process: [
          { title: 'Concept', desc: 'Use-case analysis & hardware planning.' },
          { title: 'Prototyping', desc: 'Device bring-up & firmware development.' },
          { title: 'Integration', desc: 'Cloud, APIs & data pipelines.' },
          { title: 'Deployment', desc: 'Production rollout & ongoing support.' }
        ],
        tech: ['ESP32', 'Arduino', 'Raspberry Pi', 'BLE', 'MQTT', 'AWS IoT']
      },
  
      firmware: {
        title: 'Embedded Firmware Development',
        image: 'images/firmware_.webp',
        subtitle: 'Dependable firmware solutions for the heart of the connected device.',
        overview: 'Powering devices with stable, secure, production-ready firmware.',
        overviewsub: 'From first build to long-term scale',
        process: [
          { title: 'Architecture', desc: 'MCU & RTOS selection.' },
          { title: 'Drivers', desc: 'Sensor interfacing.' },
          { title: 'Logic', desc: 'Core firmware.' },
          { title: 'Validation', desc: 'Stress testing.' }
        ],
        tech: ['C/C++', 'FreeRTOS', 'STM32', 'ESP-IDF']
      }
    };
  
    /* ===============================
       2) OFFERINGS MAP
    =============================== */
    const serviceOfferingsMap = {
      mobile : [
        {
          title: 'iOS App Development Services',
          desc: 'Ramora Technology delivers high-performance iOS applications using Swift, tailored for startups and enterprises. We build scalable, secure, and responsive apps with native UI, real-time data handling, API integrations, enterprise-grade architecture, plugins, frameworks, serverless backends, and long-term maintenance & support.'
        },
        {
          title: 'Android App Development Services',
          desc: 'We build powerful Android applications focused on speed, scalability, and user experience. Our services include custom Android apps, API & Firebase integration, real-time features, BLE connectivity, performance optimization, testing, migration, and continuous maintenance to keep your app future-ready.'
        },
        {
          title: 'Cross-Platform App Development',
          desc: 'Maximize reach with high-performing cross-platform applications built using Flutter, React Native, and Xamarin. Ramora Technology ensures consistent UI/UX, seamless API integrations, smooth migrations, rigorous testing, monetization strategies, and post-launch support across all platforms.'
        },
        {
          title: 'IoT App Development',
          desc: 'We build intelligent IoT mobile applications that connect devices, users, and data seamlessly. From smart devices to industrial solutions, our apps enable real-time interaction and control.'
        },
        {
          title: 'Mobile UI/UX Design',
          desc: 'We design clean, intuitive, and conversion-focused mobile interfaces with smooth animations and user-first layouts. Our UI/UX approach ensures visual consistency, usability, and engagement across iOS, Android, and cross-platform applications.'
        },
        {
          title: 'Performance Optimization',
          desc: 'Our optimization strategies ensure fast load times, smooth animations, and low memory usage. We implement cold start optimization, code minification & obfuscation, lazy initialization, on-demand feature loading, and continuous performance monitoring.'
        }
      ],
      ble: [
        {
          title: 'BLE Firmware Development',
          desc: 'Ramora Technology develops low-power, production-ready BLE firmware designed for stable, secure, and reliable wireless communication across consumer, industrial, and IoT devices.'
        },
        {
          title: 'Custom GATT Profile Design',
          desc: 'We design and implement optimized GATT services and characteristics tailored to your device use case, ensuring efficient data exchange and predictable BLE behavior.'
        },
        {
          title: 'BLE Mobile App Integration',
          desc: 'Seamless BLE integration between embedded devices and mobile applications, enabling real-time data exchange, device control, and smooth user interaction.'
        },
        {
          title: 'Power Optimization & Energy Tuning',
          desc: 'Advanced power optimization techniques to extend battery life through connection interval tuning, sleep management, and efficient data transmission strategies.'
        },
        {
          title: 'Multi-Device Connectivity & Scalability',
          desc: 'Support for stable multi-device connections, reconnection handling, and scalable BLE architectures designed for real-world deployment scenarios.'
        },
        {
          title: 'BLE Testing, Validation & Certification Support',
          desc: 'Comprehensive BLE testing including range, latency, stability, and interoperability validation to ensure reliable performance across devices and environments.'
        }
      ],      
  
      iot: [
        {
          title: 'End-to-End IoT Solutions',
          desc: 'Ramora Technology delivers complete IoT ecosystems—from device firmware and hardware design to cloud platforms and real-time dashboards. We handle the full lifecycle, ensuring scalability, security, and long-term reliability.'
        },
        {
          title: 'IoT Firmware Integration',
          desc: 'Tailored firmware solutions for diverse IoT devices, enabling reliable connectivity, remote control, efficient data collection, and seamless communication between hardware, mobile apps, and cloud services.'
        },
        {
          title: 'IoT Hardware Design',
          desc: 'From concept to production, we design robust and scalable IoT hardware, including sensor selection, PCB design, power optimization, and manufacturability for real-world deployment.'
        },
        {
          title: 'Mobile Apps for IoT Devices',
          desc: 'We build intuitive mobile applications that allow users to monitor, control, and interact with IoT devices—improving operations, user experience, and unlocking new revenue opportunities.'
        },
        {
          title: 'Cloud Integration & APIs',
          desc: 'Secure cloud integration using AWS, Azure, or custom backends, enabling real-time data ingestion, device management, analytics, and third-party API connectivity.'
        },
        {
          title: 'IoT Dashboards & Analytics',
          desc: 'Custom dashboards that transform raw IoT data into actionable insights with real-time monitoring, alerts, reporting, and performance tracking.'
        },
        {
          title: 'OTA Updates & Device Management',
          desc: 'Remote firmware updates, device provisioning, health monitoring, and fleet management to keep IoT devices secure and up to date.'
        },
        {
          title: 'IoT Security & Encryption',
          desc: 'End-to-end IoT security with encrypted communication, secure authentication, access control, and protection against cyber threats.'
        },
        {
          title: 'Custom IoT Product Development',
          desc: 'Turn your ideas into production-ready IoT products, custom-built to meet specific industry requirements, compliance standards, and business goals.'
        }
      ],
  
      firmware: [
        {
          title: 'Embedded Firmware Development',
          desc: 'Ramora Technology develops production-ready embedded firmware for microcontrollers and SoCs, engineered for stability, performance, and long-term reliability across industrial and consumer devices.'
        },
        {
          title: 'RTOS & Bare-Metal Systems',
          desc: 'We build real-time and bare-metal firmware using industry-proven RTOS platforms, enabling deterministic behavior, efficient task scheduling, and predictable system performance.'
        },
        {
          title: 'Hardware Bring-Up & Board Support',
          desc: 'From first power-on to stable operation, we handle complete hardware bring-up, board support packages, peripheral initialization, and low-level debugging for new designs.'
        },
        {
          title: 'Device Drivers & Peripheral Integration',
          desc: 'Custom driver development and seamless integration of sensors, displays, communication modules, and peripherals to ensure reliable interaction between hardware and software.'
        },
        {
          title: 'Communication Protocol Implementation',
          desc: 'Implementation of standard and custom communication protocols including UART, SPI, I2C, CAN, BLE, and IP-based protocols for reliable device connectivity.'
        },
        {
          title: 'Firmware Optimization & Performance Tuning',
          desc: 'We optimize firmware for faster boot times, reduced memory footprint, lower power consumption, and consistent performance under real-world conditions.'
        },
        {
          title: 'Firmware Testing & Validation',
          desc: 'Comprehensive testing and validation to ensure firmware stability, fault tolerance, and compliance through functional testing, stress testing, and long-duration reliability checks.'
        },
        {
          title: 'OTA Enablement & Lifecycle Support',
          desc: 'Secure over-the-air update mechanisms and long-term firmware support to keep devices up to date, secure, and ready for future enhancements.'
        }
      ]
      
    };
  
    /* ===============================
       3) LIFECYCLE DATA
    =============================== */
    const lifecycleData = {
        mobile: {
          title: 'Mobile App Development Lifecycle',
          color: ['#3b82f6', '#06b6d4'],
          steps: [
            {
              icon: '📊',
              title: 'Planning & Research',
              desc: 'Market research, competitor analysis, feature validation, user personas, and technical feasibility planning.'
            },
            {
              icon: '🎨',
              title: 'UI / UX Design',
              desc: 'User journey mapping, wireframes, interactive prototypes, and pixel-perfect interface design.'
            },
            {
              icon: '⚙️',
              title: 'App Development',
              desc: 'Scalable frontend and backend development using modern frameworks and clean architecture.'
            },
            {
              icon: '🔌',
              title: 'API & Backend Integration',
              desc: 'Secure APIs, authentication, database integration, and third-party service connectivity.'
            },
            {
              icon: '🧪',
              title: 'Testing & Quality Assurance',
              desc: 'Functional testing, performance optimization, security validation, and device compatibility checks.'
            },
            {
              icon: '🚀',
              title: 'Launch & Continuous Support',
              desc: 'App Store deployment, monitoring, analytics integration, and ongoing feature enhancements.'
            }
          ]
        },
      
        ble: {
          title: 'BLE Development Lifecycle',
          color: ['#8b5cf6', '#ec4899'],
          steps: [
            {
              icon: '📡',
              title: 'Use-Case Definition',
              desc: 'Understanding device communication goals, data flow, power constraints, and real-world usage.'
            },
            {
              icon: '🧩',
              title: 'BLE Architecture Design',
              desc: 'Designing GATT services, characteristics, UUIDs, and secure data exchange structure.'
            },
            {
              icon: '🔋',
              title: 'Firmware Development',
              desc: 'Low-power BLE firmware development with optimized connection intervals and sleep cycles.'
            },
            {
              icon: '📱',
              title: 'Mobile App Integration',
              desc: 'Seamless BLE communication between embedded devices and mobile applications.'
            },
            {
              icon: '📈',
              title: 'Testing & Optimization',
              desc: 'Signal strength testing, latency tuning, battery optimization, and multi-device validation.'
            }
          ]
        },
      
        iot: {
          title: 'End-to-End IoT Lifecycle',
          color: ['#22c55e', '#0ea5e9'],
          steps: [
            {
              icon: '💡',
              title: 'INCEPTION: UNDERSTANDING, GATHERING, AND REALIZING THE POSSIBILITY.',
              desc: 'Every IoT journey at Ramora Technology begins with deep understanding. We collaborate closely with clients to define clear objectives, functional requirements, and real-world constraints. Power consumption, device size, cost targets, and scalability are carefully evaluated. Based on feasibility analysis, we finalize functional requirements and build a strategic roadmap for successful IoT development.'
            },
            {
              icon: '🧠',
              title: 'DESIGN: Transforming the Idea into a Circuit Design',
              desc: 'Once requirements are finalized, our engineers translate the concept into a detailed IoT system design. This includes circuit schematics, component selection, software architecture, and connectivity planning. We evaluate multiple technology options to balance cost, battery life, performance, and market readiness—ensuring the design is optimized for real-world deployment.'
            },
            {
              icon: '🛠️',
              title: 'REVIEW: Continuous Evaluation of Design and Functionality',
              desc: 'Design reviews are conducted at every critical stage to ensure long-term reliability and manufacturability. Schematics, layouts, firmware logic, and mechanical aspects are regularly validated to identify risks early. This process improves performance, reduces production costs, and ensures the final product remains stable under demanding conditions.'
            },
            {
              icon: '🌐',
              title: 'IOT PROTOTYPE: Building a Proof of Concept',
              desc: 'We develop a working Proof of Concept that demonstrates how the final IoT product will perform. Using embedded boards, sensors, modules, and custom firmware, we rapidly prototype and iterate. Each version is refined based on form factor, cost-performance balance, and enclosure design—until the prototype meets all functional and business expectations.'
            },
            {
              icon: '☁️',
              title: 'TESTING & VALIDATION: Ensuring Reliability Before Manufacturing',
              desc: 'The validated prototype undergoes rigorous testing under various operating conditions. Electrical parameters, power consumption, thermal behavior, and system stability are thoroughly examined. The device is validated with mobile or web applications and backend servers. Once approved by the client, the design is finalized for manufacturing, along with complete documentation and test reports.'
            },
            {
              icon: '📊',
              title: 'MANUFACTURING: From Prototype to Production',
              desc: 'The approved design is prepared for large-scale manufacturing. PCB fabrication, assembly, stress testing, and defect analysis are performed to ensure consistent quality. Any issues identified during production testing are resolved to deliver a reliable and production-ready IoT product.'
            },
            {
              icon: '🔄',
              title: 'MAINTENANCE: Product Lifecycle Support',
              desc: 'Even after deployment, Ramora Technology continues to support the product throughout its lifecycle. Firmware updates, feature enhancements, performance optimizations, and security patches are delivered through OTA/FOTA mechanisms. This ensures the IoT solution stays secure, scalable, and aligned with evolving technologies and business needs.'
            }
          ]
        },
      
        firmware: {
          title: 'Embedded Firmware Lifecycle',
          color: ['#f59e0b', '#ef4444'],
          steps: [
            {
              icon: '📋',
              title: 'Requirement Analysis',
              desc: 'Understanding hardware constraints, performance goals, timing requirements, and system behavior.'
            },
            {
              icon: '🧠',
              title: 'MCU & Platform Selection',
              desc: 'Selecting microcontrollers, toolchains, RTOS, and peripherals for optimal performance.'
            },
            {
              icon: '🔧',
              title: 'Driver Development',
              desc: 'Low-level drivers for sensors, communication interfaces, and hardware peripherals.'
            },
            {
              icon: '⚙️',
              title: 'Core Firmware Logic',
              desc: 'Business logic implementation, state machines, task scheduling, and error handling.'
            },
            {
              icon: '⏱️',
              title: 'RTOS Integration',
              desc: 'Real-time task management, synchronization, memory optimization, and power control.'
            },
            {
              icon: '✅',
              title: 'Testing & Release',
              desc: 'Stress testing, long-run validation, bug fixing, and production-ready deployment.'
            }
          ]
        }
      };
      
  
    /* ===============================
       4) HELPERS
    =============================== */
    function safeText(id, text) {
      const el = document.getElementById(id);
      if (el) el.textContent = text || '';
    }
  
    function populateProcess(containerId, steps) {
      const container = document.getElementById(containerId);
      if (!container || !Array.isArray(steps)) return;
      container.innerHTML = '';
      steps.forEach((s, i) => {
        container.innerHTML += `
          <div class="process-step">
            <div class="step-number">${i + 1}</div>
            <h4 class="step-title">${s.title}</h4>
            <p class="step-desc">${s.desc}</p>
          </div>`;
      });
    }
  
    function populateOfferings(gridId, offerings, name) {
      const grid = document.getElementById(gridId);
      if (!grid || !Array.isArray(offerings)) return;
      grid.innerHTML = '';
      document.getElementById('serviceName').textContent = name.toUpperCase();
      offerings.forEach((o, i) => {
        grid.innerHTML += `
          <div class="service-card reveal">
            <span class="service-number">${String(i + 1).padStart(2, '0')}.</span>
            <h3>${o.title}</h3>
            <p>${o.desc}</p>
          </div>`;
      });
    }
  
     function renderLifecycle(serviceID) {
      const data = lifecycleData[serviceID];
      if (!data) return;
    
      const title = document.getElementById('lifecycle-title');
      const container = document.getElementById('lifecycle-container');
    
      title.textContent = data.title;
      container.innerHTML = '';
    
      const GAP = 320;          // vertical spacing between cards
      const START = 200;        // starting top offset
    
      data.steps.forEach((step, i) => {
        const side = i % 2 === 0 ? 'left' : 'right';
        const top = START + i * GAP;
    
        container.innerHTML += `
          <div class="lifecycle-step ${side}" style="top:${top}px">
            <div class="step-num"
              style="background:linear-gradient(135deg,${data.color[0]},${data.color[1]})">
              ${i + 1}
            </div>
            <h3>${step.title}</h3>
            <p>${step.desc}</p>
          </div>
        `;
      });
    
      // 🔥 Dynamically grow container & SVG
      const totalHeight = START + data.steps.length * GAP + 200;
      document.querySelector('.lifecycle-inner').style.height = totalHeight + 'px';
      document.querySelector('.lifecycle-path').style.height = totalHeight + 'px';
      container.style.height = totalHeight + 'px';
    
      animateLifecycle();
    }
    
    
    function animateLifecycle() {
      gsap.registerPlugin(ScrollTrigger);
    
      const path = document.querySelector('#flowPath');
      const steps = gsap.utils.toArray('.lifecycle-step');
      const length = path.getTotalLength();

    
      // Draw SVG
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length
      });
    
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: '.lifecycle-inner',
          start: 'top center',
          end: 'bottom bottom',
          scrub: true
        }
      });
    
      // Reveal cards
      steps.forEach(step => {
        gsap.to(step, {
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }
    
          
    function revealOnScroll() {
      document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
          el.classList.add('active');
        }
      });
    }
    window.addEventListener('scroll', revealOnScroll);
  
    /* ===============================
       5) INIT
    =============================== */
    const params = new URLSearchParams(window.location.search);
    const serviceID = params.get('id');
    const data = servicesDB[serviceID];
  
    if (!data) return;
  
    safeText('page-title', data.title);
    safeText('page-subtitle', data.subtitle);
    safeText('overview-text', data.overview);
    safeText('overviewsub-text', data.overviewsub);
  
    const img = document.getElementById('overview-img');
    if (img) {
      img.src = data.image;
      img.alt = data.title;
    }
  
    populateProcess('process-container', data.process);
    populateOfferings('serviceOfferings', serviceOfferingsMap[serviceID], serviceID);
    renderLifecycle(serviceID);
    revealOnScroll();
  });
  