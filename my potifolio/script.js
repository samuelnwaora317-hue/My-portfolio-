/* ================================================
   PROFESSIONAL PORTFOLIO WEBSITE - JAVASCRIPT
   Natalie E. Watson Portfolio
   ================================================ */

/* ================================================
   NAVIGATION SMOOTH SCROLL
   ================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ================================================
   HERO BUTTON SCROLL HANDLERS
   ================================================ */
const scrollToAbout = () => {
  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const scrollToProjects = () => {
  const projectsSection = document.getElementById('projects');
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const scrollToContact = () => {
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/* ================================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ================================================ */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeIn 0.8s ease-in-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  observer.observe(section);
});

/* ================================================
   CONTACT FORM HANDLER
   ================================================ */
const handleContactForm = (e) => {
  if (e) {
    e.preventDefault();
  }

  const form = document.getElementById('contactForm');
  if (!form) {
    console.warn('Contact form not found');
    return;
  }

  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Basic validation
  if (!name || !email || !message) {
    showNotification('Please fill in all fields', 'error');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }

  // Log form data (in production, send to backend)
  console.log('Form Data:', { name, email, message });

  // Show success message
  showNotification('Thank you! I will get back to you soon.', 'success');

  // Reset form
  form.reset();
};

/* ================================================
   NOTIFICATION SYSTEM
   ================================================ */
const showNotification = (message, type = 'success') => {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 2000;
    animation: slideIn 0.3s ease-in-out;
    font-weight: 500;
  `;

  document.body.appendChild(notification);

  // Auto-remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in-out forwards';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
};

/* ================================================
   COPY EMAIL FUNCTION
   ================================================ */
const copyEmail = () => {
  const email = 'samuelnwaora317@gmail.com';
  
  navigator.clipboard.writeText(email).then(() => {
    showNotification('Email copied to clipboard!', 'success');
  }).catch(() => {
    showNotification('Failed to copy email', 'error');
  });
};

/* ================================================
   BACK TO TOP BUTTON
   ================================================ */
const createBackToTopButton = () => {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 999;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
  `;

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      button.style.display = 'flex';
      button.style.alignItems = 'center';
      button.style.justifyContent = 'center';
    } else {
      button.style.display = 'none';
    }
  });

  // Scroll to top on click
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Hover effects
  button.addEventListener('mouseover', () => {
    button.style.transform = 'scale(1.1)';
  });

  button.addEventListener('mouseout', () => {
    button.style.transform = 'scale(1)';
  });

  document.body.appendChild(button);
};

/* ================================================
   PARALLAX EFFECT
   ================================================ */
const applyParallax = () => {
  const heroSection = document.querySelector('.hero');
  
  if (!heroSection) {
    return;
  }

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
  });
};

/* ================================================
   PROJECT CARD INTERACTIONS
   ================================================ */
const initializeProjectCards = () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
};

/* ================================================
   SKILL TAG ANIMATIONS
   ================================================ */
const initializeSkillTags = () => {
  const skillTags = document.querySelectorAll('.skill-tag');
  
  skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1) rotate(2deg)';
    });

    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1) rotate(0)';
    });
  });
};

/* ================================================
   TESTIMONIAL SLIDER
   ================================================ */
const initializeTestimonials = () => {
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  
  testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });
};

/* ================================================
   NAVBAR SCROLL EFFECT
   ================================================ */
const initializeNavbarScroll = () => {
  const navbar = document.querySelector('.navbar');
  
  if (!navbar) {
    return;
  }

  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
    }

    lastScrollY = currentScrollY;
  });
};

/* ================================================
   INITIALIZE ALL FEATURES
   ================================================ */
const initializePortfolio = () => {
  // Check if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

  function initialize() {
    createBackToTopButton();
    applyParallax();
    initializeProjectCards();
    initializeSkillTags();
    initializeTestimonials();
    initializeNavbarScroll();

    // Attach contact form handler if form exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', handleContactForm);
    }

    // Console welcome message
    console.log('%c💼 Welcome to Natalie E. Watson\'s Portfolio', 'color: #667eea; font-size: 1.5rem; font-weight: bold;');
    console.log('%cPowered by Vanilla JavaScript, HTML5, and CSS3', 'color: #764ba2; font-size: 1rem;');
  }
};

/* ================================================
   START INITIALIZATION
   ================================================ */
initializePortfolio();

/* ================================================
   UTILITY FUNCTIONS
   ================================================ */

// Debounce function for performance
const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

// Throttle function for performance
const throttle = (func, delay) => {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

// Check if element is in viewport
const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
