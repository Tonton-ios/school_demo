document.addEventListener('DOMContentLoaded', function(){
  const staff = [
    { name: 'Mme. Claire Dupont', role: 'Directrice', photo: 'assets/img/staff1.jpg', bio: 'Claire Dupont dirige l\'IMSF depuis 2018. Elle supervise les programmes académiques et les partenariats.' },
    { name: 'M. Ahmed Benali', role: 'Professeur de Mathématiques', photo: 'assets/img/staff2.jpg', bio: 'Ahmed enseigne les mathématiques depuis 2012 et coordonne les concours inter-écoles.' },
    { name: 'Mme. Sophie Leroy', role: 'Responsable administrative', photo: 'assets/img/staff3.jpg', bio: 'Sophie gère les admissions, la scolarité et la communication avec les familles.' },
    { name: 'M. Julien Moreau', role: 'Enseignant Sciences', photo: 'assets/img/staff4.jpg', bio: 'Julien anime les ateliers scientifiques et supervise les projets STEM.' }
  ];

  const grid = document.getElementById('staffGrid');
  if(!grid) return;

  staff.forEach(member=>{
    const card = document.createElement('div');
    card.className = 'staff-card';
    card.innerHTML = `
      <img src="${member.photo}" alt="${member.name}" class="staff-photo" onerror="this.src='assets/img/avatar-placeholder.png'">
      <div class="staff-name">${member.name}</div>
      <div class="staff-role">${member.role}</div>
      <div class="staff-bio">${member.bio}</div>
    `;
    card.addEventListener('click', ()=>{
      card.classList.toggle('expanded');
    });
    grid.appendChild(card);
  });
});
