// Projetos de exemplo
const projects = [
  {
    title: 'Biblioteca',
    description: 'APP de gerenciamento geral de biblioteca, com funcionalidades de cadastro, consulta e reservas de livros.',
    tech: 'Python, JavaScript, PostgreSQL',
    link: 'https://github.com/GabrielLima-BD/P-Biblioteca'
  },
  {
    title: 'Costureira - Em Desenvolvimento',
    description: 'APP para gerenciamento de ateliês de costura, com controle de pedidos e orçamentos.',
    tech: 'Python, JavaScript, PostgreSQL, Power BI',
    link: '...'
  }
];

// Carregar projetos dinamicamente
function loadProjects() {
  const container = document.getElementById('projects-container');
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.description}</div>
      <div class="project-tech">${p.tech}</div>
      <a href="${p.link}" target="_blank" rel="noopener" class="project-link">Ver Projeto</a>
    `;
    container.appendChild(card);
  });
}

// Toggle menu
function navToggleHandler() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  const overlay = document.querySelector('.nav-overlay');

  toggle.addEventListener('click', () => {
    const isActive = menu.classList.toggle('active');
    toggle.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = isActive ? 'hidden' : '';
  });

  // Fechar menu ao clicar em link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Fechar menu ao clicar no overlay
  overlay.addEventListener('click', () => {
    menu.classList.remove('active');
    toggle.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

// Toggle tema
function themeToggleHandler() {
  const toggle = document.querySelector('.theme-toggle');
  const body = document.body;
  toggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
    toggle.querySelector('.theme-icon').textContent = body.classList.contains('dark-theme') ? '🌙' : '☀️';
  });
}

window.onload = () => {
  loadProjects();
  navToggleHandler();
  themeToggleHandler();
};