document.addEventListener('DOMContentLoaded', function(){
  const jobs = [
    { id:1, title: 'Enseignant(e) Français', location: 'Paris', desc: 'Enseignement du français du primaire au secondaire. Expérience demandée.' },
    { id:2, title: 'Professeur de Sport', location: 'Paris', desc: 'Encadrement des activités sportives, EPS.' },
    { id:3, title: 'Assistant(e) administratif(ve)', location: 'Bureau', desc: 'Gestion administrative et accueil des familles.' }
  ];

  const grid = document.getElementById('jobsGrid');
  const modal = document.getElementById('jobModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const applyForm = document.getElementById('applyForm');
  const closeBtn = modal.querySelector('.modal-close');

  function openModal(job){
    modal.setAttribute('aria-hidden','false');
    modal.classList.add('open');
    modalTitle.textContent = job.title + ' — ' + job.location;
    modalDesc.textContent = job.desc;
    applyForm.dataset.jobId = job.id;
    // focus first input shortly after opening for accessibility
    setTimeout(()=>{
      const first = applyForm.querySelector('input, textarea, select');
      if(first) first.focus();
    }, 120);
  }

  function closeModal(){
    modal.setAttribute('aria-hidden','true');
    modal.classList.remove('open');
  }

  function renderJobs(){
    grid.innerHTML = '';
    jobs.forEach(job=>{
      const card = document.createElement('div');
      card.className = 'job-card';
      card.innerHTML = `
        <h4>${job.title}</h4>
        <div class="job-location">${job.location}</div>
        <p class="job-desc">${job.desc}</p>
        <div class="job-actions"><button class="btn btn-apply">Postuler ici</button></div>
      `;
      card.querySelector('.btn-apply').addEventListener('click', ()=>openModal(job));
      grid.appendChild(card);
    });
  }

  renderJobs();

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeModal(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape' && modal.classList.contains('open')) closeModal(); });

  applyForm.addEventListener('submit', function(e){
    e.preventDefault();
    const jobId = applyForm.dataset.jobId;
    const formData = new FormData(applyForm);
    const payload = {
      jobId,
      jobTitle: modalTitle.textContent,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      sentAt: new Date().toISOString()
    };
    // persist to localStorage as a simple simulation
    const stored = JSON.parse(localStorage.getItem('imsf_applications') || '[]');
    stored.push(payload);
    localStorage.setItem('imsf_applications', JSON.stringify(stored));

    // build email content and open Gmail compose (opens new tab)
    const schoolEmail = 'contact@imsf.tn';
    const subject = `Candidature: ${payload.jobTitle} — ${payload.name}`;
    const bodyLines = [
      'Bonjour,',
      '',
      `Je souhaite postuler au poste: ${payload.jobTitle}`,
      '',
      `Nom: ${payload.name}`,
      `Email: ${payload.email}`,
      `Téléphone: ${payload.phone}`,
      '',
      'Message:',
      payload.message || '(Aucun message)',
      '',
      'Cordialement,',
      payload.name
    ];
    const body = bodyLines.join('\n');

    const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1'
      + `&to=${encodeURIComponent(schoolEmail)}`
      + `&su=${encodeURIComponent(subject)}`
      + `&body=${encodeURIComponent(body)}`;

    // attempt to open Gmail compose in a new tab; fall back to mailto if blocked
    const win = window.open(gmailUrl, '_blank');
    if(!win){
      // fallback to mailto
      const mailto = `mailto:${encodeURIComponent(schoolEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    }

    // show inline confirmation so user knows action occurred
    let confirmation = applyForm.parentNode.querySelector('.apply-confirm');
    if(!confirmation){
      confirmation = document.createElement('div');
      confirmation.className = 'apply-confirm';
      confirmation.style.marginTop = '0.8rem';
      applyForm.parentNode.appendChild(confirmation);
    }
    confirmation.textContent = 'La fenêtre de composition Gmail a été ouverte. Complétez et envoyez depuis votre boîte.';
    confirmation.style.color = '#fff';
    confirmation.style.background = 'linear-gradient(90deg,var(--accent),var(--accent-dark))';
    confirmation.style.padding = '0.6rem 0.9rem';
    confirmation.style.borderRadius = '8px';

    setTimeout(()=>{
      confirmation.remove();
      applyForm.reset();
      closeModal();
    }, 2200);
  });
});
