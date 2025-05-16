document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const dropdowns = document.querySelectorAll('.has-dropdown');
    const themeToggle = document.querySelector('.theme-toggle');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');

    // Mobile menu toggle with animation
    navToggle.addEventListener('click', () => {
        navbar.classList.toggle('nav-active');
        
        // Prevent scrolling when menu is open
        if (navbar.classList.contains('nav-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navbar.classList.contains('nav-active')) {
            navbar.classList.remove('nav-active');
            document.body.style.overflow = '';
        }
    });

    // Handle dropdowns on mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        // For mobile: toggle dropdowns on click
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 968) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown && other.classList.contains('active')) {
                        other.classList.remove('active');
                        
                        // Add slide-up animation class
                        const otherDropdown = other.querySelector('.dropdown');
                        otherDropdown.style.animation = 'slideUp 0.3s forwards';
                        
                        // Remove animation class after it completes
                        setTimeout(() => {
                            otherDropdown.style.animation = '';
                        }, 300);
                    }
                });
                
                // Add slide animation for current dropdown
                const currentDropdown = dropdown.querySelector('.dropdown');
                if (dropdown.classList.contains('active')) {
                    currentDropdown.style.animation = 'slideDown 0.3s forwards';
                } else {
                    currentDropdown.style.animation = 'slideUp 0.3s forwards';
                    setTimeout(() => {
                        currentDropdown.style.animation = '';
                    }, 300);
                }
            }
        });
    });

    // Theme toggle with enhanced transitions
    // let isDark = false; // Default dark theme
    
    // themeToggle.addEventListener('click', () => {
    //     isDark = !isDark;
        
    //     if (isDark) {
    //         // Switch to dark theme
    //         transformToTheme(
    //             '#0a0a12', 
    //             '#ffffff', 
    //             'rgba(16, 16, 26, 0.7)', 
    //             'rgba(20, 20, 35, 0.8)'
    //         );
            
    //         // Switch icons
    //         moonIcon.classList.remove('hidden');
    //         sunIcon.classList.add('hidden');
    //     } else {
    //         // Switch to light theme
    //         transformToTheme(
    //             '#ffffff', 
    //             '#0a0a12', 
    //             'rgba(255, 255, 255, 0.8)', 
    //             'rgba(240, 240, 255, 0.9)'
    //         );
            
    //         // Switch icons
    //         moonIcon.classList.add('hidden');
    //         sunIcon.classList.remove('hidden');
    //     }
    // });
    
    // Helper function for smooth theme transition
    function transformToTheme(bgColor, textColor, navBg, dropdownBg) {
        document.documentElement.style.setProperty('--bg-color', bgColor);
        document.documentElement.style.setProperty('--text-color', textColor);
        document.documentElement.style.setProperty('--nav-bg', navBg);
        document.documentElement.style.setProperty('--dropdown-bg', dropdownBg);
        
        // Adjust gradient background and text description color
        if (isDark) {
            document.documentElement.style.setProperty('--gradient-bg', 'linear-gradient(135deg, #0a0a12, #151530)');
            document.documentElement.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.08)');
            document.documentElement.style.setProperty('--text-description', 'rgba(255, 255, 255, 0.7)');
        } else {
            document.documentElement.style.setProperty('--gradient-bg', 'linear-gradient(135deg, #ffffff, #f0f4ff)');
            document.documentElement.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.08)');
            document.documentElement.style.setProperty('--text-description', 'rgba(0, 0, 0, 0.7)');
        }
        
        // Add transition class to body for smooth color changes
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 1000);
    }

    // Enhanced search functionality
    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (searchInput.value.trim()) {
            performSearch(searchInput.value.trim());
        }
    });

    // Handle search on enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
            e.preventDefault();
            performSearch(searchInput.value.trim());
        }
    });
    
    // Animated search focus
    searchInput.addEventListener('focus', () => {
        searchInput.parentElement.classList.add('search-focused');
    });
    
    searchInput.addEventListener('blur', () => {
        searchInput.parentElement.classList.remove('search-focused');
    });
    
    function performSearch(query) {
        // Add your search logic here
        console.log('Searching for:', query);
        
        // Show visual feedback
        searchBtn.classList.add('search-active');
        setTimeout(() => {
            searchBtn.classList.remove('search-active');
        }, 300);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 968) {
            navbar.classList.remove('nav-active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            document.body.style.overflow = '';
        }
    });
    
    // Add scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Inject CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(-10px); }
        }
        
        .search-focused {
            box-shadow: 0 0 0 3px var(--primary-glow) !important;
        }
        
        .search-active {
            animation: pulse 0.3s ease;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        .theme-transition {
            transition: background 0.5s ease, color 0.5s ease;
        }
        
        .scrolled {
            padding: 0.7rem 2rem;
            background: #fff;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        }
        
        @media (max-width: 576px) {
            .scrolled {
                padding: 0.7rem 1rem;
            }
        }
    `;
    document.head.appendChild(style);
});


// Dynamically inject country + flag items 

document.addEventListener('DOMContentLoaded', () => {
  const mbbsCountries = [
   { name: 'Italy', image: 'italy.png' },
  { name: 'Romania', image: 'romania.png' },
  { name: 'Bulgaria', image: 'bulgaria.png' },
  { name: 'Russia', image: 'russia.png' },
  { name: 'Georgia', image: 'georgia.png' },
  { name: 'Kazakhstan', image: 'kazakhstan.png' },
  { name: 'Kyrgyzstan', image: 'kyrgyzstan.png' },
  { name: 'Poland', image: 'poland.png' },
  { name: 'Hungary', image: 'hungary.png' },
  { name: 'Serbia', image: 'serbia.png' }
  ];

  const europeCountries = [
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'France', flag: '🇫🇷' },
    { name: 'Italy', flag: '🇮🇹' },
    { name: 'Spain', flag: '🇪🇸' },
    { name: 'Czech Republic', flag: '🇨🇿' },
    { name: 'Romania', flag: '🇷🇴' },
    { name: 'Latvia', flag: '🇱🇻' },
    { name: 'Lithuania', flag: '🇱🇹' }
  ];

  const asiaCountries = [
    { name: 'India', flag: '🇮🇳' },
    { name: 'China', flag: '🇨🇳' },
    { name: 'Nepal', flag: '🇳🇵' },
    { name: 'Japan', flag: '🇯🇵' },
    { name: 'Sri Lanka', flag: '🇱🇰' },
    { name: 'Malaysia', flag: '🇲🇾' },
    { name: 'Singapore', flag: '🇸🇬' }
  ];

  function populateSubmenu(submenuId, countries) {
    const submenu = document.getElementById(submenuId);
    submenu.innerHTML = '';
    countries.forEach(country => {
      const li = document.createElement('li');
      li.innerHTML = `
    <a href="#">
      <img src="assets/images/flags/${country.image}" alt="${country.name} flag" style="width: 30px; height: 30px; margin-right: 8px; vertical-align: middle;">
      ${country.name}
    </a>
  `;
      submenu.appendChild(li);
    });
  }

  populateSubmenu('mbbs-submenu', mbbsCountries);
  populateSubmenu('europe-submenu', europeCountries);
  populateSubmenu('asia-submenu', asiaCountries);

  const triggers = document.querySelectorAll('.submenu-trigger');
  const submenus = document.querySelectorAll('.submenu');

  triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => {
      // Remove active class from all triggers and submenus
      triggers.forEach(t => t.classList.remove('active'));
      submenus.forEach(s => s.classList.remove('active'));

      // Activate the hovered one
      trigger.classList.add('active');
      const target = document.getElementById(trigger.dataset.target);
      target.classList.add('active');
    });
  });
});


// steps animation effects 
// document.addEventListener('DOMContentLoaded', function() {
//     // Register ScrollTrigger plugin
//     gsap.registerPlugin(ScrollTrigger);
    
//     const stepsSection = document.querySelector('.steps-section');
//     const stepsTrack = document.querySelector('.steps-track');
//     const stepCards = gsap.utils.toArray('.step-card');
//     const stepsImage = document.querySelector('.steps-image img');
    
//     // Set initial state
//     gsap.set(stepCards, { y: 100, opacity: 0 });
//     gsap.set(stepCards[0], { y: 0, opacity: 1 });
    
//     // Create the pin and animation
//     let stepTimeline = gsap.timeline({
//         scrollTrigger: {
//             trigger: '.steps-section',
//             start: 'top top',
//             end: '+=3000',
//             scrub: 1,
//             pin: true,
//             anticipatePin: 1,
//             markers: false // set to true for debugging
//         }
//     });
    
//     // Animate each step card
//     stepCards.forEach((card, index) => {
//         if (index > 0) {
//             // For subsequent cards, animate them in when scrolled to
//             stepTimeline.to(card, {
//                 y: 0,
//                 opacity: 1,
//                 duration: 0.5,
//                 onStart: () => {
//                     // Add active class to current card
//                     card.classList.add('active');
//                     // Remove active class from previous card's content
//                     if (stepCards[index-1]) {
//                         stepCards[index-1].classList.remove('active');
//                     }
//                 },
//                 onReverseComplete: () => {
//                     // Handle reverse scroll
//                     card.classList.remove('active');
//                     if (stepCards[index-1]) {
//                         stepCards[index-1].classList.add('active');
//                     }
//                 }
//             }, index * 0.5);
//         } else {
//             // First card starts active
//             card.classList.add('active');
//         }
//     });
    
//     // Optional: Add image animation
//     stepTimeline.from(stepsImage, {
//         scale: 0.9,
//         opacity: 0.7,
//         duration: 2,
//         ease: "power1.out"
//     }, 0);
    
//     // Click handler for headers (optional)
//     document.querySelectorAll('.step-header').forEach(header => {
//         header.addEventListener('click', function() {
//             const card = this.closest('.step-card');
//             const isActive = card.classList.contains('active');
            
//             // Close all cards first
//             document.querySelectorAll('.step-card').forEach(c => {
//                 c.classList.remove('active');
//             });
            
//             // Open clicked card if it wasn't active
//             if (!isActive) {
//                 card.classList.add('active');
//             }
//         });
//     });
// });


// courses 
const navButtons = document.querySelectorAll('#courseNav button');
  const courseSections = document.querySelectorAll('.course-content');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Hide all course sections
      courseSections.forEach(section => section.classList.remove('active'));

      // Show selected course section
      const target = button.getAttribute('data-target');
      document.getElementById(target).classList.add('active');
    });
  });