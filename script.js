// Enhanced Portfolio JavaScript with Interactive Features
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio Loaded - Ready to showcase my work!");

  // =============================================================================
  // TYPING ANIMATION
  // =============================================================================
  const typingWords = [
    "responsive web applications",
    "efficient Python solutions", 
    "cloud-ready architectures",
    "user-friendly interfaces",
    "scalable software systems",
    "modern digital experiences"
  ];
  
  let currentWordIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const wordPause = 2000;
  
  const typingElement = document.getElementById('typing-words');
  
  function typeWriter() {
    const currentWord = typingWords[currentWordIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, currentCharIndex - 1);
      currentCharIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, currentCharIndex + 1);
      currentCharIndex++;
    }
    
    let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;
    
    if (!isDeleting && currentCharIndex === currentWord.length) {
      typeSpeed = wordPause;
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % typingWords.length;
      typeSpeed = 500;
    }
    
    setTimeout(typeWriter, typeSpeed);
  }
  
  if (typingElement) {
    typeWriter();
  }

  // =============================================================================
  // SMOOTH SCROLL NAVIGATION
  // =============================================================================
  const navLinks = document.querySelectorAll("nav ul li a[href^='#']");
  const header = document.querySelector("header");
  const headerHeight = header ? header.offsetHeight : 80;

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - headerHeight;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
        
        // Close mobile menu if open
        const navLinksContainer = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        if (navLinksContainer && hamburger) {
          navLinksContainer.classList.remove('active');
          hamburger.classList.remove('active');
        }
      }
    });
  });

  // =============================================================================
  // MOBILE NAVIGATION TOGGLE
  // =============================================================================
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  
  if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
    });
  }

  // =============================================================================
  // DARK MODE TOGGLE
  // =============================================================================
  const toggleBtn = document.createElement("button");
  toggleBtn.innerHTML = `<i class="fas fa-moon"></i> Dark Mode`;
  toggleBtn.className = "toggle-btn";
  
  // Add to navigation
  const nav = document.querySelector("nav");
  if (nav) {
    nav.appendChild(toggleBtn);
  }

  // Check for saved dark mode preference or default to light mode
  let darkMode = localStorage.getItem('darkMode') === 'true';
  
  function updateDarkMode() {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      toggleBtn.innerHTML = `<i class="fas fa-sun"></i> Light Mode`;
    } else {
      document.body.classList.remove("dark-theme");
      toggleBtn.innerHTML = `<i class="fas fa-moon"></i> Dark Mode`;
    }
    localStorage.setItem('darkMode', darkMode);
  }
  
  // Initialize dark mode
  updateDarkMode();
  
  toggleBtn.addEventListener("click", () => {
    darkMode = !darkMode;
    updateDarkMode();
    
    // Add a fun animation
    toggleBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      toggleBtn.style.transform = 'scale(1)';
    }, 150);
  });

  // =============================================================================
  // BACK TO TOP BUTTON
  // =============================================================================
  const backToTop = document.createElement("button");
  backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  backToTop.className = "back-to-top";
  backToTop.setAttribute('aria-label', 'Back to top');
  document.body.appendChild(backToTop);

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
    
    // Update header background on scroll
    if (header) {
      if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      }
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // =============================================================================
  // SKILL LEVEL ANIMATIONS
  // =============================================================================
  const skillLevels = document.querySelectorAll('.skill-level');
  
  function animateSkills() {
    skillLevels.forEach(skill => {
      const level = skill.getAttribute('data-level');
      if (level) {
        skill.style.setProperty('--level', level + '%');
      }
    });
  }
  
  // Intersection Observer for skill animations
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkills();
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }

  // =============================================================================
  // SCROLL ANIMATIONS
  // =============================================================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all project cards, timeline items, and other elements
  const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .skill-category, .contact-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // =============================================================================
  // INTERACTIVE PROJECT CARDS
  // =============================================================================
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // =============================================================================
  // CONTACT METHOD INTERACTIONS
  // =============================================================================
  const contactMethods = document.querySelectorAll('.contact-method');
  
  contactMethods.forEach(method => {
    method.addEventListener('click', (e) => {
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(102, 126, 234, 0.3)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.left = e.clientX - method.offsetLeft - 10 + 'px';
      ripple.style.top = e.clientY - method.offsetTop - 10 + 'px';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      
      method.style.position = 'relative';
      method.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // =============================================================================
  // EASTER EGGS AND FUN INTERACTIONS
  // =============================================================================
  
  // Konami Code Easter Egg
  let konamiCode = [];
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  
  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-10); // Keep only last 10 keys
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
      triggerEasterEgg();
    }
  });
  
  function triggerEasterEgg() {
    // Create celebration animation
    const celebration = document.createElement('div');
    celebration.innerHTML = 'You found the secret! Welcome to the developer community!';
    celebration.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(45deg, #667eea, #764ba2);
      color: white;
      padding: 2rem;
      border-radius: 20px;
      font-size: 1.2rem;
      font-weight: bold;
      z-index: 10000;
      animation: celebrationPulse 2s ease-in-out;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
      celebration.remove();
    }, 3000);
  }
  
  // Fun click counter for the logo
  let logoClickCount = 0;
  const logo = document.querySelector('.logo');
  
  if (logo) {
    logo.addEventListener('click', () => {
      logoClickCount++;
      
      if (logoClickCount === 5) {
        logo.style.animation = 'bounce 1s ease-in-out';
        setTimeout(() => {
          logo.style.animation = '';
        }, 1000);
      } else if (logoClickCount === 10) {
        alert('You are really persistent! I appreciate that quality in a developer.');
        logoClickCount = 0;
      }
    });
  }

  // =============================================================================
  // PERFORMANCE MONITORING
  // =============================================================================
  
  // Log performance metrics
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Portfolio loaded in ${pageLoadTime}ms - Performance optimized!`);
    }, 0);
  });

  // =============================================================================
  // CUSTOM CSS ANIMATIONS
  // =============================================================================
  
  // Add custom CSS for ripple and celebration effects
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    @keyframes celebrationPulse {
      0% {
        transform: translate(-50%, -50%) scale(0.5);
        opacity: 0;
      }
      50% {
        transform: translate(-50%, -50%) scale(1.1);
        opacity: 1;
      }
      100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
      }
      40% {
        transform: translateY(-20px);
      }
      60% {
        transform: translateY(-10px);
      }
    }
  `;
  document.head.appendChild(style);

  console.log("All interactive features loaded successfully!");
});
