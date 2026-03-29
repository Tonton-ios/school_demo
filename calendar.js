// basic interactive calendar
(function(){
  const calendarEl = document.getElementById('calendar');
  const monthLabel = document.getElementById('monthLabel');
  const prevBtn = document.getElementById('prevMonth');
  const nextBtn = document.getElementById('nextMonth');
  const eventDetails = document.getElementById('eventDetails');
  const parentMeetingsEl = document.getElementById('parentMeetingsList');

  // sample events (day -> description)
  const events = {
    // format YYYY-MM-DD
    '2026-02-14': 'Saint-Valentin celebration',
    '2026-05-01': 'Fête du travail - école fermée',
    '2026-10-31': 'Bal d\u2019Halloween',
  };

  const parentMeetings = [
    { date: '2026-03-20', info: 'Réunion générale des parents, 18h salle polyvalente' },
    { date: '2026-06-15', info: 'Remise de bulletins et rencontre parents-professeurs' }
  ];

  let current = new Date();
  current.setDate(1);

  function renderCalendar(animate){
    if(animate){
      calendarEl.classList.add('fade');
      setTimeout(()=>calendarEl.classList.remove('fade'), 400);
    }
    calendarEl.innerHTML = '';
    const year = current.getFullYear();
    const month = current.getMonth();
    monthLabel.textContent = current.toLocaleString('fr-FR', { month:'long', year:'numeric' });
    monthLabel.classList.add('pulse');
    setTimeout(()=>monthLabel.classList.remove('pulse'),500);

    // determine first day
    const firstDay = new Date(year, month, 1).getDay(); // 0=dimanche
    const daysInMonth = new Date(year, month+1, 0).getDate();

    // fill blanks until firstDay
    for(let i=0;i<firstDay;i++){
      const blank = document.createElement('div');
      calendarEl.appendChild(blank);
    }

    const today = new Date();
    const todayKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;

    for(let d=1; d<=daysInMonth; d++){
      const cell = document.createElement('div');
      cell.className = 'calendar-day';
      const dayNum = document.createElement('div');
      dayNum.className = 'day-number';
      dayNum.textContent = d;
      cell.appendChild(dayNum);
      const key = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      if(events[key]){
        cell.classList.add('event');
        cell.dataset.event = events[key];
      }
      if(key === todayKey){
        cell.classList.add('today');
      }
      cell.addEventListener('click', ()=>{
        if(cell.dataset.event){
          eventDetails.classList.add('fade');
          setTimeout(()=>{
            eventDetails.textContent = `${key} : ${cell.dataset.event}`;
            eventDetails.classList.remove('fade');
          }, 300);
        } else {
          eventDetails.textContent = 'Aucun événement prévu ce jour.';
        }
      });
      calendarEl.appendChild(cell);
    }
  }

  prevBtn.addEventListener('click', ()=>{
    current.setMonth(current.getMonth()-1);
    renderCalendar(true);
  });
  nextBtn.addEventListener('click', ()=>{
    current.setMonth(current.getMonth()+1);
    renderCalendar(true);
  });

  // parent meetings output
  // render meetings as interactive cards
  if(parentMeetings.length){
    parentMeetingsEl.innerHTML = '';
    parentMeetings.forEach(pm=>{
      const card = document.createElement('div');
      card.className = 'meeting-card';
      card.innerHTML = `
        <h4>${pm.date}</h4>
        <p class="meeting-summary">${pm.info.split(',')[0]}</p>
        <div class="meeting-details">${pm.info}</div>
      `;
      card.addEventListener('click', ()=>{
        card.classList.toggle('expanded');
      });
      parentMeetingsEl.appendChild(card);
    });
  } else {
    parentMeetingsEl.innerHTML = '<p>Aucune réunion programmée pour le moment.</p>';
  }

  // logo animation
  const logo = document.querySelector('.logo');
  if(logo){
    logo.classList.add('animate');
  }
  // animate nav items
  document.querySelectorAll('.nav a').forEach((a,i)=>{
    a.style.opacity='0';
    a.classList.add('nav-item-animate');
    a.style.animationDelay=(0.1*i)+'s';
  });

  // hero fade-in
  const heroContent = document.querySelector('.events-hero .hero-content');
  if(heroContent){
    heroContent.style.opacity='0';
    heroContent.style.transform='translateY(20px)';
    setTimeout(()=>{
      heroContent.style.transition='all 0.8s ease';
      heroContent.style.opacity='1';
      heroContent.style.transform='translateY(0)';
    },300);
  }

  renderCalendar();
})();