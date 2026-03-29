document.addEventListener('DOMContentLoaded', function(){
  // Welcome overlay
  const welcome = document.getElementById('welcome');
  if(welcome){
    setTimeout(()=>{
      welcome.style.opacity = '0';
      welcome.style.transition='opacity .6s cubic-bezier(.4,.0,.2,1)';
      setTimeout(()=>welcome.remove(),600);
    }, 1800);
  }

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if(navToggle && nav){
    navToggle.addEventListener('click', ()=>{
      const visible = nav.style.display === 'flex';
      nav.style.display = visible ? 'none' : 'flex';
      navToggle.style.transform = visible ? 'rotate(0deg)' : 'rotate(90deg)';
      navToggle.style.transition = 'transform 0.3s ease';
    });
  }

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply animation to stats and cards
  document.querySelectorAll('.stat, .why-card, .social-card, .info-card, .contact-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = (index * 0.1) + 's';
    observer.observe(el);
  });

  // Contact form
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      
      const button = form.querySelector('.btn-submit');
      const originalText = button.textContent;
      const originalBg = button.style.background;
      
      button.textContent = '✓ Message envoyé !';
      button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      button.disabled = true;
      
      // Reset form
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = originalBg;
        button.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if(href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Hover effect for buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Social cards ripple effect
  document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault();
      
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.position = 'absolute';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.background = 'rgba(255,255,255,0.5)';
      ripple.style.borderRadius = '50%';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple-animation 0.6s ease-out';
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Input field focus animation
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });

  // rule hover/click highlight on info parents page
  document.querySelectorAll('.rules-list li').forEach(li=>{
    li.addEventListener('click', ()=>{
      li.classList.toggle('highlight');
    });
  });

  // Counter animation for stats
  const counters = document.querySelectorAll('.stat .num');
  const speed = 200;

  const countUp = (counter) => {
    const target = parseInt(counter.textContent);
    const increment = target / speed;
    let count = 0;
    
    const updateCount = () => {
      count += increment;
      if(count < target) {
        counter.textContent = Math.floor(count) + (counter.textContent.includes('+') ? '+' : '');
        setTimeout(updateCount, 10);
      } else {
        counter.textContent = counter.dataset.original || counter.textContent;
      }
    };
    
    counter.dataset.original = counter.textContent;
    updateCount();
  };

  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if(entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = true;
        const num = entry.target.querySelector('.num');
        if(num) countUp(num);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
  });
});

// Ripple animation keyframes
if(!document.querySelector('style[data-ripple]')) {
  const style = document.createElement('style');
  style.dataset.ripple = true;
  style.textContent = `
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

