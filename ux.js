// UX scripts: counters, smooth scroll and small entrance animations
document.addEventListener('DOMContentLoaded', ()=>{
  // stats counter
  const counters = document.querySelectorAll('.stat .num');
  function animateCounter(el, end){
    let start = 0; const dur = 1200; const step = Math.ceil(end/(dur/16));
    const id = setInterval(()=>{start += step; if(start>=end){el.textContent = end; clearInterval(id)} else el.textContent = start},16);
  }
  counters.forEach(n=>{
    const val = parseInt(n.textContent.replace('+',''))||0;
    n.textContent = '0';
    const io = new IntersectionObserver(entries=>{
      entries.forEach(en=>{if(en.isIntersecting){animateCounter(n,val);io.disconnect()}})
    },{threshold:0.4});
    io.observe(n);
  });

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href'); if(href.length>1){
        e.preventDefault(); document.querySelector(href)?.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // small fade-in for sections
  document.querySelectorAll('section').forEach(s=>{s.classList.add('fade-in')});

  // animate logo on load
  const logo = document.querySelector('.logo');
  if(logo){
    setTimeout(()=>{logo.classList.add('animate')},350);
  }

  // stagger nav buttons animation
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach((link, idx)=>{
    setTimeout(()=>{link.classList.add('nav-item-animate')}, 450 + idx*80);
  });
});
